import InventoryManagementComponent from "../../Components/InventoryManagementComponent/InventoryManagementComponent";

const InventoryManagement = () => {
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
      <InventoryManagementComponent />
    </div>
  );
};

export default InventoryManagement;
