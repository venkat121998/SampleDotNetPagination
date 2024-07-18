import React, { useState, useEffect } from "react";

const PaginatedTable = () => {
  const [data, setData] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchFilter, setSearchFilter] = useState("");
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    fetchData();
  }, [pageNumber, pageSize, searchFilter]);

  const fetchData = async () => {
    try {
      const response = await fetch("Page/GetRecords", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          PageNumber: pageNumber,
          PageSize: pageSize,
          SearchFilter: searchFilter,
        }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      setData(result.data);
      setTotalItems(result.totalCount);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchFilter(e.target.value);
    setPageNumber(1); // Reset to first page on search
  };

  const handlePageChange = (newPageNumber) => {
    setPageNumber(newPageNumber);
  };

  const handlePageSizeChange = (e) => {
    setPageSize(Number(e.target.value));
    setPageNumber(1); // Reset to first page on page size change
  };

  const totalPages = Math.ceil(totalItems / pageSize);

  return (
    <div style={styles.container}>
      <input
        type="text"
        placeholder="Search..."
        value={searchFilter}
        onChange={handleSearchChange}
        style={styles.searchInput}
      />

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.tableHeader}>Id</th>
            <th style={styles.tableHeader}>Name</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id} style={styles.tableRow}>
              <td style={styles.tableCell}>{item.id}</td>
              <td style={styles.tableCell}>{item.name}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={styles.paginationControls}>
        <label style={styles.pageSizeLabel}>
          Page Size:
          <select
            value={pageSize}
            onChange={handlePageSizeChange}
            style={styles.pageSizeSelect}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </label>
      </div>

      <div style={styles.paginationControls}>
        <button
          onClick={() => handlePageChange(pageNumber - 1)}
          disabled={pageNumber === 1}
          style={styles.paginationButton}
        >
          Previous
        </button>
        <span style={styles.paginationText}>
          Page {pageNumber} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(pageNumber + 1)}
          disabled={pageNumber === totalPages || totalItems <= 0}
          style={styles.paginationButton}
        >
          Next
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
  },
  searchInput: {
    padding: "8px",
    marginBottom: "20px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    width: "200px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginBottom: "20px",
  },
  tableHeader: {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "10px",
    border: "1px solid #ddd",
  },
  tableRow: {
    backgroundColor: "#fff",
    borderBottom: "1px solid #ddd",
  },
  tableCell: {
    padding: "10px",
    border: "1px solid #ddd",
    textAlign: "left",
  },
  paginationControls: {
    display: "flex",
    alignItems: "center",
    marginBottom: "10px",
  },
  pageSizeLabel: {
    marginRight: "10px",
  },
  pageSizeSelect: {
    padding: "5px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  paginationButton: {
    padding: "8px 12px",
    margin: "0 5px",
    borderRadius: "4px",
    border: "1px solid #007bff",
    backgroundColor: "#007bff",
    color: "#fff",
    cursor: "pointer",
  },
  paginationText: {
    margin: "0 10px",
  },
};

export default PaginatedTable;
