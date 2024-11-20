// models/propertyModel.js
import sql from 'mssql';

// Fetch all properties
export const getAllProperties = async () => {
  const request = new sql.Request();
  const result = await request.query('SELECT * FROM Properties');
  return result.recordset;
};

// Fetch property by ID
export const getPropertyById = async (id) => {
  const request = new sql.Request();
  request.input('id', sql.Int, id);
  const result = await request.query('SELECT * FROM Properties WHERE property_id = @id');
  return result.recordset[0];
};

// Create a new property
export const createProperty = async (property) => {
  const request = new sql.Request();
  request
    .input('property_type', sql.VarChar(50), property.property_type)
    .input('category', sql.VarChar(50), property.category)
    .input('city', sql.VarChar(100), property.city)
    .input('locality', sql.VarChar(100), property.locality)
    .input('price', sql.Decimal(10, 2), property.price)
    .input('sqft', sql.Int, property.sqft)
    .input('bedrooms', sql.Int, property.bedrooms)
    .input('bathrooms', sql.Int, property.bathrooms)
    .input('parking_spaces', sql.Int, property.parking_spaces)
    .input('furnishing_status', sql.VarChar(50), property.furnishing_status)
    .input('property_status', sql.VarChar(50), property.property_status)
    .input('listed_startdate', sql.DateTime, property.listed_startdate)
    .input('listing_enddate', sql.DateTime, property.listing_enddate)
    .input('image_url', sql.VarChar, property.image_url || null)
    .input('video_url', sql.VarChar, property.video_url || null);

  const result = await request.query(`
    INSERT INTO Properties (property_type, category, city, locality, price, sqft, bedrooms, bathrooms, parking_spaces, furnishing_status, property_status, listed_startdate, listing_enddate, image_url, video_url)
    VALUES (@property_type, @category, @city, @locality, @price, @sqft, @bedrooms, @bathrooms, @parking_spaces, @furnishing_status, @property_status, @listed_startdate, @listing_enddate, @image_url, @video_url);
    SELECT SCOPE_IDENTITY() AS property_id;
  `);

  return result.recordset[0];
};

// Update property by ID
export const updateProperty = async (id, property) => {
  const request = new sql.Request();
  request
    .input('id', sql.Int, id)
    .input('property_type', sql.VarChar(50), property.property_type)
    .input('category', sql.VarChar(50), property.category)
    .input('city', sql.VarChar(100), property.city)
    .input('locality', sql.VarChar(100), property.locality)
    .input('price', sql.Decimal(10, 2), property.price)
    .input('sqft', sql.Int, property.sqft)
    .input('bedrooms', sql.Int, property.bedrooms)
    .input('bathrooms', sql.Int, property.bathrooms)
    .input('parking_spaces', sql.Int, property.parking_spaces)
    .input('furnishing_status', sql.VarChar(50), property.furnishing_status)
    .input('property_status', sql.VarChar(50), property.property_status)
    .input('listed_startdate', sql.DateTime, property.listed_startdate)
    .input('listing_enddate', sql.DateTime, property.listing_enddate)
    .input('image_url', sql.VarChar, property.image_url || null)
    .input('video_url', sql.VarChar, property.video_url || null);

  await request.query(`
    UPDATE Properties
    SET property_type = @property_type, category = @category, city = @city, locality = @locality, price = @price, sqft = @sqft, bedrooms = @bedrooms, bathrooms = @bathrooms,
        parking_spaces = @parking_spaces, furnishing_status = @furnishing_status, property_status = @property_status, listed_startdate = @listed_startdate, listing_enddate = @listing_enddate, image_url = @image_url, video_url = @video_url
    WHERE property_id = @id;
  `);
};

// Delete property by ID
export const deleteProperty = async (id) => {
  const request = new sql.Request();
  request.input('id', sql.Int, id);
  await request.query('DELETE FROM Properties WHERE property_id = @id');
};
