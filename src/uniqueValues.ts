export const cpField = "CP";
export type statisticsType = "count" | "sum";
export type TypeFieldType = "number" | "string";

// For Tree Cutting Pie Chart
export const treeCuttinStatusField = "Status";
export const treeCuttingStatusLabels: string[] = [
  "Cut/Earthballed",
  "Permit Acquired",
  "Submitted to DENR",
  "Ongoing Acquisition of Application Documents",
];

export const treeCuttingStatusValues = [1, 2, 3, 4];
export const colorsCutting = ["#71ab48", "#ffff00", "#ffaa00", "#ff0000"];

export const treeCuttingTypes = treeCuttingStatusLabels.map(
  (label: any, index: any) => {
    return Object.assign({
      category: label,
      value: treeCuttingStatusValues[index],
      color: colorsCutting[index],
    });
  },
);

// For Tree Compensation Chart
export const treeCompensationStatusField = "Compensation";
export const treeCompensationStatusLabels: string[] = [
  "Non-Compensable",
  "For Processing",
  "Compensated",
];

export const colorsCompen = ["#0070ff", "#ffff00", "#71ab48"];
export const treeCompensationStatusValues = [1, 2, 3];

export const treeCompensationTypes = treeCompensationStatusLabels.map(
  (label: any, index: any) => {
    return Object.assign({
      category: label,
      value: treeCompensationStatusValues[index],
      color: colorsCompen[index],
    });
  },
);

// For Tree Conservation Chart
export const treeConservationStatusField = "Conservation";
export const treeConserveStatusLabels = [
  "Ex",
  "Ew",
  "CR",
  "E",
  "VU",
  "NT",
  "LC",
  "DD",
  "NE",
  "OTS",
  "NL",
  "EN",
];

export const colorsConservation = [
  "#9e0142",
  "#d53e4f",
  "#f46d43",
  "#fdae61",
  "#fee08b",
  "#e6f598",
  "#abdda4",
  "#66c2a5",
  "#3288bd",
  "#5e4fa2",
  "#ffffff",
  "#44555a",
];

export const treeConservationTypes = treeConserveStatusLabels.map(
  (status: any, index: any) => {
    return Object.assign({
      category: status,
      value: index + 1,
      color: colorsConservation[index],
    });
  },
);

// Layter list
export async function defineActions(event: any) {
  const { item } = event;

  if (item.layer.type !== "group") {
    item.panel = {
      content: "legend",
      open: true,
    };
  }

  item.title === "Chainage" ||
  item.title === "Tree Compensation" ||
  item.title === "Tree Conservation"
    ? (item.visible = false)
    : (item.visible = true);
}

export const primaryLabelColor = "#9ca3af";
export const valueLabelColor = "#d1d5db";
