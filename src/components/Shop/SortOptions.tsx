import React from "react";
import { SortOptionsProps } from "../../types/productsTypes";

const SortOptions = ({
    sortOption,
    setSortOption,
    showingCount,
    totalCount
}: SortOptionsProps) => {
    return (
        <div className="d-flex justify-content-between align-items-center mb-4">
            <div className="results-count">
                Showing {showingCount} of {totalCount} products
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
    );
};

export default SortOptions;