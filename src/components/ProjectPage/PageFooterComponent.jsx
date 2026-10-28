import React from 'react';
import PropTypes from 'prop-types';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { areInputsValid } from '../../util/util.js';

function PageFooterComponent({ isFirstPage = false, isLastPage = false, listInputs = [], onPreviousPage, onNextPage }) {
  const isInputsValid = areInputsValid(listInputs);

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

PageFooterComponent.propTypes = {
  isFirstPage: PropTypes.bool,
  isLastPage: PropTypes.bool,
  listInputs: PropTypes.array,
  onPreviousPage: PropTypes.func.isRequired,
  onNextPage: PropTypes.func.isRequired
};

export default PageFooterComponent;
