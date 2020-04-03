import React, { useState } from 'react';
import { FormGroup, Container } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import CustomTextField from './FormComponents/CustomTextField';
import CustomGender from './FormComponents/CustomGender';
import CustomPhone from './FormComponents/CustomPhone';
import { Button } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import CustomAvatar from './FormComponents/CustomAvatar';
import CreateIcon from '@material-ui/icons/Create';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  margin: {
    marginRight: theme.spacing(2)
  },
  textField: {
    width: '40ch'
  }
}));

const PeopleForm = ({ title, data, onClick, actor, handleDelete }) => {
  const [newActor, setNewActor] = useState({ ...actor });
  const getValue = ({ target: { value, name } }) => {
    setNewActor({ ...newActor, [name]: value });
    console.log({ ...newActor, [name]: value });
  };
  const classes = useStyles();

  return (
    <div>
      <div className={FormGroup.root}>
        <div>
          <Container maxWidth="md">
            <Grid>
              <Typography variant="h5" noWrap>
                <Box lineHeight={2} m={1}>
                  <CreateIcon className={classes.margin} />
                  {title}
                </Box>
              </Typography>
            </Grid>
            {data.map(entry => {
              switch (entry.type) {
                case 'text':
                case 'date':
                case 'email':
                  return (
                    <CustomTextField
                      entry={entry}
                      key={entry.label}
                      getValue={getValue}
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
                case 'number':
                  return (
                    <CustomPhone
                      entry={entry}
                      key={entry.label}
                      getValue={getValue}
                    />
                  );
                case 'avatar':
                  return <CustomAvatar key={entry.label} entry={entry} />;
                default:
                  return null;
              }
            })}
            <div className={classes.textField}>
              <Button
                variant="contained"
                color="primary"
                onClick={onClick(newActor)}
              >
                Submit
              </Button>
              {newActor.id && (
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleDelete}
                >
                  Delete
                </Button>
              )}
            </div>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default PeopleForm;
