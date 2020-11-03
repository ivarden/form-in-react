import React from "react";
import {
  Checkbox,
  Switch,
  FormControlLabel,
  Typography,
} from "@material-ui/core";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import MainContainer from "./components/MainContainer";
import Form from "./components/Form";
import Input from "./components/Input";
import PrimaryButton from "./components/PrimaryButton";
import { useData } from "./DataContext";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Email should have correct format")
    .required("Email is required"),
  phoneNumber: yup
    .string()
    .matches(/^([^a-z]*)$/, "Phone number should not contain a letter"),
});

export default function Step2() {
  const history = useHistory();

  const { data, setValues } = useData({});

  const { register, handleSubmit, errors, watch } = useForm({
    defaultValues: {
      email: data.email,
      hasPhone: data.hasPhone,
      phoneNumber: data.hasPhone ? data.phoneNumber : '',
    },
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const hasPhone = watch("hasPhone");

  const onSubmit = (data) => {
    setValues(data);
    history.push("/step3");
  };

  const normalizePhoneNumber = (value) => {
    const phoneNumber = parsePhoneNumberFromString(value);
    if (!phoneNumber) {
      return value;
    }

    return phoneNumber.formatInternational();
  };

  return (
    <MainContainer>
      <Typography component="h2" variant="h5">
        Step 3
      </Typography>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          ref={register}
          id="email"
          type="email"
          label="Email"
          name="email"
          error={!!errors.email}
          helperText={errors?.email?.message}
          required
        />
        <FormControlLabel
          label="Do you have a phone?"
          control={
            <Switch
              defaultValue={data.hasPhone}
              defaultChecked={data.hasPhone}
              id="hasPhone"
              name="hasPhone"
              color="primary"
              inputRef={register}
            />
          }
        />
        {hasPhone && (
          <Input
            ref={register}
            id="phoneNumber"
            type="tel"
            label="Phone Number +_ ___ ___ ____"
            name="phoneNumber"
            defaultValue={data.phoneNumber}
            onChange={(event) =>
              (event.target.value = normalizePhoneNumber(event.target.value))
            }
            error={!!errors.phoneNumber}
            helperText={errors?.phoneNumber?.message}
          />
        )}
        <PrimaryButton>Next</PrimaryButton>
      </Form>
    </MainContainer>
  );
}
