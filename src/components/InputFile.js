import React from "react";
import {
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
} from "@material-ui/core";
import Dropzone from "react-dropzone";
import { CloudUpload, InsertDriveFile } from "@material-ui/icons";
import { Controller } from "react-hook-form";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems:'center',
    justifyContent: 'center',
    // backgroundColor: "#ffd068dd",
    color: "ccc",
    cursor: "pointer",
    padding: "10px",
    marginTop: "20px",
  },
  icon: {
    marginTop: "16px",
    color: "rgb(24 103 203 / 87%)",
    fontSize: "42px",
  },
}));

const InputFile = ({ control, name }) => {
  const styles = useStyles();
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={[]}
      render={({ onChange, onBlur, value }) => (
        <>
          <Dropzone onDrop={onChange}>
            {({ getRootProps, getInputProps }) => (
              <Paper
                className={styles.root}
                variant="outlined"
                {...getRootProps()}
              >
                <CloudUpload className={styles.icon} />
                <input {...getInputProps()} name={name} onBlur={onBlur} />
                <p>Drag and drop files here or click to select files.</p>
              </Paper>
            )}
          </Dropzone>
          <List>
            {value.map((file, index) => (
              <ListItem key={index}>
                <ListItemIcon className={styles.icon}>
                  <InsertDriveFile />
                </ListItemIcon>
                <ListItemText primary={file.name} secondary={file.size} />
              </ListItem>
            ))}
          </List>
        </>
      )}
    />
  );
};
export default InputFile;
