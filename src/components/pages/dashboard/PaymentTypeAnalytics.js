import React from 'react';
import ChartistGraph from 'react-chartist';
import { PAGE_ROUTES } from '../../../services/routeService';

const PaymentTypeAnalytics = () => {
  const paymetTypeAnalyticOptions = {
    title: 'Pie chart',
    desc: 'Pie chart description',
    className: 'ct-octave',
    data: { series: [10, 2, 4, 3] },
    type: 'Pie',
    mainPath: PAGE_ROUTES.mostSelledItems,
  };
  const {
    className,
    type,
    data,
    options,
    responsiveOptions,
    listener,
  } = paymetTypeAnalyticOptions;
  return (
    <div>
      <h1>Payment Type Analytics</h1>
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
export default PaymentTypeAnalytics;
