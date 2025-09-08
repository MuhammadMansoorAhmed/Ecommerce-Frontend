import ManageProductsComponent from "../../Components/ManageProductsComponent/ManageProductsComponent";

const ManageProducts = () => {
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
      <ManageProductsComponent />
    </div>
  );
};

export default ManageProducts;
