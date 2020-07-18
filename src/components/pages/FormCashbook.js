import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import FormBuilder from '../uis/FormBuilder';
import { useTheme } from '@material-ui/core/styles';
import {
  getCashbookFormData,
  getCashbookFormDataForDue,
} from '../../utilities/helpers/formHelpers/cashbookForm';
import { getCashbookById, createCashbook } from '../../http/cashbookApi';
import { PAGE_ROUTES } from '../../services/routeService';
import { fetchApi, setFetchApiInfo } from '../../store/actions/globalAction';
import { Tab, AppBar, Tabs, Box, Typography } from '@material-ui/core';
import { getDuesByCustomerId } from '../../http/dueApi';
import { getCustomerById } from '../../http/customerApi';

const FormCashbook = ({ fetchApi, setFetchApiInfo }) => {
  const { id, customerId } = useParams();
  const { push } = useHistory();
  const [cashbook, setCashbook] = useState({ type: 'DEBIT' });
  const theme = useTheme();
  const [value, setValue] = React.useState('DEBIT');
  const [customerDataWithValues, setCustomerDataWithValues] = useState([]);
  const [dropdown, setDueData] = useState([]);

  useEffect(() => {
    const handleGetSuccuess = res => {
      fetchApi(false);
      const dataArray = [];
      const data = getCashbookFormData;
      const newCashbook = res.data;
      Object.keys(res.data).forEach(id => {
        data.forEach(entry => {
          if (id === entry.id) {
            dataArray.push({ ...entry, value: newCashbook[`${id}`] });
          }
          return null;
        });
      });
      setCashbook(newCashbook);
    };

    const handleGetErr = () => {
      fetchApi(false);
      setFetchApiInfo({
        type: 'error',
        message: 'Unable to get the cashbook details',
      });
    };
    if (id) {
      fetchApi(true);
      getCashbookById(id)
        .then(handleGetSuccuess)
        .catch(handleGetErr);
    }

    if (customerId) {
      const handleGetCustomerDuesSuccess = dueData => {
        console.log(dueData.data);
        setDueData(dueData.data);
        getCustomerById(customerId)
          .then(res => handleGetCustomerByIdSuccess(res, dueData))
          .catch(handleGetCustomerByIdErr);
      };
      const handleGetCustomerDuesErr = () => {
        fetchApi(false);
      };
      const handleGetCustomerByIdSuccess = (customerData, dueData) => {
        console.log(customerData.data);
        const cusData = {
          ...customerData.data,
          ...{ amount: '' },
          ...{ dropdown: dueData.data },
        };
        fetchApi(false);
        console.log(cusData, { id: 'dueDropdown' });
        const cashBookFormDataWithCustomerValues = [];
        Object.keys(cusData).forEach(id => {
          getCashbookFormDataForDue.forEach(entry => {
            if (id === entry.id) {
              cashBookFormDataWithCustomerValues.push({
                ...entry,
                value: cusData[`${id}`],
              });
            }
            return null;
          });
        });
        console.log(cashBookFormDataWithCustomerValues);
        setCustomerDataWithValues([...cashBookFormDataWithCustomerValues]);
      };
      const handleGetCustomerByIdErr = () => {
        fetchApi(false);
      };

      fetchApi(true);
      getDuesByCustomerId(customerId)
        .then(handleGetCustomerDuesSuccess)
        .catch(handleGetCustomerDuesErr);
    }
  }, [customerId, fetchApi, id, setFetchApiInfo]);

  const handleCreateNewCashbook = newCashbook => {
    const handleCreateSuccuess = () => {
      fetchApi(false);
      push(PAGE_ROUTES.cashbooks);
      setFetchApiInfo({ type: 'success', message: 'Succuessfully created' });
    };
    const handleCreateErr = err => {
      console.log(err);
      fetchApi(false);
      setFetchApiInfo({ type: 'error', message: 'Unable to create cashbook' });
    };
    fetchApi(true);
    createCashbook(newCashbook)
      .then(handleCreateSuccuess)
      .catch(handleCreateErr);
  };

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role='tabpanel'
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  const handleChange = (_event, newValue) => {
    setValue(newValue);
    setCashbook({ ...cashbook, type: newValue });
    console.log(newValue);
  };

  let cashbookForm = null;
  if (!id) {
    const actor = { ...cashbook };
    cashbookForm = (
      <FormBuilder
        title={'Create new Cashbook'}
        data={customerId ? customerDataWithValues : getCashbookFormData}
        onClick={handleCreateNewCashbook}
        actor={actor}
      />
    );
  }

  return (
    <div>
      <AppBar position='static' color='default'>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor='primary'
          textColor='primary'
          variant='fullWidth'
        >
          <Tab label='Debit' value='DEBIT' />
          <Tab label='Credit' value='CREDIT' />
        </Tabs>
      </AppBar>
      <div>
        <TabPanel value={value} index={'CREDIT'} dir={theme.direction}>
          {cashbookForm}
        </TabPanel>
        <TabPanel value={value} index={'DEBIT'} dir={theme.direction}>
          {cashbookForm}
        </TabPanel>
      </div>
    </div>
  );
};

const mapStateToProps = ({ global }) => {
  return { ...global };
};

const mapActionToProps = {
  fetchApi,
  setFetchApiInfo,
};

export default connect(mapStateToProps, mapActionToProps)(FormCashbook);
