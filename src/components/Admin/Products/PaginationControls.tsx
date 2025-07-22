import React from "react";

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  page: number;
  onPrev: () => void;
  onNext: () => void;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({
  currentPage,
  totalPages,
  page,
  onPrev,
  onNext,
}) => {
  return (
    <div className="d-flex justify-content-between mt-3">
      <button
        className="btn btn-danger"
        disabled={currentPage === 1}
        onClick={onPrev}
      >
        Prev
      </button>
      <span>
        <h4>Products (Page {page} of {totalPages})</h4>
      </span>
      <button
        className="btn btn-danger"
        disabled={currentPage === totalPages}
        onClick={onNext}
      >
        Next
      </button>
    </div>
  );
};

export default PaginationControls;