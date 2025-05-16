const { Sequelize } = require("sequelize");

// Database configuration
const dbConfig = {
  database: "campus_management",
  username: "postgres",
  password: "1234",
  host: "localhost",
  port: 5432,
  dialect: "postgres",
  logging: (msg) => console.log(`[Database] ${msg}`),
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};

// Create a temporary connection to create the database if it doesn't exist
const createDatabase = async () => {
  const tempSequelize = new Sequelize(
    "postgres",
    dbConfig.username,
    dbConfig.password,
    {
      host: dbConfig.host,
      port: dbConfig.port,
      dialect: dbConfig.dialect,
      logging: false,
    }
  );

  try {
    await tempSequelize.authenticate();
    console.log("Connected to PostgreSQL");

    // Try to create database
    await tempSequelize.query(`CREATE DATABASE ${dbConfig.database}`);
    console.log(`Database ${dbConfig.database} created successfully`);
  } catch (error) {
    if (error.message.includes("already exists")) {
      console.log(`Database ${dbConfig.database} already exists`);
    } else {
      console.error("Error creating database:", error);
      throw error;
    }
  } finally {
    await tempSequelize.close();
  }
};

// Create Sequelize instance
const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: dbConfig.dialect,
    logging: dbConfig.logging,
    pool: dbConfig.pool,
  }
);

// Test the connection
const testConnection = async () => {
  try {
    console.log("\n=== Database Connection Test ===");
    console.log("Attempting to connect to PostgreSQL...");

    // Create database if it doesn't exist
    await createDatabase();

    // Now connect to the database
    await sequelize.authenticate();
    console.log("\n✅ Database connection successful!");
  } catch (error) {
    console.error("\n❌ Database connection error:", error.message);
    console.error("\nFull error:", error);
    console.log("\n=== Troubleshooting Steps ===");
    console.log("1. Check if PostgreSQL is running:");
    console.log("   - Open Services (Win + R, type 'services.msc')");
    console.log("   - Look for 'PostgreSQL' service");
    console.log("   - Make sure it's running");
    console.log("\n2. Verify PostgreSQL credentials:");
    console.log("   - Username: postgres");
    console.log("   - Password: 1234");
    console.log("   - Port: 5432");
    console.log("\n3. Try these commands in a new terminal:");
    console.log("   psql -U postgres");
    console.log("   (When prompted, enter password: 1234)");
    console.log("\n4. If password is different:");
    console.log("   - Open pgAdmin 4");
    console.log("   - Right-click PostgreSQL server");
    console.log("   - Select Properties");
    console.log("   - Check Connection tab for password");
    process.exit(1);
  }
};

// Run the connection test
testConnection();

module.exports = {
  sequelize,
};
