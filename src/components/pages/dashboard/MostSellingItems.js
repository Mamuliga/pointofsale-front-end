import React from 'react';
import { getCompletedTasksChart } from '../../../utilities/helpers/graphHelpers/completedSalesChart';
import ChartistGraph from 'react-chartist';

const MostSellingItems = () => {
  const completedTasksChart = getCompletedTasksChart();
  const completedTasksChartOptions = {
    title: 'Complted Tasks Chart Title',
    desc: 'Complted Tasks Chart description',
    className: 'ct-chart',
    data: completedTasksChart.data,
    type: 'Line',
    options: completedTasksChart.options,
    listener: completedTasksChart.animation,
  };
  const {
    className,
    type,
    data,
    options,
    responsiveOptions,
    listener,
  } = completedTasksChartOptions;
  return (
    <div>
      <h1>Most Selling Items</h1>
      <ChartistGraph
        className={className}
        data={data}
        type={type}
        options={options}
        responsiveOptions={responsiveOptions}
        listener={listener}
      />
    </div>
  );
};
export default MostSellingItems;
