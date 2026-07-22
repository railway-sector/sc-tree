import LabelClass from "@arcgis/core/layers/support/LabelClass";
import SimpleRenderer from "@arcgis/core/renderers/SimpleRenderer";
import UniqueValueRenderer from "@arcgis/core/renderers/UniqueValueRenderer";
import LabelSymbol3D from "@arcgis/core/symbols/LabelSymbol3D";
import SimpleLineSymbol from "@arcgis/core/symbols/SimpleLineSymbol";
import SimpleMarkerSymbol from "@arcgis/core/symbols/SimpleMarkerSymbol";
import TextSymbol3DLayer from "@arcgis/core/symbols/TextSymbol3DLayer";

//----------------------------------------------//
//              portalItem                      //
//----------------------------------------------//
const portalItem_url = { url: "https://gis.railway-sector.com/portal" };

export const portalItems = (id: any) => {
  return { id: id, portal: portalItem_url };
};

export const cpackages = [
  "All",
  "S-01",
  "S-02",
  "S-03a",
  "S-03b",
  "S-03c",
  "S-04",
  "S-05",
  "S-06",
  "S-07",
];

export const cp_f = "CP";

//----------------------------------------------//
//              Chart Parameters                //
//----------------------------------------------//
export const chart_width = "26vw";
export const chart_box_width = 250;

export const construction_status = [
  "To be Constructed",
  "Under Construction",
  "Completed",
];

// Chart and chart label color
export const primaryLabelColor = "#9ca3af";
export const valueLabelColor = "#d1d5db";

//----------------------------------------------//
//            Alignment Layers                  //
//----------------------------------------------//
//--- STATION LAYER ---//
export const label_stationp = new LabelClass({
  symbol: new LabelSymbol3D({
    symbolLayers: [
      new TextSymbol3DLayer({
        material: { color: "#d4ff33" },
        size: 15,
        halo: { color: "black", size: 0.5 },
      }),
    ],
    verticalOffset: {
      screenLength: 100,
      maxWorldLength: 700,
      minWorldLength: 80,
    },

    callout: {
      type: "line",
      color: [128, 128, 128, 0.5],
      size: 0.2,
      border: { color: "grey" },
    },
  }),
  labelPlacement: "above-center",
  labelExpressionInfo: { expression: "$feature.Station" },
});

//--- CHAINAGE LAYER ---//
export const label_chainage = new LabelClass({
  labelExpressionInfo: { expression: "$feature.KmSpot" },
  symbol: {
    type: "text",
    color: [85, 255, 0],
    haloColor: "black",
    haloSize: 0.5,
    font: { size: 15, weight: "bold" },
  },
});

export const chainage_renderer = new SimpleRenderer({
  symbol: new SimpleMarkerSymbol({
    size: 5,
    color: [255, 255, 255, 0.9],
    outline: { width: 0.2, color: "black" },
  }),
});

//--- PIER ACCESS POINT LAYER ---//
export const pier_access_label = new LabelClass({
  symbol: new LabelSymbol3D({
    symbolLayers: [
      new TextSymbol3DLayer({
        material: { color: valueLabelColor },
        size: 15,
        font: { family: "Ubuntu Mono", weight: "bold" },
      }),
    ],
    verticalOffset: {
      screenLength: 80,
      maxWorldLength: 500,
      minWorldLength: 30,
    },
    callout: {
      type: "line",
      size: 0.5,
      color: [0, 0, 0],
      border: { color: [255, 255, 255, 0.7] },
    },
  }),
  labelExpressionInfo: { expression: "$feature.PierNumber" },
  labelPlacement: "above-center",
});

//--- PROW LAYER ---//
export const prow_renderer = new SimpleRenderer({
  symbol: new SimpleLineSymbol({ color: "#ff0000", width: "2px" }),
});

//---------------------------------------------//
//        Tree Cutting & Compensation          //
//---------------------------------------------//
//--- COMMON PARAMETERS ---//
export const tree_sci_name_f = "ScientificName";
export const tree_com_name_f = "CommonName";

export const tree_popup = {
  lastEditInfoEnabled: false,
  returnGeometry: true,
  content: [
    {
      type: "fields",
      fieldInfos: [
        { fieldName: "ScientificName", label: "Scientific Name" },
        { fieldName: "CommonName", label: "Common Name" },
        { fieldName: "Province" },
        { fieldName: "Municipality" },
        { fieldName: "TreeNo", label: "Tree No." },
        { fieldName: "CP", label: "<h5>CP</h5>" },
        { fieldName: "Status", label: "Status of Tree Cutting" },
        { fieldName: "Compensation", label: "Status of Tree Compensation" },
        { fieldName: "Conservation", label: "Conservation Status" },
      ],
    },
  ],
};

// Feature reduction
export const clusterConfig: any = {
  type: "cluster",
  clusterRadius: "100px",
  popupTemplate: {
    title: "Cluster summary",
    content: "This cluster represents {cluster_count} trees.",
    fieldInfos: [
      {
        fieldName: "cluster_count",
        format: { places: 0, digitSeparator: true },
      },
    ],
  },
  clusterMinSize: "24px",
  clusterMaxSize: "60px",
  labelingInfo: [
    {
      deconflictionStrategy: "none",
      labelExpressionInfo: {
        expression: "Text($feature.cluster_count, '#,###')",
      },
      symbol: {
        type: "text",
        color: "white",
        haloColor: "black",
        haloSize: "1px",
        font: { weight: "bold", family: "Noto Sans", size: "12px" },
      },
      labelPlacement: "center-center",
    },
  ],
};

//--- TREE CUTTING LAYER ---//
//--- Status Query
export const treec_status_f = "Status";
export const treec_status_q = [
  { value: 1, category: "Cut/Earthballed", color: "#71ab48" },
  { value: 2, category: "Permit Acquired", color: "#ffff00" },
  { value: 3, category: "Submitted to DENR", color: "#ffaa00" },
  {
    value: 4,
    category: "Ongoing Acquisition of Application Documents",
    color: "#ff0000",
  },
];

const outlineColor = "gray";

const treec_uniqueV = treec_status_q.map((f: any) => {
  return {
    value: f.value,
    label: f.category,
    symbol: new SimpleMarkerSymbol({
      size: 5,
      color: f.color,
      outline: { width: 0.5, color: outlineColor },
    }),
  };
});

export const treec_renderer = new UniqueValueRenderer({
  field: treec_status_f,
  uniqueValueInfos: treec_uniqueV,
});

//--- TREE COMPENSATION LAYER ---//
export const treem_status_f = "Compensation";
export const treem_status_q = [
  { value: 1, category: "Non-Compensable", color: "#0070ff" },
  { value: 2, category: "For Processing", color: "#ffff00" },
  { value: 3, category: "Compensated", color: "#71ab48" },
];

const treem_uniqueV = treem_status_q.map((f: any) => {
  return {
    value: f.value,
    label: f.category,
    symbol: new SimpleMarkerSymbol({
      size: 5,
      color: f.color,
      outline: { width: 0.5, color: outlineColor },
    }),
  };
});

export const treem_renderer = new UniqueValueRenderer({
  field: treem_status_f,
  uniqueValueInfos: treem_uniqueV,
});

//--- TREE CONSERVATION LAYER ---//
export const treen_status_f = "Conservation";
export const treen_status_q = [
  { value: 1, category: "Ex", color: "#9e0142" },
  { value: 2, category: "Ew", color: "#d53e4f" },
  { value: 3, category: "CR", color: "#f46d43" },
  { value: 4, category: "E", color: "#fdae61" },
  { value: 5, category: "VU", color: "#fee08b" },
  { value: 6, category: "NT", color: "#e6f598" },
  { value: 7, category: "LC", color: "#abdda4" },
  { value: 8, category: "DD", color: "#66c2a5" },
  { value: 9, category: "NE", color: "#3288bd" },
  { value: 10, category: "OTS", color: "#5e4fa2" },
  { value: 11, category: "NL", color: "#ffffff" },
  { value: 12, category: "EN", color: "#44555a" },
];

const treen_uniqueV = treen_status_q.map((f: any) => {
  return {
    value: f.value,
    label: f.category,
    symbol: new SimpleMarkerSymbol({
      size: 5,
      color: f.color,
      outline: { width: 0.5, color: outlineColor },
    }),
  };
});

export const treen_renderer = new UniqueValueRenderer({
  field: treen_status_f,
  uniqueValueInfos: treen_uniqueV,
});

//---------------------------------------------//
//              Layer List                     //
//---------------------------------------------//
export async function defineActions(event: any) {
  const { item } = event;

  if (item.layer.type !== "group") {
    item.panel = { content: "legend", open: true };
  }

  item.title === "Chainage" ||
  item.title === "Tree Compensation" ||
  item.title === "Tree Conservation"
    ? (item.visible = false)
    : (item.visible = true);
}
