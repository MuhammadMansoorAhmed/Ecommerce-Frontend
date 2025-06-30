// Redesigned CategoryNavigation with Clean Styling and MUI Joy Tabs
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
  const [tabValue, setTabValue] = useState("");

  useEffect(() => {
    const fetchAllCategories = async () => {
      if (categories.length === 0) {
        const response = await dispatch(getAllCategories());
        setCategories(response.payload.data);
      }
    };
    fetchAllCategories();
  }, [dispatch, categories]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    navigate(`/products/category/${newValue}`);
  };

  return (
    <>
      {!isLoading && (
        <div
          className="px-2 py-2 border-top border-bottom"
          style={{ backgroundColor: "#e3f3fb", overflowX: "auto" }}
        >
          <Tabs
            aria-label="Category Tabs"
            value={tabValue}
            onChange={handleTabChange}
            sx={{
              bgcolor: "transparent",
              width: "100%",
            }}
          >
            <TabList
              disableUnderline
              sx={{
                p: 0.5,
                gap: 1,
                display: "flex",
                flexWrap: "nowrap",
                overflowX: "auto",
                [`& .${tabClasses.root}`]: {
                  fontWeight: 500,
                  fontSize: 13,
                  px: 2,
                },
                [`& .${tabClasses.root}[aria-selected="true"]`]: {
                  bgcolor: "#b3e1f5",
                  color: "#222",
                  borderRadius: "6px",
                },
              }}
            >
              {categories?.map((category) => (
                <Tab
                  key={category._id}
                  disableIndicator
                  value={category._id}
                  className="text-uppercase d-flex align-items-center gap-1"
                >
                  <GoDotFill size={6} />
                  {category?.name}
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
