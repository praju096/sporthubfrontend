import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { getProductById } from "../redux/features/products/productSlice";

const ProductDetail = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useDispatch<AppDispatch>();

    const productId = Number(id);

    const { productDetail, loading, error } = useSelector(
        (state: RootState) => state.products
    );

    useEffect(() => {
        if (productId) dispatch(getProductById(productId));

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


    return (
        <div className="container py-5 mt-5">
            <div className="row g-5 align-items-center">
                {/* LEFT: Product Image */}
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

                {/* RIGHT: Product Details */}
                <div className="col-md-6">
                    <h1 className="fw-bold text-dark mb-3">{productDetail.name}</h1>

                    {/* Badges */}
                    <div className="mb-3">
                        {productDetail.is_new ? (<span className="badge bg-success me-2">NEW</span>) : null}
                        {productDetail.is_on_sale ? (<span className="badge bg-danger">SALE</span>) : null}
                    </div>

                    {/* Price */}
                    <div className="mb-4">
                        <span className="fs-3 fw-bold text-danger">₹{productDetail.price}</span>
                        {Number(productDetail.original_price) > 0 && (
                            <span className="text-muted text-decoration-line-through ms-2">
                                ₹{productDetail.original_price}
                            </span>
                        )}
                    </div>

                    {/* Rating */}
                    {productDetail.rating && (
                        <div className="mb-4">
                            <span className="text-warning fs-4">
                                {"★".repeat(Math.floor(productDetail.rating))}
                                {"☆".repeat(5 - Math.floor(productDetail.rating))}
                            </span>
                            <span className="text-muted ms-2 fs-6">
                                ({productDetail.rating})
                            </span>
                        </div>
                    )}

                    {/* Category & Gender */}
                    <p className="mb-1">
                        <strong>Category:</strong>{" "}
                        <span className="text-secondary">{productDetail.category}</span>
                    </p>
                    <p className="mb-4">
                        <strong>Gender:</strong>{" "}
                        <span className="text-secondary">{productDetail.category_gender}</span>
                    </p>

                    {/* Description */}
                    {productDetail.description && (
                        <p className="text-muted mb-4" style={{ lineHeight: "1.7" }}>
                            {productDetail.description}
                        </p>
                    )}

                    {/* Buttons */}
                    <div className="d-flex gap-3">
                        <button className="btn btn-danger btn-lg px-4 shadow-sm">
                            <i className="fas fa-shopping-cart me-2"></i>Add to Cart
                        </button>
                        <button className="btn btn-outline-dark btn-lg px-4 shadow-sm">
                            <i className="fas fa-heart me-2"></i>Add to Wishlist
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
                        <p className="text-muted">No reviews yet.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
