import React from "react";
import { Typography } from "@material-ui/core";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import MainContainer from "./components/MainContainer";
import Form from "./components/Form";
import Input from "./components/Input";
import PrimaryButton from "./components/PrimaryButton";
import { useData } from "./DataContext";

const schema = yup.object().shape({
  firstName: yup
    .string()
    .matches(/^([^0-9]*)$/, "First name should not contain numbers")
    .required("First name is required"),
  lastName: yup
    .string()
    .matches(/^([^0-9]*)$/, "Last name should not contain numbers")
    .required("Last name is required"),
});

export default function Step1() {
  const { data, setValues } = useData({});
  const { register, handleSubmit, errors } = useForm({
    mode: "onBlur",
    defaultValues: { firstName: data.firstName, lastName: data.lastName },
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    setValues(data);
    history.push("/step2");
  };

  const history = useHistory();

  return (
    <MainContainer>
      <Typography component="h2" variant="h5">
        Step 1
      </Typography>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          ref={register}
          id="firstName"
          type="text"
          label="First Name"
          name="firstName"
          error={!!errors.firstName}
          helperText={errors?.firstName?.message}
        />
        <Input
          ref={register}
          id="lastName"
          type="text"
          label="Last Name"
          name="lastName"
          error={!!errors.lastName}
          helperText={errors?.lastName?.message}
        />
        <PrimaryButton>Next</PrimaryButton>
      </Form>
    </MainContainer>
  );
}
