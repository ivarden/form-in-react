import React from "react";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import "fontsource-roboto";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(3, 0, 2),
    textAlign: "center",
    fontSize: "30px",
    color: "cornflowerblue",
    textShadow: "1px 1px blue",
  },
}));

export default function Header() {
  const styles = useStyles();
  return (
    <Typography className={styles.root} component="h1" variant="h5">
      React Form Sample
    </Typography>
  );
}
