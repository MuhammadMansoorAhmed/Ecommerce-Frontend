import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab, { tabClasses } from "@mui/joy/Tab";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllCategories } from "../../Redux/Services/categoryServices";
import { selectIsLoadingState } from "../../Redux/Features/categorySlice";
import { useNavigate } from "react-router-dom";
import { GoDotFill } from "react-icons/go";

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
          className="d-flex justify-content-start px-1"
          style={{ backgroundColor: "#F0F0F0", overflowX: "auto" }}
        >
          <Tabs
            aria-label="tabs"
            value={tabValue} // Controlled tab value
            onChange={handleTabChange} // Track tab change
            sx={{
              bgcolor: "transparent",
              borderBottom: "1px solid rgb(159, 182, 182)",
              width: "100%",
            }}
          >
            <TabList
              disableUnderline
              sx={{
                p: 0.5,
                gap: 0.5,
                borderRadius: "md",
                color: "#628281",
                [`& .${tabClasses.root}[aria-selected="true"]`]: {
                  boxShadow: "sm",
                  bgcolor: "rgb(224, 231, 231)",
                },
              }}
            >
              {categories?.map((category) => (
                <Tab
                  key={category._id}
                  disableIndicator
                  value={category._id}
                  className="px-2 ms-2"
                >
                  <GoDotFill size={5} />
                  {category?.name?.toUpperCase()}
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
