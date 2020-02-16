import React from "react";
import { FormGroup } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import CustomTextField from "./FormComponents/CustomTextField";
import CustomGender from "./FormComponents/CustomGender";
import CustomPhone from "./FormComponents/CustomePhone";

const FormBuilder = ({ title, data }) => {
  return (
    <div>
      <div className={FormGroup.root}>
        <div>
          <Grid>
            <Typography variant='h6' noWrap>
              {title}
            </Typography>
          </Grid>
          {data.map(entry => {
            switch (entry.type) {
              case "text":
              case "email":
                return (
                  <CustomTextField
                    type={entry.type}
                    label={entry.label}
                    name={entry.name}
                    icon={entry.icon}
                    required={entry.required}
                  />
                );
              case "radio":
                return <CustomGender />;
              case "number":
                return <CustomPhone label={entry.label} />;
              default:
                return null;
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default FormBuilder;
