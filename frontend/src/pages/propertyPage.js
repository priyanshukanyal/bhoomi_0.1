// frontend/src/pages/PropertyPage.js
import React, { useState, useEffect } from "react";
import {
  fetchAllProperties,
  createProperty,
  updateProperty,
  deleteProperty,
} from "../api/api";
import PropertyList from "../components/PropertyList";
import PropertyForm from "../components/PropertyForm";

const PropertyPage = () => {
  const [properties, setProperties] = useState([]);
  const [editingProperty, setEditingProperty] = useState(null);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const data = await fetchAllProperties();
      setProperties(data);
    } catch (error) {
      console.error("Error fetching properties:", error);
    }
  };

  const handleAddProperty = async (property) => {
    try {
      await createProperty(property);
      fetchProperties();
    } catch (error) {
      console.error("Error creating property:", error);
    }
  };

  const handleUpdateProperty = async (property) => {
    try {
      await updateProperty(property.property_id, property);
      setEditingProperty(null);
      fetchProperties();
    } catch (error) {
      console.error("Error updating property:", error);
    }
  };

  const handleDeleteProperty = async (id) => {
    try {
      await deleteProperty(id);
      fetchProperties();
    } catch (error) {
      console.error("Error deleting property:", error);
    }
  };

  return (
    <div>
      <h1>BHOOMI - Property Management</h1>
      {editingProperty ? (
        <PropertyForm
          property={editingProperty}
          onSubmit={handleUpdateProperty}
          onCancel={() => setEditingProperty(null)}
        />
      ) : (
        <PropertyForm onSubmit={handleAddProperty} />
      )}
      <PropertyList
        properties={properties}
        onEdit={setEditingProperty}
        onDelete={handleDeleteProperty}
      />
    </div>
  );
};

export default PropertyPage;

// // frontend/src/App.js
// import React, { useState, useEffect } from "react";
// import {
//   fetchAllProperties,
//   createProperty,
//   updateProperty,
//   deleteProperty,
// } from "../api/api";
// import PropertyList from "../components/PropertyList";
// import PropertyForm from "../components/PropertyForm";

// const  App() {
//   const [properties, setProperties] = useState([]);
//   const [editingProperty, setEditingProperty] = useState(null);

//   useEffect(() => {
//     fetchProperties();
//   }, []);

//   const fetchProperties = async () => {
//     try {
//       const data = await fetchAllProperties();
//       setProperties(data);
//     } catch (error) {
//       console.error("Error fetching properties:", error);
//     }
//   };

//   const handleAddProperty = async (property) => {
//     try {
//       await createProperty(property);
//       fetchProperties();
//     } catch (error) {
//       console.error("Error creating property:", error);
//     }
//   };

//   const handleUpdateProperty = async (property) => {
//     try {
//       await updateProperty(property.property_id, property);
//       setEditingProperty(null);
//       fetchProperties();
//     } catch (error) {
//       console.error("Error updating property:", error);
//     }
//   };

//   const handleDeleteProperty = async (id) => {
//     try {
//       await deleteProperty(id);
//       fetchProperties();
//     } catch (error) {
//       console.error("Error deleting property:", error);
//     }
//   };

//   return (
//     <div>
//       <h1>BHOOMI</h1>
//       {editingProperty ? (
//         <PropertyForm
//           property={editingProperty}
//           onSubmit={handleUpdateProperty}
//           onCancel={() => setEditingProperty(null)}
//         />
//       ) : (
//         <PropertyForm onSubmit={handleAddProperty} />
//       )}
//       <PropertyList
//         properties={properties}
//         onEdit={setEditingProperty}
//         onDelete={handleDeleteProperty}
//       />
//     </div>
//   );
// }

// export default App;
