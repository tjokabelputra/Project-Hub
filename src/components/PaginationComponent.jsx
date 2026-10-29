import React from 'react';

function PaginationComponent({ filteredDataLength, tableSize, startIndex, endIndex, currentPage, setCurrentPage }) {
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
                Menampilkan{' '}
        {filteredDataLength === 0 ? 0 : startIndex + 1}
        {' - '}
        {Math.min(endIndex, filteredDataLength)}
        {' dari '}
        {filteredDataLength} project
      </p>
      <div className="pagination-component__actions">
        <button
          type="button"
          className={
            currentPage !== 1
              ? 'pagination-component__page pagination-component__page--active'
              : 'pagination-component__page'
          }
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((page) => page - 1)}>
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
          className={
            currentPage === pageCount || pageCount === 0
              ? 'pagination-component__page'
              : 'pagination-component__page pagination-component__page--active'
          }
          disabled={currentPage === pageCount || pageCount === 0}
          onClick={() => setCurrentPage((page) => page + 1)}
        >
                    Selanjutnya
        </button>
      </div>
    </div>
  );
}

export default PaginationComponent;