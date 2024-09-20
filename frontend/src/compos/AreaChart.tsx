import { useEffect, useState } from "react"
import ReactApexChart from 'react-apexcharts'
//import Chart from "react-apexcharts";

export const AreaChart = ({data}:any) => {
  const [series, setSeries] = useState(data.series);

  useEffect(() => {
    setSeries(data.series);
  }, [data.series]);

  console.log('****', data)
  const [
    chart, 
    //setCart
  ] = useState({
          
    series: [{
      name: 'prices',
      data: series,
    }, ],

    options: {
      chart: {
        height: 200,
        type: 'area',
        toolbar: {
          show: false,
        },
      },
      
      dataLabels: {
        enabled: true
      },
      stroke: {
        curve: 'smooth'
      },
      xaxis: {
        type: 'datetime',
        categories: data?.categories,
      },
      tooltip: {
        x: {
          format: 'dd/MM/yy HH:mm'
        },
      },
    },
  })

  return (
    <div>
      <div id="chart">
        <ReactApexChart 
        key={data?.series}
        //@ts-ignore
        options={chart.options} 
        series={chart.series} 
        type="area" 
        height={240} 
        />
      </div>
      <div id="html-dist"></div>
    </div>
  )
}
