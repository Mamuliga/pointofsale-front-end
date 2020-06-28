import React, { useEffect } from 'react';
import VisualCard from '../uis/DashboardComponents/VisualCard';
import GridContainer from '../uis/DashboardComponents/Grid/GridContainer';
import { fetchApi, setFetchApiInfo } from '../../store/actions/globalAction';
import {
  getBestSellingItems,
  getDailySales,
  getRecievesReportByPaymentType,
  getRecievesByDateRange,
  getReportByPaymentType,
  getLowInventoryReport,
  getBestProfitGivenCustomers,
} from '../../http/dashboardApi';
import BestSellingCustomer from './dashboard/BestSellingCustomer';
import DailySales from './dashboard/DailySales';
import MostSellingItems from './dashboard/MostSellingItems';
import PaymentTypeAnalytics from './dashboard/PaymentTypeAnalytics';
import LineGraph from './dashboard/LineGraph';
import LowInventory from './dashboard/LowInventory';

const Dashboard = () => {
  useEffect(() => {
    const handleGetBestSelllingItemsResponse = res => {
      console.log(res);
      fetchApi(false);
      // if (Array.isArray(res.data)) {
      //   const displayCustomerList = res.data.map(
      //     ({ id, firstName, lastName, phoneNo, gender, bankAccount }) => {
      //       return { id, firstName, lastName, phoneNo, gender, bankAccount };
      //     }
      //   );
      //   // setCustomerList(displayCustomerList);
      // }
    };
    const handleBestSellingItemsErr = () => {
      setFetchApiInfo({
        type: 'error',
        message: 'Unable to get best selling items',
      });
      fetchApi(false);
    };
    fetchApi(true);
    getBestSellingItems()
      .then(handleGetBestSelllingItemsResponse)
      .catch(handleBestSellingItemsErr);
    getDailySales()
      .then(handleGetBestSelllingItemsResponse)
      .catch(handleBestSellingItemsErr);
    getRecievesReportByPaymentType()
      .then(handleGetBestSelllingItemsResponse)
      .catch(handleBestSellingItemsErr);
    getRecievesByDateRange()
      .then(handleGetBestSelllingItemsResponse)
      .catch(handleBestSellingItemsErr);
    getReportByPaymentType()
      .then(handleGetBestSelllingItemsResponse)
      .catch(handleBestSellingItemsErr);
    getLowInventoryReport()
      .then(handleGetBestSelllingItemsResponse)
      .catch(handleBestSellingItemsErr);
    getBestProfitGivenCustomers()
      .then(handleGetBestSelllingItemsResponse)
      .catch(handleBestSellingItemsErr);
  }, []);

  const dataVisualizationChartPropsArray = [
    {
      component: <DailySales />,
      title: 'Daily Sales',
      desc: 'Desc for daily sales',
    },
    {
      component: <MostSellingItems />,
      title: 'Most Selling Items',
      desc: 'Desc for Most Selling Items',
    },
    {
      component: <BestSellingCustomer />,
      title: 'Best selling customer',
      desc: 'Desc for Best selling customer',
    },
    {
      component: <PaymentTypeAnalytics />,
      title: 'Payment Type Analytics',
      desc: 'Desc for Payment Type Analytics',
    },
    {
      component: <LineGraph />,
      title: 'Line Graph',
      desc: 'Desc for Line Graph',
    },
    {
      component: <LowInventory />,
      title: 'Low Inventory',
      desc: 'Desc for Low Inventory',
    },
  ];
  return (
    <div>
      <GridContainer>
        {dataVisualizationChartPropsArray.map(charts => {
          const { title, desc, component } = charts;
          return (
            <VisualCard title={title} desc={desc}>
              {component}
            </VisualCard>
          );
        })}
      </GridContainer>
    </div>
  );
};

export default Dashboard;
