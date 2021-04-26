import React, { useRef, useEffect, useState} from 'react';
import Chart from 'chart.js/auto';
import {interpolateColors} from "../../services/color-generator"
import * as d3 from 'd3-scale-chromatic'

function createChart (labels, data){

    const colorScale = d3.interpolateRainbow;
    const dataLength = data.length;
    const colorRangeInfo = { colorStart: 0, colorEnd: 1, useEndAsStart: true, }
    const colors = interpolateColors(dataLength, colorScale, colorRangeInfo)

    const chartConfig = {
        type: 'doughnut',
        data: {
            labels,
            datasets: [{
                label: '# of Votes',
                data,
                backgroundColor: colors,
                borderColor: colors,
                borderWidth: 1,
                hoverOffset: 4
            }]
        },
        options: {
            plugins: {
                legend: {
                    display: false,
                    position: 'left',
                    align: 'center'
                }
            }
        }
    };

    return chartConfig;
}

function PieGraph({ month, labels, data}) {
    console.log(month)
    const chartContainer = useRef(null);
    const [chartInstance, setChartInstance] = useState(null);

    // const labels = ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange', 'hi', '1', '2', '3']
    // const data = [300.30, 400.50, 100, 500, 200, 300, 200, 300, 100, 500]

    useEffect(() => {
        if (chartContainer && chartContainer.current) {
            const newChartInstance = new Chart(chartContainer.current, createChart( labels, data ));
            setChartInstance(newChartInstance);
        }
    }, [chartContainer]);
    return (
        <div>
            <canvas ref={chartContainer}/>
        </div>
    )
}

export default PieGraph;