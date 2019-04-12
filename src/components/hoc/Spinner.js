import React from "react";

import "./spinner.css";

export default function Spinner() {
  return (
    <div className="wrapper">
      <div className="lds-grid">
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  );
}
