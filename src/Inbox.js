import React, { useEffect, useState } from "react";

import { emailData } from "./data";
import {
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Collapse,
  Stack,
  Chip,
  TablePagination,
  Typography,
} from "@mui/material";

import MailOutlineIcon from "@mui/icons-material/MailOutline";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import AttachmentIcon from "@mui/icons-material/Attachment";

import CircleSharpIcon from "@mui/icons-material/CircleSharp";

import GoogleButton from "react-google-button";
import CropDinSharpIcon from "@mui/icons-material/CropDinSharp";

function Inbox(props) {
  const location = window.location;
  const [checked, setChecked] = useState([0]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [inbox, setInboxes] = useState([]);
  const splitData = location.search.split("&")[0];
  const tokenValue = splitData.split("=")[1];
  // const refreshToken=location.search.split("&")[1].split("=")[1]
  const user = location?.search?.split("&")[2]?.split("=")[1];
  const dataRefreshToken = () => {
    //if refresh Token is available we send it on
    fetch("http://gmapi.mangoitsol.com/getRefreshToken")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
      });
  };
  const fetchData = () => {
    fetch("http://gmapi.mangoitsol.com/inbox", {
      method: "get",
      headers: {
        token: tokenValue,
        "The-number-of-email": "1",
        User: user,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.length === 0) {
          setInboxes(emailData);
        }
      });
    fetch("http://gmapi.mangoitsol.com/verify", {
      method: "get",
      headers: {
        token: tokenValue,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        !data.status && dataRefreshToken();
      });
  };
  const handleChangePage = (e, newPage) => {
    setPage(newPage);
  };
  const handleDrop = (e, id) => {
    const currentIndex = checked.indexOf(id);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(id);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <div style={{ backgroundColor: "white" }}>
        <Typography variant="h5" style={{ marginTop: "3%" }}>
          Inbox
        </Typography>
        <Grid container item>
          <Grid item xs={1}>
            <Stack direction="row" alignItems="center" gap={1}>
              <MailOutlineIcon />

              <Typography variant="subtitle" color={"#808080"}>
                Emails
              </Typography>
            </Stack>
          </Grid>
          <Grid
            item
            xs={11}
            style={{
              position: "relative",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <TablePagination
              component="div"
              count={inbox.length}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              //onRowsPerPageChange={handleChangeRowsPerPage}
              rowsPerPageOptions={[{}]}
            />
            <div className="googleButton">
              <GoogleButton
                label="Sign Out With Google"
                style={{ margin: "0px 0px 10px 10px" }}
                onClick={props.logOut}
              />
            </div>
          </Grid>
        </Grid>
        {inbox
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((data) => {
            return (
              <List>
                <ListItem
                  style={{
                    border: "1px solid #CBD5E1",
                    display: "block",
                    textAlign: "inherit",
                  }}
                >
                  <ListItemButton dense>
                    <ListItemText
                      primary={
                        <>
                          {" "}
                          <Stack direction="row" alignItems="center" gap={1}>
                            <CircleSharpIcon
                              style={{ fill: "red", fontSize: 15 }}
                            />

                            <CropDinSharpIcon
                              style={{
                                fontSize: 55,
                                fill: "ghostwhite",
                                backgroundColor: "ghostwhite",
                              }}
                            />
                            <Stack
                              direction="column"
                              alignItems="center"
                              sx={{
                                position: "relative",
                                right: "4.5%",
                              }}
                            >
                              {" "}
                              <Typography
                                sx={{
                                  color: "black",
                                  fontSize: 20,
                                }}
                              >
                                {data.date.split(",")[0].split(" ")[1]}
                              </Typography>
                              <Typography
                                sx={{
                                  color: "black",
                                  fontSize: 15,
                                }}
                              >
                                {data.date.split(",")[0].split(" ")[0]}
                              </Typography>
                            </Stack>

                            <Typography
                              variant="h6"
                              color={"#808080"}
                              sx={{
                                position: "relative",
                                right: "2%",
                              }}
                            >
                              {data.subject}
                            </Typography>
                          </Stack>
                        </>
                      }
                      secondary={
                        <>
                          <Stack
                            direction="row"
                            alignItems="center"
                            gap={1}
                            component="span"
                          >
                            <Typography
                              sx={{
                                display: "inline",
                                margin: "5px",
                                "&:after": {
                                  content: '""',
                                  position: "absolute",
                                  height: "120%",
                                  right: "-2%",
                                  width: "1.5px",
                                  bgcolor: "divider",
                                },
                              }}
                              style={{
                                position: "relative",
                                left: "7%",
                              }}
                              component="span"
                              variant="body2"
                              color="text.primary"
                            >
                              {data.sender}
                            </Typography>

                            <Typography
                              component="span"
                              variant="body2"
                              color="text.primary"
                              style={{
                                position: "relative",
                                left: "7%",
                              }}
                            >
                              {data.date}
                            </Typography>
                            {data.attachments.length > 0 && (
                              <>
                                <Typography
                                  sx={{
                                    "&:before": {
                                      content: '""',
                                      position: "absolute",
                                      height: "87%",
                                      right: "53%",
                                      bottom: "51%",
                                      width: "1.5px",
                                      bgcolor: "divider",
                                      transform: "rotate(90deg)",
                                    },
                                  }}
                                  style={{
                                    transform: "rotate(270deg)",
                                    position: "relative",
                                    left: "7%",
                                  }}
                                >
                                  <AttachmentIcon />
                                </Typography>
                                <Typography
                                  component="span"
                                  variant="body2"
                                  color="text.primary"
                                  style={{
                                    position: "relative",
                                    left: "6%",
                                  }}
                                >
                                  {data.attachments.length}
                                </Typography>
                              </>
                            )}
                          </Stack>
                        </>
                      }
                      sx={{ textAlign: "initial" }}
                    />

                    <ListItemIcon className="arrow-icon"></ListItemIcon>
                    {data.labels.length > 0 &&
                      data.labels.map((label) => (
                        <Chip label={label} variant="outlined" />
                      ))}
                    <ArrowRightIcon onClick={(e) => handleDrop(e, data.id)} />
                  </ListItemButton>
                  <Collapse
                    in={checked.includes(data.id)}
                    timeout="auto"
                    unmountOnExit
                  >
                    <List component="div" disablePadding>
                      <ListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon></ListItemIcon>
                        <ListItemText
                          primary={
                            <Typography
                              sx={{
                                display: "inline-block",
                                margin: "5px",
                              }}
                              component="span"
                              variant="body2"
                              color="text.primary"
                            >
                              {data.content}
                            </Typography>
                          }
                          secondary={
                            <>
                              {" "}
                              <Typography
                                sx={{
                                  display: "inline",
                                  margin: "5px",
                                }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                              >
                                {data.receiver}
                              </Typography>
                              {data.attachments.length > 0 && (
                                <Typography
                                  sx={{
                                    display: "block",
                                    margin: "5px",
                                  }}
                                  component="div"
                                  variant="body2"
                                  color="text.primary"
                                >
                                  {data.attachments.map((i) => {
                                    if (i.startsWith("https://")) {
                                      return <a href={i}>{i}</a>;
                                    } else {
                                      return (
                                        <img
                                          src={`${i}`}
                                          alt="img"
                                          height="100px"
                                          width="100px"
                                          style={{ margin: "5px" }}
                                        />
                                      );
                                    }
                                  })}
                                </Typography>
                              )}
                            </>
                          }
                        />
                      </ListItemButton>
                    </List>
                  </Collapse>
                </ListItem>
              </List>
            );
          })}
      </div>
    </>
  );
}

export default Inbox;
