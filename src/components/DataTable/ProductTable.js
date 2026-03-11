import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Spinner } from "react-bootstrap";

const ProductsTable = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://api.escuelajs.co/api/v1/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });
  }, []);

  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
      width: "70px",
    },
    {
      name: "Image",
      selector: (row) => row.images[0],
      cell: (row) => (
        <img
          src={row.images[0]}
          alt={row.title}
          style={{ width: "60px", borderRadius: "5px" }}
        />
      ),
      width: "80px",
    },
    {
      name: "Title",
      selector: (row) => row.title,
      sortable: true,
      wrap: true,
    },
    {
      name: "Price",
      selector: (row) => `$${row.price}`,
      sortable: true,
      width: "100px",
    },
    {
      name: "Category",
      selector: (row) => row.category?.name,
      sortable: true,
      width: "150px",
    },
    {
      name: "Description",
      selector: (row) => row.description,
      cell: (row) =>
        row.description.length > 60
          ? row.description.substring(0, 60) + "..."
          : row.description,
      wrap: true,
    },
  ];

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
        <p>Loading Products...</p>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h3 className="mb-3">Products List</h3>
      <DataTable
        columns={columns}
        data={products}
        pagination
        highlightOnHover
        responsive
      />
    </div>
  );
};

export default ProductsTable;
