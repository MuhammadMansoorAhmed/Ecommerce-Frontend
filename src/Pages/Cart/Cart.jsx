import "./Cart.css";
import { CgCloseO } from "react-icons/cg";
import NavBar from "../../Components/Navbar/NavBar";
import { IoBagCheckOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";

const Cart = () => {
  const dispatch = useDispatch();

  return (
    <>
      <NavBar />
      <div className="container mt-4 ">
        <div className="row">
          <h3 className="my-2">Cart</h3>
        </div>
        <div className="row">
          <div
            className="col-8 col-sm-12 shadow p-3 "
            style={{ borderRadius: "8px" }}
          >
            <div className="row">
              <div className="col-10">
                <div className="">
                  <h5>Product Name</h5>
                  <p>Product price</p>
                </div>
              </div>
              <div className="me-0 col-2">
                <div className="d-flex justify-content-end align-items-center py-4">
                  <IoBagCheckOutline
                    className="action-icon"
                    size={25}
                    style={{
                      backgroundColor: "#00ff0055",
                    }}
                  />
                  <CgCloseO
                    className="action-icon"
                    size={25}
                    style={{
                      backgroundColor: "#FF000055",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-4 col-sm-12 "></div>
        </div>
      </div>
    </>
  );
};

export default Cart;
