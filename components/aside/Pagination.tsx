import React from "react";
import { Button } from "../ui/button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const canGoPrevious = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  const handlePageChange = (newPage: number) => {
    onPageChange(newPage);
  };

  return (
    <div className="inline-flex gap-2 mt-4">
      <Button
        variant={"game_option"}
        className="rounded"
        disabled={!canGoPrevious}
        onClick={() => handlePageChange(1)}
      >
        First
      </Button>
      <Button
        variant={"game_option"}
        className="rounded"
        disabled={!canGoPrevious}
        onClick={() => handlePageChange(currentPage - 1)}
      >
        Previous
      </Button>
      <span className="mx-4">
        Page {currentPage} of {totalPages}
      </span>
      <Button
        variant={"game_option"}
        className="rounded"
        disabled={!canGoNext}
        onClick={() => handlePageChange(currentPage + 1)}
      >
        Next
      </Button>
      <Button
        variant={"game_option"}
        className="rounded"
        disabled={!canGoNext}
        onClick={() => handlePageChange(totalPages)}
      >
        Last
      </Button>
    </div>
  );
};

export default Pagination;
