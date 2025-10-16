import React from "react";
import './customCard.css';

function CustomCard({ content }) {
  return (
    <div className="card customCard">
      {content}
    </div>
  );
}


export default CustomCard;
