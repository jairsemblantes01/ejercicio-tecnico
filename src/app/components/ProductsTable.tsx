import React, { useEffect, useState } from "react";
import SkeletonTable from "./Skeleton";
import Alert from "./Alert";
import axios, { AxiosError, AxiosResponse } from "axios";
import ActionSelect from "./ActionSelect";
import { useRouter } from "next/navigation";
import * as dayjs from "dayjs";
import { toast } from 'react-toastify';

interface Product {
  _id: string;
  id: string;
  name: string;
  description: string;
  date_release: string;
  date_revision: string;
}

interface ProductTableProps {
  searchQuery: string;
  resultsPerPage: number;
  onProductsFetched: (total: number) => void;
}

interface FetchProductsParams {
  limit: number;
  search?: string;
}

export default function ProductTable({
                                       searchQuery,
                                       resultsPerPage,
                                       onProductsFetched,
                                     }: ProductTableProps): JSX.Element {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = typeof window !== 'undefined' ? useRouter() : null;

  const fetchProducts = async (searchQuery: string = "", limit: number): Promise<void> => {
    try {
      const params: FetchProductsParams = { limit };
      if (searchQuery) {
        params.search = searchQuery;
      }
      const response: AxiosResponse<Product[]> = await axios.get(`/api/products/all`, { params });
      setProducts(response.data);
      onProductsFetched(response.data.length);
    } catch (err) {
      handleError(err as AxiosError);
    } finally {
      setLoading(false);
    }
  };

  const handleError = (error: AxiosError): void => {
    if (error.response && error.response.data) {
      const errorMessage = (error.response.data as { message: string }).message;
      toast.error(`Error: ${errorMessage}`);
    } else if (error.request) {
      toast.error('Error: No response received from the server.');
    } else {
      toast.error(`Error: ${error.message}`);
    }
  };

  const handleEdit = (productId: string): void => {
    if (router) {
      router.push(`/products/${productId}`);
    }
  };

  const handleDelete = async (productId: string): Promise<void> => {
    try {
      await axios.delete(`/api/products?id=${productId}`);
      setProducts((prevProducts) => prevProducts.filter((product) => product._id !== productId));
      onProductsFetched(products.length - 1);
      toast.success("Producto eliminado con éxito");
    } catch (error) {
      handleError(error as AxiosError);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchProducts(searchQuery, resultsPerPage);
  }, [searchQuery, resultsPerPage]);

  if (loading) {
    return <SkeletonTable />;
  }

  if (products.length === 0) {
    return (
      <div>
        {error ? (
          <Alert message={error} type="error" />
        ) : (
          <div className="no-data-table">
            <p>No hay productos para mostrar</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="table-container">
      <table className="product-table">
        <thead>
        <tr>
          <th>Logo</th>
          <th>Nombre del producto</th>
          <th>Descripción</th>
          <th>Fecha de liberación</th>
          <th>Fecha de reestructuración</th>
          <th>Acciones</th>
        </tr>
        </thead>
        <tbody>
        {products.map((product) => (
          <tr key={product.id}>
            <td>
              <div className="logo">JG</div>
            </td>
            <td>{product.name}</td>
            <td>{product.description}</td>
            <td>{dayjs(product.date_release).format("DD/MM/YYYY")}</td>
            <td>{dayjs(product.date_revision).format("DD/MM/YYYY")}</td>
            <td className="actions">
              <ActionSelect
                onEdit={() => handleEdit(product._id)}
                onDelete={() => handleDelete(product._id)}
                deleteItem={product.name}
              />
            </td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
}
