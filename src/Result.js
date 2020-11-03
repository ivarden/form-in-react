import React from "react";
import { Link } from "react-router-dom";
import MainContainer from "./components/MainContainer";
import { useData } from "./DataContext";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  // Typography,
  Button,
  ButtonGroup,
} from "@material-ui/core";
import {
  Description as DescriptionIcon,
  AssignmentInd as AssignmentIndIcon,
  Edit as EditIcon,
  Save as SaveIcon,
} from "@material-ui/icons/";
import Swal from "sweetalert2";

export default function Step2() {
  const { data } = useData();
  const { files } = data;

  const entries = Object.entries(data).filter(
    (item) =>
      item[0] !== "files" && item[0] !== "hasPhone" && item[1].length !== 0
  );

  const onSubmit = async () => {
    const formData = new FormData();

    if (files) {
      files.forEach((file) => {formData.append("files", file, file.name)});
    }
    entries.forEach((entry) => {
      formData.append(entry[0], entry[1]);
    });

    console.log(files);
    console.log(entries);

    Swal.fire("Great Job!", "Your data was saved", "success");

    // const res = await fetch("http://localhost:4000", {
    //   method: "POST",
    //   body: formData,
    // });
    // if (res.status === 200) {
    //   Swal.fire("Great Job!", "Your data was saved", "success");
    // }
  };

  return (
    <MainContainer>
      {/* <Typography component="h2" variant="h5">
        Form values
      </Typography> */}
      <AssignmentIndIcon fontSize="large" color="primary" />
      <TableContainer component={Paper} style={{ marginBottom: "1rem" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Field</TableCell>
              <TableCell>Value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {entries.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item[0]}</TableCell>
                <TableCell>{item[1]}</TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell align="center" colSpan="2">
                <DescriptionIcon fontSize="large" color="primary" />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Size</TableCell>
            </TableRow>
            {files.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.size} bytes</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ButtonGroup variant="contained" color="primary">
        <Button color="secondary" margin="2" startIcon={<EditIcon />}>
          <Link style={{ color: "white", textDecoration: "none" }} to="/">
            Editing
          </Link>
        </Button>
        <Button startIcon={<SaveIcon />} onClick={onSubmit}>
          Save
        </Button>
      </ButtonGroup>
    </MainContainer>
  );
}
