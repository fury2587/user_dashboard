"use client";

import { Button } from "@/components/ui/button";
import { PaginationProps } from "@/types/user";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function UserListPagination({ 
  totalPages, 
  currentPage 
}: PaginationProps) {
  const router = useRouter();
  
  const handlePageChange = (page: number) => {
    router.push(`/dashboard?page=${page}`);
  };

  // Generate an array of page numbers to display
  const getPageNumbers = () => {
    const pageNumbers = [];
    
    // Always show first page
    pageNumbers.push(1);
    
    // Add current range
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      if (!pageNumbers.includes(i)) {
        pageNumbers.push(i);
      }
    }
    
    // Always show last page if there's more than one page
    if (totalPages > 1) {
      pageNumbers.push(totalPages);
    }
    
    // Add ellipsis where needed
    const result = [];
    let prev = 0;
    
    for (const num of pageNumbers) {
      if (num - prev > 1) {
        result.push(-1); // Ellipsis marker
      }
      result.push(num);
      prev = num;
    }
    
    return result;
  };
  
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center space-x-2 py-4">
      <Button
        variant="outline"
        size="icon"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      
      {getPageNumbers().map((pageNum, index) => 
        pageNum === -1 ? (
          <span key={`ellipsis-${index}`} className="px-2">...</span>
        ) : (
          <Button
            key={`page-${pageNum}`}
            variant={currentPage === pageNum ? "default" : "outline"}
            size="sm"
            onClick={() => handlePageChange(pageNum)}
            className={currentPage === pageNum ? "pointer-events-none" : ""}
          >
            {pageNum}
          </Button>
        )
      )}
      
      <Button
        variant="outline"
        size="icon"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}