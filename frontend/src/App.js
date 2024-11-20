import React from "react";
import { Routes, Route } from "react-router-dom"; // Removed duplicate Router import
import HomePage from "./components/HomePage";
import BuilderForm from "./components/BuilderForm";
import ProjectForm from "./components/ProjectForm";
import PropertyForm from "./components/PropertyForm";
import PropertyPage from "./pages/propertyPage.js"; // Ensure casing matches your file name

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/property-page" element={<PropertyPage />} />
      <Route path="/project-form" element={<ProjectForm />} />
      <Route path="/builder-form" element={<BuilderForm />} />
      <Route path="/property-form" element={<PropertyForm />} />
    </Routes>
  );
};

export default App;

// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import HomePage from "./components/HomePage";
// import BuilderForm from "./components/BuilderForm";
// import ProjectForm from "./components/ProjectForm";
// import PropertyForm from "./components/PropertyForm";

// import PropertyPage from "./pages/propertyPage.js";

// const App = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<HomePage />} />
//         <Route path="/property-page" element={<PropertyPage />} />

//         {/* Make reasonable Changes */}
//         <Route path="/ProjectForm" element={<ProjectForm />} />
//         <Route path="/BuilderForm" element={<BuilderForm />} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;
