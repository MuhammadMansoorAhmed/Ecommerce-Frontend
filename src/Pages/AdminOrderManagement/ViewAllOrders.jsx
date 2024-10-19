import React from "react";
import ManageOrdersComponent from "./ManageOrdersComponent";

const ViewAllOrders = () => {
  return (
    <div
      style={{
        backgroundColor: "#212529",
        color: "white",
        height: "100dvh",
        width: "100dvw",
        padding: "12px",
      }}
    >
      <ManageOrdersComponent />
    </div>
  );
};

export default ViewAllOrders;
