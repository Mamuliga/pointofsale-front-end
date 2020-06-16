import React from 'react';
import ChartistGraph from 'react-chartist';
import { Interpolation, Svg } from 'chartist';
import VisualCard from '../uis/DashboardComponents/VisualCard';
import GridContainer from '../uis/DashboardComponents/Grid/GridContainer';

const Dashboard = () => {
  var lineGraphData = {
    labels: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8', 'W9', 'W10'],
    series: [[1, 2, 4, 8, 6, -2, -1, -4, -6, -2]],
  };
  var pieChartData = {
    series: [10, 2, 4, 3],
  };

  var delays = 80,
    durations = 500;
  var delays2 = 80,
    durations2 = 500;

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
      high: 50,
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
      high: 1000,
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
        data.element.attr({
          style: 'stroke-width: 20px',
        });
      },
    },
  };

  const completedTasksChartOptions = {
    title: 'Complted Tasks Chart Title',
    desc: 'Complted Tasks Chart description',
    className: 'ct-chart',
    data: completedTasksChart.data,
    type: 'Line',
    options: completedTasksChart.options,
    listener: completedTasksChart.animation,
  };
  const pieChartOptions = {
    title: 'Pie chart',
    desc: 'Pie chart description',
    className: 'ct-octave',
    data: pieChartData,
    type: 'Pie',
  };
  const lineGraphOptions = {
    title: 'Sample Line Graph2',
    desc: 'Sample Line Graph2 description',
    className: 'ct-octave',
    data: lineGraphData,
    type: 'Line',
  };
  const emailsSubscriptionChartOptions = {
    title: 'Email subscription Chart',
    desc: 'Email subscription Chart description',
    className: 'ct-octave',
    data: emailsSubscriptionChart.data,
    type: 'Bar',
    options: emailsSubscriptionChart.options,
    listener: emailsSubscriptionChart.animation,
    responsiveOption: emailsSubscriptionChart.responsiveOptions,
  };
  const dailySalesChartOptions = {
    title: 'Daily Sales Chart',
    desc: 'Daily Sales Chart description',
    className: 'ct-octave',
    data: dailySalesChart.data,
    type: 'Bar',
    options: dailySalesChart.options,
    listener: dailySalesChart.animation,
  };

  const dataVisualizationChartPropsArray = [
    completedTasksChartOptions,
    pieChartOptions,
    lineGraphOptions,
    emailsSubscriptionChartOptions,
    dailySalesChartOptions,
  ];
  return (
    <div>
      <GridContainer>
        {dataVisualizationChartPropsArray.map((charts, index) => {
          const {
            title,
            desc,
            className,
            type,
            data,
            options,
            responsiveOptions,
            listener,
          } = charts;
          return (
            <VisualCard title={title} desc={desc} key={index}>
              <ChartistGraph
                className={className}
                data={data}
                type={type}
                options={options}
                responsiveOptions={responsiveOptions}
                listener={listener}
              />
            </VisualCard>
          );
        })}
      </GridContainer>
    </div>
  );
};

export default Dashboard;
