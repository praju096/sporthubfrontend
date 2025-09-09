import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { getProductById } from "../redux/features/products/productSlice";
import { toast } from "react-toastify";
import { addToCart } from "../redux/features/cart/cartSlice";
import { addWishlist } from "../redux/features/wishlist/wishlistSlice";
import Rating from "./Rating";
import { fetchReviews } from "../redux/features/review/reviewSlice";

const ProductDetail = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const productId = Number(id);

    const { productDetail, loading, error } = useSelector(
        (state: RootState) => state.products
    );
    const { user } = useSelector((state: RootState) => state.auth);
    const cartItems = useSelector((state: RootState) => state.cart.userCart);
    const wishlistItems = useSelector((state: RootState) => state.wishlist.wishlist);
    const reviews = useSelector((state: RootState) => state.reviews.reviews);

    useEffect(() => {
        if (productId) {
            dispatch(getProductById(productId));
            dispatch(fetchReviews(productId));
        }
    }, [productId, dispatch]);

    if (loading)
        return (
            <div className="text-center py-5" style={{ marginTop: "100px" }}>
                <div className="spinner-border text-danger" role="status"></div>
            </div>
        );

    if (error)
        return (
            <div className="text-center text-danger py-5" style={{ marginTop: "100px" }}>
                {error}
            </div>
        );

    if (!productDetail) return null;

    const handleAddToCart = async (productId: number) => {
        if (!user) {
            toast.warning("Please log in to add items to your wishlist.");
            navigate('/login');
            return;
        }
        await dispatch(addToCart({ product_id: productId, quantity: 1 }));
        toast.success("Product Add In Cart");
    };
    const handleAddToWishlist = async (productId: number) => {
        if (!user) {
            toast.warning("Please log in to add items to your wishlist.");
            navigate('/login');
            return;
        }
        await dispatch(addWishlist({ product_id: productId }));
        toast.success("Product Add In Wishlist");
    };

    const isInCart = cartItems.some(item => item.product_id === productDetail.id);
    const isInWishlist = wishlistItems.some(item => item.product_id === productDetail.id);

    return (
        <div className="container py-5 mt-5">
            <div className="row g-4 align-items-center">
                <div className="col-md-6 text-center">
                    <div className="p-3 bg-light rounded-4 shadow-lg">
                        <img
                            src={`${process.env.REACT_APP_API_URL}${productDetail.image_url}`}
                            alt={productDetail.name}
                            className="img-fluid rounded-4"
                            style={{ maxHeight: "450px", objectFit: "contain" }}
                        />
                    </div>
                </div>

                <div className="col-md-6">
                    <h1 className="fw-bold text-dark mb-3">{productDetail.name}</h1>

                    <div className="mb-3">
                        {productDetail.is_new ? (<span className="badge bg-success me-2">NEW</span>) : null}
                        {productDetail.is_on_sale ? (<span className="badge bg-danger">SALE</span>) : null}
                    </div>

                    <div className="mb-4">
                        <span className="fs-3 fw-bold text-danger">₹{productDetail.price}</span>
                        {Number(productDetail.original_price) > 0 && (
                            <span className="text-muted text-decoration-line-through ms-2">
                                ₹{productDetail.original_price}
                            </span>
                        )}
                    </div>

                    {productDetail.rating && (
                        <div className="mb-4">
                            <Rating rating={productDetail.rating} />
                        </div>
                    )}

                    <p className="mb-1">
                        <strong>Category:</strong>{" "}
                        <span className="text-secondary">{productDetail.category_name}</span>
                    </p>
                    <p className="mb-1">
                        <strong>Brand:</strong>{" "}
                        <span className="text-secondary">{productDetail.brand_name}</span>
                    </p>
                    <p className="mb-4">
                        <strong>Gender:</strong>{" "}
                        <span className="text-secondary">{productDetail.category_gender}</span>
                    </p>

                    {productDetail.description && (
                        <p className="text-muted mb-4" style={{ lineHeight: "1.7" }}>
                            {productDetail.description}
                        </p>
                    )}

                    <div className="d-flex gap-3">
                        <button className="btn btn-danger btn-lg px-4 shadow-sm"
                            onClick={() => handleAddToCart(productDetail.id)}
                            disabled={isInCart}
                        >
                            {isInCart ? (
                                <><i className="fas fa-check-circle me-2"></i> Added to Cart</>
                            ) : (
                                <><i className="fas fa-shopping-cart me-2"></i> Add to Cart</>
                            )}
                        </button>
                        <button className="btn btn-outline-dark btn-lg px-4 shadow-sm"
                            onClick={() => handleAddToWishlist(productDetail.id)}
                            disabled={isInWishlist}
                        >
                            {isInWishlist ? (
                                <><i className="fas fa-heart me-1"></i> In Wishlist</>
                            ) : (
                                <><i className="far fa-heart me-1"></i> Add to Wishlist</>
                            )}
                        </button>
                    </div>
                </div>
            </div>
            <div className="mt-5">
                <ul className="nav nav-tabs" id="productTabs" role="tablist">
                    <li className="nav-item" role="presentation">
                        <button
                            className="nav-link active text-dark fw-bold"
                            id="desc-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#description"
                            type="button"
                            role="tab"
                        >
                            Description
                        </button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button
                            className="nav-link text-dark fw-bold"
                            id="review-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#reviews"
                            type="button"
                            role="tab"
                        >
                            Reviews
                        </button>
                    </li>
                </ul>
                <div className="tab-content border p-4 rounded-bottom" id="productTabsContent">
                    <div className="tab-pane fade show active" id="description" role="tabpanel">
                        <p className="text-muted">{productDetail.description || "No additional details available."}</p>
                    </div>
                    <div className="tab-pane fade" id="reviews" role="tabpanel">
                        <div className="mb-4">
                            <h1 className="">Customer Reviews</h1>
                        </div>
                        {reviews && reviews.length > 0 ? (
                            <div className="list-group">
                                {reviews.map((review) => (
                                    <div
                                        key={review.id}
                                        className="list-group-item mb-3 shadow-sm rounded"
                                    >
                                        <div className="d-flex align-items-start mb-2">
                                            <div
                                                className="rounded-circle bg-secondary text-white d-flex justify-content-center align-items-center me-3"
                                                style={{
                                                    width: 48,
                                                    height: 48,
                                                    fontWeight: "600",
                                                    fontSize: "1.2rem",
                                                    userSelect: "none",
                                                }}
                                                title={review.user_name}
                                            >
                                                {review.user_name
                                                    ? review.user_name
                                                        .split(" ")
                                                        .map((n) => n[0])
                                                        .join("")
                                                        .toUpperCase()
                                                    : "U"}
                                            </div>
                                            <div className="flex-grow-1">
                                                <div className="d-flex justify-content-between align-items-center mb-1">
                                                    <h6 className="mb-0">{review.title}</h6>
                                                    <div>
                                                        <Rating rating={review.rating} />
                                                    </div>
                                                </div>
                                                <p className="mb-1">{review.comment}</p>
                                                <small className="text-muted d-block mb-2">
                                                    Reviewed by <strong>{review.user_name}</strong> on{" "}
                                                    {review.created_at
                                                        ? new Date(review.created_at).toLocaleDateString()
                                                        : "N/A"}
                                                </small>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-muted">
                                No reviews yet. Be the first to review this product!
                            </p>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
