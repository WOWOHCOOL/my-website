#!/usr/bin/env node
/**
 * validate-publish-fanout.js
 *
 * One gate for the four things that must update when a blog article ships:
 *   1. sitemap.xml contains the article URL
 *   2. rss.xml contains the article URL
 *   3. blog/index.html and the author page contain the article
 *   4. every page declared in frontmatter `topicLanding` renders the article
 *      in its auto-generated "latest guides" strip
 *
 * Each of these used to fail silently: the page was live, but one derivation
 * was stale and nothing noticed. Runs after generate-sitemaps.js in
 * `npm run build`. Pure Node, no deps.
 *
 * Usage: node scripts/validate-publish-fanout.js
 * Exit:  0 = all four fan-outs intact | 1 = at least one gap
 */
"use strict";

const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const SRC = path.join(ROOT, "src");
const SITE = path.join(ROOT, "_site");
const BLOG_SRC = path.join(SRC, "blog");
const ORIGIN = "https://www.wowohcool.com";

// Author page slugs are explicit: a typo in frontmatter `author` must fail the
// build instead of silently dropping the article from the author page.
const AUTHOR_PAGES = {
  "Nina Nico": "/authors/nina-nico/",
  "Snowy May": "/authors/snowy-may/",
};

const read = (p) => fs.readFileSync(p, "utf8");

function frontmatter(source) {
  const m = source.match(/^﻿?---\r?\n([\s\S]*?)\r?\n---/);
  return m ? m[1] : "";
}

function str(fm, key) {
  const m = fm.match(new RegExp("^" + key + ':\\s*"?([^"\\r\\n]+)"?\\s*$', "m"));
  return m ? m[1].trim() : null;
}

function topicTargets(fm) {
  const single = fm.match(/^topicLanding:\s*"([^"]+)"/m);
  if (single) return [single[1]];
  const block = fm.match(/^topicLanding:\s*\r?\n((?:[ \t]*-[ \t]*"[^"]+"[ \t]*\r?\n?)+)/m);
  if (!block) return [];
  return [...block[1].matchAll(/"([^"]+)"/g)].map((m) => m[1]);
}

function quotedList(fm, key) {
  const m = fm.match(new RegExp("^" + key + ":\\s*\\[([^\\]]*)\\]", "m"));
  if (!m) return [];
  return [...m[1].matchAll(/"([^"]+)"/g)].map((x) => x[1]);
}

function latestGuidesBlock(html) {
  const start = html.indexOf('id="latest-guides"');
  if (start < 0) return null;
  const end = html.indexOf("</section>", start);
  return end < 0 ? null : html.slice(start, end);
}

function main() {
  if (!fs.existsSync(SITE)) {
    console.error("[publish-fanout] _site not found — run eleventy first");
    process.exit(1);
  }

  const sitemap = read(path.join(SITE, "sitemap.xml"));
  const rss = read(path.join(SITE, "rss.xml"));
  const blogIndex = read(path.join(SITE, "blog", "index.html"));

  const posts = [];
  for (const entry of fs.readdirSync(BLOG_SRC, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const file = path.join(BLOG_SRC, entry.name, "index.njk");
    if (!fs.existsSync(file)) continue;
    const fm = frontmatter(read(file));
    const canonical = str(fm, "canonical");
    if (!canonical || canonical === "/blog/") continue;
    posts.push({
      slug: entry.name,
      canonical,
      author: str(fm, "author"),
      date: str(fm, "date") || "",
      targets: topicTargets(fm),
    });
  }

  const errors = [];
  const push = (check, slug, detail) => errors.push(`[${check}] ${slug}: ${detail}`);

  // 1-3: per-article derivations
  for (const post of posts) {
    if (!sitemap.includes(ORIGIN + post.canonical)) push("sitemap", post.slug, "missing from sitemap.xml");
    if (!rss.includes(ORIGIN + post.canonical)) push("rss", post.slug, "missing from rss.xml");
    if (!blogIndex.includes(`href="${post.canonical}"`)) push("blog-index", post.slug, "missing from /blog/");

    const authorPage = AUTHOR_PAGES[post.author];
    if (!authorPage) {
      push("author", post.slug, `author "${post.author}" has no known author page (add it to AUTHOR_PAGES and create src/authors/<slug>/)`);
    } else {
      const file = path.join(SITE, authorPage.slice(1), "index.html");
      if (!fs.existsSync(file)) {
        push("author", post.slug, `author page ${authorPage} was not built`);
      } else if (!read(file).includes(`href="${post.canonical}"`)) {
        push("author", post.slug, `missing from ${authorPage}`);
      }
    }

    if (!post.targets.length) {
      push("topic-landing", post.slug, "frontmatter topicLanding is missing or empty (declare the keyword owner page)");
    }
  }

  // 4: each landing page must render the newest posts that target it
  const byTarget = new Map();
  for (const post of posts) {
    for (const target of post.targets) {
      if (!byTarget.has(target)) byTarget.set(target, []);
      byTarget.get(target).push(post);
    }
  }

  for (const [target, group] of byTarget) {
    const pageFile = path.join(SITE, target.slice(1), "index.html");
    if (!fs.existsSync(pageFile)) {
      errors.push(`[topic-landing] ${target}: landing page was not built (check topicLanding paths)`);
      continue;
    }

    const srcFile = path.join(SRC, target.slice(1), "index.njk");
    const pageFm = fs.existsSync(srcFile) ? frontmatter(read(srcFile)) : "";
    const exclude = quotedList(pageFm, "insightsExclude");
    // Curated pages declare `insightsPinned`; the strip renders those in order.
    // Auto pages fall back to the newest 3 that target the page.
    const pinned = quotedList(pageFm, "insightsPinned");
    const bySlug = new Map(posts.map((p) => [p.slug, p]));
    const expected = pinned.length
      ? pinned.map((slug) => bySlug.get(slug)).filter(Boolean)
      : group
          .filter((p) => !exclude.includes(p.canonical) && !exclude.includes(p.slug))
          .sort((a, b) => (b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug)))
          .slice(0, 3);

    const block = latestGuidesBlock(read(pageFile));
    if (!block) {
      if (expected.length) errors.push(`[topic-landing] ${target}: no latest-guides section rendered`);
      continue;
    }
    for (const post of expected) {
      if (!block.includes(`href="${post.canonical}"`)) {
        push("topic-landing", post.slug, `missing from the latest-guides strip on ${target}`);
      }
    }
  }

  if (errors.length) {
    console.error(`[publish-fanout] ${errors.length} gap(s) across ${posts.length} articles`);
    for (const e of errors.slice(0, 40)) console.error("   - " + e);
    if (errors.length > 40) console.error(`   ... and ${errors.length - 40} more`);
    process.exit(1);
  }

  const targets = byTarget.size;
  console.log(`[publish-fanout] PASS — ${posts.length} articles: sitemap + rss + blog index + author page + ${targets} topic landing pages`);
}

main();
