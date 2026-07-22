/* eslint-disable @typescript-eslint/no-unused-expressions */
import { use, useEffect, useRef, useState } from "react";
import { treeCuttingLayer } from "../layers";
import {
  makeQuery,
  pieChartData,
  PieChartRender,
  thousands_separators,
  zoomToLayer,
} from "../query";
import "@arcgis/map-components/dist/components/arcgis-map";
import "@arcgis/map-components/components/arcgis-map";
import { ArcgisMap } from "@arcgis/map-components/dist/components/arcgis-map";
import { MyContext } from "../contexts/MyContext";
import {
  cp_f,
  primaryLabelColor,
  treec_status_f,
  treec_status_q,
  valueLabelColor,
} from "../uniqueValues";
import { queryDefinitionExpression } from "../queryExpression";
import {
  chartSetter,
  legendSetter,
  rootSetter,
  seriesSetter,
} from "../chartSetter";
import { useQuery } from "@tanstack/react-query";
import type { ChartResponse } from "../interfaceKeys";
import ChartPieSeriesRender from "chart-pie-series-render";
import ChartPieSeries from "chart-pie-series";

const ChartTreeCutting = () => {
  const arcgisMap: any = document.querySelector("arcgis-map") as ArcgisMap;
  const { cpackage } = use(MyContext);
  const [chartPanelwidth, setChartPanelwidth] = useState<any>();

  //--- Common qValues and qFields for QueryExpressionLayers class
  const qV = [cpackage === "All" ? undefined : cpackage];
  const queryc = makeQuery(qV, [cp_f]);

  const { data, isLoading } = useQuery<ChartResponse | any>({
    queryKey: [cpackage, treec_status_f, treeCuttingLayer],
    queryFn: async () => {
      queryDefinitionExpression({
        queryExpression: queryc.queryExpression(),
        featureLayer: [treeCuttingLayer],
      });

      //--- Pie chart data
      const chartData = await pieChartData({
        piechart: new ChartPieSeries(),
        qChart: queryc,
        layer: treeCuttingLayer,
        statusList: treec_status_q,
        statusField: treec_status_f,
        statisticField: treec_status_f,
        statisticType: "count",
      });

      zoomToLayer(treeCuttingLayer, arcgisMap?.view);

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

    // Create series
    const pieSeries = seriesSetter({
      chart: chart,
      root: root,
      categoryField: "category",
      valueField: "value",
      legendValueText: "{valuePercentTotal.formatNumber('#.')}% ({value})",
      radius: 36,
      innerRadius: 20,
    });
    pieSeriesRef.current = pieSeries;
    chart.series.push(pieSeries);

    const legend = legendSetter({
      chart: chart,
      root: root,
      centerX: 50,
      x: 50,
      y: 75,
      // scale: 1.03,
    });
    legendRef.current = legend;
    legend.data.setAll(pieSeries.dataItems);

    // Render chart
    PieChartRender({
      render: new ChartPieSeriesRender(),
      chart,
      pieSeries: pieSeries,
      legend,
      root,
      qChart: queryc,
      q2Expression: undefined,
      status_field: treec_status_f,
      view: arcgisMap?.view,
      updateChartPanelwidth: setChartPanelwidth,
      data: chartData,
      seriesScale: new_pieSeriesScale,
      innerLabel: "TREES",
      innerLabelFontSize: new_pieInnerLabelFontSize,
      innerValueFontSize: new_pieInnerValueFontSize,
      layer: treeCuttingLayer,
      statusArray: treec_status_q,
      bkg_color_switch: false,
      seriesFillHash: undefined,
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
          marginBottom: "10px",
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
              opacity: isLoading ? 0 : 1,
            }}
          >
            {thousands_separators(totaln)}
          </dd>
        </dl>
      </div>
      <div
        id={chartID}
        style={{
          height: "65vh",
          backgroundColor: "rgb(0,0,0,0)",
          color: "white",
          opacity: isLoading ? 0 : 1,
        }}
      ></div>
    </>
  );
}; // End of lotChartgs

export default ChartTreeCutting;
