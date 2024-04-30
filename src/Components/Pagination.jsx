import { useState } from "react";

import sytles from "./Pagination.module.css";

function Pagination({ page, setPage }) {
  const previousHandler = () => {
    if (page <= 1) return;
    setPage((page) => page - 1);
  };

  const nextHandler = () => {
    if (page >= 10) return;
    setPage((page) => page + 1);
  };

  return (
    <div className={sytles.pagination}>
      <button
        onClick={previousHandler}
        className={page === 1 ? sytles.disabled : null}
      >
        Previous
      </button>
      <p className={page === 1 ? sytles.selected : null}>1</p>
      <p className={page === 2 ? sytles.selected : null}>2</p>
      <span>...</span>
      {page > 2 && page < 9 && (
        <>
          <p className={sytles.selected}>{page}</p>
          <span>...</span>
        </>
      )}
      <p className={page === 9 ? sytles.selected : null}>9</p>
      <p className={page === 10 ? sytles.selected : null}>10</p>
      <button
        onClick={nextHandler}
        className={page === 10 ? sytles.disabled : null}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
