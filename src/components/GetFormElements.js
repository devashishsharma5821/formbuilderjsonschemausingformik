import React from 'react';
import {TextField , SelectField} from './Elements/FormElements';

function GetFormElements(props) {

    const getFormElement = (elementName, elementSchema) => {
        const props = {
          name: elementName,
          label: elementSchema.label,
          options: elementSchema.options
        };
    
        if (elementSchema.type === "text" || elementSchema.type === "email") {
          return <TextField {...props} />;
        }
    
        if (elementSchema.type === "select") {
          return <SelectField {...props} />;
        }
      };

  return (
    <div key={props.keey}>{getFormElement(props.keey, props.formSchemaKey)}</div>
  )
}

export default GetFormElements
