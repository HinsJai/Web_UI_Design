import React, { useState } from "react";
import {
  Container,
  Grid,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  IconButton,
  TextField,
} from "@mui/material";
import CustomerIcon from "../img/client.png";
import DeliveryPersonnelIcon from "../img/delivery.png";
import { IoIosSend } from "react-icons/io";
import { TiTick } from "react-icons/ti";

export default function ChatRoom() {
  const [message, setMessage] = useState("");
  const [sendMessage, setSendMessage] = useState("");
  const [customerMessage, setCustomerMessage] = useState(false);
  const [read, setRead] = useState(false);

  const handleSend = () => {
    setSendMessage(message);
    setMessage("");
    setTimeout(() => {
      setCustomerMessage(true);
    }, 4000);

    setTimeout(() => {
      setRead(true);
    }, 5000);
  };
  return (
    // <Container
    //   maxWidth="lg"
    //   style={{ backgroundColor: "#eee", paddingTop: "2rem" }}
    // >
    <div className="w-[750px] ">
      <hr />
      <Grid container>
        <Grid item xs={12} md={10} lg={8} xl={6}>
          <Card id="chat2" className="">
            <div>
              <CardHeader title="Peter" subheader="Online" />
            </div>
            <div className="divider d-flex align-items-center mb-4">
              <p className="text-center text-gray-400 mx-3 mb-0">Today</p>
            </div>
            <CardContent className="h-[675px]">
              {sendMessage && (
                <div className="d-flex flex-row justify-content-end">
                  <div className="flex justify-end">
                    <img
                      src={DeliveryPersonnelIcon}
                      alt="avatar 1"
                      className="w-[45px] h-[100%]"
                    />
                  </div>
                  <div>
                    <p className="small p-2 mb-1 rounded-md bg-gray-300">
                      {sendMessage}
                    </p>
                    <p className="flex justify-end small rounded-3 text-muted text-gray-400">
                      23:58:40 P.M.
                    </p>
                    {customerMessage && (
                      <p className="flex justify-end small mb-3  rounded-3 text-muted text-blue-400">
                        <TiTick />
                      </p>
                    )}
                  </div>
                </div>
              )}
              {customerMessage && (
                <div className="d-flex flex-row justify-content-end mb-4 pt-1">
                  <div>
                    <img
                      src={CustomerIcon}
                      alt="avatar 1"
                      className="w-[45px] h-[100%] mb-1"
                    />
                    <p className="small p-2 mb-1 rounded-md bg-gray-300">
                      I'm ready, thank you!
                    </p>
                    <p className="small me-3 rounded-3 text-muted d-flex justify-content-end text-gray-400">
                      23:58:44 P.M.
                    </p>
                    {read && (
                      <p className="flex small mb-3 rounded-3 text-muted text-blue-400">
                        <TiTick />
                      </p>
                    )}
                  </div>
                </div>
              )}
              {/* {sendMessage && (
                <div className="d-flex flex-row justify-content-end mb-4 pt-1">
                  <div>
                    <div className="flex justify-end">
                      <img
                        src={DeliveryPersonnelIcon}
                        alt="avatar 1"
                        className="w-[45px] h-[100%]"
                      />
                    </div>
                    <p className="small p-2 mb-1 rounded-md bg-gray-300">
                      {sendMessage}
                    </p>
                    <p className="flex justify-end small mb-3 rounded-3 text-muted text-gray-400">
                      00:20
                    </p>
                  </div>
                </div>
              )} */}
            </CardContent>
            <CardActions>
              <div className="">
                <hr className="" />
                <div style={{ display: "flex", alignItems: "center" }}>
                  <input
                    placeholder="Type message"
                    className="w-[320px] p-2 mt-1 h-[70px]"
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value);
                    }}
                  />
                  <IconButton
                    color="inherit"
                    onClick={() => handleSend(sendMessage)}
                  >
                    <IoIosSend className="hover:text-emerald-500" />
                  </IconButton>
                </div>
              </div>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </div>
    // </Container>
  );
}
