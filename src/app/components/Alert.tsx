import React from "react";

interface AlertProps {
  message: string;
  type?: "success" | "error" | "warning" | "info";
}

const Alert: React.FC<AlertProps> = ({ message, type = "info" }) => {
  const getAlertClass = () => {
    switch (type) {
      case "success":
        return "alert-success";
      case "error":
        return "alert-error";
      case "warning":
        return "alert-warning";
      case "info":
      default:
        return "alert-info";
    }
  };

  return (
    <div className="alert-container">
      <div className={`alert ${getAlertClass()}`}>
        {message}
      </div>
    </div>
  );
};

export default Alert;
