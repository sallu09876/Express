// Importing required modules
const express = require("express");
const { default: mongoose } = require("mongoose");

// Initializing the Express application
const app = express();

// Defining the port number
const PORT = 3000;

const User = require("./models/user"); // Importing User model

// Middleware to serve static files from 'public' directory
app.use(express.static("public"));

// Middleware to parse JSON requests
app.use(express.json());

// Middleware to parse URL-encoded requests
app.use(express.urlencoded({ extended: true }));

// MongoDB connection URL
const mongoURL =
  "mongodb+srv://sallu2004mkt_db_user:qScniugwZiJo6ne7@cluster0.hnozqxf.mongodb.net/Students?appName=mongosh+2.5.10";

// Connect to MongoDB
mongoose
  .connect(mongoURL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

// Setting EJS as the templating engine
app.set("view engine", "ejs");

// Defining routes
app.get("/wejs", (req, res) => {
  res.render("welcome", { title: "Home Page", name: "Salman" });
});

// Student route to render a list of students
app.get("/student", (req, res) => {
  const students = [
    "Salman",
    "Lisan",
    "Zameel",
    "Shadin",
    "Irfan",
    "Hisham",
    "Ashi",
  ];
  res.render("student", { title: "Student List", students: students });
});

// Home route
app.get("/", (req, res) => {
  res.send("<h1>Hello Express !<h1>");
});

// About route
app.get("/about", (req, res) => {
  res.send("About Page !");
});

// Contact route
app.get("/contact", (req, res) => {
  res.send("Contact Page !");
});

// JSON response route
app.get("/json", (req, res) => {
  res.json({
    name: "Salman Rasheed M",
    age: 21,
    city: "Calicut",
  });
});

// List route to fetch and display students from the database
app.get("/list", async (req, res) => {
  // Fetching students from the database
  try {
    const students = await User.find(); // Fetch all users from the database
    res.render("student", {
      // Render the student.ejs template
      title: "Student Page", // Title for the page
      students: students, // Pass the fetched students to the template
    });
  } catch (err) {
    // Error handling
    console.error(500).send("Error fetching students");
  }
});

// Add User route to render a form for adding a new student
app.get("/add-user", (req, res) => {
  res.render("add-user", { title: "Add Student" });
});

// Handling form submission from the Add User page
app.post("/add-user", async (req, res) => {
  try {
    const { name, email, age } = req.body;

    const user = new User({
      name,
      email,
      age,
    });
    await user.save(); // Save user to the database
    res.redirect("/list"); // Redirect to the list of students after saving
  } catch (error) {
    res.status(400).send("Error saving user: " + error.message);
  }
});

// Edit User route to render a form for editing an existing student
app.get("/add-user/edit/:id", async (req, res) => {
  try {
    const student = await User.findById(req.params.id); // Fetch the student by ID
    res.render("edit-user", { title: "Edit Student", student });
  } catch (err) {
    res.status(400).send("Error editing student: " + error.message);
  }
});

// Handling form submission from the Edit User page
app.post("/add-user/update/:id", async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, req.body); // Update the student in the database
    res.redirect("/list");
  } catch (error) {
    res.status(400).send("Error updating student: " + error.message);
  }
});

// Handling deletion of a student
app.post("/add-user/delete/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id); // Delete the student from the database
    res.redirect("/list");
  } catch (error) {
    res.status(400).send("Error deleting student: " + error.message);
  }
});

// Search route to find students by name
app.get("/add-user/search", async (req, res) => {
  try {
    const query = req.query.search_text; // Get the search text from query parameters
    // Search for students with names matching the query
    const students = await User.find({
      name: { $regex: query, $options: "i" }, // Case-insensitive regex search
    });
    // Render the student.ejs template with the search results
    res.render("student", {
      title: "Search Results", // Title for the page
      students: students, // Pass the search results to the template
    });
  } catch (error) {
    res.status(400).send("Error finding student: " + error.message);
  }
});

// Starting the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
