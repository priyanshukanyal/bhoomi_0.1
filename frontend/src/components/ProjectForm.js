import React, { useState } from "react";

const ProjectForm = () => {
  const [formData, setFormData] = useState({
    city: "",
    builderName: "",
    projectName: "",
    companyUnderLaunch: "",
    launchDate: "",
    shortCode: "",
    status: "Under Construction",
    deliveryDate: "",
    reraNumber: "",
    phases: [
      {
        phaseName: "Phase 1",
        reraNumber: "",
        status: "Under Construction",
        deliveryDate: "",
        towers: 0,
        apartments: 0,
        possessionStatus: "",
      },
    ],
    totalTowers: 0,
    totalFlats: 0,
    constructionType: "",
    floorsPerTower: 0,
    area: "",
    openArea: "",
    sectorBriefing: "",
    projectBriefing: "",
    layoutPlan: null,
    propertyTypes: [],
    configurations: [],
    amenities: [],
  });
  const handleBHKChange = (index, field, value) => {
    const updatedBHK = [...formData.bhk];
    updatedBHK[index][field] = value;
    setFormData({ ...formData, bhk: updatedBHK });
  };

  const addBHK = () => {
    setFormData({
      ...formData,
      bhk: [
        ...formData.bhk,
        {
          towerName: "",
          bedroomsPlanImage: "",
          carpetArea: "",
          masterArea: "",
          bath: "",
          balcony: "",
          price: "",
        },
      ],
    });
  };

  const deleteBHK = (index) => {
    const updatedBHK = formData.bhk.filter((_, i) => i !== index);
    setFormData({ ...formData, bhk: updatedBHK });
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handlePhaseChange = (index, field, value) => {
    const updatedPhases = [...formData.phases];
    updatedPhases[index][field] = value;
    setFormData({ ...formData, phases: updatedPhases });
  };

  const addPhase = () => {
    setFormData({
      ...formData,
      phases: [
        ...formData.phases,
        {
          phaseName: `Phase ${formData.phases.length + 1}`, // Corrected backticks
          reraNumber: "",
          status: "Under Construction",
          deliveryDate: "",
          towers: 0,
          apartments: 0,
          possessionStatus: "",
        },
      ],
    });
  };

  const deletePhase = (index) => {
    const updatedPhases = formData.phases.filter((_, i) => i !== index);
    setFormData({ ...formData, phases: updatedPhases });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Data:", formData);
    alert("Project details submitted successfully!");
    // Reset form data
    setFormData({
      city: "",
      builderName: "",
      projectName: "",
      companyUnderLaunch: "",
      launchDate: "",
      shortCode: "",
      status: "Under Construction",
      deliveryDate: "",
      reraNumber: "",
      phases: [
        {
          phaseName: "Phase 1",
          reraNumber: "",
          status: "Under Construction",
          deliveryDate: "",
          towers: 0,
          apartments: 0,
          possessionStatus: "",
        },
      ],
      totalTowers: 0,
      totalFlats: 0,
      constructionType: "",
      floorsPerTower: 0,
      area: "",
      openArea: "",
      sectorBriefing: "",
      projectBriefing: "",
      layoutPlan: null,
      propertyTypes: [],
      configurations: [],
      amenities: [],
    });
  };

  return (
    <div style={{ padding: "20px", backgroundColor: "#f5f5f5" }}>
      <h2 style={{ textAlign: "center" }}>Project Form</h2>
      <form
        onSubmit={handleSubmit}
        style={{ maxWidth: "800px", margin: "0 auto" }}
      >
        {/* Select City */}
        <label>City:</label>
        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
          required
          placeholder="Select City"
        />

        {/* Builder Name */}
        <label>Builder Name:</label>
        <input
          type="text"
          name="builderName"
          value={formData.builderName}
          onChange={handleChange}
          required
          placeholder="Enter Builder Name"
        />

        {/* Project Name */}
        <label>Project Name:</label>
        <input
          type="text"
          name="projectName"
          value={formData.projectName}
          onChange={handleChange}
          required
          placeholder="Enter Project Name"
        />

        {/* Company Under Launch */}
        <label>Company Under Project Launched:</label>
        <input
          type="text"
          name="companyUnderLaunch"
          value={formData.companyUnderLaunch}
          onChange={handleChange}
          placeholder="Company Name"
        />

        {/* Project Launch Date */}
        <label>Project Launch Date:</label>
        <input
          type="date"
          name="launchDate"
          value={formData.launchDate}
          onChange={handleChange}
          required
        />

        {/* Project Short Code */}
        <label>Project Short Code:</label>
        <input
          type="text"
          name="shortCode"
          value={formData.shortCode}
          onChange={handleChange}
          placeholder="Short Code"
        />

        {/* Status */}
        <label>Project Status:</label>
        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="Under Construction">Under Construction</option>
          <option value="Delivered">Delivered</option>
        </select>

        {/* Delivery Date */}
        {formData.status === "Delivered" && (
          <>
            <label>Month and Year Delivered:</label>
            <input
              type="month"
              name="deliveryDate"
              value={formData.deliveryDate}
              onChange={handleChange}
              required
            />
          </>
        )}

        {/* Phases */}
        {formData.phases.map((phase, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              marginTop: "10px",
            }}
          >
            <h4>{phase.phaseName}</h4>
            <label>RERA Number:</label>
            <input
              type="text"
              value={phase.reraNumber}
              onChange={(e) =>
                handlePhaseChange(index, "reraNumber", e.target.value)
              }
              placeholder="RERA Number"
            />

            <label>Status:</label>
            <select
              value={phase.status}
              onChange={(e) =>
                handlePhaseChange(index, "status", e.target.value)
              }
            >
              <option value="Under Construction">Under Construction</option>
              <option value="Delivered">Delivered</option>
            </select>

            {phase.status === "Delivered" && (
              <>
                <label>Month and Year Delivered:</label>
                <input
                  type="month"
                  value={phase.deliveryDate}
                  onChange={(e) =>
                    handlePhaseChange(index, "deliveryDate", e.target.value)
                  }
                />
              </>
            )}

            <label>Total Towers:</label>
            <input
              type="number"
              value={phase.towers}
              onChange={(e) =>
                handlePhaseChange(index, "towers", e.target.value)
              }
              min="0"
            />

            <label>Total Apartments:</label>
            <input
              type="number"
              value={phase.apartments}
              onChange={(e) =>
                handlePhaseChange(index, "apartments", e.target.value)
              }
              min="0"
            />

            <button
              type="button"
              onClick={() => deletePhase(index)}
              style={{
                backgroundColor: "#ff4d4d",
                color: "white",
                border: "none",
                padding: "5px 10px",
                cursor: "pointer",
                marginTop: "10px",
              }}
            >
              Delete Phase
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addPhase}
          style={{
            backgroundColor: "#4CAF50",
            color: "white",
            padding: "10px 15px",
            cursor: "pointer",
            marginTop: "10px",
          }}
        >
          Add Phase
        </button>

        {/* Total Towers */}
        <label>Total Towers in Society:</label>
        <input
          type="number"
          name="totalTowers"
          value={formData.totalTowers}
          onChange={handleChange}
          min="0"
        />

        {/* Total Flats */}
        <label>Total Flats in Society:</label>
        <input
          type="number"
          name="totalFlats"
          value={formData.totalFlats}
          onChange={handleChange}
          min="0"
        />

        {/* File Upload */}
        <label>Master Layout Plan:</label>
        <input
          type="file"
          name="layoutPlan"
          onChange={handleChange}
          accept=".jpg, .png, .pdf"
        />

        <button
          type="submit"
          style={{
            marginTop: "20px",
            padding: "10px 15px",
            backgroundColor: "#007BFF",
            color: "white",
            border: "none",
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ProjectForm;
