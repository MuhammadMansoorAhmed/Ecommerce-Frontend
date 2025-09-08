import CategoriesAndTagsComponent from "../../Components/CategoriesAndTagsComponent/CategoriesAndTagsComponent";

const CategoriesAndTags = () => {
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
      <CategoriesAndTagsComponent />
    </div>
  );
};

export default CategoriesAndTags;
