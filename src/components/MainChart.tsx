import "@esri/calcite-components/dist/components/calcite-tabs";
import "@esri/calcite-components/dist/components/calcite-tab";
import "@esri/calcite-components/dist/components/calcite-tab-nav";
import "@esri/calcite-components/dist/components/calcite-tab-title";
import "@arcgis/map-components/dist/components/arcgis-map";
import "@arcgis/map-components/components/arcgis-map";
import { useState, useEffect } from "react";
import "../index.css";
import TreeCuttingChart from "./TreeCuttingChart";
import TreeCompensationChart from "./TreeCompensationChart";
import TreeConservationChart from "./TreeConservationChart";
import {
  treeCompensationLayer,
  treeConservationLayer,
  treeCuttingLayer,
} from "../layers";
import { primaryLabelColor } from "../uniqueValues";

function MainChart() {
  const [chartTabName, setChartTabName] = useState<any>("TreeCutting");

  useEffect(() => {
    if (chartTabName === "TreeCutting") {
      treeCuttingLayer.visible = true;
      treeCompensationLayer.visible = false;
      treeConservationLayer.visible = false;
    } else if (chartTabName === "Compensation") {
      treeCuttingLayer.visible = false;
      treeCompensationLayer.visible = true;
      treeConservationLayer.visible = false;
    } else if (chartTabName === "Conservation") {
      treeCuttingLayer.visible = false;
      treeCompensationLayer.visible = false;
      treeConservationLayer.visible = true;
    }
  }, [chartTabName]);

  return (
    <>
      <calcite-panel
        scale="s"
        slot="panel-end"
        id="chart-panel"
        style={{
          "--calcite-panel-heading-text-color": primaryLabelColor,
          borderStyle: "solid",
          borderRightWidth: 5,
          borderLeftWidth: 5,
          borderBottomWidth: 5,
          // borderTopWidth: 5,
          borderColor: "#555555",
          width: "40%",
          // width: "100%",
          overflowY: "auto",
          display: "block", // without adding display, background will not disappear.
        }}
      >
        <calcite-tabs
          style={{
            // borderStyle: "solid",
            borderRightWidth: 1,
            borderLeftWidth: 1,
            borderBottomWidth: 1,
            // borderTopWidth: 5,
            borderColor: "#555555",
            backgroundColor: "#2b2b2b",
          }}
          layout="center"
          scale="m"
        >
          <calcite-tab-nav
            slot="title-group"
            id="thetabs"
            oncalciteTabChange={(event: any) =>
              setChartTabName(event.srcElement.selectedTitle.className)
            }
          >
            <calcite-tab-title className="TreeCutting">
              TreeCutting
            </calcite-tab-title>
            <calcite-tab-title className="Compensation">
              Compensation
            </calcite-tab-title>
            <calcite-tab-title className="Conservation">
              Conservation
            </calcite-tab-title>
          </calcite-tab-nav>

          {/* calcite-tab: Lot */}
          <calcite-tab>
            {chartTabName === "TreeCutting" && <TreeCuttingChart />}
          </calcite-tab>

          {/* calcite-tab: Structure */}
          <calcite-tab>
            {chartTabName === "Compensation" && <TreeCompensationChart />}
          </calcite-tab>

          {/* calcite-tab: Non-Land Owner */}
          <calcite-tab>
            {chartTabName === "Conservation" && <TreeConservationChart />}
          </calcite-tab>
        </calcite-tabs>
      </calcite-panel>
    </>
  );
}

export default MainChart;
