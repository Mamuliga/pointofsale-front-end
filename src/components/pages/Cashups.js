import React, { useEffect, useState } from 'react';
import TableBuilder from '../uis/TableBuilder.js';
import { useHistory } from 'react-router-dom';
import { getCashupTableHeaders } from '../../utilities/helpers/tableHelpers.js';
import { getCashupList } from '../../http/cashupApi';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import Grid from '@material-ui/core/Grid';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import useStyles from '../../styles/useStyles';

const Cashups = () => {
  const classes = useStyles();
  const { location, push } = useHistory();
  const [cashupList, setCashupList] = useState([]);

  useEffect(() => {
    const handleGetCashupResp = (res) => {
      if (Array.isArray(res.data)) {
        const displayCashupList = res.data.map(
          ({ id, firstName, lastName, phoneNo, gender, bankAccount }) => {
            return { id, firstName, lastName, phoneNo, gender, bankAccount };
          }
        );
        setCashupList(displayCashupList);
      }
    };

    const handleGetCashupErr = (err) => {};
    getCashupList().then(handleGetCashupResp).catch(handleGetCashupErr);
  }, []);

  const handleEdit = (cashup) => {
    const editClick = () => {
      push(`${location.pathname}/edit/${cashup.id}`);
    };
    return editClick;
  };

  const [selectedDateTo, setSelectedDateTo] = React.useState(
    new Date('2014-08-18T21:11:54')
  );
  const handleDateChangeTo = (date) => {
    setSelectedDateTo(date);
  };
  const [selectedDateFrom, setSelectedDateFrom] = React.useState(
    new Date('2014-08-18T21:11:54')
  );
  const handleDateChangeFrom = (date) => {
    setSelectedDateFrom(date);
  };

  const dateComponent = (
    <div>
      <Grid item>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <p className={classes.cashupDateAlign}>To :</p>
          <KeyboardDatePicker
            margin="medium"
            id="date-picker-dialog"
            format="  MM  / dd  / yyyy  "
            value={selectedDateTo}
            onChange={handleDateChangeTo}
          />
        </MuiPickersUtilsProvider>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <p className={classes.cashupDateAlign}>From :</p>
          <KeyboardDatePicker
            margin="medium"
            id="date-picker-dialog"
            format="  MM  / dd  / yyyy  "
            value={selectedDateFrom}
            onChange={handleDateChangeFrom}
          />
        </MuiPickersUtilsProvider>
      </Grid>
    </div>
  );

  return (
    <TableBuilder
      tableData={cashupList}
      tableHeaders={getCashupTableHeaders}
      handleEdit={handleEdit}
      title={'Cashups'}
      tableTopUis={dateComponent}
    />
  );
};

export default Cashups;
