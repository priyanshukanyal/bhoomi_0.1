import * as Property from '../models/propertyModel.js';
import { uploadMultipleToBlobStorage } from '../services/azureblobservices.js';

// Retrieve all properties
export const getProperties = async (req, res) => {
  try {
    const properties = await Property.getAllProperties();
    res.json(properties);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching properties', error });
  }
};

// Retrieve a specific property by ID
export const getProperty = async (req, res) => {
  try {
    const property = await Property.getPropertyById(req.params.id);
    res.json(property);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching property', error });
  }
};

// Create a new property with multiple image uploads to Azure Blob
export const createProperty = async (req, res) => {
  try {
    const propertyData = req.body;

    // Upload images to Azure Blob if available
    if (req.files && req.files.image) {
      const imageFiles = req.files.image.map(file => ({ originalname: file.originalname, buffer: file.buffer }));
      propertyData.image_urls = await uploadMultipleToBlobStorage('properties', imageFiles);
    }

    const newProperty = await Property.createProperty(propertyData);
    res.status(201).json(newProperty);
  } catch (error) {
    res.status(500).json({ message: 'Error creating property', error });
  }
};

// Update an existing property with multiple image uploads to Azure Blob
export const updateProperty = async (req, res) => {
  try {
    const propertyData = req.body;

    // Upload new images to Azure Blob if available
    if (req.files && req.files.image) {
      const imageFiles = req.files.image.map(file => ({ originalname: file.originalname, buffer: file.buffer }));
      propertyData.image_urls = await uploadMultipleToBlobStorage('properties', imageFiles);
    }

    await Property.updateProperty(req.params.id, propertyData);
    res.json({ message: 'Property updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating property', error });
  }
};

// Delete a property by ID
export const deleteProperty = async (req, res) => {
  try {
    await Property.deleteProperty(req.params.id);
    res.json({ message: 'Property deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting property', error });
  }
};
