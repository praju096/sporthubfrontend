import React from "react";
import { ProductsGridProps } from "../../types/productsTypes";
import ProductCard from "../ProductCard";

const ProductsGrid = ({
    loading,
    error,
    currentProducts,
    cartItems,
    wishlistItems,
    handleAddToCart,
    handleAddToWishlist
}: ProductsGridProps) => {
    if (loading) {
        return (
            <div className="text-center py-5">
                <div className="spinner-border text-danger" role="status"></div>
            </div>
        );
    }

    if (error) {
        return <div className="alert alert-danger text-center">{error}</div>;
    }

    if (currentProducts.length === 0) {
        return (
            <div className="alert alert-warning text-center">
                No products match your filters. Try adjusting your search criteria.
            </div>
        );
    }

    return (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4 mb-4">
            {currentProducts.map((product) => {
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
                );
            })}
        </div>
    );
};

export default ProductsGrid;