/* eslint-disable @typescript-eslint/no-unused-expressions */
import { use, useEffect, useRef, useState } from "react";
import { treeCompensationLayer } from "../layers";
import { fieldStatistic, thousands_separators, zoomToLayer } from "../query";
import "@arcgis/map-components/dist/components/arcgis-map";
import "@arcgis/map-components/components/arcgis-map";
import { ArcgisMap } from "@arcgis/map-components/dist/components/arcgis-map";
import { MyContext } from "../contexts/MyContext";
import {
  primaryLabelColor,
  valueLabelColor,
  cp_f,
  treem_status_q,
  treem_status_f,
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
import QueryExpressionLayers from "query-layers-expression";

//--------------------------//
//      useTreeData         //
//--------------------------//
function useTreeData(cpackage: any, query: any) {
  return useQuery<ChartResponse | any>({
    queryKey: [cpackage, treem_status_q, treeCompensationLayer],
    queryFn: async () => {
      queryDefinitionExpression({
        queryExpression: query.queryExpression(),
        featureLayer: [treeCompensationLayer],
      });

      const baseArgs = {
        layer: treeCompensationLayer,
        statisticField: "OBJECTID",
        statisticType: "count" as const,
      };

      const [chartData, totalNumber] = await Promise.all([
        new ChartPieSeries({
          ...baseArgs,
          where: `${query.queryExpression()} AND ${treem_status_f} >= 1`,
          statusList: treem_status_q,
          statusField: treem_status_f,
        }).pieSeries(),

        fieldStatistic({ ...baseArgs, where: query.queryExpression() }),
      ]);

      return { chartData, totalNumber };
    },
  });
}

const ChartTreeCompensation = () => {
  const arcgisMap: any = document.querySelector("arcgis-map") as ArcgisMap;
  const { cpackage } = use(MyContext);
  const [chartPanelwidth, setChartPanelwidth] = useState<any>();

  const q1 = new QueryExpressionLayers({
    qFields: [cp_f],
    qValues: [cpackage === "All" ? undefined : cpackage],
  });

  const { data, isLoading } = useTreeData(cpackage, q1);
  const chartData = data?.chartData || [];
  const totalNumber = data?.totalNumber || 0;

  const pieSeriesRef = useRef<unknown | any | undefined>({});
  const legendRef = useRef<unknown | any | undefined>({});
  const chartRef = useRef<unknown | any | undefined>({});
  const chartID = "pie-compen";

  const new_fontSize = chartPanelwidth / 22.3;
  const new_valueSize = new_fontSize * 1.55;
  const new_imageSize = chartPanelwidth * 0.05;
  const new_pieSeriesScale = 220;
  const new_pieInnerValueFontSize = "1.1rem";
  const new_pieInnerLabelFontSize = "0.45em";

  const zoomFiltersRef = useRef(`${cpackage}`);

  useEffect(() => {
    const currentZoomFilters = `${cpackage}`;

    if (currentZoomFilters !== zoomFiltersRef.current) {
      zoomFiltersRef.current = currentZoomFilters;
      zoomToLayer(treeCompensationLayer, arcgisMap?.view);
    }

    const root = rootSetter({ chartID: chartID });
    root.setThemes([]);
    const chart = chartSetter({ root: root, centerY: 25, y: 10 });
    chartRef.current = chart;

    // Create series
    const pieSeries = seriesSetter({
      chart: chart,
      root: root,
      categoryField: "category",
      valueField: "value",
      legendValueText: "{valuePercentTotal.formatNumber('#.')}% ({value})",
      radius: 40,
      innerRadius: 25,
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
    new ChartPieSeriesRender({
      chart,
      pieSeries: pieSeries,
      legend,
      root,
      qChart: q1,
      q2Expression: undefined,
      status_field: treem_status_f,
      view: arcgisMap?.view,
      updateChartPanelwidth: setChartPanelwidth,
      data: chartData,
      seriesScale: new_pieSeriesScale,
      innerLabel: "TREES",
      innerLabelFontSize: new_pieInnerLabelFontSize,
      innerValueFontSize: new_pieInnerValueFontSize,
      layer: treeCompensationLayer,
      statusArray: treem_status_q,
      bkg_color_switch: false,
      seriesFillHash: undefined,
    }).chartDataRenderer();

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
              opacity: isLoading ? 0 : 1,
            }}
          >
            {thousands_separators(totalNumber)}
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

export default ChartTreeCompensation;
