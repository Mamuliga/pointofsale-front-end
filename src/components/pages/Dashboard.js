import React from 'react';
import ChartistGraph from 'react-chartist';
import { Interpolation, Svg } from 'chartist';
import VisualCard from '../uis/DashboardComponents/VisualCard';
import GridContainer from '../uis/DashboardComponents/Grid/GridContainer';

const Dashboard = () => {
  var data = {
    labels: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8', 'W9', 'W10'],
    series: [[1, 2, 4, 8, 6, -2, -1, -4, -6, -2]],
  };
  var dataPie = {
    // labels: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8', 'W9', 'W10'],
    series: [10, 2, 4, 3],
  };

  // new Chartist.Pie('.ct-chart', {
  //   series: [10, 2, 4, 3],
  // });

  var options = {
    high: 10,
    low: -10,
    axisX: {
      labelInterpolationFnc: function(value, index) {
        return index % 2 === 0 ? value : null;
      },
    },
  };

  var delays = 80,
    durations = 500;
  var delays2 = 80,
    durations2 = 500;

  const barChartOptions = {
    options: {
      lineSmooth: Interpolation.cardinal({
        tension: 0,
      }),
      low: 0,
      high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
      chartPadding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      },
    },
    // for animation
    animation: {
      draw: function(data) {
        if (data.type === 'line' || data.type === 'area') {
          data.element.animate({
            d: {
              begin: 600,
              dur: 700,
              from: data.path
                .clone()
                .scale(1, 0)
                .translate(0, data.chartRect.height())
                .stringify(),
              to: data.path.clone().stringify(),
              easing: Svg.Easing.easeOutQuint,
            },
          });
        } else if (data.type === 'point') {
          data.element.animate({
            opacity: {
              begin: (data.index + 1) * delays,
              dur: durations,
              from: 0,
              to: 1,
              easing: 'ease',
            },
          });
        }
      },
    },
  };

  const types = ['Bar', 'Pie', 'Line'];
  const dailySalesChart = {
    data: {
      labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
      series: [[12, 17, 7, 17, 23, 18, 38]],
    },
    options: {
      lineSmooth: Interpolation.cardinal({
        tension: 0,
      }),
      low: 0,
      high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
      chartPadding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      },
    },
    // for animation
    animation: {
      draw: function(data) {
        if (data.type === 'line' || data.type === 'area') {
          data.element.animate({
            d: {
              begin: 600,
              dur: 700,
              from: data.path
                .clone()
                .scale(1, 0)
                .translate(0, data.chartRect.height())
                .stringify(),
              to: data.path.clone().stringify(),
              easing: Svg.Easing.easeOutQuint,
            },
          });
        } else if (data.type === 'point') {
          data.element.animate({
            opacity: {
              begin: (data.index + 1) * delays,
              dur: durations,
              from: 0,
              to: 1,
              easing: 'ease',
            },
          });
        }
      },
    },
  };

  const completedTasksChart = {
    data: {
      labels: ['12am', '3pm', '6pm', '9pm', '12pm', '3am', '6am', '9am'],
      series: [[230, 750, 450, 300, 280, 240, 200, 190]],
    },
    options: {
      lineSmooth: Interpolation.cardinal({
        tension: 0,
      }),
      low: 0,
      high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
      chartPadding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      },
    },
    animation: {
      draw: function(data) {
        if (data.type === 'line' || data.type === 'area') {
          data.element.animate({
            d: {
              begin: 600,
              dur: 700,
              from: data.path
                .clone()
                .scale(1, 0)
                .translate(0, data.chartRect.height())
                .stringify(),
              to: data.path.clone().stringify(),
              easing: Svg.Easing.easeOutQuint,
            },
          });
        } else if (data.type === 'point') {
          data.element.animate({
            opacity: {
              begin: (data.index + 1) * delays,
              dur: durations,
              from: 0,
              to: 1,
              easing: 'ease',
            },
          });
        }
      },
    },
  };
  const emailsSubscriptionChart = {
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      series: [[542, 443, 320, 780, 553, 453]],
    },
    options: {
      axisX: {
        showGrid: false,
      },
      low: 0,
      high: 1000,
      chartPadding: {
        top: 0,
        right: 5,
        bottom: 0,
        left: 0,
      },
    },
    responsiveOptions: [
      [
        'screen and (max-width: 640px)',
        {
          seriesBarDistance: 5,
          axisX: {
            labelInterpolationFnc: function(value) {
              return value[0];
            },
          },
        },
      ],
    ],
    animation: {
      draw: function(data) {
        if (data.type === 'bar') {
          data.element.animate({
            opacity: {
              begin: (data.index + 1) * delays2,
              dur: durations2,
              from: 0,
              to: 1,
              easing: 'ease',
            },
          });
        }
        // .on('draw', function(data) {
        //   if(data.type === 'bar') {
        data.element.attr({
          style: 'stroke-width: 20px',
        });
      },
      // },
    },
  };

  return (
    <div>
      <GridContainer>
        <VisualCard
          title={'Daily Sales Title'}
          desc={'Daile sales description'}
        >
          <ChartistGraph
            className='ct-chart'
            data={completedTasksChart.data}
            type='Line'
            options={completedTasksChart.options}
            listener={completedTasksChart.animation}
          />
        </VisualCard>
        <VisualCard title={'Pie chart'} desc={'Daile sales description'}>
          <ChartistGraph
            className={'ct-octave'}
            data={dataPie}
            /* options={options}  */ type={types[1]}
          />
        </VisualCard>
        <VisualCard
          title={'Sample line graph'}
          desc={'Daile sales description'}
        >
          <ChartistGraph
            className={'ct-octave'}
            data={data}
            /* options={options} */ type={types[2]}
          />
        </VisualCard>
        <VisualCard title={'Sample bar graph'} desc={'Daile sales description'}>
          <ChartistGraph
            className='ct-chart'
            data={emailsSubscriptionChart.data}
            type='Bar'
            options={emailsSubscriptionChart.options}
            responsiveOptions={emailsSubscriptionChart.responsiveOptions}
            listener={emailsSubscriptionChart.animation}
          />
        </VisualCard>
        <VisualCard
          title={'Daily Sales Title'}
          desc={'Daile sales description'}
        >
          <ChartistGraph
            className={'ct-octave'}
            // options={barChartOptions}
            // data={{ ...data, type: 'area' }}
            data={dailySalesChart.data}
            type={types[0]}
            listener={dailySalesChart.animation}
            options={dailySalesChart.options}
          />
        </VisualCard>
      </GridContainer>
      <ChartistGraph
        className='ct-chart'
        data={emailsSubscriptionChart.data}
        type='Bar'
        options={emailsSubscriptionChart.options}
        responsiveOptions={emailsSubscriptionChart.responsiveOptions}
        listener={emailsSubscriptionChart.animation}
      />
      <ChartistGraph
        className={'ct-octave'}
        // options={barChartOptions}
        // data={{ ...data, type: 'area' }}
        data={dailySalesChart.data}
        type={types[0]}
        listener={dailySalesChart.animation}
        options={dailySalesChart.options}
      />
      <ChartistGraph
        className={'ct-octave'}
        data={dataPie}
        /* options={options}  */ type={types[1]}
      />
      <ChartistGraph
        className={'ct-octave'}
        data={data}
        /* options={options} */ type={types[2]}
      />
      <ChartistGraph
        className='ct-chart'
        data={completedTasksChart.data}
        type='Line'
        options={completedTasksChart.options}
        listener={completedTasksChart.animation}
      />
    </div>
  );
};

export default Dashboard;
