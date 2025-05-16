const { Campus, Student } = require("./models");

const seed = async () => {
  try {
    // Create campuses
    const campus1 = await Campus.create({
      name: "Harvard University",
      address: "Cambridge, MA",
      description:
        "One of the oldest and most prestigious universities in the US",
      imageUrl: "https://example.com/harvard.jpg",
    });

    const campus2 = await Campus.create({
      name: "MIT",
      address: "Cambridge, MA",
      description: "Leading institution for science and technology",
      imageUrl: "https://example.com/mit.jpg",
    });

    // Create students
    await Student.create({
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      gpa: 3.8,
      campusId: campus1.id,
    });

    await Student.create({
      firstName: "Jane",
      lastName: "Smith",
      email: "jane.smith@example.com",
      gpa: 3.9,
      campusId: campus2.id,
    });

    console.log("✅ Seed data created successfully!");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    throw error;
  }
};

module.exports = seed;
