import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const redirectToProjectForm = () => {
    navigate("/project-form");
  };
  const redirectToPropertyForm = () => {
    navigate("/property-page");
  };
  const redirectToBuilderForm = () => {
    navigate("/builder-form");
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#f0f0f0",
      }}
    >
      <button
        onClick={redirectToProjectForm}
        style={{
          margin: "10px",
          padding: "15px 30px",
          fontSize: "16px",
          cursor: "pointer",
          border: "1px solid #ccc",
          borderRadius: "5px",
          backgroundColor: "#007BFF",
          color: "#fff",
        }}
      >
        Add Project
      </button>

      <button
        onClick={redirectToPropertyForm}
        style={{
          margin: "10px",
          padding: "15px 30px",
          fontSize: "16px",
          cursor: "pointer",
          border: "1px solid #ccc",
          borderRadius: "5px",
          backgroundColor: "#007BFF",
          color: "#fff",
        }}
      >
        Add Property
      </button>

      <button
        onClick={redirectToBuilderForm}
        style={{
          margin: "10px",
          padding: "15px 30px",
          fontSize: "16px",
          cursor: "pointer",
          border: "1px solid #ccc",
          borderRadius: "5px",
          backgroundColor: "#007BFF",
          color: "#fff",
        }}
      >
        Add Builder
      </button>
    </div>
  );
};

export default HomePage;
