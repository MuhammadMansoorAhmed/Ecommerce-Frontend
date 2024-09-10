import { Col, Row } from "react-bootstrap";

import { MdOutlineDeleteOutline, MdOutlineEdit } from "react-icons/md";

const CategoriesAndTagsComponent = () => {
  return (
    <div>
      <h2 className="text-center">Categories And Tags</h2>
      <Row>
        <Col sm={12} md={6} lg={6} xl={6} className="p-3">
          <table className="tableLayout mt-4 px-2 border">
            <thead>
              <th className="border p-1">Category</th>
              <th className="border p-1">Options</th>
            </thead>
            <tbody>
              <td className="border p-1">Product Category</td>
              <td className="border p-1">
                <MdOutlineDeleteOutline
                  size={20}
                  style={{ cursor: "pointer" }}
                />
                <MdOutlineEdit size={20} style={{ cursor: "pointer" }} />
              </td>
            </tbody>
          </table>
        </Col>
        <Col sm={12} md={6} lg={6} xl={6} className="p-3">
          <table className="tableLayout mt-4 px-2 border">
            <thead>
              <th className="border p-1">Tags</th>
              <th className="border p-1">Options</th>
            </thead>
            <tbody>
              <td className="border p-1"> Tags</td>
              <td className="border p-1">
                <MdOutlineDeleteOutline
                  size={20}
                  style={{ cursor: "pointer" }}
                />
                <MdOutlineEdit size={20} style={{ cursor: "pointer" }} />
              </td>
            </tbody>
          </table>
        </Col>
      </Row>
    </div>
  );
};

export default CategoriesAndTagsComponent;
