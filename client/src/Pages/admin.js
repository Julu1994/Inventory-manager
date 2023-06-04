import { Box, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Header from '../Components/header';
import Chart from 'react-apexcharts';
import axios from 'axios';
import { config } from '../config';

const defaultOptions = {
  chart: {
    type: 'bar',
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
  dataLabels: {
    enabled: false
  },
};

const Admin = () => {
  const [chartsData, setChartsData] = useState({
    series: [],
    chartData: [],
    chartLabels: [],
    removedSeries: [],
    productQuantities: [],
    productTypeData: [],
    productTypeLabels: [],
  });

  useEffect(() => {
    const fetchUrl = async (url, formatData) => {
      const response = await axios.get(`${config.SERVER_LINK}${url}`);
      return formatData(response.data);
    };

    Promise.all([
      fetchUrl('/admin/category-products-count', data => ({
        chartData: data.map(item => item.count),
        chartLabels: data.map(item => item.category),
      })),
      fetchUrl('/admin/daily-products-count', data => ({
        series: [{ name: 'Products added', data: data.map(item => ({ x: item._id, y: item.count })) }],
      })),
      fetchUrl('/admin/removed-products-count', data => ({
        removedSeries: [{ name: 'Products removed', data: data.map(item => ({ x: new Date(item.date).getTime(), y: item.count })) }],
      })),
      fetchUrl('/admin/total-products-quantity', data => ({
        productQuantities: [{ name: 'Total Quantity', data: data.map(item => ({ x: new Date(item._id).getTime(), y: item.totalQuantity })) }],
      })),
      fetchUrl('/admin/products-type', data => ({
        productTypeData: data.map(item => item.count),
        productTypeLabels: data.map(item => item._id),
      })),
    ]).then((results) => {
      setChartsData(results.reduce((acc, curr) => ({ ...acc, ...curr }), {}));
    }).catch(console.error);
  }, []);

  const renderChart = (options, series, type) => (
    series && series.length > 0 && <Chart options={options} series={series} type={type} />
  );

  return (
    <>
      <Header />
      <Box>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            {renderChart({ ...defaultOptions, yaxis: { title: { text: 'New Products' } } }, chartsData.series, 'bar')}
          </Grid>
          <Grid item xs={4}>
            <Chart
              options={{
                labels: chartsData.chartLabels,
                legend: { position: 'right' },
                responsive: [{
                  breakpoint: 480,
                  options: { legend: { position: 'bottom' } }
                }]
              }}
              series={chartsData.chartData}
              type="pie"
            />
          </Grid>
          <Grid item xs={4}>
            {renderChart({ ...defaultOptions, yaxis: { title: { text: 'Removed Products' } } }, chartsData.removedSeries, 'bar')}
          </Grid>
          <Grid item xs={4}>
            {renderChart({ ...defaultOptions, yaxis: { title: { text: 'Product Quantity' } } }, chartsData.productQuantities, 'bar')}
          </Grid>
          <Grid item xs={4}>
            <Chart
              options={{
                labels: chartsData.productTypeLabels,
                legend: { position: 'right' },
                responsive: [{
                  breakpoint: 480,
                  options: { legend: { position: 'bottom' } }
                }]
              }}
              series={chartsData.productTypeData}
              type="pie"
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Admin;
