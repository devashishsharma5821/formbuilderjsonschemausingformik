// this code started here https://www.pluralsight.com/guides/generating-dynamic-forms-from-json-in-react

import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import formSchema from "./formSchema.json";
import {
  Form,
  SubmitButton
} from "./components/Elements/FormElements";

import GetFormElements from './components/GetFormElements';

// const formSchema = {
//   name: {
//     type: "text",
//     label: "Name",
//     required: true,
//     yup: Yup.string().required("Reaquillred").min(5, "must have at least 5")
//   },
//   lastname: {
//     type: "text",
//     label: "Last name",
//     required: true
//   },
//   email: {
//     type: "email",
//     label: "Email",
//     required: true
//   },
//   role: {
//     type: "select",
//     label: "Role",
//     required: true,
//     options: [
//       {
//         label: "Admin",
//         value: "admin"
//       },
//       {
//         label: "User",
//         value: "user"
//       }
//     ]
//   }
// };

function App() {
  const [formData, setFormData] = useState({});
  const [validationSchema, setValidationSchema] = useState({});

  useEffect(() => {
    initForm(formSchema);
  }, []);

  const initForm = (formSchema) => {
    let _formData = {};
    let _validationSchema = {};

    for (var key of Object.keys(formSchema)) {
      _formData[key] = "";

      // console.log(key);

      // this could be a switch
      if (formSchema[key].type === "text") {
        _validationSchema[key] = Yup.string();
      } else if (formSchema[key].type === "email") {
        _validationSchema[key] = Yup.string().email();
      } else if (formSchema[key].type === "select") {
        _validationSchema[key] = Yup.string().oneOf(
          formSchema[key].options.map((o) => o.value)
        );
      }

      if (formSchema[key].required) {
        _validationSchema[key] = _validationSchema[key].required(formSchema[key].errormessage);
      }
      console.log(_validationSchema);
      if (formSchema[key].yup) {
        _validationSchema[key] = formSchema[key].yup;
      }
    }


    setFormData(_formData);
    setValidationSchema(Yup.object().shape({ ..._validationSchema }));
  };

  // const getFormElement = (elementName, elementSchema) => {
  //   const props = {
  //     name: elementName,
  //     label: elementSchema.label,
  //     options: elementSchema.options
  //   };

  //   if (elementSchema.type === "text" || elementSchema.type === "email") {
  //     return <TextField {...props} />;
  //   }

  //   if (elementSchema.type === "select") {
  //     return <SelectField {...props} />;
  //   }
  // };

  const onSubmit = (values, { setSubmitting, resetForm, setStatus }) => {
    console.log({ values });
    setSubmitting(false);
  };

  // // this one I created to try if it would fis React complaining about the component starting uncontrolled
  
  // const exampleInitialValues = {
  //   name: "",
  //   lastname: "",
  //   email: "",
  //   role: ""
  // };

// console.log("lets see");

  return (
    <div className="App">
      <Form
        enableReinitialize
        initialValues={formData}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {Object.keys(formSchema).map((key, ind) => (
           <GetFormElements keey={key} formSchemaKey={formSchema[key]} />
        ))}
        <SubmitButton title="Submit" />
      </Form>
    </div>
  );
}

export default App;
