"use client"
import { useEffect, useState } from 'react';
import axios from 'axios';
import ProductForm from '../../components/ProductForm';
import SkeletonForm from "@/app/components/SkeletonForm";

export default function EditProductPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const [initialValues, setInitialValues] = useState(null);

  useEffect(() => {
    if (id) {
      axios.get(`/api/products?id=${id}`).then((response) => {
        setInitialValues(response.data);
      });
    }
  }, [id]);

  if (!initialValues) {
    return <SkeletonForm />;
  }

  return <ProductForm initialValues={initialValues} isEditMode />;
}
