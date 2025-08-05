import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../Home/Footer";
import { Product } from "../../types/productsTypes";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { fetchAllProducts, searchProducts } from "../../redux/features/products/productSlice";
import './Shop.css';
import { toast } from "react-toastify";
import { addToCart } from "../../redux/features/cart/cartSlice";
import { addWishlist } from "../../redux/features/wishlist/wishlistSlice";
import ProductCard from "../ProductCard";

const Shop = () => {
    const { category } = useParams<{ category: string }>();
    const [searchQuery, setSearchQuery] = useState("");
    const [submittedQuery, setSubmittedQuery] = useState("");
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);
    const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
    const [selectedColors, setSelectedColors] = useState<string[]>([]);
    const [sortOption, setSortOption] = useState("featured");

    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const { allProducts, loading, error } = useSelector((state: RootState) => state.products);
    const { user } = useSelector((state: RootState) => state.auth);
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
        if (!user) {
            toast.warning("Please log in to add items to your wishlist.");
            navigate('/login');
            return;
        }
        await dispatch(addWishlist({ product_id: productId }));
        toast.success("Product Add In Wishlist");
    };

    const handleAddToCart = async (productId: number) => {
        if (!user) {
            toast.warning("Please log in to add items to your wishlist.");
            navigate('/login');
            return;
        }
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
                                            href="/categories/men"
                                            className="list-group-item list-group-item-action"
                                            onClick={() => handleCategoryClick("men")}
                                        >
                                            Men
                                        </a>
                                        <a
                                            href="/categories/women"
                                            className="list-group-item list-group-item-action"
                                            onClick={() => handleCategoryClick("women")}
                                        >
                                            Women
                                        </a>
                                        <a
                                            href="/categories/kids"
                                            className="list-group-item list-group-item-action"
                                            onClick={() => handleCategoryClick("kids")}
                                        >
                                            Kids
                                        </a>
                                        <a
                                            href="/categories/new-arrivals"
                                            className="list-group-item list-group-item-action"
                                            onClick={() => handleCategoryClick("new-arrivals")}
                                        >
                                            New Arrivals
                                        </a>
                                        <a
                                            href="/categories/sale"
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
                                    const isInWishlist = wishlistItems.some(item => item.product_id === product.id);
                                    return (
                                        <div className="col" key={product.id}>
                                            <ProductCard
                                                product={product}
                                                isInCart={isInCart}
                                                isInWishlist={isInWishlist}
                                                onAddToCart={handleAddToCart}
                                                onAddToWishlist={handleAddToWishlist}
                                            />
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

        </div>
    );
};

export default Shop;

