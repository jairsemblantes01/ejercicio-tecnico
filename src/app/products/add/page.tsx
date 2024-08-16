import ProductForm from '../../components/ProductForm';

export default function AddProductPage() {
  const initialValues = {
    id: "",
    name: "",
    description: "",
    logo: "",
    date_release: "",
    date_revision: "",
  };

  return <ProductForm initialValues={initialValues} />;
}
