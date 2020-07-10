/**
 * echarts.ext.js
 * Author: David.Li
 * Create Date: 2020-07-10
 * Modify Date: 2020-07-10
 * Copyright 2020, doys-next.com
 */
let echartExt = {};
echartExt.baseArea = function (para) {
    let dtb = para.dtb;
    let dataX = [], dataS = [];

    for (let i = 0; i < dtb.rowCount; i++) {
        dataX.push(dtb.rows[i]["x"].value);
        dataS.push(dtb.rows[i]["s"].value);
    }
    // ----------------------------------------------------
    let chart = echarts.init(para.divChart);
    let option = {        
        title: {
            left: 'center',
            text: para.title,
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: dataX
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            data: dataS,
            type: 'line',
            areaStyle: {}
        }]
    };
    if (para.color) option.color = para.color;
    
    chart.setOption(option);
}

echartExt.pieSimple = function (para) {
    let dtb = para.dtb;
    let dataS = [];

    for (let i = 0; i < dtb.rowCount; i++) {
        dataS.push({
            name: dtb.rows[i]["name"].value,
            value: dtb.rows[i]["value"].value
        });
    }
    // ----------------------------------------------------
    let chart = echarts.init(para.divChart);
    let option = {
        title: {
            left: 'center',
            text: para.title            
        },
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        series: [
            {
                name: para.seriesName,
                type: 'pie',
                data: dataS,
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };

    chart.setOption(option);
}
echartExt.barSimple = function (para) {
    let dtb = para.dtb;
    let dataY = [], dataS = [];

    for (let i = 0; i < dtb.rowCount; i++) {
        dataY.push(dtb.rows[i]["y"].value);
        dataS.push(dtb.rows[i]["s"].value);
    }
    // ----------------------------------------------------
    let chart = echarts.init(para.divChart);
    let option = {
        title: {
            text: para.title,
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'value',
            boundaryGap: [0, 0.01]
        },
        yAxis: {
            type: 'category',
            data: dataY
        },
        series: [
            {
                type: 'bar',
                data: dataS
            }
        ]
    };
    if (para.color) option.color = para.color;

    chart.setOption(option);
}