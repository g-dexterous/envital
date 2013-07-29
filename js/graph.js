   
// Here is the chart initialization code
var theAmounts=[],theSales=[];
function displayGraph(){
    var monthlyData = System.Gadget.document.parentWindow.monthlyData;
    
    var insertedCount = 0;
    
    for (var i=monthlyData.length-1; i>=0; i--){

        theAmounts.unshift(monthlyData[i].earnings);
        theSales.unshift(monthlyData[i].sales);

        if(++insertedCount==12){
            break;
        }
    }


    $.elycharts.templates['line_basic_6'] = {
      type: "line",
      margins: [10, 10, 10, 10],
      defaultSeries: {
        highlight: {
          newProps: {
            r: 8,
            opacity: 1
          },
          overlayProps: {
            fill: "white",
            opacity: 0.2
          }
        }
      },
      series: {
        serie1: {
          color: "#90CE44",
           plotProps : {
           stroke : "#3F7F16",
           "stroke-width" : 1
          },
          tooltip: {
            frameProps: {
              stroke: "#3F7F16"
            }
          }
        },
        serie2: {
          color: "#BA6A5D",
          rounded: false,
          dot: true,
          dotProps: {
            r: 2,
            fill: "#dadada",
            stroke: "#BA6A5D",
            "stroke-width": 2,
            opacity: 20
          },
          plotProps: {
            "stroke-width": 4,
            "stroke-linecap": "round",
            "stroke-linejoin": "round"
          }
        }
      },
      defaultAxis: {
        labels: false,
        labelsProps: {
            fill: "#ccc",
            "style" :"font-family:arial, sans-serif;font-size:12px"
          }
      },
      axis: {
        x: { 
        }
      },
      features: {
        grid: {
            draw: false,
            // draw both x and y grids
            forceBorder: [false, false, true, false],
            // force grid for external border
            ny: 7,
            // use 10 divisions for y grid
            nx: "auto",
            // 10 divisions for x grid
            props: {
                stroke: "#888" // color for the grid
            },
            oddHProps: {
                fill: "#CCC",
                opacity: .1,
                "stroke-width": 0
            },
            ticks: {
                active: [true, false, false],
                size: [2, 0],
                props: {
                    stroke: '#888'
                }
            }
        }
      },
      barMargins: 10
    };

    $("#chart").chart({
          template: "line_basic_6",
          tooltips: {
            serie1: ["a", "b", "c", "d"],
            serie2: ["a", "b", "c", "d"]
          },
          values: {
            serie1: theAmounts,
            serie2: theSales
          },
          defaultSeries: {
            type: "bar"
          },
          series: {
            serie2: {
              type: "line",
              stacked: false,
              axis: "r"
            }
          }
    });
}