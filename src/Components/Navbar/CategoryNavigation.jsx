import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab, { tabClasses } from "@mui/joy/Tab";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllCategories } from "../../Redux/Services/categoryServices";
import { selectIsLoadingState } from "../../Redux/Features/categorySlice";
import { useNavigate } from "react-router-dom";

const CategoryNavigation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoading = useSelector(selectIsLoadingState);
  const [categories, setCategories] = useState([]);
  const [tabValue, setTabValue] = useState(""); // State to track active tab

  useEffect(() => {
    const fetchAllCategories = async () => {
      if (categories.length === 0) {
        const response = await dispatch(getAllCategories());
        setCategories(response.payload.data);
      }
    };
    fetchAllCategories();
  }, [dispatch, categories]);

  // Handler to track tab change
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    console.log("Selected Tab Value:", newValue);
    navigate(`/products/category/${newValue}`); // Navigate to the corresponding product list page when a tab is selected
  };

  return (
    <>
      {!isLoading && (
        <div
          className="d-flex justify-content-start px-3"
          style={{ backgroundColor: "#F0F4F8", overflowX: "auto" }}
        >
          <Tabs
            aria-label="tabs"
            value={tabValue} // Controlled tab value
            onChange={handleTabChange} // Track tab change
            sx={{ bgcolor: "transparent" }}
          >
            <TabList
              disableUnderline
              sx={{
                p: 0.5,
                gap: 0.5,
                borderRadius: "xl",
                bgcolor: "background.level1",
                [`& .${tabClasses.root}[aria-selected="true"]`]: {
                  boxShadow: "sm",
                  bgcolor: "background.surface",
                },
              }}
            >
              {categories.map((category) => (
                <Tab key={category._id} disableIndicator value={category._id}>
                  {category.name.toUpperCase()}
                </Tab>
              ))}
            </TabList>
          </Tabs>
        </div>
      )}
    </>
  );
};

export default CategoryNavigation;
