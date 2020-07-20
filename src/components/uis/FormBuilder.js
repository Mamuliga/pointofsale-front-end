import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import CustomTextField from './FormComponents/CustomTextField';
import CustomGender from './FormComponents/CustomGender';
import CustomAvatar from './FormComponents/CustomAvatar';
import { Button, Container } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import CreateIcon from '@material-ui/icons/Create';
import DatePicker from './FormComponents/DatePicker';
import CssBaseline from '@material-ui/core/CssBaseline';
import DropDown from './FormComponents/DropDown';
import CustomSwitch from './FormComponents/CustomSwitch';
import useStyles from '../../styles/useStyles';
import ConfirmationPopup from './ConfirmationPopup';
import {
  validateEmail,
  validateRequiredFields,
  validatePhone,
} from '../../utilities/helpers/formHelpers/formBuilderhelpers.js/validations';

const FormBuilder = ({
  title,
  buttonName,
  data = [],
  onClick,
  actor = {},
  handleDelete,
  hideDeleteButton,
  handleDatePickerChange,
}) => {
  console.log(data);
  const [newActor, setNewActor] = useState({ ...actor });
  const [dataFields, setDataFields] = useState();
  const [openConfirm, setOpenConfirmation] = React.useState(false);
  const getValue = ({ target: { value, name, checked } }) => {
    console.log(name);
    setNewActor({ ...newActor, [name]: value || checked });
    console.log({ ...newActor, [name]: value || checked });
  };

  const handleSubmit = e => {
    console.log(newActor);
    e.preventDefault();
    const dataFiledsWithErrors = [];
    data.forEach(field => {
      const newActorField = newActor[`${field.id}`];
      if (field.type === 'email') {
        validateEmail(field, newActorField, dataFiledsWithErrors);
      } else if (field.type === 'tel') {
        validatePhone(field, newActorField, dataFiledsWithErrors);
      } else {
        validateRequiredFields(field, newActorField, dataFiledsWithErrors);
      }
    });
    setDataFields(dataFiledsWithErrors);
    const errors = dataFiledsWithErrors.filter(dataField => dataField.error);
    if (!errors.length) {
      onClick(newActor, actor.id);
    } else {
      console.log('Form validation error');
    }
  };

  const handleOpenConfirmation = () => {
    setOpenConfirmation(true);
  };

  const handleCloseConfiramtion = () => {
    setOpenConfirmation(false);
  };

  const getIdentity = () => {
    if (actor.firstName) {
      return `${actor.firstName} ${actor.lastName}`;
    }
    return actor.itemName;
  };

  const classes = useStyles();
  let fields = data;
  if (dataFields) {
    fields = dataFields;
  }
  return (
    <Container component='main' maxWidth='md'>
      <CssBaseline />
      <Typography component='h1' variant='h5'>
        <Box lineHeight={2}>
          <CreateIcon className={classes.formbuilderMargin} />
          {title}
        </Box>
      </Typography>
      <div>
        <form className={classes.formbuilderForm}>
          <Grid container spacing={3}>
            {fields.map(entry => {
              switch (entry.type) {
                case 'text':
                case 'email':
                case 'tel':
                case 'number':
                case 'time':
                  return (
                    <CustomTextField
                      entry={entry}
                      key={entry.label}
                      getValue={getValue}
                    />
                  );
                case 'date':
                  return (
                    <DatePicker
                      entry={entry}
                      handleDatePickerChange={handleDatePickerChange}
                    />
                  );
                case 'radio':
                  return (
                    <CustomGender
                      entry={entry}
                      key={entry.label}
                      getValue={getValue}
                    />
                  );
                case 'dropDown':
                  return (
                    <DropDown
                      entry={entry}
                      key={entry.label}
                      getValue={getValue}
                    />
                  );
                case 'avatar':
                  return <CustomAvatar entry={entry} getValue={getValue} />;
                case 'switch':
                  return (
                    <CustomSwitch
                      entry={entry}
                      getValue={getValue}
                      key={entry.name}
                    />
                  );
                default:
                  return null;
              }
            })}
          </Grid>
          <Button
            type='submit'
            variant='contained'
            color='primary'
            onClick={handleSubmit}
            className={classes.formbuilderSubmit}
          >
            {buttonName}
          </Button>
          {actor.id && !hideDeleteButton && (
            <Button
              variant='contained'
              color='secondary'
              onClick={handleOpenConfirmation}
            >
              Delete
            </Button>
          )}
        </form>
      </div>
      {openConfirm && (
        <ConfirmationPopup
          open={openConfirm}
          close={handleCloseConfiramtion}
          handleAgree={handleDelete}
          id='deletePopup'
          header='Confirm Delete'
          content={`Are you sure want to delete the ${getIdentity()}`}
        />
      )}
    </Container>
  );
};

export default FormBuilder;
