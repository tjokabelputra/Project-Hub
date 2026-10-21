import React from 'react';

function PageIndicatorComponent({ currentPage }) {
  const pages = [
    { number: 1, name: 'Jenis Project', minPage: 1 },
    { number: 2, name: 'Informasi Project', minPage: 2 },
    { number: 3, name: 'Tahapan & Dokumen', minPage: 4 },
    { number: 4, name: 'Review', minPage: 5 },
  ];

  return (
    <div className="page-indicator">
      <ul>
        {pages.map((page) => {
          const isActive = currentPage >= page.minPage;
          return (
            <li key={page.number} className="page-indicator__list">
              <p
                className={`page-indicator__page-number ${
                  isActive ? 'page-indicator__page-number--active' : ''
                }`}
              >
                {page.number}
              </p>
              <p
                className={`page-indicator__page-name ${
                  isActive ? 'page-indicator__page-name--active' : ''
                }`}
              >
                {page.name}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default PageIndicatorComponent;