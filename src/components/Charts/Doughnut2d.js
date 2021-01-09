// STEP 1 - Include Dependencies
// Include react
import React from "react";

// Include the react-fusioncharts component
import ReactFC from "react-fusioncharts";

// Include the fusioncharts library
import FusionCharts from "fusioncharts";

// Include the chart type
import Chart from "fusioncharts/fusioncharts.charts";

// Include the theme as fusion
import CandyTheme from "fusioncharts/themes/fusioncharts.theme.candy";

// Adding the chart and theme as dependency to the core fusioncharts
ReactFC.fcRoot(FusionCharts, Chart, CandyTheme);


const ChartComponent = ({ data }) => {
	const chartConfigs = {
		type: "doughnut2d", // The chart type
		width: "100%", // Width of the chart
		height: "400", // Height of the chart
		dataFormat: "json", // Data type
		dataSource: {
			// Chart Configuration
			chart: {
        caption: "Starts Per Language",
        theme:"candy",
        decimals: 0,
        doughnutRadius: "40%",
        showPercentValues:0,
			},
			// Chart Data
			data, // data:data
		}
	};
	return (<ReactFC {...chartConfigs} />);
}


export default ChartComponent;