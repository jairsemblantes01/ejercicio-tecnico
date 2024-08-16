"use client";

import React, { useState } from "react";
import ProductTable from "../components/ProductsTable";
import SearchBar from "../components/SearchBar";
import AddProductButton from "../components/AddProductButton";
import ChangeQuantity from "../components/ChangeQuantity";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [resultsPerPage, setResultsPerPage] = useState(2);
  const [totalProducts, setTotalProducts] = useState(0);

  function handleSearch(query: string) {
    setSearchQuery(query);
  }

  function handleResultsPerPageChange(perPage: number) {
    setResultsPerPage(perPage);
  }

  function handleProductsFetched(total: number) {
    setTotalProducts(total); // Actualizar el total de productos
  }

  return (
    <div className="container-products">
      <div className="header">
        <SearchBar onSearch={handleSearch} />
        <AddProductButton />
      </div>
      <div className="container">
        <ProductTable
          searchQuery={searchQuery}
          resultsPerPage={resultsPerPage}
          onProductsFetched={handleProductsFetched}
        />
        <ChangeQuantity
          total={totalProducts}
          onResultsPerPageChange={handleResultsPerPageChange}
          options={[2, 10, 20]}
        />
      </div>
    </div>
  );
}
