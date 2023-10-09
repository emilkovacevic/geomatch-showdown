// Pagination.tsx
import React from "react";

interface PaginationProps {
  playersPerPage: number;
  totalPlayers: number;
  currentPage: number;
  paginate: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  playersPerPage,
  totalPlayers,
  currentPage,
  paginate,
}) => {
  const totalPages = Math.ceil(totalPlayers / playersPerPage);

  const getPageNumbers = () => {
    const pageNumbers = [];

    const totalPages = Math.ceil(totalPlayers / playersPerPage);

    if (totalPages <= 12) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else if (currentPage <= 6) {
      for (let i = 1; i <= 12; i++) {
        pageNumbers.push(i);
      }
    } else if (currentPage >= totalPages - 6) {
      for (let i = totalPages - 11; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      for (let i = currentPage - 5; i <= currentPage + 6; i++) {
        pageNumbers.push(i);
      }
    }

    if (!pageNumbers.includes(1)) {
      pageNumbers.unshift(1);
    }
    if (!pageNumbers.includes(totalPages)) {
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  const pageNumbers = getPageNumbers();

  return (
    <nav>
      <ul className="flex flex-wrap gap-4">
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={`px-2 py-1 rounded-lg ${
              currentPage === number
                ? "border text-accent"
                : "bg-secondary text-primary-foreground"
            }`}
          >
            <button onClick={() => paginate(number)} className="page-link">
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
