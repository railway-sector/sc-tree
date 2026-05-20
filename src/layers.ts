import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import LabelClass from "@arcgis/core/layers/support/LabelClass";
import UniqueValueRenderer from "@arcgis/core/renderers/UniqueValueRenderer";
import SimpleRenderer from "@arcgis/core/renderers/SimpleRenderer";
import SimpleMarkerSymbol from "@arcgis/core/symbols/SimpleMarkerSymbol";
import SimpleLineSymbol from "@arcgis/core/symbols/SimpleLineSymbol";
import TextSymbol from "@arcgis/core/symbols/TextSymbol.js";
import GroupLayer from "@arcgis/core/layers/GroupLayer";
import QueryExpressionLayers from "query-layers-expression";
import {
  colorsCompen,
  colorsConservation,
  colorsCutting,
  treeCompensationStatusLabels,
  treeCompensationStatusValues,
  treeCuttingStatusLabels,
  treeCuttingStatusValues,
} from "./uniqueValues";

export const queryc = new QueryExpressionLayers(
  undefined,
  undefined,
  undefined,
  undefined,
  "string",
  0,
  undefined,
  undefined,
  undefined,
);

export const queryc2 = new QueryExpressionLayers(
  undefined,
  undefined,
  undefined,
  undefined,
  "string",
  0,
  undefined,
  undefined,
  undefined,
);

export const queryc3 = new QueryExpressionLayers(
  undefined,
  undefined,
  undefined,
  undefined,
  "string",
  0,
  undefined,
  undefined,
  undefined,
);

export const queryc4 = new QueryExpressionLayers(
  undefined,
  undefined,
  undefined,
  undefined,
  "string",
  0,
  undefined,
  undefined,
  undefined,
);

/* Standalone table for Dates */
export const dateTable = new FeatureLayer({
  portalItem: {
    id: "b2a118b088a44fa0a7a84acbe0844cb2",
    portal: {
      url: "https://gis.railway-sector.com/portal",
    },
  },
});
////////////////////////////////////////////
/* Chainage Layer  */
const labelChainage = new LabelClass({
  labelExpressionInfo: { expression: "$feature.KmSpot" },
  symbol: {
    type: "text",
    color: [85, 255, 0],
    haloColor: "black",
    haloSize: 0.5,
    font: {
      size: 15,
      weight: "bold",
    },
  },
});

const chainageRenderer = new SimpleRenderer({
  symbol: new SimpleMarkerSymbol({
    size: 5,
    color: [255, 255, 255, 0.9],
    outline: {
      width: 0.2,
      color: "black",
    },
  }),
});

export const chainageLayer = new FeatureLayer({
  portalItem: {
    id: "e09b9af286204939a32df019403ef438",
    portal: {
      url: "https://gis.railway-sector.com/portal",
    },
  },
  layerId: 2,
  title: "Chainage",
  elevationInfo: {
    mode: "relative-to-ground",
  },
  labelingInfo: [labelChainage],
  minScale: 150000,
  maxScale: 0,
  renderer: chainageRenderer,

  popupEnabled: false,
});

/* ROW Layer */
const prowRenderer = new SimpleRenderer({
  symbol: new SimpleLineSymbol({
    color: "#ff0000",
    width: "2px",
  }),
});

export const prowLayer = new FeatureLayer({
  url: "https://gis.railway-sector.com/server/rest/services/SC_Alignment/FeatureServer/5",
  title: "PROW",
  definitionExpression: "Extension = 'SC'",
  popupEnabled: false,
  renderer: prowRenderer,
});
prowLayer.listMode = "hide";

/* Station Layer */
const labelClass = new LabelClass({
  labelExpressionInfo: { expression: "$feature.Station" },
  symbol: new TextSymbol({
    color: "black",
    haloColor: "white",
    haloSize: 1,
    font: {
      family: "Arial",
      size: 9,
      //weight: "bold"
    },
  }),
  labelPlacement: "center-right",
});

export const stationLayer = new FeatureLayer({
  portalItem: {
    id: "e09b9af286204939a32df019403ef438",
    portal: {
      url: "https://gis.railway-sector.com/portal",
    },
  },
  layerId: 6,
  title: "SC Stations",
  labelingInfo: [labelClass],
  elevationInfo: {
    mode: "relative-to-ground",
  },
});

/* Tree cutting layer */
const outlineColor = "gray";

const uniqueValueInfos_treeCutting = treeCuttingStatusLabels.map(
  (label: any, index: any) => {
    return Object.assign({
      value: treeCuttingStatusValues[index],
      label: label,
      symbol: new SimpleMarkerSymbol({
        size: 5,
        color: colorsCutting[index], // the first two letters dictate transparency.
        outline: {
          width: 0.5,
          color: outlineColor,
        },
      }),
    });
  },
);

export const treeCuttingRenderer = new UniqueValueRenderer({
  field: "Status",
  uniqueValueInfos: uniqueValueInfos_treeCutting,
});

const clusterConfig: any = {
  type: "cluster",
  clusterRadius: "100px",
  popupTemplate: {
    title: "Cluster summary",
    content: "This cluster represents {cluster_count} trees.",
    fieldInfos: [
      {
        fieldName: "cluster_count",
        format: {
          places: 0,
          digitSeparator: true,
        },
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
        font: {
          weight: "bold",
          family: "Noto Sans",
          size: "12px",
        },
      },
      labelPlacement: "center-center",
    },
  ],
};

export const treeCuttingLayer = new FeatureLayer({
  portalItem: {
    id: "dfd0bca99c754002b55459004b684415",
    portal: {
      url: "https://gis.railway-sector.com/portal",
    },
  },
  elevationInfo: {
    mode: "on-the-ground",
  },
  layerId: 2,
  featureReduction: clusterConfig,
  title: "Tree Cutting",
  renderer: treeCuttingRenderer,
  popupTemplate: {
    lastEditInfoEnabled: false,
    returnGeometry: true,
    content: [
      {
        type: "fields",
        fieldInfos: [
          {
            fieldName: "ScientificName",
            label: "Scientific Name",
          },
          {
            fieldName: "CommonName",
            label: "Common Name",
          },
          {
            fieldName: "Province",
          },
          {
            fieldName: "Municipality",
          },
          {
            fieldName: "TreeNo",
            label: "Tree No.",
          },
          {
            fieldName: "CP",
            label: "<h5>CP</h5>",
          },
          {
            fieldName: "Compensation",
            label: "Status of Tree Compensation",
          },
          {
            fieldName: "Conservation",
            label: "Conservation Status",
          },
        ],
      },
    ],
  },
});

/* Tree compensation layer */
const uniqueValueInfos_compen = treeCompensationStatusLabels.map(
  (label: any, index: any) => {
    return Object.assign({
      value: treeCompensationStatusValues[index],
      label: label,
      symbol: new SimpleMarkerSymbol({
        size: 5,
        color: colorsCompen[index], // the first two letters dictate transparency.
        outline: {
          width: 0.5,
          color: outlineColor,
        },
      }),
    });
  },
);
export const treeCompensationRenderer = new UniqueValueRenderer({
  field: "Compensation",
  uniqueValueInfos: uniqueValueInfos_compen,
});

export const treeCompensationLayer = new FeatureLayer({
  portalItem: {
    id: "dfd0bca99c754002b55459004b684415",
    portal: {
      url: "https://gis.railway-sector.com/portal",
    },
  },
  layerId: 2,
  featureReduction: clusterConfig,
  title: "Tree Compensation",
  renderer: treeCompensationRenderer,
  popupTemplate: {
    title: "<h5>{Compensation}</h5>",
    lastEditInfoEnabled: false,
    returnGeometry: true,
    content: [
      {
        type: "fields",
        fieldInfos: [
          {
            fieldName: "ScientificName",
            label: "Scientific Name",
          },
          {
            fieldName: "CommonName",
            label: "Common Name",
          },
          {
            fieldName: "Province",
          },
          {
            fieldName: "Municipality",
          },
          {
            fieldName: "TreeNo",
            label: "Tree No.",
          },
          {
            fieldName: "CP",
            label: "<h5>CP</h5>",
          },
          {
            fieldName: "Status",
            label: "Status of Tree Cutting",
          },
          {
            fieldName: "Conservation",
            label: "Conservation Status",
          },
        ],
      },
    ],
  },
});

/* Tree Conservation layer */
const treeConservationUniqueValuesInfos = colorsConservation.map(
  (color: any, index: any) => {
    return Object.assign({
      value: index + 1,
      symbol: new SimpleMarkerSymbol({
        style: "triangle",
        size: 5,
        color: color, // the first two letters dictate transparency.
        outline: {
          width: 0.5,
          color: outlineColor,
        },
      }),
    });
  },
);

export const treeConservationRenderer = new UniqueValueRenderer({
  field: "Conservation",
  uniqueValueInfos: treeConservationUniqueValuesInfos,
});

export const treeConservationLayer = new FeatureLayer({
  portalItem: {
    id: "dfd0bca99c754002b55459004b684415",
    portal: {
      url: "https://gis.railway-sector.com/portal",
    },
  },

  title: "Tree Conservation",
  layerId: 2,
  featureReduction: clusterConfig,
  renderer: treeConservationRenderer,
  popupTemplate: {
    title: "<h5>{Conservation}</h5>",
    lastEditInfoEnabled: false,
    returnGeometry: true,
    content: [
      {
        type: "fields",
        fieldInfos: [
          {
            fieldName: "ScientificName",
            label: "Scientific Name",
          },
          {
            fieldName: "CommonName",
            label: "Common Name",
          },
          {
            fieldName: "Province",
          },
          {
            fieldName: "Municipality",
          },
          {
            fieldName: "TreeNo",
            label: "Tree No.",
          },
          {
            fieldName: "CP",
            label: "<h5>CP</h5>",
          },
          {
            fieldName: "Status",
            label: "Status of Tree Cutting",
          },
          {
            fieldName: "Compensation",
            label: "Status of Tree Compensation",
          },
        ],
      },
    ],
  },
});

export const treeGroupLayer = new GroupLayer({
  title: "Trees",
  visible: true,
  visibilityMode: "exclusive",
  layers: [treeConservationLayer, treeCompensationLayer, treeCuttingLayer],
});

export const alignmentGroupLayer = new GroupLayer({
  title: "Alignment",
  visible: true,
  visibilityMode: "independent",
  layers: [chainageLayer, stationLayer, prowLayer],
});
