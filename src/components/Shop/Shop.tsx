import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../Home/Footer";
import { Product } from "../../types/productsTypes";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { fetchAllProducts, searchProducts } from "../../redux/features/products/productSlice";
import '../../css/Shop.css';
import { toast } from "react-toastify";
import { addToCart, setPendingCart } from "../../redux/features/cart/cartSlice";
import { addWishlist, setPendingWishlist } from "../../redux/features/wishlist/wishlistSlice";
import FiltersSidebar from "./FiltersSidebar";
import ProductsGrid from "./ProductsGrid";
import SortOptions from "./SortOptions";
import Pagination from "./Pagination";

const Shop = () => {
    const { category } = useParams<{ category: string }>();
    const [searchQuery, setSearchQuery] = useState("");
    const [submittedQuery, setSubmittedQuery] = useState("");
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);
    const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
    const [selectedColors, setSelectedColors] = useState<string[]>([]);
    const [sortOption, setSortOption] = useState("featured");
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(12);

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
        }
        setCurrentPage(1);
    }, [dispatch, submittedQuery, category]);

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

        // const matchesSize = selectedSizes.length === 0 || 
        //     (product.sizes && product.sizes.some(size => selectedSizes.includes(size)));

        // const matchesColor = selectedColors.length === 0 || 
        //     (product.colors && product.colors.some(color => selectedColors.includes(color)));

        return matchesCategory && matchesPrice;
    });

    const sortedProducts = [...filteredProducts].sort((a, b) => {
        if (sortOption === "price-low") return a.price - b.price;
        if (sortOption === "price-high") return b.price - a.price;
        if (sortOption === "rating") return b.rating - a.rating;
        return a.id - b.id;
    });

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    const pageTitle = category
        ? category.charAt(0).toUpperCase() + category.slice(1).replace("-", " ")
        : "All Products";

    const handleAddToWishlist = async (productId: number) => {
        if (!user) {
            toast.warning("Please log in to add items to your wishlist.");
            dispatch(setPendingWishlist({ product_id: productId }));
            navigate('/login');
            return;
        }
        await dispatch(addWishlist({ product_id: productId }));
        toast.success("Product Add In Wishlist");
    };

    const handleAddToCart = async (productId: number) => {
        if (!user) {
            toast.warning("Please log in to add items to your wishlist.");
            dispatch(setPendingCart({ product_id: productId, quantity: 1 }));
            navigate('/login');
            return;
        }
        await dispatch(addToCart({ product_id: productId, quantity: 1 }));
        toast.success("Product Add In Cart");
    };

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmittedQuery(searchQuery);
        setCurrentPage(1);
    };

    const handleClearSearch = () => {
        setSearchQuery("");
        setSubmittedQuery("");
        setCurrentPage(1);
    };

    const handleFilterChange = () => {
        setCurrentPage(1);
    };

    return (
        <div className="shop-page">
            <div className="hero-banner mb-5">
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
                        <FiltersSidebar
                            searchQuery={searchQuery}
                            setSearchQuery={setSearchQuery}
                            priceRange={priceRange}
                            setPriceRange={setPriceRange}
                            selectedSizes={selectedSizes}
                            setSelectedSizes={setSelectedSizes}
                            selectedColors={selectedColors}
                            setSelectedColors={setSelectedColors}
                            handleSearchSubmit={handleSearchSubmit}
                            handleClearSearch={handleClearSearch}
                            handleFilterChange={handleFilterChange}
                        />
                    </div>

                    <div className="col-md-9">
                        <SortOptions
                            sortOption={sortOption}
                            setSortOption={setSortOption}
                            showingCount={currentProducts.length}
                            totalCount={sortedProducts.length}
                        />

                        <ProductsGrid
                            loading={loading}
                            error={error}
                            currentProducts={currentProducts}
                            cartItems={cartItems}
                            wishlistItems={wishlistItems}
                            handleAddToCart={handleAddToCart}
                            handleAddToWishlist={handleAddToWishlist}
                        />

                        {sortedProducts.length > productsPerPage && (
                            <Pagination
                                productsPerPage={productsPerPage}
                                totalProducts={sortedProducts.length}
                                currentPage={currentPage}
                                paginate={paginate}
                            />
                        )}
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Shop;