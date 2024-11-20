import express from 'express';
import {
  getProperties,
  getProperty,
  createProperty,
  updateProperty,
  deleteProperty,
} from '../controllers/propertyController.js';
import upload from '../middleware/multerconfig.js';

const router = express.Router();

// Get all properties
router.get('/', getProperties);

// Get a specific property by ID
router.get('/:id', getProperty);

// Create a new property with multiple image uploads
router.post(
  '/',
  upload.fields([{ name: 'image', maxCount: 5 }]), // Allow up to 5 images
  createProperty
);

// Update an existing property with multiple image uploads
router.put(
  '/:id',
  upload.fields([{ name: 'image', maxCount: 5 }]), // Allow up to 5 images
  updateProperty
);

// Delete a property by ID
router.delete('/:id', deleteProperty);

export default router;
