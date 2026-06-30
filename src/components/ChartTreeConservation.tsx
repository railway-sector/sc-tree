/* eslint-disable @typescript-eslint/no-unused-expressions */
import { use, useEffect, useRef, useState } from "react";
import { piechart_cons, queryc4, treeConservationLayer } from "../layers";
import { pieChartData, thousands_separators, zoomToLayer } from "../query";
import "@arcgis/map-components/dist/components/arcgis-map";
import "@arcgis/map-components/components/arcgis-map";
import { ArcgisMap } from "@arcgis/map-components/dist/components/arcgis-map";
import { MyContext } from "../contexts/MyContext";
import {
  primaryLabelColor,
  treeConservationTypes,
  treeConservationStatusField,
  valueLabelColor,
} from "../uniqueValues";
import { queryDefinitionExpression } from "../queryExpression";
import { chartRenderer } from "../chartRenderer";
import {
  chartSetter,
  legendSetter,
  rootSetter,
  seriesSetter,
} from "../chartSetter";
import { useQuery } from "@tanstack/react-query";
import type { ChartResponse } from "../interfaceKeys";

const ChartTreeConservation = () => {
  const arcgisMap: any = document.querySelector("arcgis-map") as ArcgisMap;
  const { contractpackages } = use(MyContext);
  const [chartPanelwidth, setChartPanelwidth] = useState<any>();

  const { data } = useQuery<ChartResponse | any>({
    queryKey: [
      contractpackages,
      treeConservationStatusField,
      treeConservationLayer,
    ],
    queryFn: async () => {
      queryc4.qValues = [
        contractpackages === "All" ? undefined : contractpackages,
      ];

      queryDefinitionExpression({
        queryExpression: queryc4.queryExpression(),
        featureLayer: [treeConservationLayer],
      });

      //--- Pie chart data
      const chartData = await pieChartData({
        piechart: piechart_cons,
        qChart: queryc4,
        layer: treeConservationLayer,
        statusList: treeConservationTypes,
        statusField: treeConservationStatusField,
        statisticField: treeConservationStatusField,
        statisticType: "count",
      });

      zoomToLayer(treeConservationLayer, arcgisMap?.view);

      return {
        chartData: chartData[0] || [],
        totaln: chartData[1] || 0,
      };
    },
  });
  const chartData = data?.chartData || [];
  const totaln = data?.totaln || 0;

  const pieSeriesRef = useRef<unknown | any | undefined>({});
  const legendRef = useRef<unknown | any | undefined>({});
  const chartRef = useRef<unknown | any | undefined>({});
  const chartID = "pie-cut";

  const new_fontSize = chartPanelwidth / 22.3;
  const new_valueSize = new_fontSize * 1.55;
  const new_imageSize = chartPanelwidth * 0.05;
  const new_pieSeriesScale = 220;
  const new_pieInnerValueFontSize = "1.1rem";
  const new_pieInnerLabelFontSize = "0.45em";

  useEffect(() => {
    const root = rootSetter({ chartID: chartID });
    const chart = chartSetter({ root: root, centerY: 25, y: 10 });
    chartRef.current = chart;
    const pieSeries = seriesSetter({
      chart: chart,
      root: root,
      categoryField: "category",
      valueField: "value",
      legendValueText: "{valuePercentTotal.formatNumber('#.')}% ({value})",
      radius: 36,
      innerRadius: 20,
      y: -6,
    });
    pieSeriesRef.current = pieSeries;
    chart.series.push(pieSeries);

    const legend = legendSetter({
      chart: chart,
      root: root,
      centerX: 50,
      x: 50,
      y: 55,
      scale: 0.9,
    });
    legendRef.current = legend;
    legend.data.setAll(pieSeries.dataItems);

    // Render chart
    chartRenderer({
      chart: chart,
      pieSeries: pieSeries,
      legend: legend,
      root: root,
      qChart: queryc4,
      status_field: treeConservationStatusField,
      arcgisScene: arcgisMap,
      updateChartPanelwidth: setChartPanelwidth,
      data: chartData,
      pieSeriesScale: new_pieSeriesScale,
      pieInnerLabel: undefined,
      pieInnerLabelFontSize: new_pieInnerLabelFontSize,
      pieInnerValueFontSize: new_pieInnerValueFontSize,
      layer: treeConservationLayer,
      statusArray: treeConservationTypes,
    });

    pieSeries.appear(1000, 100);

    return () => {
      root.dispose();
    };
  }, [chartID, chartData]);

  useEffect(() => {
    pieSeriesRef.current?.data.setAll(chartData);
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
        }}
      >
        <img
          src="https://EijiGorilla.github.io/Symbols/Tree_Logo.svg"
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
            {thousands_separators(totaln)}
          </dd>
        </dl>
      </div>
      <div
        id={chartID}
        style={{
          height: "71vh",
          backgroundColor: "rgb(0,0,0,0)",
          color: "white",
          // marginBottom: "-1.5vh",
        }}
      ></div>
    </>
  );
}; // End of lotChartgs

export default ChartTreeConservation;
