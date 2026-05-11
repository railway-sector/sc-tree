import "../index.css";
import "@arcgis/map-components/dist/components/arcgis-map";
import "@arcgis/map-components/components/arcgis-map";
import "@arcgis/map-components/components/arcgis-zoom";
import "@arcgis/map-components/components/arcgis-legend";
import "@arcgis/map-components/components/arcgis-basemap-gallery";
import "@arcgis/map-components/components/arcgis-layer-list";
import { treeGroupLayer, alignmentGroupLayer } from "../layers";
import type { ArcgisMap } from "@arcgis/map-components/dist/components/arcgis-map";

function MapDisplay() {
  const arcgisMap = document.querySelector("arcgis-map") as ArcgisMap;

  arcgisMap?.viewOnReady(() => {
    arcgisMap?.map?.add(alignmentGroupLayer);
    arcgisMap?.map?.add(treeGroupLayer);
    arcgisMap.hideAttribution = true;
  });

  return (
    <arcgis-map
      // item-id="5ba14f5a7db34710897da0ce2d46d55f"
      basemap="dark-gray-vector"
      zoom={10}
      center="120.99, 14.4"
    >
      {/* <arcgis-zoom position="top-right"></arcgis-zoom> */}
    </arcgis-map>
  );
}

export default MapDisplay;
