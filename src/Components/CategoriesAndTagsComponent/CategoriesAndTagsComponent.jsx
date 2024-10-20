import { useEffect, useState } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { useDispatch } from "react-redux";
import {
  getAllCategories,
  deleteCategory,
} from "../../Redux/Services/categoryServices";
import AddCategoryForm from "./AddCategoryForm";
import AddSubcategoryForm from "./AddSubCategoryForm";
import AddTagForm from "./AddTagForm";

const CategoriesAndTagsComponent = () => {
  const dispatch = useDispatch();
  const [categories, setCategories] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [addCategoryForm, setAddCategoryForm] = useState(false);
  const [addSubCategoryForm, setAddSubCategoryForm] = useState(false);
  const [addCategoryTagForm, setAddCategoryTagForm] = useState(false);

  // Fetch all categories
  useEffect(() => {
    const fetchCategories = async () => {
      const response = await dispatch(getAllCategories());
      if (response.meta.requestStatus === "fulfilled") {
        setCategories(response.payload.data);
      }
    };
    fetchCategories();
  }, [dispatch]);

  // Handle Delete Category
  const handleDeleteCategory = async (categoryId) => {
    await dispatch(deleteCategory(categoryId));
    setShowDeleteModal(false);
    // Re-fetch categories after deletion
    const response = await dispatch(getAllCategories());
    if (response.meta.requestStatus === "fulfilled") {
      setCategories(response.payload.data);
    }
  };

  const handleCloseForm = () => {
    setAddCategoryForm(false);
    setAddSubCategoryForm(false);
    setAddCategoryTagForm(false);
  };

  // // Handle Adding Category
  // const handleAddCategory = async (categoryData) => {
  //   await dispatch(addCategory(categoryData));
  //   setAddCategoryForm(false);
  //   // Re-fetch categories after addition
  //   const response = await dispatch(getAllCategories());
  //   if (response.meta.requestStatus === "fulfilled") {
  //     setCategories(response.payload.data);
  //   }
  // };

  return (
    <div>
      {/* Delete Modal */}
      {showDeleteModal && (
        <Modal
          show={showDeleteModal}
          onHide={() => setShowDeleteModal(false)}
          variant="dark"
        >
          <Modal.Header
            className=""
            closeButton
            style={{
              backgroundColor: "#1C4240",
              borderRadius: "0px 0px 0px 0px",
            }}
          >
            <Modal.Title className="text-warning">Warning</Modal.Title>
          </Modal.Header>
          <Modal.Body
            className="text-white"
            style={{ backgroundColor: "#1C4240" }}
          >
            Are you sure you want to delete this category?
          </Modal.Body>
          <Modal.Footer
            style={{
              backgroundColor: "#1C4240",
              borderRadius: "0px 0px 0px 0px",
            }}
          >
            <Button
              variant="secondary"
              onClick={() => setShowDeleteModal(false)}
            >
              Close
            </Button>
            <Button
              variant="danger"
              onClick={() => handleDeleteCategory(selectedCategory)}
            >
              Delete Category
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      {/* Main Section */}
      <div>
        <h2 className="text-center border-bottom pb-3">
          Categories, Subcategories, and Tags
        </h2>

        <div className="d-flex justify-content-end my-3 mx-2 ">
          <Button
            style={{ borderRadius: "8px" }}
            varient="primary"
            onClick={() => setAddCategoryForm(true)}
          >
            Add Category
          </Button>
          <Button
            style={{ borderRadius: "8px", marginLeft: "10px" }}
            varient="primary"
            onClick={() => setAddSubCategoryForm(true)}
          >
            Add Subcategory
          </Button>
          <Button
            style={{ borderRadius: "8px", marginLeft: "10px" }}
            varient="primary"
            onClick={() => setAddCategoryTagForm(true)}
          >
            Add Tag
          </Button>
        </div>
        {addCategoryForm ? (
          <AddCategoryForm closeForm={handleCloseForm} />
        ) : addSubCategoryForm ? (
          <AddSubcategoryForm closeForm={handleCloseForm} />
        ) : addCategoryTagForm ? (
          <AddTagForm closeForm={handleCloseForm} />
        ) : (
          <Row>
            {/* Table 1: Category */}
            <Col sm={12} md={4} lg={4} xl={4} className="p-3">
              <h4 className="text-center border-bottom pb-2">Categories</h4>
              <table className="tableLayout mt-4 px-2 border">
                <thead>
                  <tr>
                    <th className="border p-1">Category</th>
                    <th className="border p-1">Options</th>
                  </tr>
                </thead>
                <tbody>
                  {categories?.map((categoryItem, index) => (
                    <tr key={index}>
                      <td className="border p-1">{categoryItem?.category}</td>
                      <td className="border p-1">
                        <MdOutlineDeleteOutline
                          size={20}
                          style={{ color: "lightCoral", cursor: "pointer" }}
                          onClick={() => {
                            setShowDeleteModal(true);
                            setSelectedCategory(categoryItem._id);
                          }}
                        />
                        <FaRegEdit
                          size={20}
                          style={{ color: "seaGreen", cursor: "pointer" }}
                          // Add edit logic here
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Col>

            {/* Table 2: Subcategories */}
            <Col sm={12} md={4} lg={4} xl={4} className="p-3">
              <h4 className="text-center border-bottom pb-2">Subcategories</h4>
              <table className="tableLayout mt-4 px-2 border">
                <thead>
                  <tr>
                    <th className="border p-1">Category</th>
                    <th className="border p-1">Subcategories</th>
                    <th className="border p-1">Options</th>
                  </tr>
                </thead>
                <tbody>
                  {categories?.map((categoryItem, index) => (
                    <tr key={index}>
                      <td className="border p-1">{categoryItem.category}</td>
                      <td className="border p-1">
                        {categoryItem?.subCategries.length > 0
                          ? categoryItem?.subCategries.join(", ")
                          : "No Subcategories"}
                      </td>
                      <td className="border p-1">
                        <MdOutlineDeleteOutline
                          size={20}
                          style={{ color: "lightCoral", cursor: "pointer" }}
                        />
                        <FaRegEdit
                          size={20}
                          style={{ color: "seaGreen", cursor: "pointer" }}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Col>

            {/* Table 3: Tags */}
            <Col sm={12} md={4} lg={4} xl={4} className="p-3">
              <h4 className="text-center border-bottom pb-2">Tags</h4>
              <table className="tableLayout mt-4 px-2 border">
                <thead>
                  <tr>
                    <th className="border p-1">Subcategories</th>
                    <th className="border p-1">Tags</th>
                    <th className="border p-1">Options</th>
                  </tr>
                </thead>
                <tbody>
                  {categories?.map((categoryItem, index) => (
                    <tr key={index}>
                      <td className="border p-1">
                        {categoryItem?.subCategries.length > 0
                          ? categoryItem?.subCategries.join(", ")
                          : "No Subcategories"}
                      </td>
                      <td className="border p-1">
                        {categoryItem?.tags.length > 0
                          ? categoryItem?.tags.join(", ")
                          : "No Tags"}
                      </td>
                      <td className="border p-1">
                        <MdOutlineDeleteOutline
                          size={20}
                          style={{ color: "lightCoral", cursor: "pointer" }}
                        />
                        <FaRegEdit
                          size={20}
                          style={{ color: "seaGreen", cursor: "pointer" }}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Col>
          </Row>
        )}
      </div>
    </div>
  );
};

export default CategoriesAndTagsComponent;
