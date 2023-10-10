import React from "react";
import { Button } from "../ui/button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
}

interface PaginationItem {
  value: number | string;
  isCurrent: boolean;
}

function paginate({ current, max }: { current: number; max: number }): PaginationItem[] {
  if (!current || !max) return [];

  
  let items: PaginationItem[] = [{ value: 1, isCurrent: current === 1 }];

  if (current === 1 && max === 1) return [{ value: 1, isCurrent: true }];

  if (current > 4) items.push({ value: "…", isCurrent: false });

  let r = 2,
    r1 = current - r,
    r2 = current + r;

  for (let i = r1 > 2 ? r1 : 2; i <= Math.min(max, r2); i++) {
    items.push({ value: i, isCurrent: i === current });
  }

  if (r2 + 1 < max) items.push({ value: "…", isCurrent: false });
  if (r2 < max) items.push({ value: max, isCurrent: current === max });

  return items;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {

  const handlePageChange = (newPage: number) => {
    onPageChange(newPage);
  };

  const renderPageNumbers = () => {
    const paginationItems = paginate({ current: currentPage, max: totalPages });

    return paginationItems.map((item) => {
      if (item.value === "…") {
        return (
          <span key={item.value} className="mx-2 text-gray-500">
            {item.value}
          </span>
        );
      }

      return (
        <Button
          key={item.value}
          variant={"game_option"}
          className={`rounded ${
            item.isCurrent ? "font-semibold bg-transparent text-foreground" : ""
          }`}
          disabled={item.isCurrent}
          onClick={() => handlePageChange(item.value as number)}
        >
          {item.value}
        </Button>
      );
    });
  };

  return (
    <div className="flex flex-wrap justify-start gap-2 mt-4">
      
      {renderPageNumbers()}
     
    </div>
  );
};

export default Pagination;
