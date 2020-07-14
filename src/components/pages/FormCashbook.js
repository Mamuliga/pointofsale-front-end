import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import FormBuilder from '../uis/FormBuilder';
import { useTheme } from '@material-ui/core/styles';
import { getCashbookFormData } from '../../utilities/helpers/formHelpers/cashbookForm';
import {
  updateCashbookById,
  getCashbookById,
  createCashbook,
  deleteCashbook,
} from '../../http/cashbookApi';
import { PAGE_ROUTES } from '../../services/routeService';
import { fetchApi, setFetchApiInfo } from '../../store/actions/globalAction';
import { Tab, AppBar, Tabs, Box, Typography } from '@material-ui/core';

const FormCashbook = ({ fetchApi, setFetchApiInfo }) => {
  const { id } = useParams();
  const { push } = useHistory();
  const [dataWithValue, setDataWithValue] = useState([]);
  const [cashbook, setCashbook] = useState({ type: 'DEBIT' });
  const theme = useTheme();
  const [value, setValue] = React.useState('DEBIT');
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
      setDataWithValue([...dataArray]);
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
  }, [fetchApi, id, setFetchApiInfo]);

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

  const handleFormSubmit = (updatedCashbook, id) => {
    const handleUpdateSuccuess = () => {
      fetchApi(false);
      push(PAGE_ROUTES.cashbooks);
    };
    const handleUpdateErr = () => {
      fetchApi(false);
      setFetchApiInfo({
        type: 'error',
        message: 'Unable to update cashbook details',
      });
    };
    updatedCashbook.id = undefined;
    updatedCashbook.roleInPOS = undefined;
    fetchApi(true);
    updateCashbookById(id, updatedCashbook)
      .then(handleUpdateSuccuess)
      .catch(handleUpdateErr);
  };

  const handleDelete = () => {
    const handleDeleteSuccuess = () => {
      fetchApi(false);
      push(PAGE_ROUTES.cashbooks);
    };
    const handleDeleteError = () => {
      fetchApi(false);
      setFetchApiInfo({ type: 'error', message: 'Unable to delete cashbook' });
    };
    fetchApi(true);
    deleteCashbook(cashbook.id)
      .then(handleDeleteSuccuess)
      .catch(handleDeleteError);
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
  if (cashbook.id && dataWithValue.length) {
    const editingCashbook = { ...cashbook };
    dataWithValue.forEach(field => {
      editingCashbook[`${field.id}`] = field.value;
    });
    cashbookForm = (
      <FormBuilder
        title={'Edit cashbook'}
        data={dataWithValue}
        onClick={handleFormSubmit}
        actor={cashbook}
        handleDelete={handleDelete}
      />
    );
  } else if (!id) {
    const actor = { ...cashbook };
    cashbookForm = (
      <FormBuilder
        title={'Create new Cashbook'}
        data={getCashbookFormData}
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
