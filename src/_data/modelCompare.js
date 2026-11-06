// Model comparison columns per product family (EN subpages).
// Data source: src/_products/*.json via productModels.js (rows = [label, value, propertyID]).
// Add a family here, then include partials/model-compare.njk after product-models.njk.

module.exports = {
  "products/power-bank/semi-solid-state": {
    columns: [
      { label: "Capacity", keys: ["batteryCapacity", "ratedCapacity", "batteryEnergy"] },
      { label: "Output", keys: ["typeCTypeCCableOutput", "typeCDualCableOutput", "typeCOutput"] },
      { label: "Cable / Feature", keys: ["cableType", "specialFeature"] }
    ],
    note: "Certification: CE/FCC/RoHS, UN38.3. MOQ follows the customization tier: 500 / 1,000–2,000 / 3,000+; lead times 25–35 / 35–50 / 30–60 days."
  },
  "products/power-bank/2-in-1-hybrid": {
    columns: [
      { label: "Capacity", keys: ["batteryEnergy", "ratedCapacity", "batteryCapacity"] },
      { label: "Output", keys: ["combinedOutput", "adapterModeOutput", "powerBankModeOutput", "typeCOutput"] },
      { label: "Plugs", keys: ["plugs"] }
    ],
    note: "Certification: CE/FCC/RoHS, UN38.3. MOQ follows the customization tier: 500 / 1,000–2,000 / 3,000+; lead times 25–35 / 35–50 / 30–60 days."
  },
  "products/power-bank/laptop-power": {
    columns: [
      { label: "Capacity", keys: ["batteryCapacity", "batteryEnergy", "ratedCapacity"] },
      { label: "Output", keys: ["typeCCCableOutput", "typeCOutput", "typeCCableOutput"] },
      { label: "Input", keys: ["input", "typeCInput", "typeCCableInput"] }
    ],
    note: "Certification: CE/FCC/RoHS, UN38.3. MOQ follows the customization tier: 500 / 1,000–2,000 / 3,000+; lead times 25–35 / 35–50 / 30–60 days."
  },
  "products/power-bank/wireless-magnetic": {
    columns: [
      { label: "Capacity", keys: ["batteryCapacity"] },
      { label: "Wired Output", keys: ["typeCOutput", "typeCCableOutput", "totalCombinedOutput"] },
      { label: "Feature", keys: ["specialFeature", "display", "activation"] }
    ],
    note: "Certification: CE/FCC/RoHS, UN38.3; Qi2 WPC where applicable. MOQ follows the customization tier: 500 / 1,000–2,000 / 3,000+; lead times 25–35 / 35–50 / 30–60 days."
  },
  "products/power-bank/smart-display": {
    columns: [
      { label: "Capacity", keys: ["batteryCapacity"] },
      { label: "Output", keys: ["typeCOutput", "wirelessOutput", "output"] },
      { label: "Display", keys: ["display"] }
    ],
    note: "Certification: CE/FCC/RoHS, UN38.3. MOQ follows the customization tier: 500 / 1,000–2,000 / 3,000+; lead times 25–35 / 35–50 / 30–60 days."
  },
  "products/power-bank/heating-battery": {
    columns: [
      { label: "Capacity", keys: ["ratedCapacity", "batteryCapacity"] },
      { label: "Output", keys: ["dcOutput", "typeCOutput", "usbAOutput", "totalOutput"] },
      { label: "Connector / Input", keys: ["input", "typeCInput", "dcInputOutput"] }
    ],
    note: "Certification: CE/FCC/RoHS, UN38.3; selected models CE/PSE. MOQ follows the customization tier: 500 / 1,000–2,000 / 3,000+; lead times 25–35 / 35–50 / 30–60 days."
  },
  "products/wireless-charger/desktop": {
    columns: [
      { label: "Output", keys: ["output1", "output"] },
      { label: "Design", keys: ["design"] },
      { label: "Input", keys: ["input"] }
    ],
    note: "Certification: Qi2 WPC, CE/FCC/RoHS. MOQ follows the customization tier: 500 / 1,000–2,000 / 3,000+; lead times 25–35 / 35–50 / 30–60 days."
  },
  "products/wireless-charger/3-in-1-station": {
    columns: [
      { label: "Phone", labels: ["Output (Phone)"] },
      { label: "Watch", labels: ["Output (Watch)"] },
      { label: "TWS", labels: ["Output (TWS)"] }
    ],
    note: "Certification: Qi2 WPC, CE/FCC/RoHS. MOQ follows the customization tier: 500 / 1,000–2,000 / 3,000+; lead times 25–35 / 35–50 / 30–60 days."
  },
  "products/wireless-charger/car-mount": {
    columns: [
      { label: "Output", keys: ["output"] },
      { label: "Cooling", keys: ["coolingTech"] },
      { label: "Input", keys: ["input", "usbCInput"] }
    ],
    note: "Certification: Qi2 WPC, CE/FCC/RoHS; E-Mark available for EU automotive. MOQ follows the customization tier: 500 / 1,000–2,000 / 3,000+; lead times 25–35 / 35–50 / 30–60 days."
  },
  "products/car-charger": {
    columns: [
      { label: "Total Output", keys: ["totalOutput", "totalOutputCableCA", "outputCableC", "typeC1", "typeC2", "usbC1", "typeC"] },
      { label: "Input", keys: ["inputVoltage", "input"] },
      { label: "Display / Feature", keys: ["display", "safety", "lightRing", "cableLength"] }
    ],
    note: "Certification: CE/FCC; E-Mark for EU automotive. MOQ follows the customization tier: 500 / 1,000–2,000 / 3,000+; lead times 25–35 / 35–50 / 30–60 days."
  },
  "products/gan-charger": {
    columns: [
      { label: "Output", keys: ["usbC1C2Output", "usbCOutput", "c1C2Output", "totalPower", "c1Output"] },
      { label: "Input", keys: ["input"] },
      { label: "Plugs / Size", keys: ["plugs", "dimensions"] }
    ],
    note: "Certification: CE/FCC; UL 62368-1, PSE and KC available. MOQ follows the customization tier: 500 / 1,000–2,000 / 3,000+; lead times 25–35 / 35–50 / 30–60 days."
  }
};
