import React from 'react';
import ChartistGraph from 'react-chartist';
import VisualCard from '../uis/DashboardComponents/VisualCard';
import GridContainer from '../uis/DashboardComponents/Grid/GridContainer';
import { getDailySalesChartProps } from '../../utilities/helpers/graphHelpers/dailySalesChartHelpers';
import { getCompletedTasksChart } from '../../utilities/helpers/graphHelpers/completedSalesChart';
import { getEmailSubscriptionChart } from '../../utilities/helpers/graphHelpers/emailSubscriptionCHart';

const Dashboard = () => {
  const dailySalesChart = getDailySalesChartProps();
  const completedTasksChart = getCompletedTasksChart();
  const emailsSubscriptionChart = getEmailSubscriptionChart();

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
    data: { series: [10, 2, 4, 3] },
    type: 'Pie',
  };
  const lineGraphOptions = {
    title: 'Sample Line Graph2',
    desc: 'Sample Line Graph2 description',
    className: 'ct-octave',
    data: {
      labels: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8', 'W9', 'W10'],
      series: [[1, 2, 4, 8, 6, -2, -1, -4, -6, -2]],
    },
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
