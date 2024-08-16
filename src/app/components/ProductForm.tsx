"use client";
import React, { useEffect } from "react";
import { useFormik, FormikHelpers } from "formik";
import * as Yup from "yup";
import axios, { AxiosResponse } from "axios";
import dayjs from "dayjs";

interface ProductFormValues {
  id: string;
  name: string;
  description: string;
  logo: string;
  date_release: string;
  date_revision: string;
}

const validationSchema = Yup.object({
  id: Yup.string()
    .required("ID no válido!")
    .min(3, "ID no válido!")
    .max(10, "ID no válido!")
    .test("checkUniqueID", "ID no válido!", async (value, context) => {
      if (context.options.context?.isEditMode) return true; // Saltar validación en modo edición
      const response = await fetch(`/api/products/verification?id=${value}`);
      const { exists } = await response.json();
      return !exists;
    }),
  name: Yup.string()
    .required("Nombre es requerido")
    .min(5, "Nombre debe tener al menos 5 caracteres")
    .max(100, "Nombre no puede tener más de 100 caracteres"),
  description: Yup.string()
    .required("Descripción es requerida")
    .min(10, "Descripción debe tener al menos 10 caracteres")
    .max(200, "Descripción no puede tener más de 200 caracteres"),
  logo: Yup.string().required("Logo es requerido"),
  date_release: Yup.date()
    .required("Fecha de liberación es requerida")
    .min(dayjs().format('YYYY-MM-DD'), "Fecha de liberación debe ser igual o mayor a la fecha actual"),
  date_revision: Yup.date()
    .required("Fecha de revisión es requerida")
    .test("is-exactly-one-year", "Fecha de revisión debe ser exactamente un año después de la fecha de liberación", function (value) {
      const { date_release } = this.parent;
      if (date_release && value) {
        const oneYearAfterRelease = dayjs(date_release).add(1, 'year');
        return dayjs(value).isSame(oneYearAfterRelease, 'day');
      }
      return false;
    }),
});

export default function ProductForm({
                                      initialValues,
                                      isEditMode = false,
                                    }: {
  initialValues: ProductFormValues;
  isEditMode?: boolean;
}) {
  // Formateamos los valores iniciales utilizando dayjs
  const formattedInitialValues: ProductFormValues = {
    ...initialValues,
    date_release: initialValues.date_release
      ? dayjs(initialValues.date_release).format('YYYY-MM-DD')
      : '',
    date_revision: initialValues.date_revision
      ? dayjs(initialValues.date_revision).format('YYYY-MM-DD')
      : '',
  };

  const handleSubmit = async (
    values: ProductFormValues,
    formikHelpers: FormikHelpers<ProductFormValues>
  ): Promise<void> => {
    const { setSubmitting, resetForm } = formikHelpers;
    try {
      const response: AxiosResponse = isEditMode
        ? await axios.put(`/api/products?id=${values.id}`, values)
        : await axios.post("/api/products", values);

      if (response.status === (isEditMode ? 200 : 201)) {
        alert(isEditMode ? "Producto editado exitosamente!" : "Producto agregado exitosamente!");
        resetForm(); // Restablecer el formulario
      }
    } catch (error) {
      console.error("Error al enviar el producto:", (error as Error).message);
    } finally {
      setSubmitting(false);
    }
  };

  const formik = useFormik<ProductFormValues>({
    initialValues: formattedInitialValues,
    validationSchema: validationSchema,
    context: { isEditMode },
    onSubmit: handleSubmit,
  });

  useEffect(() => {
    if (formik.values.date_release) {
      const revisionDate = dayjs(formik.values.date_release)
        .add(1, "year")
        .format("YYYY-MM-DD");
      formik.setFieldValue("date_revision", revisionDate);
    }
  }, [formik.values.date_release]);

  return (
    <div className="form-container">
      <h1>{isEditMode ? "Editar Producto" : "Formulario de Registro"}</h1>
      <div className="separator-line"></div>
      <form onSubmit={formik.handleSubmit} className="register-form">
        {renderFormInput("id", "ID", formik, isEditMode)}
        {renderFormInput("name", "Nombre", formik)}
        {renderFormInput("description", "Descripción", formik)} {/* Descripción como input */}
        {renderFormInput("logo", "Logo", formik)}
        {renderFormInput("date_release", "Fecha Liberación", formik, false, "date")}
        {renderFormInput("date_revision", "Fecha Revisión", formik, true, "date")}
        {renderFormActions(formik, isEditMode)}
      </form>
    </div>
  );
}

function renderFormInput(
  name: keyof ProductFormValues,
  label: string,
  formik: ReturnType<typeof useFormik<ProductFormValues>>,
  isDisabled: boolean = false,
  type: string = "text"
) {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        id={name}
        name={name}
        value={formik.values[name]}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        className={formik.touched[name] && formik.errors[name] ? "input-error" : ""}
        disabled={isDisabled}
      />
      {formik.touched[name] && formik.errors[name] && (
        <span className="error">{formik.errors[name]}</span>
      )}
    </div>
  );
}

function renderFormActions(
  formik: ReturnType<typeof useFormik<ProductFormValues>>,
  isEditMode: boolean
) {
  return (
    <div className="form-actions">
      <button type="reset" className="reset-button" onClick={formik.handleReset}>
        Reiniciar
      </button>
      <button type="submit" className="submit-button" disabled={formik.isSubmitting}>
        {isEditMode ? "Guardar Cambios" : "Agregar"}
      </button>
    </div>
  );
}
