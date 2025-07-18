import "./PaginationComponent.css"; // styling will go here

// eslint-disable-next-line react/prop-types
const PaginationComponent = ({ totalPages, currentPage, onPageChange }) => {
  const getPaginationNumbers = () => {
    const pageNumbers = [];
    // const maxVisible = 5;
    let start = Math.max(2, currentPage - 2);
    let end = Math.min(totalPages - 1, currentPage + 2);

    if (currentPage <= 3) {
      start = 2;
      end = Math.min(5, totalPages - 1);
    }

    if (currentPage >= totalPages - 2) {
      start = Math.max(totalPages - 4, 2);
      end = totalPages - 1;
    }

    for (let i = start; i <= end; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="custom-pagination">
      <button
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        className="nav-button"
      >
        ««
      </button>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="nav-button"
      >
        «
      </button>

      <button
        onClick={() => onPageChange(1)}
        className={currentPage === 1 ? "active" : ""}
      >
        1
      </button>

      {currentPage > 4 && <span className="dots">...</span>}

      {getPaginationNumbers().map((num) => (
        <button
          key={num}
          onClick={() => onPageChange(num)}
          className={currentPage === num ? "active" : ""}
        >
          {num}
        </button>
      ))}

      {currentPage < totalPages - 3 && <span className="dots">...</span>}

      {totalPages > 1 && (
        <button
          onClick={() => onPageChange(totalPages)}
          className={currentPage === totalPages ? "active" : ""}
        >
          {totalPages}
        </button>
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="nav-button"
      >
        »
      </button>
      <button
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        className="nav-button"
      >
        »»
      </button>
    </div>
  );
};

export default PaginationComponent;
