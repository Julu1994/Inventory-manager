import { Box, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Header from '../Components/header';
import Chart from 'react-apexcharts';
import axios from 'axios';
import { config } from '../config';

const Admin = () => {
  const [series, setSeries] = useState([]);

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

  const options = {
    chart: {
      type: 'line',
      zoom: {
        type: 'x',
        enabled: true,
        autoScaleYaxis: true
      },
      toolbar: {
        autoSelected: 'zoom'
      }
    },
    xaxis: {
      type: 'datetime'
    },
    yaxis: {
      title: {
        text: 'Products Count'
      },
    },
    dataLabels: {
      enabled: false
    },
  };

  return (
    <>
      <Header />
      <Box>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Chart options={options} series={series} type="line" />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Admin;
