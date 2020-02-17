import React, { useEffect, useState } from "react";
import { FormGroup } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import CustomTextField from "./FormComponents/CustomTextField";
import CustomGender from "./FormComponents/CustomGender";
import CustomPhone from "./FormComponents/CustomPhone";
import { Button } from "@material-ui/core";
import CustomAvatar from "./FormComponents/CustomAvatar";

const FormBuilder = ({ title, data, onClick, actor }) => {
  const [dataWithValue, setDataWithValue] = useState([]);
  useEffect(() => {
    const dataArray = [];
    console.log(actor);
    console.log(Object.keys(actor));
    Object.keys(actor).forEach(id => {
      data.forEach(entry => {
        if (id === entry.id) {
          dataArray.push({ ...entry, value: actor[`${id}`] });
        }
        return null;
      });
    });
    console.log(data);
    console.log(dataArray);
    setDataWithValue([...dataArray]);
    // actor.forEach(act => {});
  }, [actor, data, dataWithValue, setDataWithValue]);
  return (
    <div>
      <div className={FormGroup.root}>
        <div>
          <Grid>
            <Typography variant='h6' noWrap>
              {title}
            </Typography>
          </Grid>
          {dataWithValue.map(entry => {
            switch (entry.type) {
              case "text":
              case "date":
              case "email":
                return <CustomTextField entry={entry} key={entry.label} />;
              case "radio":
                return <CustomGender key={entry.label} />;
              case "number":
                return <CustomPhone entry={entry} key={entry.label} />;
              case "avatar":
                return <CustomAvatar key={entry.label} entry={entry} />;
              default:
                return null;
            }
          })}
          <Button variant='contained' color='primary' onClick={onClick}>
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FormBuilder;
