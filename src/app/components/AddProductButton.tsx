import React from "react";
import Link from "next/link";

export default function AddProductButton() {
  return (
    <Link href="/products/add">
      <button className="add-button">
        Agregar
      </button>
    </Link>
  );
}
