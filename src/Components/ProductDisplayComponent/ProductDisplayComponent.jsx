import {
  Carousel,
  Col,
  Container,
  Row,
  Spinner,
  Button,
  ButtonGroup,
} from "react-bootstrap";
import HomeFooter from "../HomeComponent/HomeFooter/HomeFooter";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductById } from "../../Redux/Services/productServices";
import { selectIsLoading } from "../../Redux/Features/productSlice";
import { FiMinus, FiPlus } from "react-icons/fi";
import { toast } from "react-toastify";
import { FaPen, FaStar, FaTrash } from "react-icons/fa6";
import {
  addProductReview,
  deleteProductReview,
  updateProductReview,
} from "../../Redux/Services/productReviewServices";

const ProductDisplayComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const isLoading = useSelector(selectIsLoading);
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(5);
  const [editing, setEditing] = useState(false);
  // const [editingReviewId, setEditingReviewId] = useState(null);
  const [hover, setHover] = useState(0);

  const user = useSelector((state) => state.auth.user); // adjust based on your store

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await dispatch(getProductById(id));
      setProduct(response.payload.data);
    };
    fetchProduct();
  }, [dispatch, id]);

  const handleIncrement = () => {
    if (quantity < product?.totalStockRemaining) {
      setQuantity((prev) => prev + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };


  return (
    <Container className="py-5">
      {isLoading || !product ? (
        <div className="text-center my-5">
          <Spinner animation="border" />
        </div>
      ) : (
        <>
          <Row className="g-5 align-items-start">
            {/* IMAGE SLIDER */}
            <Col md={6}>
              <div className="bg-white rounded shadow-sm p-3">
                <Carousel interval={null} className="rounded overflow-hidden">
                  {product?.images?.map((img, idx) => (
                    <Carousel.Item key={idx}>
                      <img
                        src={img.url}
                        alt={`Product ${idx + 1}`}
                        className="d-block w-100"
                        style={{
                          height: "500px",
                          objectFit: "contain",
                          borderRadius: "0.5rem",
                        }}
                      />
                    </Carousel.Item>
                  ))}
                </Carousel>
              </div>
            </Col>

            {/* PRODUCT DETAILS */}
            <Col md={6}>
              <div className="h-100 d-flex flex-column justify-content-between">
                <div>
                  <h2 className="fw-bold">{product?.name}</h2>
                  <p className="text-muted mb-1">
                    Category: <strong>{product?.category?.name}</strong>
                  </p>
                  <h3 className="text-dark fw-semibold my-3">
                    PKR {product?.price}
                  </h3>

                  <div className="d-flex align-items-center gap-3 my-3">
                    <span className="fw-semibold">Quantity:</span>
                    <ButtonGroup size="sm" className="rounded-pill border">
                      <Button
                        variant="light"
                        onClick={handleDecrement}
                        className="px-3"
                      >
                        <FiMinus />
                      </Button>
                      <Button variant="light" disabled className="px-4">
                        {quantity}
                      </Button>
                      <Button
                        variant="light"
                        onClick={handleIncrement}
                        className="px-3"
                      >
                        <FiPlus />
                      </Button>
                    </ButtonGroup>
                    <span className="text-muted">
                      {product?.totalStockRemaining} /{product?.totalStock} in
                      stock
                    </span>
                  </div>

                  <Button
                    onClick={() => navigate(`/${id}/order/${quantity}`)}
                    className="w-100 mt-3 modern-order-btn"
                    size="lg"
                  >
                    Place Order
                  </Button>
                </div>

                <hr className="my-4" />

                <div>
                  <h6 className="fw-semibold mb-1">Availability:</h6>
                  <p className="text-muted">
                    {product?.totalStockRemaining} units
                  </p>
                </div>
              </div>
            </Col>
          </Row>

          {/* DESCRIPTION */}
          <Row className="mt-5">
            <Col>
              <h5 className="fw-semibold mb-3">📝 Description</h5>
              <p className="text-muted">{product?.description}</p>
            </Col>
          </Row>

          {/* Reviews */}
          <Row className="mt-5">
            <Col>
              <h5 className="fw-semibold mb-3">
                💬 {editing ? "Edit Your Review" : "Leave a Review"}
              </h5>

              <form
                onSubmit={async (e) => {
                  e.preventDefault();

                  try {
                    const reviewData = { review: reviewText, rating };
                    if (editing) {
                      await dispatch(
                        updateProductReview({ productId: id, data: reviewData })
                      ).unwrap();
                      toast.success("Review updated");
                    } else {
                      await dispatch(
                        addProductReview({ productId: id, data: reviewData })
                      ).unwrap();
                      toast.success("Review added");
                    }

                    setReviewText("");
                    setRating(5);
                    setEditing(false);
                    // setEditingReviewId(null);

                    const refreshed = await dispatch(getProductById(id));
                    setProduct(refreshed.payload.data);
                  } catch (err) {
                    toast.error(err?.message || "Error submitting review");
                  }
                }}
                className="shadow p-2 rounded"
              >
                <div className="mb-3">
                  <textarea
                    className="form-control"
                    placeholder="Write your review"
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3 d-flex justify-content-between align-items-center gap-2">
                  <div className="mb-3">
                    <label className="fw-semibold d-block mb-2">Rating:</label>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <FaStar
                        key={star}
                        size={20}
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHover(star)}
                        onMouseLeave={() => setHover(0)}
                        className="me-1"
                        color={
                          (hover || rating) >= star ? "#ffc107" : "#e4e5e9"
                        }
                        style={{ cursor: "pointer" }}
                      />
                    ))}
                    <span className="ms-2 text-muted"></span>
                  </div>

                  <Button type="submit" variant="outline-primary">
                    {editing ? "Update Review" : "Submit Review"}
                  </Button>
                </div>
              </form>
            </Col>
          </Row>
          <Row className="mt-4">
            <Col>
              <h5 className="fw-semibold mb-3">🗂️ Reviews</h5>

              {product?.reviews?.length === 0 ? (
                <p className="text-muted">No reviews yet.</p>
              ) : (
                product.reviews.map((rev) => (
                  <div
                    key={rev._id}
                    className="border rounded p-3 mb-3 bg-light d-flex justify-content-between align-items-start"
                  >
                    <div>
                      <strong>{rev.userId?.fullName || "Anonymous"}</strong>
                      <p className="mb-1 text-muted d-flex align-items-center gap-2">
                        Rating:
                        {[1, 2, 3, 4, 5].map((star) => (
                          <FaStar
                            key={star}
                            size={16}
                            color={star <= rev.rating ? "#ffc107" : "#e4e5e9"}
                          />
                        ))}
                        <span className="ms-1">({rev.rating} / 5)</span>
                      </p>

                      <p className="mb-0">{rev.review}</p>
                    </div>

                    {user?._id === rev.userId?._id && (
                      <div className="d-flex gap-2">
                        <Button
                          variant="outline-primary"
                          size="sm"
                          onClick={() => {
                            setReviewText(rev.review);
                            setRating(rev.rating);
                            setEditing(true);
                            // setEditingReviewId(rev._id);
                          }}
                        >
                          <FaPen />
                        </Button>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={async () => {
                            if (
                              window.confirm(
                                "Are you sure you want to delete your review?"
                              )
                            ) {
                              try {
                                await dispatch(
                                  deleteProductReview({ productId: id })
                                ).unwrap();
                                toast.success("Review deleted");

                                const refreshed = await dispatch(
                                  getProductById(id)
                                );
                                setProduct(refreshed.payload.data);
                              } catch (err) {
                                toast.error(
                                  err?.message || "Error deleting review"
                                );
                              }
                            }
                          }}
                        >
                          <FaTrash />
                        </Button>
                      </div>
                    )}
                  </div>
                ))
              )}
            </Col>
          </Row>

          <HomeFooter />
        </>
      )}
    </Container>
  );
};

export default ProductDisplayComponent;
