import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Footer from "../Home/Footer";
import { Product } from "../../types/productsTypes";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { fetchAllProducts, searchProducts } from "../../redux/features/products/productSlice";
import './Shop.css';
import { toast } from "react-toastify";
import { addToCart } from "../../redux/features/cart/cartSlice";
import { addWishlist } from "../../redux/features/wishlist/wishlistSlice";

const Shop: React.FC = () => {
    const { category } = useParams<{ category: string }>();
    const [searchQuery, setSearchQuery] = useState("");
    const [submittedQuery, setSubmittedQuery] = useState("");
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);
    const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
    const [selectedColors, setSelectedColors] = useState<string[]>([]);
    const [sortOption, setSortOption] = useState("featured");

    const dispatch = useDispatch<AppDispatch>();
    const { allProducts, loading, error } = useSelector((state: RootState) => state.products);
    const cartItems = useSelector((state: RootState) => state.cart.userCart);
    const wishlistItems = useSelector((state: RootState) => state.wishlist.wishlist);

    useEffect(() => {
        if (submittedQuery.trim() !== "") {
            dispatch(searchProducts(submittedQuery));
        } else {
            dispatch(fetchAllProducts());
            // dispatch(fetchProductsWithPage(1));
        }
    }, [dispatch, submittedQuery]);


    // Filter products based on category and other filters
    const filteredProducts = allProducts.filter((product: Product) => {
        const matchesCategory =
            !category ||
            (category === "men" && product.category_gender === "Men") ||
            (category === "women" && product.category_gender === "Women") ||
            (category === "kids" && product.category_gender === "Kids") ||
            (category === "new-arrivals" && product.is_new) ||
            (category === "sale" && product.is_on_sale);

        const matchesPrice =
            product.price >= priceRange[0] && product.price <= priceRange[1];

        return matchesCategory && matchesPrice;
    });

    // Sort products
    const sortedProducts = [...filteredProducts].sort((a, b) => {
        if (sortOption === "price-low") return a.price - b.price;
        if (sortOption === "price-high") return b.price - a.price;
        if (sortOption === "rating") return b.rating - a.rating;
        return a.id - b.id;
    });

    const pageTitle = category
        ? category.charAt(0).toUpperCase() + category.slice(1).replace("-", " ")
        : "All Products";

    const handleCategoryClick = (cat: string) => {
        sessionStorage.setItem("selectedCategory", cat);
    };

    const handleAddToWishlist = async (productId: number) => {
        await dispatch(addWishlist({ product_id: productId }));
        toast.success("Product Add In Wishlist");
    };

    const handleAddToCart = async (productId: number) => {
        await dispatch(addToCart({ product_id: productId, quantity: 1 }));
        toast.success("Product Add In Cart");
    };

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmittedQuery(searchQuery);
    };

    const handleClearSearch = () => {
        setSearchQuery("");
        setSubmittedQuery(""); // triggers fetchAllProducts
    };

    return (
        <div className="shop-page">
            {/* Hero Banner */}
            <div className="shop-hero mb-5">
                <div className="container">
                    <h1 className="display-4 fw-bold text-white">{pageTitle}</h1>
                    <p className="lead text-white">
                        Premium sports gear for {category || "everyone"}
                    </p>
                </div>
            </div>

            <div className="container">
                <div className="row">
                    <div className="col-md-3 mb-4">
                        <div className="card shadow-sm filter-card">
                            <div className="card-body">
                                <h5 className="card-title mb-4">FILTERS</h5>

                                <div className="mb-4">
                                    <form onSubmit={handleSearchSubmit}>
                                        <label className="form-label">Search Products</label>
                                        <div className="input-group shadow-sm">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Search products..."
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                                style={{ minHeight: "45px" }}
                                            />
                                            <button className="btn btn-danger" type="submit" title="Search">
                                                <i className="fas fa-search"></i>
                                            </button>
                                            <button
                                                type="button"
                                                className="btn btn-outline-secondary"
                                                onClick={handleClearSearch}
                                                title="Clear"
                                            >
                                                <i className="fas fa-times"></i>
                                            </button>
                                        </div>
                                    </form>
                                </div>

                                <div className="mb-4">
                                    <label className="form-label">Price Range</label>
                                    <input
                                        type="range"
                                        className="form-range"
                                        min="0"
                                        max="100000"
                                        step="10"
                                        value={priceRange[1]}
                                        onChange={(e) =>
                                            setPriceRange([priceRange[0], parseInt(e.target.value)])
                                        }
                                    />
                                    <div className="d-flex justify-content-between">
                                        <span>₹{priceRange[0]}</span>
                                        <span>₹{priceRange[1]}</span>
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <label className="form-label">Sizes</label>
                                    <div className="size-options d-flex flex-wrap gap-2">
                                        {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
                                            <button
                                                key={size}
                                                className={`btn btn-outline-secondary ${selectedSizes.includes(size) ? "active" : ""}`}
                                                onClick={() =>
                                                    setSelectedSizes(
                                                        selectedSizes.includes(size)
                                                            ? selectedSizes.filter((s) => s !== size)
                                                            : [...selectedSizes, size]
                                                    )
                                                }
                                            >
                                                {size}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <label className="form-label">Colors</label>
                                    <div className="color-options d-flex flex-wrap gap-2">
                                        {["Red", "Blue", "Black", "White", "Green", "Yellow"].map(
                                            (color) => (
                                                <button
                                                    key={color}
                                                    className={`color-option ${selectedColors.includes(color) ? "active" : ""}`}
                                                    style={{ backgroundColor: color.toLowerCase() }}
                                                    onClick={() =>
                                                        setSelectedColors(
                                                            selectedColors.includes(color)
                                                                ? selectedColors.filter((c) => c !== color)
                                                                : [...selectedColors, color]
                                                        )
                                                    }
                                                    title={color}
                                                />
                                            )
                                        )}
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <label className="form-label">Categories</label>
                                    <div className="list-group">
                                        <a
                                            href="/categories"
                                            className="list-group-item list-group-item-action"
                                            onClick={() => handleCategoryClick("men")}
                                        >
                                            Men
                                        </a>
                                        <a
                                            href="/categories"
                                            className="list-group-item list-group-item-action"
                                            onClick={() => handleCategoryClick("women")}
                                        >
                                            Women
                                        </a>
                                        <a
                                            href="/categories"
                                            className="list-group-item list-group-item-action"
                                            onClick={() => handleCategoryClick("kids")}
                                        >
                                            Kids
                                        </a>
                                        <a
                                            href="/categories"
                                            className="list-group-item list-group-item-action"
                                            onClick={() => handleCategoryClick("new-arrivals")}
                                        >
                                            New Arrivals
                                        </a>
                                        <a
                                            href="/categories"
                                            className="list-group-item list-group-item-action"
                                            onClick={() => handleCategoryClick("sale")}
                                        >
                                            Sale
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-9">
                        {/* Sort Options */}
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <div className="results-count">
                                Showing {sortedProducts.length} of {allProducts.length} products
                            </div>
                            <div className="sort-options">
                                <select
                                    className="form-select"
                                    value={sortOption}
                                    onChange={(e) => setSortOption(e.target.value)}
                                >
                                    <option value="featured">Featured</option>
                                    <option value="price-low">Price: Low to High</option>
                                    <option value="price-high">Price: High to Low</option>
                                    <option value="rating">Customer Rating</option>
                                </select>
                            </div>
                        </div>

                        {loading ? (
                            <div className="text-center py-5">
                                <div className="spinner-border text-danger" role="status"></div>
                            </div>
                        ) : error ? (
                            <div className="alert alert-danger text-center">{error}</div>
                        ) : sortedProducts.length > 0 ? (
                            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4 mb-4">
                                {sortedProducts.map((product) => {
                                    const isInCart = cartItems.some(item => item.product_id === product.id);
                                    const isInWishlist= wishlistItems.some(item => item.product_id === product.id);
                                    return (
                                        <div className="col" key={product.id}>
                                            <div className="card product-card h-100 shadow-sm">

                                                <div className="product-image-wrapper">
                                                    <img
                                                        src={`${process.env.REACT_APP_API_URL}${product.image_url}`}
                                                        className="card-img-top"
                                                        alt={product.name}
                                                        style={{ width: '100%', height: '250px' }}
                                                    />
                                                    <div className="product-overlay d-flex flex-column gap-2">
                                                        <Link to={`/product/${product.id}`} className="text-decoration-none btn btn-danger btn-sm w-75 ">
                                                            Quick View
                                                        </Link>
                                                        <button className="btn btn-sm btn-outline-light w-75"
                                                            onClick={() => handleAddToWishlist(product.id)}
                                                            disabled={isInWishlist}
                                                        >
                                                            {isInWishlist ? 'Added to wishlist' : 'Add to Wishlist'}
                                                        </button>
                                                    </div>
                                                </div>

                                                <div className="card-body">
                                                    <h5 className="card-title">{product.name}</h5>
                                                    <div className="d-flex justify-content-between align-items-center mb-2">
                                                        <div>
                                                            <span className="text-danger fw-bold">
                                                                ₹{product.price}
                                                            </span>
                                                            {Number(product.original_price) > 0 && (
                                                                <span className="text-muted text-decoration-line-through ms-2">
                                                                    ₹{product.original_price}
                                                                </span>
                                                            )}
                                                        </div>
                                                        <div className="text-warning">
                                                            {'★'.repeat(Math.floor(product.rating))}
                                                            {'☆'.repeat(5 - Math.floor(product.rating))}
                                                            <span className="text-muted ms-2">
                                                                ({product.rating})
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="d-grid gap-2">
                                                        <button
                                                            className="btn btn-outline-danger"
                                                            onClick={() => handleAddToCart(product.id)}
                                                            disabled={isInCart}
                                                        >
                                                            {isInCart ? 'Added to Cart' : 'Add to Cart'}
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        ) : (
                            <div className="alert alert-warning text-center">
                                No products match your filters. Try adjusting your search
                                criteria.
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <Footer />

            {/* Font Awesome */}
            <link
                rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
            />
        </div>
    );
};

export default Shop;

