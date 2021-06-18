
$(function () {
    // zly添加
//     全局变量
    var global_datas = [
        {
            "value": 2.0,
            "name": "                       TBD                        "
        },
        {
            "value": 2.0,
            "name": "                       TBD                        "
        },
        {
            "value": 2.0,
            "name": "                       TBD                        "
        },
        {
            "value": 2.0,
            "name": "                       TBD                        "
        },
        {
            "value": 2.0,
            "name": "                       TBD                        "
        },
        {
            "value": 2.0,
            "name": "                       TBD                        "
        },
        {
            "value": 2.0,
            "name": "                       TBD                        "
        },
        {
            "value": 2.0,
            "name": "                       TBD                        "
        },
        {
            "value": 2.0,
            "name": "                       TBD                        "
        },
        {
            "value": 2.0,
            "name": "                       TBD                        "
        }
    ];

    top10()

    function format(str) {
        var len = str.length
        var res = "";
        for (var i=0;i<30&&i<len;i++){
            res = res + str[i]
        }
        if (len>30)
            res = res + "..."
        return res;
    }

    function top10() {
        $.get("http://localhost/top10",
            function (data) {
                var obj = eval(data)
                // 计算最大长度
                var len = obj.length
                var maxLen = 0;
                for (var i=0;i<len;i++){
                    if (obj[i].name.length>maxLen){
                        maxLen = obj[i].name.length;
                    }
                }
                for (var i=0;i<len;i++){
                    obj[i].name = format(obj[i].name);
                }
                // 数据写入
                for (var i = 0; i < len; i++) {
                    // 打印不出来的原因是字符串不够长cnm
                    // 补全到20位
                    global_datas[i].value = obj[i].grade
                    global_datas[i].name = obj[i].name
                }
                echarts_top10();
            });
        // return datas;
    }

echarts_1();

var top10_gross_names = []
var top10_gross_total = []
    function top10Gross() {
        $.get("http://localhost/top10gross/",
            function (data) {
                var obj = eval(data)
                for (var i=0;i<10;i++){
                    top10_gross_names.push(obj[i].name)
                    top10_gross_total.push(obj[i].gross)
                }
                echarts_5();
            });
        // return datas;
    }
top10Gross();
// echarts_5();

//echarts_top10();
echarts_numbers();
echarts_trend();

var cd = [
    {
        "name": '1月',
        "value": 5555,
    },
    {
        "name": '2月',
        "value": 16758,
    },
        {
            "name": '3月',
            "value": 15001,
        },
        {
            "name": '4月',
            "value": 28932,
        },
        {
            "name": '5月',
            "value": 36245,
        },
        {
            "name": '6月',
            "value": 31563,
        },
        {
            "name": '7月',
            "value": 36389,
        },
        {
            "name": '8月',
            "value": 38000,
        },
    {
        "name": '9月',
        "value": 1321,
    },
    {
        "name": '10月',
        "value": 15234,
    },
    {
        "name": '11月',
        "value": 54533,
    },
    {
        "name": '12月',
        "value": 5555,
    }
    ];

    function gradeGross() {

        $.get("http://localhost/grades/",
            function (data) {
                var obj = eval(data)
                for (var i=0;i<obj.length;i++){
                    cd[i].name = obj[i] + "";
                }
                $.get("http://localhost/gross/",
                    function (data) {
                        var obj = eval(data)
                        for (var i=0;i<obj.length;i++){
                            cd[i].value = obj[i]
                        }
                        echarts_ticketOffice();
                    });
            });
    }
    gradeGross()
// echarts_ticketOffice();

// Point Chart
function echarts_ticketOffice(){
    var myChart = echarts.init(document.getElementById('echarts_ticketOffice'));
    var chartData = cd;
option = {
    backgroundColor: '', //背景色
    tooltip: {
        show: true,
        trigger: 'axis', //axis , item
        backgroundColor: 'rgba(0,15,78,0.6)',
        borderColor: '#00afff',
        borderWidth: 1,
        borderRadius: 0,
        textStyle: {
            color: "#fff",
            fontSize: 13,
            align: 'left'
        },
        axisPointer: {
            type: 'line', //'line' | 'cross' | 'shadow' | 'none
            lineStyle: {
                width: 1,
                type: 'dotted',
                color: 'rgba(46,149,230,.9)'
            }
        }
    },
    legend: {
        show: false,
        orient: 'horizontal', //'vertical' 
        data: [],
        icon: 'circle',
        selectedMode: true,
        itemWidth: 10,
        itemHeight: 10,
        itemGap: 20,
        textStyle: {
            fontSize: 13,
            color: '#9bc8ff'
        },
        x: 'center',
        y: '25'
    },
    grid: {
        top: '25%',
        right: '3%',
        bottom: '10%',
        left: '10%'
    },
    xAxis: {
        type: 'category',
        axisLabel: {
            show: true,
            interval: 0, //类目间隔 设置为 1，表示『隔一个标签显示一个标签』
            textStyle: {
                color: '#fff',
                fontSize: 13
            },
            formatter: '{value}'
        },
        axisLine: {
            lineStyle: {
                color: 'rgba(15,45,134,.9)'
            }
        },
        axisTick: {
            show: false //坐标轴小标记
        },
        data: (function(data) {
            var arr = [];
            data.forEach(function(items) {
                arr.push(items.name); //name
            });
            return arr;
        })(chartData) //载入横坐标数据
    },
    yAxis: {
        type: 'value',
        name: '(十万美元)',
        nameTextStyle: {
            color: '#93d3fc',
            fontSize: 12,
            align: 'right'
        },
        axisLabel: {
            show: true,
            textStyle: {
                color: '#9bc8ff',
                fontSize: 10
            },
            interval: 0, //类目间隔 设置为 1，表示『隔一个标签显示一个标签』
            margin: 10,
            //formatter: '{value}'
        },
        splitNumber: 5, //y轴刻度设置(值越大刻度越小)
        axisLine: { //y轴线
            show: true,
            lineStyle: {
                color: 'rgba(15,45,134,.9)'
            }
        },
        splitLine: {
            show: true,
            lineStyle: {
                color: 'rgba(15,45,134,.6)', //横向网格线颜色
                width: 1
            }
        },
        axisTick: {
            show: false //坐标轴小标记
        }
    },
    series: [{
            name: '票房',
            type: 'scatter',
            stack: '总量',
            label: {
                normal: {
                    show: false,
                    position: 'top',
                    textStyle: {
                        color: '#9bc8ff',
                        fontSize: 12
                    },
                    formatter: '{c}' //图形上显示数字
                }
            },
            itemStyle: {
                normal: {
                    color: '#956BFF', //颜色
                }
            },
            symbol: 'circle', //circle, rect, roundRect, triangle,  pin, diamond, arrow
            symbolPosition: 'end',
            symbolSize: 30,
            symbolOffset: [0, '-120%'],
            data: (function(data) {
                var arr = [];
                data.forEach(function(items) {
                    var itemName = items.name,
                        itemValue = items.value,
                        itemStyle = itemValue / 200; //console.log(itemStyle)
                    arr.push({
                        name: itemName,
                        value: itemValue,
                        symbolSize: itemStyle
                    })
                });
                return arr;
            })(chartData) //载入数据并设置图形尺寸
        },

    ]
};

var app = {
    curIndex: -1,
};
setInterval(() => {
    var dataLen = chartData.length;

    // 取消之前高亮的图形
    myChart.dispatchAction({
        type: 'downplay',
        seriesIndex: 0,
        dataIndex: app.curIndex
    });

    app.curIndex = (app.curIndex + 1) % dataLen;

    // 高亮当前图形
    myChart.dispatchAction({
        type: 'highlight',
        seriesIndex: 0,
        dataIndex: app.curIndex,
    });

    // 显示 tooltip
    myChart.dispatchAction({
        type: 'showTip',
        seriesIndex: 0,
        dataIndex: app.curIndex
    });

}, 3000);

myChart.setOption(option);

}

// Trend
function echarts_trend(){
    var myChart = echarts.init(document.getElementById('echarts_trend'));
    var xData = function() {
        var data = [];
        for (var i = 1; i < 31; i++) {
            data.push(i + "日");
        }
        return data;
    }();
    
    option = {
        backgroundColor: "",
    
        tooltip: {
            trigger: "axis",
            axisPointer: {
                type: "shadow",
                textStyle: {
                    color: "#fff"
                }
    
            },
        },
        grid: {
            borderWidth: 0,
            top: 110,
            bottom: 95,
            textStyle: {
                color: "#fff"
            }
        },
        legend: {
            x: '46%',
            top: '11%',
            textStyle: {
                color: '#90979c',
            },
            data: ['访问量', '订单量']
        },
    
    
        calculable: true,
        xAxis: [{
            type: "category",
            axisLine: {
                lineStyle: {
                    color: "rgba(204,187,225,0.5)",
                }
            },
            splitLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            data: xData,
        }],
    
        yAxis: [{
            type: "value",
            splitLine: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    color: "rgba(204,187,225,0.5)",
                }
            },
    
        }],
        dataZoom: [{
            show: true,
            height: 30,
            xAxisIndex: [0],
            bottom: 30,
            
            "start": 10,
            "end": 80,
            handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
            handleSize: '110%',
            handleStyle: {
                color: "#5B3AAE",
            },
            textStyle:{
                color:"rgba(204,187,225,0.5)",
            },
            fillerColor:"rgba(67,55,160,0.4)",
            borderColor: "rgba(204,187,225,0.5)",
    
        }, {
            type: "inside",
            show: true,
            height: 15,
            start: 1,
            end: 35
        }],
        series: [{
            name: "访问量",
            type: "line",
            symbolSize: 10,
            symbol: 'circle',
            itemStyle: {
                color: "#6f7de3",
            },
            markPoint: {
                label: {
                    normal: {
                        textStyle: {
                            color: '#fff'
                        }
                    }
                },
                data: [{
                    type: 'max',
                    name: '最大值',
    
                }, {
                    type: 'min',
                    name: '最小值'
                }]
            },
            data: [
                509, 917, 2455, 2610, 2719, 3033, 3044, 3085, 2708, 2809, 2117,2000,1455,1210,719,
                733,944,2285,2208,3372,3936,3693,2962,2810,3519,2455,2610,2719,2484,2078
            ],
        }, {
            name: "订单量",
            type: "line",
            symbolSize: 10,
            symbol: 'circle',
            itemStyle: {
                color: "#c257F6",
            },
            markPoint: {
                label: {
                    normal: {
                        textStyle: {
                            color: '#fff'
                        }
                    }
                },
                data: [{
                    type: 'max',
                    name: '最大值',
    
                }, {
                    type: 'min',
                    name: '最小值'
                }]
            },
            data: [
                2136,3693,2962,3810,3519,3484,3915,3823,3455,4310,4019,3433,3544,3885,4208,3372,
                3484,3915,3748,3675,4009,4433,3544,3285,4208,3372,3484,3915,3823,4265,4298
            ]
        }, ]
    }
    myChart.setOption(option);
}

// Pie Chart
function echarts_numbers(){

    var myChart = echarts.init(document.getElementById('echarts_numbers'));
    var seriesData = [{
        'value': 100,
        'name': '废动植物产品'
    }, {
        'value': 100,
        'name': '矿渣、矿灰及残渣'
    }, {
        'value': 100,
        'name': '废药物'
    }, {
        'value': 100,
        'name': '杂项化学品废物'
    }, {
        'value': 100,
        'name': '硅废碎料'
    }, {
        'value': 100,
        'name': '塑料废碎料及下脚料'
    }, {
        'value': 100,
        'name': '废橡胶、皮革'
    }, {
        'value': 100,
        'name': '回收纸及纸板'
    }, {
        'value': 100,
        'name': '废玻璃'
    }, {
        'value': 100,
        'name': '废纺织原料及制品'
    }, {
        'value': 100,
        'name': '废电池'
    }, {
        'value': 100,
        'name': '金属和金属化合物废物'
    }, {
        'value': 100,
        'name': '废弃机电产品和设备'
    }, {
        'value': 100,
        'name': '其他'
    }];
    var legendData = ['废电池', '废药物', '废动植物产品', '废橡胶、皮革', '回收纸及纸板', '废玻璃', '硅废碎料', 
    '杂项化学品废物', '金属和金属化合物废物', '废弃机电产品和设备', '矿渣、矿灰及残渣', '塑料废碎料及下脚料', '回收纸及纸板', 
    '废纺织原料及制品', '其他']
    var colorList = ['#06FDFF','#21DFFF','#41BEFF','#5DA2FF','#7886FF','#956BFF','#C23DFF','#FA06FF','#06FDFF','#21DFFF','#41BEFF','#5DA2FF','#7886FF','#956BFF','#C23DFF'];
    option = {
        backgroundColor:'',//背景设为透明
        // title: {
        //     text: '洋垃圾禁止种类',
        //     x: 'center',
        //     y: 'center',
        //     textStyle: {
        //         color: '#FFFFF0'
        //     }
        // },
        tooltip: {
            trigger: 'item',
            borderColor: 'rgba(255,255,255,.3)',
            backgroundColor: 'rgba(13,5,30,.6)',
            borderWidth: 1,
            padding: 5,
            formatter: function(parms) {
                var str = parms.marker + "" + parms.data.name + "</br>" 
                   ;
                return str;
            }
        },
        legend: {
            type: "scroll",
            orient: 'vertical',
            left: 'left',
            align: 'auto',
            top: 'middle',
            textStyle: {
                color: '#FFFFF0'
            },
            data: legendData,
            show:false
        },
        series: [{
            type: 'pie',
            z: 3,
            center: ['50%', '50%'],
            radius: ['25%', '45%'],
            clockwise: true,
            avoidLabelOverlap: true,
            hoverOffset: 15,
            itemStyle: {
                normal: {
                    color: function(params) {
                        return colorList[params.dataIndex]
                    }
                }
            },
            label: {
                show: true,
                position: 'outside',
                formatter: '{a|{b}：{d}%}\n{hr|}',
                rich: {
                    hr: {
                        backgroundColor: 't',
                        borderRadius: 3,
                        width: 3,
                        height: 3,
                        padding: [3, 3, 0, -12]
                    },
                    a: {
                        padding: [-30, 15, -20, 15]
                    }
                }
            },
            labelLine: {
                normal: {
                    length: 20,
                    length2: 30,
                    lineStyle: {
                        width: 1
                    }
                }
            },
            data: seriesData
        }, {
            name: '第一层环',
            type: 'pie',
            z: 2,
            tooltip: {
                show: false
            },
            center: ['50%', '50%'],
            radius: ['45%', '58%'],
            hoverAnimation: false,
            clockWise: false,
            itemStyle: {
                normal: {
                    // shadowBlur: 40,
                    // shadowColor: 'rgba(0, 255, 255,.3)',
                    color: 'rgba(1,15,80,.4)',
                },
                emphasis: {
                    color: 'rgba(1,15,80,.4)',
                }
            },
            label: {
                show: false
            },
            data: [100]
        }, {
            name: '第二层环',
            type: 'pie',
            z: 1,
            tooltip: {
                show: false
            },
            center: ['50%', '50%'],
            radius: ['58%', '76%'],
            hoverAnimation: false,
            clockWise: false,
            itemStyle: {
                normal: {
                    // shadowBlur: 40,
                    // shadowColor: 'rgba(0, 255, 255,.3)',
                    color: 'rgba(0,15,69,.2)',
                },
                emphasis: {
                    color: 'rgba(0,15,69,.2)',
                }
            },
            label: {
                show: false
            },
            data: [100]
        }]
    };
    myChart.setOption(option);
}

// Top 10
function echarts_top10(){
    var myChart = echarts.init(document.getElementById('echart_top10'));

    var colorList = ['#11FDFE','#06FDFF','#21DFFF','#41BEFF','#5DA2FF','#7886FF','#956BFF','#C23DFF','#FA06FF','#FA06FF'
];
    var datas = global_datas;
let maxArr = (new Array(datas.length)).fill(100);
option = {
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    legend: {
        show: false
    },
    grid: {
        left: 0,
        right:0,
        containLabel:true
    },
    xAxis: {
        show: false,
        type: 'value',

    },
    yAxis: [{
        type: 'category',
        inverse: true,
        //将名称移到左边
        offset:235,
        axisLine: {
            show: false
        },
        axisTick: {
            show: false
        },
        axisPointer: {
            label: {
                show: true,
                margin: 30
            }
        },
        data: datas.map(item => item.name),
        axisLabel: {
            margin: 50,
            fontSize: 14,
            align: 'left',
            // 字体颜色
            color: '#fff',
            rich: {
                a1: {
                    color: '#fff',
                    backgroundColor: colorList[0],
                    width: 30,
                    height: 30,
                    align: 'center',
                    borderRadius: 2
                },
                a2: {
                    color: '#fff',
                    backgroundColor: colorList[1],
                    width: 30,
                    height: 30,
                    align: 'center',
                    borderRadius: 2
                },
                a3: {
                    color: '#fff',
                    backgroundColor: colorList[2],
                    width: 30,
                    height: 30,
                    align: 'center',
                    borderRadius: 2
                },
                a4: {
                    color: '#fff',
                    backgroundColor: colorList[3],
                    width: 30,
                    height: 30,
                    align: 'center',
                    borderRadius: 2
                },
                a5: {
                    color: '#fff',
                    backgroundColor: colorList[4],
                    width: 30,
                    height: 30,
                    align: 'center',
                    borderRadius: 2
                },
                a6: {
                    color: '#fff',
                    backgroundColor: colorList[5],
                    width: 30,
                    height: 30,
                    align: 'center',
                    borderRadius: 2
                },
                a7: {
                    color: '#fff',
                    backgroundColor: colorList[6],
                    width: 30,
                    height: 30,
                    align: 'center',
                    borderRadius: 2
                },
                a8: {
                    color: '#fff',
                    backgroundColor: colorList[7],
                    width: 30,
                    height: 30,
                    align: 'center',
                    borderRadius: 2
                },
                a9: {
                    color: '#fff',
                    backgroundColor: colorList[8],
                    width: 30,
                    height: 30,
                    align: 'center',
                    borderRadius: 2
                },
                a10: {
                    color: '#fff',
                    backgroundColor: colorList[9],
                    width: 30,
                    height: 30,
                    align: 'center',
                    borderRadius: 2
                },
                b: {
                    color: '#fff',
                    backgroundColor: colorList[3],
                    width: 30,
                    height: 30,
                    align: 'center',
                    borderRadius: 2
                }
            },

            formatter: function(params) {
                var index = datas.map(item =>item.name).indexOf(params);
                index = index + 1;
                if (index - 1 < 10) {
                    return [
                        '{a' + index + '|' + index + '}' + '  ' + params
                    ].join('\n')
                } else {
                    return [
                        '{b|' + index + '}' + '  ' + params
                    ].join('\n')
                }

            }
        }
    }, {
        type: 'category',
        inverse: true,
        axisTick: 'none',
        axisLine: 'none',
        show: true,
        data: datas.map(item => item.value),
         axisLabel: {
             show:true,
             fontSize: 14,
             // 字体颜色
            color: '#fff',
             formatter:'{value}'
         }
    }],
    series: [{
            z: 2,
            name: '评分',
            type: 'bar',
            barWidth: 20,
            zlevel: 1,
            data: datas.map((item, i) => {
                itemStyle = {
                    // color: i > 3 ? colorList[3] : colorList[i]
                    color: colorList[i]
                }
                return {
                    value: item.value,
                    itemStyle: itemStyle
                };
            }),
            label: {
                show: false,
                position: 'right',
                color: '#333333',
                fontSize: 14,
                offset: [10, 0]
            }
        },
        // {
        //     name: '背景',
        //     type: 'bar',
        //     barWidth: 20,
        //     barGap: '-100%',
        //     itemStyle: {
        //         normal: {
        //             color: 'rgba(118, 111, 111, 0.55)'
        //         }
        //     },
        //     data: maxArr,
        // }

    ]
};

    myChart.setOption(option);
        window.addEventListener("resize",function(){
            myChart.resize();
        });
}

// Top Right
function echarts_1() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('echart1'));

       option = {
  //  backgroundColor: '#00265f',
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    grid: {
        left: '0%',
		top:'10px',
        right: '0%',
        bottom: '4%',
       containLabel: true
    },
    xAxis: [{
        type: 'category',

        // !!!各类型电影
      		data: ['商超门店', '教育培训', '房地产', '生活服务', '汽车销售', '旅游酒店', '五金建材','sss','商超门店', '教育培训'],
        axisLine: {
            show: true,
         lineStyle: {
                color: "rgba(255,255,255,.1)",
                width: 1,
                type: "solid"
            },
        },
		
        axisTick: {
            show: false,
        },
		axisLabel:  {
                interval: 0,
               // rotate:50,
                show: true,
                splitNumber: 15,
                textStyle: {
 					color: "rgba(255,255,255,.6)",
                    fontSize: '12',
                },
            },
    }],
    yAxis: [{
        type: 'value',
        axisLabel: {
           //formatter: '{value} %'
			show:true,
			 textStyle: {
 					color: "rgba(255,255,255,.6)",
                    fontSize: '12',
                },
        },
        axisTick: {
            show: false,
        },
        axisLine: {
            show: true,
            lineStyle: {
                color: "rgba(255,255,255,.1	)",
                width: 1,
                type: "solid"
            },
        },
        splitLine: {
            lineStyle: {
               color: "rgba(255,255,255,.1)",
            }
        }
    }],
    series: [
		{
        type: 'bar',

        // 各类型电影数量
        data: [200, 300, 300, 900, 1500, 1200, 999,2323,232,122],
        barWidth:'35%', //柱子宽度
       // barGap: 1, //柱子之间间距
        itemStyle: {
            normal: {
                color:'#956BFF',
                opacity: 1,
				barBorderRadius: 5,
            }
        }
    }
		
	]
};
      
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        window.addEventListener("resize",function(){
            myChart.resize();
        });
    }

// Top Mid    
function echarts_5() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('echart5'));

       option = {
  //  backgroundColor: '#00265f',
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    
    grid: {
        left: '0%',
		top:'10px',
        right: '0%',
        bottom: '2%',
       containLabel: true
    },
    xAxis: [{
        type: 'category',
      		// data: ['Avengers: Endgame', 'Avengers: Infinity War', 'Harry Potter and the Deathly Hallows: Part 2', 'The Lord of the Rings: The Return of the King', 'The Lion King', 'The Dark Knight Rises',
              //  'Joker', 'Toy Story 3','Jurassic Park','The Dark Knight'],
        data:top10_gross_names,
        axisLine: {
            show: true,
         lineStyle: {
                color: "rgba(255,255,255,.1)",
                width: 1,
                type: "solid"
            },
        },
        show:false,
		
        axisTick: {
            show: false,
        },
		axisLabel:  {
                interval: 0,
               // rotate:50,
                show: true,
                splitNumber: 15,
                textStyle: {
 					color: "rgba(255,255,255,.6)",
                    fontSize: '12',
                },
            },
    }],
    yAxis: [{
        type: 'value',
        axisLabel: {
           //formatter: '{value} %'
			show:true,
			 textStyle: {
 					color: "rgba(255,255,255,.6)",
                    fontSize: '12',
                },
            formatter:'${value}'
        },
        axisTick: {
            show: false,
        },
        axisLine: {
            show: true,
            lineStyle: {
                color: "rgba(255,255,255,.1	)",
                width: 1,
                type: "solid"
            },
        },
        splitLine: {
            lineStyle: {
               color: "rgba(255,255,255,.1)",
            }
        }
    }],
    series: [{
        type: 'bar',
        //data: [2797501328, 2048359754,1342321665, 1146030912, 1083720877,1081142612,1074354306,1066970811,1033928303, 1005973645],
        data: top10_gross_total,
        barWidth:'35%', //柱子宽度
       // barGap: 1, //柱子之间间距
        itemStyle: {
            normal: {
                color:'#5DA2FF',
                opacity: 1,
				barBorderRadius: 5,
            }
        }
    }
	]
};
      
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        window.addEventListener("resize",function(){
            myChart.resize();
        });
    }
	
				
	
})



		
		
		


		









