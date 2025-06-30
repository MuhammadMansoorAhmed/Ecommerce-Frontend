import "./Cart.css";
import { CgCloseO } from "react-icons/cg";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import {
  getAllCartItemsByUserId,
  RemoveFromCart,
} from "../../Redux/Services/cartServices";
import { useNavigate } from "react-router-dom";
import NavBar from "../../Components/Navbar/NavBar";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [cartProducts, setCartProducts] = useState([]);
  const [refetchCartData, setRefetchCartData] = useState(false);

  useEffect(() => {
    const fetchCart = async () => {
      const res = await dispatch(getAllCartItemsByUserId());
      setCartProducts(res.payload.data);
      setRefetchCartData(false);
    };
    fetchCart();
  }, [dispatch, refetchCartData]);

  const handleRemoveFromCart = async (productId) => {
    await dispatch(RemoveFromCart(productId));
    setRefetchCartData(true);
  };

  const calculateTotal = () => {
    return cartProducts.reduce(
      (acc, curr) => acc + Number(curr.productId?.price || 0),
      0
    );
  };

  return (
    <>
      <NavBar />
      <div className="cart-page container my-5">
        <h3 className="mb-4 fw-bold">Shopping Cart</h3>

        {cartProducts.length === 0 ? (
          <div className="empty-cart text-center">
            <img
              src="/empty-cart.svg"
              alt="Empty Cart"
              width={200}
              className="mb-3"
            />
            <h5>Your cart is currently empty.</h5>
            <p className="text-muted">
              Looks like you haven&apos;t added anything yet.
            </p>
          </div>
        ) : (
          <div className="row">
            {/* Left: Cart Items */}
            <div className="col-md-8">
              {cartProducts.map((product) => (
                <div
                  className="cart-item-card shadow-sm mb-4 p-3 rounded d-flex align-items-center justify-content-between"
                  key={product.productId._id}
                >
                  <div className="d-flex align-items-center">
                    <img
                      src={product.productId?.images?.[0]?.url}
                      alt={product.productId.name}
                      className="cart-product-img me-3"
                    />
                    <div>
                      <h6 className="mb-1 fw-semibold">
                        {product.productId.name}
                      </h6>
                      <p className="text-muted mb-0">
                        PKR {product.productId.price}
                      </p>
                    </div>
                  </div>
                  <button
                    className="remove-btn"
                    onClick={() => handleRemoveFromCart(product._id)}
                  >
                    <CgCloseO size={24} />
                  </button>
                </div>
              ))}
            </div>

            {/* Right: Summary */}
            <div className="col-md-4">
              <div className="cart-summary shadow-sm p-4 rounded">
                <h5 className="fw-bold mb-3">Order Summary</h5>
                <div className="d-flex justify-content-between mb-2">
                  <span>Items:</span>
                  <span>{cartProducts.length}</span>
                </div>
                <div className="d-flex justify-content-between mb-3">
                  <span>Total:</span>
                  <strong>PKR {calculateTotal()}</strong>
                </div>
                <button
                  className="checkout-btn w-100 mt-3"
                  onClick={() => navigate("/payment")}
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
