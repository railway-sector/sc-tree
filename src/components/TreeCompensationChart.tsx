/* eslint-disable @typescript-eslint/no-unused-expressions */
import { use, useEffect, useRef, useState } from "react";
import { queryc2, queryc3, treeCompensationLayer } from "../layers";
import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import am5themes_Responsive from "@amcharts/amcharts5/themes/Responsive";
import { thousands_separators, zoomToLayer } from "../Query";
import "@arcgis/map-components/dist/components/arcgis-map";
import "@arcgis/map-components/components/arcgis-map";
import { ArcgisMap } from "@arcgis/map-components/dist/components/arcgis-map";
import { MyContext } from "../contexts/MyContext";
import {
  cpField,
  primaryLabelColor,
  treeCompensationTypes,
  treeCompensationStatusField,
  valueLabelColor,
  colorsCompen,
} from "../uniqueValues";
import { queryDefinitionExpression } from "../QueryExpression";
import { pieChartStatusData } from "../ChartGenerator";
import { chartRenderer } from "../ChartRenderer";

// Dispose function
function maybeDisposeRoot(divId: any) {
  am5.array.each(am5.registry.rootElements, function (root) {
    if (root.dom.id === divId) {
      root.dispose();
    }
  });
}

///*** Others */
/// Draw chart
const TreeCompensationChart = () => {
  const arcgisMap: any = document.querySelector("arcgis-map") as ArcgisMap;
  const { contractpackages, updateChartPanelwidth, chartPanelwidth } =
    use(MyContext);
  const pieSeriesRef = useRef<unknown | any | undefined>({});
  const legendRef = useRef<unknown | any | undefined>({});
  const chartRef = useRef<unknown | any | undefined>({});
  const [treesData, setTreesData] = useState<any>([]);
  const [treesNumber, setTreesNumber] = useState<any>(0);

  const chartID = "pie-compen";

  useEffect(() => {
    queryc3.qValues = [
      contractpackages === "All" ? undefined : contractpackages,
    ];
    queryc3.qFields = [cpField];

    queryDefinitionExpression({
      queryExpression: queryc3.queryExpression(),
      featureLayer: [treeCompensationLayer],
    });

    pieChartStatusData({
      qChart: queryc3.queryExpression(),
      layer: treeCompensationLayer,
      statusList: treeCompensationTypes,
      statusColor: colorsCompen,
      statusField: treeCompensationStatusField,
      statisticType: "count",
    }).then((result: any) => {
      setTreesData(result[0]);
      setTreesNumber(result[1]);
    });

    zoomToLayer(treeCompensationLayer, arcgisMap?.view);
  }, [contractpackages]);

  const new_fontSize = chartPanelwidth / 22.3;
  const new_valueSize = new_fontSize * 1.55;
  const new_imageSize = chartPanelwidth * 0.05;
  const new_pieSeriesScale = 220;
  const new_pieInnerValueFontSize = "1.1rem";
  const new_pieInnerLabelFontSize = "0.45em";

  useEffect(() => {
    maybeDisposeRoot(chartID);

    const root = am5.Root.new(chartID);
    root.container.children.clear();
    root._logo?.dispose();

    // Set themesf
    root.setThemes([
      am5themes_Animated.new(root),
      am5themes_Responsive.new(root),
    ]);

    // Create chart
    const chart = root.container.children.push(
      am5percent.PieChart.new(root, {
        centerY: am5.percent(25), //-10
        y: am5.percent(10), // space between pie chart and total lots
        layout: root.verticalLayout,
      }),
    );
    chartRef.current = chart;

    // Create series
    const pieSeries = chart.series.push(
      am5percent.PieSeries.new(root, {
        name: "Series",
        categoryField: "category",
        valueField: "value",
        legendValueText: "{valuePercentTotal.formatNumber('#.')}% ({value})",
        radius: am5.percent(36), // outer radius
        innerRadius: am5.percent(20),
        // scale: 0.5,
      }),
    );
    pieSeriesRef.current = pieSeries;
    chart.series.push(pieSeries);

    const legend = root.container.children.push(
      am5.Legend.new(root, {
        centerX: am5.percent(50),
        x: am5.percent(50),
        y: am5.percent(75),
        // scale: 1.03,
      }),
    );
    legendRef.current = legend;
    legend.data.setAll(pieSeries.dataItems);

    queryc2.qValues = [
      contractpackages === "All" ? undefined : contractpackages,
    ];

    // Render chart
    chartRenderer({
      chart: chart,
      pieSeries: pieSeries,
      legend: legend,
      root: root,
      qChart: queryc2,
      status_field: treeCompensationStatusField,
      arcgisScene: arcgisMap,
      updateChartPanelwidth: updateChartPanelwidth,
      data: treesData,
      pieSeriesScale: new_pieSeriesScale,
      pieInnerLabel: undefined,
      pieInnerLabelFontSize: new_pieInnerLabelFontSize,
      pieInnerValueFontSize: new_pieInnerValueFontSize,
      layer: treeCompensationLayer,
      statusArray: treeCompensationTypes,
    });

    pieSeries.appear(1000, 100);

    return () => {
      root.dispose();
    };
  }, [chartID, treesData]);

  useEffect(() => {
    pieSeriesRef.current?.data.setAll(treesData);
    legendRef.current?.data.setAll(pieSeriesRef.current.dataItems);
  });

  return (
    <>
      <div
        style={{
          display: "flex",
          marginTop: "3px",
          marginLeft: "15px",
          marginRight: "15px",
          justifyContent: "space-between",
          marginBottom: "10px",
        }}
      >
        <img
          src="https://EijiGorilla.github.io/Symbols/Money_Logo.svg"
          alt="Land Logo"
          height={`${new_imageSize}%`}
          width={`${new_imageSize}%`}
          style={{ paddingTop: "10px", paddingLeft: "15px" }}
        />
        <dl style={{ alignItems: "center" }}>
          <dt
            style={{
              color: primaryLabelColor,
              fontSize: "1.2rem",
              marginRight: "35px",
            }}
          >
            TOTAL TREES
          </dt>
          <dd
            style={{
              color: valueLabelColor,
              fontSize: `${new_valueSize}px`,
              fontWeight: "bold",
              fontFamily: "calibri",
              lineHeight: "1.2",
              margin: "auto",
            }}
          >
            {thousands_separators(treesNumber)}
          </dd>
        </dl>
      </div>
      <div
        id={chartID}
        style={{
          height: "65vh",
          backgroundColor: "rgb(0,0,0,0)",
          color: "white",
          // marginBottom: "-1.5vh",
        }}
      ></div>
    </>
  );
}; // End of lotChartgs

export default TreeCompensationChart;
