import SideBar from "./SideBar";
import { Typography, Container, Grid } from "@mui/material";
import GoogleButton from "react-google-button";
import Inbox from "./Inbox";
import { useEffect, useState } from "react";

const Header = () => {
  const [logIn, setLogIn] = useState(false);
  const fetchData = () => {
    fetch("http://gmapi.mangoitsol.com/auth/google")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.url) {
          localStorage.setItem("login", true);
          window.location.href = data.url;
        }
      });
  };
  useEffect(() => {
    let getItem = localStorage.getItem("login") || false;
    setLogIn(getItem);
  }, [logIn]);
  const logOut = () => {
    localStorage.clear();
    window.location.reload();
  };
  return (
   <Container  maxWidth="xl">
      <Grid container >
        <Grid item xs={1}>
          {" "}
          <div id="header">
            <SideBar />
          </div>
        </Grid>
        <Grid item xs={11}>
          {logIn ? (
            <Inbox logOut={logOut} />
          ) : (
            <div className="signIn">
              <div className="content">
                <Typography
                  variant="h4"
                  component="div"
                  gutterBottom
                  style={{ padding: "0px 0px 10px 10px" }}
                >
                  AFFIDAVITS & RFI
                </Typography>
                <Typography
                  variant="h5"
                  component="div"
                  gutterBottom
                  style={{ padding: "0px 0px 10px 10px", width: "25%" }}
                >
                  Look Like You are not connected yet with your Google Account
                </Typography>
                <Typography
                  variant="subtitle1"
                  component="div"
                  style={{ padding: "20px 0px 20px 10px" }}
                  gutterBottom
                >
                  lets make your trip fun and simple
                </Typography>

                <GoogleButton
                  style={{ margin: "0px 0px 10px 10px" }}
                  onClick={fetchData}
                />
              </div>
            </div>
          )}
        </Grid>
      </Grid>
      </Container>
  );
};

export default Header;
