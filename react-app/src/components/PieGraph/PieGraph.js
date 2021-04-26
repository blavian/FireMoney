import React, { useRef, useEffect, useState} from 'react';
import {useSelector} from 'react-redux'
import Chart from 'chart.js/auto';
import {interpolateColors} from "../../services/color-generator"
import * as d3 from 'd3-scale-chromatic'

import "./PieGraph.css"

function createChart (labels, data, color){

    const colorScale = d3.interpolateRainbow;
    const dataLength = data.length;
    const colorRangeInfo = { colorStart: 0, colorEnd: 1, useEndAsStart: true, }
    let colors;
    if (color){
        colors = color
    } else{
        colors = interpolateColors(dataLength, colorScale, colorRangeInfo)
    }
    

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
                    display: true,
                    position: 'bottom',
                    // align: 'center',
                    labels: {
                        boxWidth: 10
                    }
                }
            }
        }
    };

    return chartConfig;
}

function filterMonth (month) {
    const groups = month.groups;
    let labels = [];
    let data = [];
    for (let group in groups){
        if (groups[group].itemsTotal > 0){
            labels.push(groups[group].title)
            data.push(groups[group].itemsTotal)
        }   
    }
    if (data.length == 0) {
        return createChart(['No activity this month'], [100], "#02020266")
    }
    return createChart(labels, data)
}

function PieGraph({ month, labels, data}) {
    
    const chartContainer = useRef(null);
    const [chartInstance, setChartInstance] = useState(null);

    useEffect(() => {
        if (chartContainer && chartContainer.current) {
            const newChartInstance = new Chart(chartContainer.current, filterMonth(month));
            setChartInstance(newChartInstance);
        }
    }, [chartContainer]);
    return (
        <div className="graph__container">
            <canvas className="graph__canvas" ref={chartContainer}/>
        </div>
    )
}

export default PieGraph;