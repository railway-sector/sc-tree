import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import GroupLayer from "@arcgis/core/layers/GroupLayer";
import {
  chainage_renderer,
  clusterConfig,
  label_chainage,
  label_stationp,
  pier_access_label,
  portalItems,
  prow_renderer,
  tree_popup,
  treec_renderer,
  treem_renderer,
  treen_renderer,
} from "./uniqueValues";

//---------------------------------------------//
//          Alignment Layers                   //
//---------------------------------------------//
//--- CHAINAGE LAYER ---//
export const chainageLayer = new FeatureLayer({
  portalItem: portalItems("e09b9af286204939a32df019403ef438"),
  layerId: 2,
  title: "Chainage",
  elevationInfo: { mode: "relative-to-ground" },
  labelingInfo: [label_chainage],
  minScale: 150000,
  maxScale: 0,
  renderer: chainage_renderer,
  popupEnabled: false,
});

//--- PIER NUMBER POINT LAYER ---//
export const pierNoLayer = new FeatureLayer({
  url: "https://gis.railway-sector.com/server/rest/services/SC_Alignment/FeatureServer/3",
  labelingInfo: [pier_access_label],
  elevationInfo: { mode: "on-the-ground" },
  title: "Pier No",
  popupEnabled: false,
});

//--- PROW LAYER ---//
export const prowLayer = new FeatureLayer({
  url: "https://gis.railway-sector.com/server/rest/services/SC_Alignment/FeatureServer/5",
  layerId: 5,
  title: "PROW",
  renderer: prow_renderer,
  popupEnabled: false,
});

//--- STATION POINT LAYER ---//
export const stationLayer = new FeatureLayer({
  portalItem: portalItems("e09b9af286204939a32df019403ef438"),
  layerId: 6,
  title: "Station",
  labelingInfo: [label_stationp],
  elevationInfo: { mode: "relative-to-ground" },
});
stationLayer.listMode = "hide";

export const alignmentGroupLayer = new GroupLayer({
  title: "Alignment",
  visible: true,
  visibilityMode: "independent",
  layers: [chainageLayer, pierNoLayer, prowLayer], //stationLayer,
});

//---------------------------------------------//
//            Other layers                     //
//---------------------------------------------//
export const dateTable = new FeatureLayer({
  portalItem: portalItems("b2a118b088a44fa0a7a84acbe0844cb2"),
});

//---------------------------------------------//
//        Tree Cutting & Compensation          //
//---------------------------------------------//
//--- TREE CUTTING LAYER ---//
export const treeCuttingLayer = new FeatureLayer({
  portalItem: portalItems("dfd0bca99c754002b55459004b684415"),
  layerId: 2,
  elevationInfo: { mode: "on-the-ground" },
  title: "Tree Cutting",
  renderer: treec_renderer,
  featureReduction: clusterConfig,
  popupTemplate: tree_popup,
});

//--- TREE COMPENSATION LAYER ---//
export const treeCompensationLayer = new FeatureLayer({
  portalItem: portalItems("dfd0bca99c754002b55459004b684415"),
  layerId: 2,
  title: "Tree Compensation",
  renderer: treem_renderer,
  featureReduction: clusterConfig,
  popupTemplate: tree_popup,
});

//--- TREE CONSERVATION LAYER ---//
export const treeConservationLayer = new FeatureLayer({
  portalItem: portalItems("dfd0bca99c754002b55459004b684415"),
  layerId: 2,
  title: "Tree Conservation",
  renderer: treen_renderer,
  featureReduction: clusterConfig,
  popupTemplate: tree_popup,
});

export const treeGroupLayer = new GroupLayer({
  title: "Tree Cutting & Compensation",
  visible: false,
  visibilityMode: "exclusive",
  layers: [treeConservationLayer, treeCompensationLayer, treeCuttingLayer],
});
