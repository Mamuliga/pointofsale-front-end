import React, { useEffect, useState } from 'react';
import TableBuilder from '../uis/TableBuilder.js';
import { useHistory } from 'react-router-dom';
import { getCashupTableHeaders } from '../../utilities/helpers/tableHelpers.js';
import { getCashupList } from '../../http/cashupApi';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { Grid, makeStyles } from '@material-ui/core';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'inline',
    margin: theme.spacing(1),
  },
  margin: theme.spacing(2),
}));

const Cashups = () => {
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

  const classes = useStyles();

  const dateComponent = (
    <div>
      <MuiPickersUtilsProvider container utils={DateFnsUtils}>
        <p className={classes.root}>To :</p>
        <Grid className={classes.root}>
          <KeyboardDatePicker
            margin="medium"
            id="date-picker-dialog"
            format="MM/dd/yyyy"
            // name={}
            // label={label}
            // value={selectedDate}
            // onChange={handleDateChange}
          />
        </Grid>
        <p className={classes.root}>From :</p>
        <Grid className={classes.root}>
          <KeyboardDatePicker
            margin="medium"
            id="date-picker-dialog"
            format="MM/dd/yyyy"
            // name={}
            // label={label}
            // value={selectedDate}
            // onChange={handleDateChange}
          />
        </Grid>
      </MuiPickersUtilsProvider>
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
