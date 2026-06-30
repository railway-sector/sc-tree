import { dateTable } from "./layers";

// For segmented list
export const contractPackage = [
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

// Updat date
export async function dateUpdate() {
  const monthList = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const query = dateTable.createQuery();
  query.where = "project = 'SC'" + " AND " + "category = 'Trees'";

  return dateTable.queryFeatures(query).then((response: any) => {
    const stats = response.features;
    const dates = stats.map((result: any) => {
      const date = new Date(result.attributes.date);
      const year = date.getFullYear();
      const month = monthList[date.getMonth()];
      const day = date.getDate();
      console.log(date);
      const final = year < 1990 ? "" : `${month} ${day}, ${year}`;
      return final;
    });
    return dates;
  });
}

//---------------------------------------------//
//           Pie chart                         //
//---------------------------------------------//
// 'piechart' = constant declared from class ChartPieSeries in layers.ts
interface pieChartDataType {
  piechart: any;
  qChart: any;
  layer: any;
  statusList: any;
  statusField: any;
  statisticField: any;
  statisticType: "sum" | "count";
}
export async function pieChartData({
  piechart,
  qChart,
  layer,
  statusList,
  statusField,
  statisticField,
  statisticType,
}: pieChartDataType) {
  piechart.qChart = qChart.queryExpression();
  piechart.layer = layer;
  piechart.statusList = statusList;
  piechart.statusField = statusField;
  piechart.statisticField = statisticField;
  piechart.statisticType = statisticType;

  return await piechart.chartDataPieSeries();
}

//---------------------------------------------//
//           Other functions                   //
//---------------------------------------------//
export function thousands_separators(num: any) {
  if (num) {
    const num_parts = num.toString().split(".");
    num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return num_parts.join(".");
  }
}

export function zoomToLayer(layer: any, view: any) {
  return layer.queryExtent().then((response: any) => {
    view
      ?.goTo(response.extent, {
        //response.extent
        //speedFactor: 2,
      })
      .catch((error: any) => {
        if (error.name !== "AbortError") {
          console.error(error);
        }
      });
  });
}

export function processParams(graphic: any, layerView: any) {
  if (!graphic || !layerView) {
    throw new Error("Graphic or layerView not provided.");
  }

  if (!graphic.isAggregate) {
    throw new Error("Graphic must represent a cluster.");
  }
}
