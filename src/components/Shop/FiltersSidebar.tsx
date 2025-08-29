import React from "react";
import { FiltersSidebarProps } from "../../types/productsTypes";

const FiltersSidebar = ({
    searchQuery,
    setSearchQuery,
    priceRange,
    setPriceRange,
    selectedSizes,
    setSelectedSizes,
    selectedColors,
    setSelectedColors,
    handleSearchSubmit,
    handleClearSearch,
    handleFilterChange
}: FiltersSidebarProps) => {
    const handleCategoryClick = (cat: string) => {
        sessionStorage.setItem("selectedCategory", cat);
    };

    const handlePriceChange = (value: number) => {
        setPriceRange([priceRange[0], value]);
        handleFilterChange();
    };

    const handleSizeToggle = (size: string) => {
        setSelectedSizes(
            selectedSizes.includes(size)
                ? selectedSizes.filter((s) => s !== size)
                : [...selectedSizes, size]
        );
        handleFilterChange();
    };

    const handleColorToggle = (color: string) => {
        setSelectedColors(
            selectedColors.includes(color)
                ? selectedColors.filter((c) => c !== color)
                : [...selectedColors, color]
        );
        handleFilterChange();
    };

    return (
        <div className="card shadow-sm border-1 sticky-top" style={{ top: "70px" }}>
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
                        onChange={(e) => handlePriceChange(parseInt(e.target.value))}
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
                                type="button"
                                className={`btn btn-outline-secondary ${selectedSizes.includes(size) ? "active" : ""}`}
                                onClick={() => handleSizeToggle(size)}
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
                                    type="button"
                                    className={`color-option ${selectedColors.includes(color) ? "active" : ""}`}
                                    style={{ backgroundColor: color.toLowerCase() }}
                                    onClick={() => handleColorToggle(color)}
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
    );
};

export default FiltersSidebar;