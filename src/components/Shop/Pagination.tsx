import React from "react";
import { PaginationProps } from "../../types/productsTypes";

const Pagination = ({
  productsPerPage,
  totalProducts,
  currentPage,
  paginate,
}: PaginationProps) => {
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  const handlePrev = () => {
    if (currentPage > 1) {
      paginate(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      paginate(currentPage + 1);
    }
  };

  return (
    <div className="d-flex justify-content-between align-items-center mt-3 mb-3">
      <button
        className="btn btn-danger"
        disabled={currentPage === 1}
        onClick={handlePrev}
      >
        Previous
      </button>

      <span className="fw-bold">
        Products (Page {currentPage} of {totalPages})
      </span>

      <button
        className="btn btn-danger"
        disabled={currentPage === totalPages}
        onClick={handleNext}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
