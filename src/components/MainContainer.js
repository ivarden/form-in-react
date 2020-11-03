import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    // justifyContent: "center",
    // backgroundColor: "orange",
    margin: theme.spacing(4, 0, 0, 0),
  },
}));

export default function MainContainer({ children, ...props }) {
  const styles = useStyles();
  return (
    <Container
      className={styles.root}
      container="main"
      max-width="xs"
      {...props}
    >
      {children}
    </Container>
  );
}
