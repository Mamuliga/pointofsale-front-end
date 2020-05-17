import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import TableBuilder from '../uis/TableBuilder.js';
import { useHistory } from 'react-router-dom';
import { getCashbookTableHeaders } from '../../utilities/helpers/tableHelpers.js';
import { getCashbookList } from '../../http/cashbookApi';
import Grid from '@material-ui/core/Grid';
import useStyles from '../../styles/useStyles';
import { fetchApi, setFetchApiInfo } from '../../store/actions/globalAction.js';
import DatePicker from './../uis/FormComponents/DatePicker';

const Cashbooks = ({ fetchApi, setFetchApiInfo }) => {
  const classes = useStyles();
  const { location, push } = useHistory();
  const [cashbookList, setCashbookList] = useState([]);

  useEffect(() => {
    const handleGetCashbookResp = res => {
      fetchApi(false);
      if (Array.isArray(res.data)) {
        const displayCashbookList = res.data.map(
          ({ id, date, refNo, type, amount, description }) => {
            return {
              id,
              date: date.slice(0, 10),
              refNo,
              type,
              amount,
              description,
            };
          }
        );
        setCashbookList(displayCashbookList);
      }
    };
    const handleGetCashbookErr = err => {
      setFetchApiInfo('Unable to get cashbooks');
      fetchApi(false);
    };

    fetchApi(true);
    getCashbookList().then(handleGetCashbookResp).catch(handleGetCashbookErr);
  }, [fetchApi, setFetchApiInfo]);

  const handleEdit = cashbook => {
    const editClick = () => {
      push(`${location.pathname}/edit/${cashbook.id}`);
    };
    return editClick;
  };

  const [selectedDateTo, setSelectedDateTo] = useState(
    new Date('2014-08-18T21:11:54')
  );
  const handleDateChangeTo = date => {
    setSelectedDateTo(date);
  };
  const [selectedDateFrom, setSelectedDateFrom] = useState(
    new Date('2014-08-18T21:11:54')
  );
  const handleDateChangeFrom = date => {
    setSelectedDateFrom(date);
  };

  const dateComponent = (
    <div className={classes.cashbookUi}>
      <Grid item spacing={5}>
        <p className={classes.cashbookDateAlign}>From :</p>
        <DatePicker
          id='id'
          name='dateChangeTo'
          label='To:'
          value={selectedDateFrom}
          handleDatePickerChange={handleDateChangeFrom}
        />
        <p className={classes.cashbookDateAlign}>To :</p>
        <DatePicker
          id='id'
          name='dateChangeTo'
          label='To:'
          value={selectedDateTo}
          handleDatePickerChange={handleDateChangeTo}
        />
      </Grid>
    </div>
  );

  return (
    <TableBuilder
      tableData={cashbookList}
      tableHeaders={getCashbookTableHeaders}
      handleEdit={handleEdit}
      title={'Cashbooks'}
      tableTopUis={dateComponent}
      hideEditIcon
    />
  );
};

const mapStateToProps = ({ global }) => {
  return { ...global };
};

const mapActionToProps = {
  fetchApi,
  setFetchApiInfo,
};

export default connect(mapStateToProps, mapActionToProps)(Cashbooks);
