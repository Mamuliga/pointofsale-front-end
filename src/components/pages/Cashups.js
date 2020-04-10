import React, { useEffect, useState } from 'react';
import TableBuilder from '../uis/TableBuilder.js';
import { useHistory } from 'react-router-dom';
import { getCashupTableHeaders } from '../../utilities/helpers/tableHelpers.js';
import { getCashupList } from '../../http/cashupApi';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { Grid, FormControl } from '@material-ui/core';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

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

  return (
    <FormControl>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container justify="left">
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
      <TableBuilder
        tableData={cashupList}
        tableHeaders={getCashupTableHeaders}
        handleEdit={handleEdit}
        title={'Cashups'}
      />
    </FormControl>
  );
};

export default Cashups;
