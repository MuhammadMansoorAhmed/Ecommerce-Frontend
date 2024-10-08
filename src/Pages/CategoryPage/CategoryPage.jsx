import CategoryPageComponent from "../../Components/CategoryPageComponents/CategoryPageComponent";


const CategoryPage = () => {
  // const pathName = window.location.pathname;
  // const categoryId = pathName.split("/")[2];
  // const categoryName = pathName.split("/")[3];
  // console.log(categoryId + "\n" + categoryName);
  return (
    <div className="w-100 p-4 p-md-0">
      <CategoryPageComponent />
    </div>
  );
};

export default CategoryPage;
