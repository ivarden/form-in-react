import React from "react";
import { Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import MainContainer from "./components/MainContainer";
import Form from "./components/Form";
import InputFile from "./components/InputFile";
import PrimaryButton from "./components/PrimaryButton";
import { useData } from "./DataContext";

export default function Step2() {
  const { data, setValues } = useData({});
  const { control, handleSubmit } = useForm({
    defaultValues: { files: data.files },
  });

  const onSubmit = (data) => {
    setValues(data);
    history.push("/result");
  };

  const history = useHistory();

  return (
    <MainContainer>
      <Typography component="h2" variant="h5">
        Step 3
      </Typography>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <InputFile name="files" control={control} />

        <PrimaryButton>Next</PrimaryButton>
      </Form>
    </MainContainer>
  );
}
