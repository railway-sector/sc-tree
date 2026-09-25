/* eslint-disable @typescript-eslint/no-unused-expressions */
import { use, useEffect, useRef, useState } from "react";
import { treeCuttingLayer } from "../layers";
import { fieldStatistic, thousands_separators, zoomToLayer } from "../query";
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
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { ChartResponse } from "../interfaceKeys";
import ChartPieSeriesRender from "chart-pie-series-render";
import ChartPieSeries from "chart-pie-series";
import QueryExpressionLayers from "query-layers-expression";

//--------------------------//
//      useTreeData         //
//--------------------------//
function useTreeData(cpackage: any, query: any) {
  return useQuery<ChartResponse | any>({
    queryKey: [cpackage, treec_status_f, treeCuttingLayer],
    queryFn: async () => {
      queryDefinitionExpression({
        queryExpression: query.queryExpression(),
        featureLayer: [treeCuttingLayer],
      });

      const baseArgs = {
        layer: treeCuttingLayer,
        statisticField: "OBJECTID",
        statisticType: "count" as const,
      };

      const [chartData, totalNumber, totalTrees] = await Promise.all([
        new ChartPieSeries({
          ...baseArgs,
          where: `${query.queryExpression()} AND ${treec_status_f} >= 1`,
          statusList: treec_status_q,
          statusField: treec_status_f,
        }).pieSeries(),

        fieldStatistic({ ...baseArgs, where: query.queryExpression() }),

        fieldStatistic({
          ...baseArgs,
          where: `${query.queryExpression()} AND ${treec_status_f} >= 1`,
        }),
      ]);

      return { chartData, totalNumber, totalTrees };
    },
    placeholderData: keepPreviousData,
  });
}

const ChartTreeCutting = () => {
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
  const totalTrees = thousands_separators(data?.totalTrees) || 0;

  const pieSeriesRef = useRef<unknown | any | undefined>({});
  const legendRef = useRef<unknown | any | undefined>({});
  const renderRef = useRef<ChartPieSeriesRender | null>(null);
  const chartRef = useRef<unknown | any | undefined>({});
  const chartID = "pie-cut";

  const fontSize = chartPanelwidth / 22.3;
  const valueSize = chartPanelwidth / 19;
  const imageSize = chartPanelwidth * 0.05;
  const seriesScale = 220;
  const innerValueFontSize = "1.1rem";
  const innerLabelFontSize = "0.6em";

  const zoomFiltersRef = useRef(`${cpackage}`);

  useEffect(() => {
    const currentZoomFilters = `${cpackage}`;

    if (currentZoomFilters !== zoomFiltersRef.current) {
      zoomFiltersRef.current = currentZoomFilters;
      zoomToLayer(treeCuttingLayer, arcgisMap?.view);
    }
  }, [chartData]);

  //--- Keep click-handler-relevant values fresh without rebuilding the
  //    chart. view lives here too (not passed statically to the
  //    renderer) since arcgis-scene's view may not be ready on first
  //    mount.
  //--- Keep click-handler-relevant values fresh without rebuilding the
  //    chart. view lives here too (not passed statically to the
  //    renderer) since arcgis-scene's view may not be ready on first
  //    mount.
  const configRef = useRef({
    qChart: q1,
    q2Expression: undefined,
    status_field: treec_status_f,
    view: arcgisMap?.view,
  });

  useEffect(() => {
    configRef.current = {
      qChart: q1,
      q2Expression: undefined,
      status_field: treec_status_f,
      view: arcgisMap?.view,
    };
  }, [data, treec_status_f, arcgisMap]);

  //--- Pie Chart Renderer - created ONCE (mount only)
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
    });
    legendRef.current = legend;
    legend.data.setAll(pieSeries.dataItems);

    //--- NOTE: no `view` here — it's read live from configRef.current
    //    inside chartrender.ts, since arcgis-scene may not have a
    //    ready `.view` yet at this point.
    const renderer = new ChartPieSeriesRender({
      chart,
      pieSeries,
      legend,
      root,
      configRef,
      updateChartPanelwidth: setChartPanelwidth,
      data: [],
      seriesScale,
      innerValue: totalTrees,
      innerLabel: "TREES",
      innerLabelFontSize,
      innerValueFontSize,
      layer: treeCuttingLayer,
      statusArray: treec_status_q,
      bkg_color_switch: false,
      seriesFillHash: undefined,
    });
    renderRef.current = renderer;
    renderRef.current.chartDataRenderer();

    return () => {
      root.dispose();
      renderRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // mount-once — do not add dependencies here

  //--- Push new data / inner value / affected-area figures into the
  //    already-mounted chart. No dispose, no rebuild -> no blink.
  //    NOTE: affectedAreaValue is NOT called here directly — it's
  //    registered once inside chartrender.ts and reads live data via
  //    closures, which updateData() keeps in sync. Calling it here on
  //    every render would both miss the first paint and stack
  //    duplicate adapters.
  useEffect(() => {
    if (!renderRef.current) return;
    renderRef.current.updateData(chartData, totalTrees, treec_status_q);
  }, [chartData, totalTrees, treec_status_q]);

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
          height={`${imageSize}%`}
          width={`${imageSize}%`}
          style={{ paddingTop: "10px", paddingLeft: "15px" }}
        />
        <dl style={{ alignItems: "center" }}>
          <dt
            style={{
              color: primaryLabelColor,
              fontSize: fontSize,
              marginRight: "35px",
            }}
          >
            TOTAL TREES
          </dt>
          <dd
            style={{
              color: valueLabelColor,
              fontSize: `${valueSize}px`,
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

export default ChartTreeCutting;
