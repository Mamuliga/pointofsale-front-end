import React from 'react';
import { getEmailSubscriptionChart } from '../../../utilities/helpers/graphHelpers/emailSubscriptionCHart';
import ChartistGraph from 'react-chartist';

const BestSellingCustomer = () => {
  const emailsSubscriptionChart = getEmailSubscriptionChart();
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
  const {
    className,
    type,
    data,
    options,
    responsiveOptions,
    listener,
  } = emailsSubscriptionChartOptions;
  return (
    <div>
      <h1>Best Selling Customer</h1>
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

export default BestSellingCustomer;
