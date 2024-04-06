import { FC } from "react"
// import Chart from "react-apexcharts"
import { ApexOptions } from 'apexcharts'
import { HistoricalDataItem, PredictionDataItem } from "../../types"
import ReactApexChart from "react-apexcharts"


// for stocks & Indices
const PredictorChart: FC<{ latestData: HistoricalDataItem[], prediction: PredictionDataItem }> = ({ latestData, prediction }) => {



  // Determine the minimum and maximum values for the y-axis
  // let labelCount = 29;
  // if(latestData){
  //   const minValue = Math.min(...latestData?.map(dataItem => dataItem?.Low, prediction?.Low));
  //   const maxValue = Math.max(...latestData?.map(dataItem => dataItem?.High, prediction?.High));
      
  //   // Determine the number of labels needed with a gap of 5 points
  //   // labelCount = Math.ceil((maxValue - minValue) / 5) + 7 ;
  // }




  const options: ApexOptions = {
    chart: {
      type: "candlestick",
      height: 320,
      toolbar: {
        show: false,
        tools: {
          zoom: false,
          zoomin: false,
          zoomout: false,
          pan: false,
          reset: true
        }
      },
    },
    title: {
      text: "",
      align: "center",
    },
    xaxis: {
      type: "datetime",
    },
    yaxis: {
      labels: {
          formatter: function(value: number) {
            if(value.toFixed(0).toString().length > 3){
              return value.toFixed(0);
            }
            return value.toFixed(2);
          },
          style: {
              fontSize: '12px',
          },
      },
      // tickAmount: labelCount,
    },
    annotations: {
      points: [
          {
              x: new Date().getTime(),
              y: prediction?.Close,
              marker: {
                  size: 5,
                  fillColor: 'transparent',
                  strokeColor: 'transparent',
                  radius: 2,
              },
              label: {
                  text: 'Prediction',
                  borderColor: '#00000000',
                  offsetY: 10,
                  style: {
                      background: 'transparent',
                      color: '#000000',
                      fontSize: '11.5px',
                      fontWeight: '600',
                      padding: {
                          left: 5,
                          right: 5,
                          top: 5,
                          bottom: 5,
                      },
                  },
                
              },
          },
      ],
    },

    responsive: [
      {
          breakpoint: 768,
          options: {
              chart: {
                  height: 420,
              },
          },
      },
  ],

  }

  const series = latestData && Array.isArray(latestData) ? [
    {
      data: latestData
        .map((dataItem: any) => [
          new Date(dataItem.Date).getTime(),
          dataItem.Open.toFixed(2),
          dataItem.High.toFixed(2),
          dataItem.Low.toFixed(2),
          dataItem.Close.toFixed(2),
        ])
        .concat([
          [
            new Date().getTime(),
            prediction.Open.toFixed(2), 
            prediction.High.toFixed(2), 
            prediction.Low.toFixed(2), 
            prediction.Close.toFixed(2),
          ]
        ]),
    },
  ] : [];




  return (
    <div className="-ml-4 md:-ml-0">
      {/* <Chart options={options} series={series} type="candlestick" /> */}
      <ReactApexChart series={series} type="candlestick" options={options}/>
    </div>
  )
}

export default PredictorChart
