import React from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

function PageFooterComponent({ isFirstPage = false, isLastPage = false, listInputs = [], onPreviousPage, onNextPage }) {
  const isInputsValid = listInputs.every((input) => {
    if (typeof input === 'string') {
      return input.trim() !== '';
    }

    return input !== null && input !== undefined && input !== '';
  });

  return (
    <div className="page-footer">
      <button
        className={`page-footer__previous ${isFirstPage ? 'page-footer__previous-disable' : ''}`}
        type="button"
        onClick={onPreviousPage}>
        <FaArrowLeft/> Sebelumnya
      </button>
      <button
        className={`page-footer__next 
            ${!isInputsValid ? 'page-footer__next-disabled' : ''} 
            ${isLastPage ? 'page-footer__next-last' : ''}`}
        type="button"
        onClick={onNextPage}
        disabled={!isInputsValid}>
        {isLastPage ? (
          'Simpan Project'
        ) : (
          <>Selanjutnya <FaArrowRight /></>
        )}
      </button>
    </div>
  );
}

export default PageFooterComponent;