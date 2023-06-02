import { Box, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Header from '../Components/header';
import Chart from 'react-apexcharts';
import axios from 'axios';
import { config } from '../config';

const Admin = () => {
  const [series, setSeries] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [chartLabels, setChartLabels] = useState([]);


  useEffect(() => {
    axios.get(`${config.SERVER_LINK}/admin/category-products-count`)
      .then(response => {
        const labels = response.data.map(item => item.category);
        const data = response.data.map(item => item.count);
        console.log(data);

        setChartData(data);
        setChartLabels(labels);
      })
      .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    axios.get(`${config.SERVER_LINK}/admin/daily-products-count`)
      .then(response => {
        const data = response.data.map(item => {
          return {
            x: item._id,
            y: item.count
          }
        });

        setSeries([
          {
            name: "Products added",
            data: data
          }
        ]);
      })
      .catch(error => console.error(error));
  }, []);

  const inboundOptions = {
    chart: {
      type: 'line',
      zoom: {
        type: 'x',
        enabled: true,
        autoScaleYaxis: true
      },
      toolbar: {
        show: false
      }
    },
    xaxis: {
      type: 'datetime'
    },
    yaxis: {
      title: {
        text: 'Number of products'
      },
    },
    dataLabels: {
      enabled: false
    },
  };
  const categoryOption = {
    labels: chartLabels,
    legend: {
      position: 'right',
    },
    responsive: [{
      breakpoint: 480,
      options: {
        legend: {
          position: 'bottom',
        }
      }
    }]
  }

  return (
    <>
      <Header />
      <Box>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Chart options={inboundOptions} series={series} type="line" />
          </Grid>
          <Grid item xs={4}>
            <Chart
              options={categoryOption}
              series={chartData}
              type="pie"
            />

          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Admin;
