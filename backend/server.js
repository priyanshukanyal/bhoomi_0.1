import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import path, { dirname } from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import connectDB from "./config/db.js";
import propertyRoutes from "./routes/propertyRoutes.js";
import PropertyImages from "./models/PropertyImages.js";

dotenv.config(); // Load environment variables

// Initialize the Express application
const app = express();

// Connect to the SQL Server database
connectDB();

// Get the directory name in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Middleware setup
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Enable JSON body parsing for incoming requests
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // Serve static files

// Set up multer to handle file uploads
const storage = multer.memoryStorage(); // Use memory storage to directly upload to Azure
const upload = multer({ storage: storage });

// Route to handle property creation (including image upload)
app.post("/api/properties", upload.single("image"), async (req, res) => {
  const { body, file } = req;

  if (!file) {
    return res.status(400).json({ message: "No image uploaded" });
  }

  try {
    // Generate a unique filename based on the current timestamp
    const fileName = `${Date.now()}-${file.originalname}`;

    // Upload image to Azure Blob Storage and get the URL
    const imageUrl = await PropertyImages.uploadImageToAzure(
      file.buffer,
      fileName
    );

    // Save the image URL and property details to the database
    await PropertyImages.insertImage(body.property_id, imageUrl);

    res.status(200).json({
      message: "Property created successfully",
      data: {
        ...body,
        image: imageUrl,
      },
    });
  } catch (error) {
    console.error("Error creating property:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Serve images directly from the Azure Blob Storage URL (no need to store locally in /uploads)

// Additional routes
app.use("/api/properties", propertyRoutes); // Property routes

// Default route for root access
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(err.status || 500)
    .json({ message: err.message || "Internal Server Error" });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import connectDB from "./config/db.js"; // Connects to SQL Server
// import propertyRoutes from "./routes/propertyRoutes.js";
// import path from "path";
// import { fileURLToPath } from "url"; // Import fileURLToPath
// import { dirname } from "path"; // Import dirname

// dotenv.config(); // Load environment variables

// // Initialize the Express application
// const app = express();

// // Connect to the SQL Server database
// connectDB();

// // Get the directory name in ES module
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// // Middleware setup
// app.use(cors()); // Enable Cross-Origin Resource Sharing
// app.use(express.json()); // Enable JSON body parsing for incoming requests
// app.use(express.static("uploads"));
// // Serve images from the uploads directory
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// // Set up the routes
// app.use("/api/properties", propertyRoutes); // Property routes

// // Default route for root access
// app.get("/", (req, res) => {
//   res.send("API is running...");
// });

// // Error handling middleware (optional)
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res
//     .status(err.status || 500)
//     .json({ message: err.message || "Internal Server Error" });
// });

// // Start the server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

// import multer from "multer";
// import fs from "fs";

// // Setup multer to store files in the 'uploads' directory
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const uploadPath = "./uploads";
//     if (!fs.existsSync(uploadPath)) {
//       fs.mkdirSync(uploadPath);
//     }
//     cb(null, uploadPath); // Specify where to save the file
//   },
//   filename: (req, file, cb) => {
//     // Use the current timestamp to avoid file name conflicts
//     cb(null, Date.now() + path.extname(file.originalname));
//   },
// });

// const upload = multer({ storage: storage });

// // Middleware to serve static files (images) from the 'uploads' folder
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// // Route to handle property creation (including image upload)
// app.post("/api/properties", upload.single("image"), (req, res) => {
//   const { body, file } = req;

//   if (!file) {
//     return res.status(400).json({ message: "No image uploaded" });
//   }

//   // Assuming 'image' is the field name from the form
//   const imageUrl = `/uploads/${file.filename}`; // Construct the image URL

//   // Handle the property data (save to database, etc.)
//   const propertyData = {
//     ...body, // property data from the form
//     image: imageUrl, // Add the image URL to the property data
//   };

//   // Simulate saving the property data (you can replace this with actual DB logic)
//   res.status(200).json({
//     message: "Property created successfully",
//     data: propertyData,
//     imageUrl: imageUrl, // Send back the image URL
//   });
// });

// import express from 'express';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import connectDB from './config/db.js'; // Connects to SQL Server
// import propertyRoutes from './routes/propertyRoutes.js';
// import path from 'path';

// dotenv.config(); // Load environment variables

// // Initialize the Express application
// const app = express();

// // Connect to the SQL Server database
// connectDB();

// // Middleware setup
// app.use(cors()); // Enable Cross-Origin Resource Sharing
// app.use(express.json()); // Enable JSON body parsing for incoming requests

// // Serve images from the uploads directory
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// // Set up the routes
// app.use('/api/properties', propertyRoutes); // Property routes

// // Default route for root access
// app.get('/', (req, res) => {
//   res.send('API is running...');
// });

// // Error handling middleware (optional)
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });
// });

// // Start the server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

// // import express from 'express';
// // import cors from 'cors';
// // import dotenv from 'dotenv';
// // import connectDB from './config/db.js'; // Connects to SQL Server
// // import propertyRoutes from './routes/propertyRoutes.js';

// // dotenv.config(); // Load environment variables

// // import path from 'path';

// // // Middleware setup
// // app.use(cors()); // Enable Cross-Origin Resource Sharing
// // app.use(express.json()); // Enable JSON body parsing for incoming requests

// // // Serve images from the uploads directory
// // app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// // // Set up the routes
// // app.use('/api/properties', propertyRoutes); // Property routes

// // // Default route for root access
// // app.get('/', (req, res) => {
// //   res.send('API is running...');
// // });

// // // Error handling middleware
// // app.use((err, req, res, next) => {
// //   console.error(err.stack);
// //   res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });
// // });

// // // Initialize the Express application
// // const app = express();

// // // Connect to the SQL Server database
// // connectDB();

// // // Middleware setup
// // app.use(cors()); // Enable Cross-Origin Resource Sharing
// // app.use(express.json()); // Enable JSON body parsing for incoming requests

// // // Set up the routes
// // app.use('/api/properties', propertyRoutes); // Property routes

// // // Default route for root access
// // app.get('/', (req, res) => {
// //   res.send('API is running...');
// // });

// // // Error handling middleware (optional)
// // app.use((err, req, res, next) => {
// //   console.error(err.stack);
// //   res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });
// // });

// // // Start the server
// // const PORT = process.env.PORT || 5000;
// // app.listen(PORT, () => {
// //   console.log(`Server is running on port ${PORT}`);
// // });
