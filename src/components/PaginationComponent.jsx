import React from 'react';

function PaginationComponent({ type, filteredDataLength, tableSize, startIndex, endIndex, currentPage, setCurrentPage }) {
  const pageCount = Math.ceil(filteredDataLength / tableSize);
  const visiblePageCount = 3;
  const startPage = Math.min(
    currentPage,
    Math.max(1, pageCount - visiblePageCount + 1),
  );
  const visiblePages = Array.from(
    {
      length: Math.min(visiblePageCount, pageCount),
    },
    (_, index) => startPage + index
  );

  return (
    <div className="pagination-component">
      <p>
                Menampilkan {filteredDataLength === 0 ? 0 : startIndex + 1}
        {' - '}
        {endIndex}
        {' dari '}
        {filteredDataLength} {type}
      </p>
      <div className="pagination-component__actions">
        <button
          type="button"
          className="pagination-component__page"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
                    Sebelumnya
        </button>

        {visiblePages.map((page) => (
          <button
            key={page}
            type="button"
            className={
              currentPage === page
                ? 'pagination-component__page pagination-component__page--active'
                : 'pagination-component__page'
            }
            onClick={() => setCurrentPage(page)}>
            {page}
          </button>
        ))}
        <button
          type="button"
          className="pagination-component__page"
          disabled={currentPage >= pageCount}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
                    Selanjutnya
        </button>
      </div>
    </div>
  );
}

export default PaginationComponent;