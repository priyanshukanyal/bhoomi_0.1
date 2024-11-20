import React from "react";
import ReactDOM from "react-dom/client"; // React 18 import
import { BrowserRouter as Router } from "react-router-dom"; // Router is imported here
import App from "./App"; // Import the main App component

// Rendering the App component inside the Router
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);

// import React from "react";
// import ReactDOM from "react-dom/client"; // Updated import for React 18
// import App from "./App";
// import HomePage from "./components/HomePage";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import BuilderForm from "./components/BuilderForm";

// // const root = ReactDOM.createRoot(document.getElementById("root"));
// // root.render(<App />);
// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <Router>
//       <Routes>
//         <Route path="/" element={<HomePage />} />
//       </Routes>
//     </Router>
//   </React.StrictMode>
// );
