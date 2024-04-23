import React from "react";

const ItemComponent = (props) => {
  if (props.title == "Account Number") {
    var classes = "info-item-value bg-dark-500 tracking-wide hover:tracking-widest";
  } else {
    var classes = "info-item-value";
  }
  return (
    <>
      <div className="info-item grid grid-cols-2 gap-2 mb-2">
        <span className="info-item-title font-bold mr-2 mb-2">{props.title}:</span>
        <span className={classes}>{props.value}</span>
      </div>
    </>
  );
};

export default ItemComponent;
