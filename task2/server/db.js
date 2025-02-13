import "dotenv/config";
import sql from "mssql";

const config = {
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  port: parseInt(process.env.DB_PORT, 10),
  options: {
    encrypt: false, // Set to true if using Azure SQL
    trustServerCertificate: true, // Required for self-signed certificates
  },
  authentication: {
    type: 'ntlm', // Use NTLM authentication (Windows Authentication)
    options: {
      domain: '', // Leave empty if not part of a domain
    },
  },
  trustedConnection: true, // Use Windows authentication (integrated security)
};

export async function connectDB() {
  try {
    await sql.connect(config);
    console.log("Connected to SQL Server");
  } catch (err) {
    console.error("Database connection failed:", err);
  }
}

export default sql;
