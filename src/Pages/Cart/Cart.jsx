import "./Cart.css";
import { CgCloseO } from "react-icons/cg";
import NavBar from "../../Components/Navbar/NavBar";
import { IoBagCheckOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import {
  getAllCartItemsByUserId,
  RemoveFromCart,
} from "../../Redux/Services/cartServices";

const Cart = () => {
  const dispatch = useDispatch();

  const [cartProducts, setCartProducts] = useState([]);
  const [refetchCartData, setRefetchCartData] = useState(false);

  //fetch cart product
  useEffect(() => {
    const getUserCartProducts = async () => {
      const response = await dispatch(getAllCartItemsByUserId());
      setCartProducts(response.payload.data);
      setRefetchCartData(false);
    };
    getUserCartProducts();
  }, [dispatch, refetchCartData]);

  const handleRemoveFromCart = async (productId) => {
    await dispatch(RemoveFromCart(productId));
    setRefetchCartData(true);
  };

  const calculateTotalProce = () => {
    let total = 0;
    cartProducts.map((product) => {
      total = total + Number(product.productId.price);
      return total;
    });
    return total;
  };

  return (
    <>
      <NavBar />
      <div className="container mt-4 ">
        <div className="row">
          <h3 className="my-2">Cart Product List</h3>
        </div>
        {Array.isArray(cartProducts) &&
          cartProducts.length > 0 &&
          cartProducts.map((product) => (
            <div className="row mb-3" key={product.productId?._id}>
              <div
                className="col-8 col-sm-12 shadow p-3 "
                style={{ borderRadius: "8px" }}
              >
                <div className="row">
                  <div className="col-10">
                    <div className="">
                      <h5>{product.productId?.name}</h5>
                      <p>{product.productId?.price}</p>
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
                        onClick={() => handleRemoveFromCart(product._id)}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-4 col-sm-12 "></div>
            </div>
          ))}
        <div className="flex flex-end">
          <h5>{calculateTotalProce()}</h5>
        </div>
      </div>
    </>
  );
};

export default Cart;
