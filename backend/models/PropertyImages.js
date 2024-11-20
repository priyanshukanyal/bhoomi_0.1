import sql from "mssql";
import connectDB from "../config/db.js";

class PropertyImages {
  static async createTable() {
    const pool = await connectDB();
    const query = `
      IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='PropertyImages' AND xtype='U')
      CREATE TABLE PropertyImages (
        image_id INT IDENTITY(1,1) PRIMARY KEY,
        property_id INT NOT NULL,
        imageUrl NVARCHAR(MAX) NOT NULL,
        uploadedAt DATETIME DEFAULT GETDATE(),
        FOREIGN KEY (property_id) REFERENCES Properties(property_id)
      );
    `;
    try {
      await pool.request().query(query);
      console.log("PropertyImages table created or already exists");
    } catch (error) {
      console.error("Error creating PropertyImages table:", error.message);
    }
  }

  static async insertImage(property_id, imageUrl) {
    try {
      // Insert the image URL into the database
      const pool = await connectDB();
      const query = `
        INSERT INTO PropertyImages (property_id, imageUrl, uploadedAt)
        VALUES (@property_id, @imageUrl, GETDATE())
      `;
      await pool
        .request()
        .input("property_id", sql.Int, property_id)
        .input("imageUrl", sql.NVarChar, imageUrl)
        .query(query);

      console.log("Image URL inserted into PropertyImages table");
    } catch (error) {
      console.error("Error inserting image URL:", error.message);
    }
  }

  static async getImagesByPropertyId(property_id) {
    const pool = await connectDB();
    const query = `
      SELECT * FROM PropertyImages WHERE property_id = @property_id
    `;
    try {
      const result = await pool
        .request()
        .input("property_id", sql.Int, property_id)
        .query(query);
      return result.recordset;
    } catch (error) {
      console.error("Error fetching images:", error.message);
      return null;
    }
  }
}

export default PropertyImages;
