export default function Pagination({ 
  totalPages = 5, 
  currentPage = 1,
  onPageChange 
}: { 
  totalPages?: number, 
  currentPage?: number,
  onPageChange?: (page: number) => void
}) {
  return (
    <div className="flex justify-center items-center gap-2 mt-12">
      <button 
        disabled={currentPage === 1}
        onClick={() => onPageChange?.(currentPage - 1)}
        className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        Previous
      </button>
      
      <div className="flex gap-1">
        {[...Array(totalPages)].map((_, i) => {
          const page = i + 1;
          const isActive = page === currentPage;
          return (
            <button 
              key={page}
              onClick={() => onPageChange?.(page)}
              className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${
                isActive 
                  ? 'bg-brand-primary text-white' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {page}
            </button>
          );
        })}
      </div>

      <button 
        disabled={currentPage === totalPages}
        onClick={() => onPageChange?.(currentPage + 1)}
        className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        Next
      </button>
    </div>
  );
}
