interface PaginationProp {
  page: number;
  totalPages: number;
  setPage: (val:number | ((prev:number)=>number))=> void;
}
const Pagination = ({ page, totalPages, setPage }: PaginationProp) => {
  return (
<div className="flex items-center justify-center gap-4 mt-6">
  <button
    onClick={() => setPage((prev) => prev - 1)}
    disabled={page <= 1}
    className={`px-4 py-2 rounded-md border text-sm font-medium transition 
      ${page <= 1
        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
      }`}
  >
    ← Previous
  </button>

  <span className="text-sm font-semibold text-gray-700">
    Page {page} of {totalPages}
  </span>

  <button
    onClick={() => setPage((prev) => prev + 1)}
    disabled={page === totalPages}
    className={`px-4 py-2 rounded-md border text-sm font-medium transition 
      ${page === totalPages
        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
      }`}
  >
    Next →
  </button>
</div>

  );
};

export default Pagination;
