import React from 'react';
import { getDailySalesChartProps } from '../../../utilities/helpers/graphHelpers/dailySalesChartHelpers';
import ChartistGraph from 'react-chartist';

const DailySales = () => {
  const dailySalesChart = getDailySalesChartProps();
  const dailySalesChartOptions = {
    className: 'ct-octave',
    data: dailySalesChart.data,
    type: 'Bar',
    options: dailySalesChart.options,
    listener: dailySalesChart.animation,
  };
  const {
    className,
    type,
    data,
    options,
    responsiveOptions,
    listener,
  } = dailySalesChartOptions;
  return (
    <div>
      <h1>Daily Sales</h1>
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

export default DailySales;
