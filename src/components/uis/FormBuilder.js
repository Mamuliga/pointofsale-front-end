import React, { useState } from 'react';
import { FormGroup, Box } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import CustomTextField from './FormComponents/CustomTextField';
import CustomGender from './FormComponents/CustomGender';
import CustomPhone from './FormComponents/CustomPhone';
import { Button } from '@material-ui/core';
import CustomAvatar from './FormComponents/CustomAvatar';

const FormBuilder = ({ title, data, onClick, actor, handleDelete }) => {
  const [newActor, setNewActor] = useState({ ...actor });
  const getValue = ({ target: { value, name } }) => {
    setNewActor({ ...newActor, [name]: value });
    console.log({ ...newActor, [name]: value });
  };
  return (
    <div>
      <div className={FormGroup.root}>
        <div>
          <Grid>
            <Typography variant="h6" noWrap>
              <Box ineHeight={2} m={1}>
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
      </div>
    </div>
  );
};

export default FormBuilder;
