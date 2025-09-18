import React from "react";
import './PillDetail.css';

export default function PillDetail({ label, type }) {
  return (
    <span className={`pill pill--${type}`}>
      {label}
    </span>
  );
}
