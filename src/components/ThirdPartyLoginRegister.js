import React from "react";
import { MDBBtn, MDBIcon } from "mdb-react-ui-kit";

export default function ThirdPartyLoginRegister() {
  return (
    <div
      className="d-flex justify-content-between mx-auto other-login"
      style={{ width: "40%" }}
    >
      <MDBBtn
        tag="a"
        color="white"
        className="m-1"
        style={{ color: "#1266f1" }}
      >
        <MDBIcon fab icon="facebook-f" size="lg" />
      </MDBBtn>

      <MDBBtn
        tag="a"
        color="white"
        className="m-1"
        style={{ color: "#1266f1" }}
      >
        <MDBIcon fab icon="twitter" size="lg" />
      </MDBBtn>

      <MDBBtn
        tag="a"
        color="white"
        className="m-1"
        style={{ color: "#1266f1" }}
      >
        <MDBIcon fab icon="google" size="v" />
      </MDBBtn>
    </div>
  );
}
