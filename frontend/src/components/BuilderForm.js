import React, { useState } from "react";

const BuilderForm = () => {
  const [formData, setFormData] = useState({
    city: "",
    builderCompleteName: "",
    builderShortName: "",
    builderLogo: null,
    yearsInRealEstate: 0,
    shortDescription: "",
    listOfProjects: "",
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData({ ...formData, [name]: files[0] }); // Handle file uploads
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleNumberChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: Math.max(0, Number(value)) }); // Prevent negative values
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Builder Data Submitted:", formData);
    alert("Builder information submitted successfully!");
    setFormData({
      city: "",
      builderCompleteName: "",
      builderShortName: "",
      builderLogo: null,
      yearsInRealEstate: 0,
      shortDescription: "",
      listOfProjects: "",
    }); // Clear the form
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#f9f9f9",
      }}
    >
      <h2 style={{ marginBottom: "20px" }}>Builder Information Form</h2>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          width: "300px",
          gap: "15px",
        }}
      >
        <input
          type="text"
          name="city"
          placeholder="City"
          value={formData.city}
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <input
          type="text"
          name="builderCompleteName"
          placeholder="Builder Complete Name"
          value={formData.builderCompleteName}
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <input
          type="text"
          name="builderShortName"
          placeholder="Builder's Nick/Short Name"
          value={formData.builderShortName}
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <label style={labelStyle}>
          Upload Builder Logo:
          <input
            type="file"
            name="builderLogo"
            accept="image/*"
            onChange={handleChange}
            style={inputFileStyle}
          />
        </label>
        <input
          type="number"
          name="yearsInRealEstate"
          placeholder="No. of Years in Real Estate"
          value={formData.yearsInRealEstate}
          onChange={handleNumberChange}
          required
          style={inputStyle}
          min="0" // Enforces no negative values
        />
        <textarea
          name="shortDescription"
          placeholder="Short Description"
          value={formData.shortDescription}
          onChange={handleChange}
          rows="3"
          style={{ ...inputStyle, resize: "none" }}
        />
        <textarea
          name="listOfProjects"
          placeholder="List of Projects (comma-separated)"
          value={formData.listOfProjects}
          onChange={handleChange}
          rows="3"
          style={{ ...inputStyle, resize: "none" }}
        />
        <button type="submit" style={buttonStyle}>
          Submit
        </button>
      </form>
    </div>
  );
};

const inputStyle = {
  padding: "10px",
  fontSize: "14px",
  border: "1px solid #ccc",
  borderRadius: "5px",
};

const inputFileStyle = {
  marginTop: "10px",
  padding: "5px",
};

const labelStyle = {
  fontSize: "14px",
  marginBottom: "10px",
};

const buttonStyle = {
  padding: "10px",
  fontSize: "16px",
  backgroundColor: "#007BFF",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

export default BuilderForm;
