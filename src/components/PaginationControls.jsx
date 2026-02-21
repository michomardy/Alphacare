import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const PaginationControls = ({ currentPage, totalPages }) => {
  const getPageNumbers = () => {
    const pages = [];
    const showMax = 5;

    let start = Math.max(1, currentPage - 1);
    let end = Math.min(totalPages, currentPage + 1);

    if (currentPage === 1) {
      end = Math.min(totalPages, 3);
    } else if (currentPage === totalPages) {
      start = Math.max(1, totalPages - 2);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex flex-col items-center gap-4 mt-12">
      {/* Page Indicator Text */}
      <span className="text-sm text-physio-neutral-600 font-medium">
        Page {currentPage} of {totalPages}
      </span>

      <div className="flex items-center justify-center gap-2">
        {/* Previous Button */}
        <Button
          variant="outline"
          size="icon"
          disabled={currentPage <= 1}
          asChild={currentPage > 1}
          className={cn(
            "w-10 h-10 border-physio-neutral-200 text-physio-blue hover:bg-physio-blue-bg hover:text-physio-blue-dark",
            currentPage <= 1 && "opacity-50 cursor-not-allowed bg-physio-neutral-50"
          )}
        >
          {currentPage > 1 ? (
            <Link to={`/blog?page=${currentPage - 1}`} aria-label="Previous Page">
              <ChevronLeft className="h-4 w-4" />
            </Link>
          ) : (
            <span>
              <ChevronLeft className="h-4 w-4" />
            </span>
          )}
        </Button>

        {/* First Page Link */}
        {currentPage > 2 && totalPages > 3 && !pageNumbers.includes(1) && (
          <>
            <Button variant="outline" size="icon" className="w-10 h-10 border-physio-neutral-200 text-physio-neutral-600 hover:bg-physio-blue-bg hover:text-physio-blue" asChild>
              <Link to={`/blog?page=1`}>1</Link>
            </Button>
            {pageNumbers[0] > 2 && <span className="text-physio-neutral-400 px-1">...</span>}
          </>
        )}

        {/* Page Number Buttons */}
        {pageNumbers.map((page) => (
          <Button
            key={page}
            variant={currentPage === page ? "default" : "outline"}
            size="icon"
            asChild={currentPage !== page}
            className={cn(
              "w-10 h-10 transition-all duration-200",
              currentPage === page
                ? "bg-physio-blue text-white hover:bg-physio-blue-dark border-physio-blue"
                : "text-physio-neutral-600 border-physio-neutral-200 hover:bg-physio-blue-bg hover:text-physio-blue hover:border-physio-blue/30"
            )}
          >
            {currentPage === page ? (
              <span>{page}</span>
            ) : (
              <Link to={`/blog?page=${page}`}>{page}</Link>
            )}
          </Button>
        ))}

        {/* Last Page Link */}
        {currentPage < totalPages - 1 && totalPages > 3 && !pageNumbers.includes(totalPages) && (
          <>
            {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && <span className="text-physio-neutral-400 px-1">...</span>}
            <Button variant="outline" size="icon" className="w-10 h-10 border-physio-neutral-200 text-physio-neutral-600 hover:bg-physio-blue-bg hover:text-physio-blue" asChild>
              <Link to={`/blog?page=${totalPages}`}>{totalPages}</Link>
            </Button>
          </>
        )}

        {/* Next Button */}
        <Button
          variant="outline"
          size="icon"
          disabled={currentPage >= totalPages}
          asChild={currentPage < totalPages}
          className={cn(
            "w-10 h-10 border-physio-neutral-200 text-physio-blue hover:bg-physio-blue-bg hover:text-physio-blue-dark",
            currentPage >= totalPages && "opacity-50 cursor-not-allowed bg-physio-neutral-50"
          )}
        >
          {currentPage < totalPages ? (
            <Link to={`/blog?page=${currentPage + 1}`} aria-label="Next Page">
              <ChevronRight className="h-4 w-4" />
            </Link>
          ) : (
            <span>
              <ChevronRight className="h-4 w-4" />
            </span>
          )}
        </Button>
      </div>
    </div>
  );
};

export default PaginationControls;