// Certification profiles for EN product subpages.
// Used by partials/market-certifications.njk (set certProfile before including).
// Facts follow features.md §6 and the certifications already claimed on the site.

module.exports = {
  "power-bank": {
    rows: [
      { market: "EU", standards: "CE (LVD + EMC), RoHS, REACH, UN38.3, WEEE / EPR" },
      { market: "US", standards: "FCC SDoC, UN38.3; UL 62368-1 project-based" },
      { market: "Japan", standards: "PSE project-based" },
      { market: "Korea", standards: "KC project-based" }
    ],
    note: "CE, FCC, RoHS and UN38.3 files ship with every battery order. UL, PSE, KC and EPR registration are quoted per project."
  },
  "wireless": {
    rows: [
      { market: "EU", standards: "CE (LVD + EMC), RoHS, REACH, Qi2 WPC" },
      { market: "US", standards: "FCC SDoC; FCC ID for wireless; Qi2 WPC" },
      { market: "Japan", standards: "PSE project-based (AC adapter)" },
      { market: "Korea", standards: "KC project-based" }
    ],
    note: "CE, FCC, RoHS and Qi2 WPC files ship with every wireless order. UL, PSE and KC are quoted per project."
  },
  "car-mount": {
    rows: [
      { market: "EU", standards: "CE, RoHS, E-Mark (ECE R10), Qi2 WPC" },
      { market: "US", standards: "FCC, Qi2 WPC" },
      { market: "Other", standards: "UL 62368-1, PSE or KC project-based" }
    ],
    note: "CE, FCC and RoHS files ship with every order. E-Mark (ECE R10) and Qi2 WPC testing are quoted per project."
  },
  "car-charger": {
    rows: [
      { market: "EU", standards: "CE, RoHS, E-Mark (ECE R10)" },
      { market: "US", standards: "FCC; UL 62368-1 project-based" },
      { market: "Japan", standards: "PSE project-based" },
      { market: "Korea", standards: "KC project-based" }
    ],
    note: "CE, FCC, RoHS and E-Mark files ship with every order. UL, PSE and KC are quoted per project."
  },
  "gan-charger": {
    rows: [
      { market: "EU", standards: "CE (LVD + EMC), RoHS, REACH" },
      { market: "US", standards: "FCC; UL 62368-1 project-based" },
      { market: "Japan", standards: "PSE project-based" },
      { market: "Korea", standards: "KC project-based" }
    ],
    note: "CE, FCC and RoHS files ship with every order. UL, PSE and KC are quoted per project."
  }
};
