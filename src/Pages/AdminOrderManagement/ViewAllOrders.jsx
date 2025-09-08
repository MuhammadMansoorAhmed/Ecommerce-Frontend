import React from "react";
import ManageOrdersComponent from "./ManageOrdersComponent";

const ViewAllOrders = () => {
  return (
    <div
      style={{
        background: "var(--background-gradient)",
        color: "var(--text-dark)",
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
