
const BASE_URL = "https://tribu-ti-staffing-desarrolloafangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros";

export async function fetchProducts(authorId: string) {
  const response = await fetch(`${BASE_URL}/bp/products`, {
    headers: {
      authorId,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return response.json();
}

export async function createProduct(authorId: string, productData: any) {
  const response = await fetch(`${BASE_URL}/bp/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorId,
    },
    body: JSON.stringify(productData),
  });

  if (!response.ok) {
    throw new Error("Failed to create product");
  }

  return response.json();
}

export async function deleteProduct(authorId: string, productId: string) {
  const response = await fetch(`${BASE_URL}/bp/products?id=${productId}`, {
    method: "DELETE",
    headers: {
      authorId,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to delete product");
  }

  return response.json();
}

export async function verifyProductId(authorId: string, productId: string) {
  const response = await fetch(`${BASE_URL}/bp/products/verification?id=${productId}`, {
    headers: {
      authorId,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to verify product ID");
  }

  return response.json();
}
