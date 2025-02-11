const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json()); // Middleware to parse JSON requests

// Database Connection (Replace with your MongoDB Atlas URL)
mongoose
  .connect("mongodb+srv://lab4:D6bFLOgERwPtMa3f@cluster0.tlx8o.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => {
    console.error("Database connection failed:", err);
    process.exit(1);
  });


// Define User Schema with Validation
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    username: { type: String, required: true, minlength: 4 },
    email: { type: String, required: true, match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
    address: {
      street: { type: String, required: true },
      suite: { type: String, required: true },
      city: { type: String, required: true, match: /^[A-Za-z\s]+$/ },
      zipcode: { type: String, required: true, match: /^\d{5}-\d{4}$/ },
      geo: {
        lat: { type: String, required: true },
        lng: { type: String, required: true }
      }
    },
    phone: { type: String, required: true, match: /^1-\d{3}-\d{3}-\d{4}$/ },
    website: { type: String, required: true, match: /^(https?:\/\/)[\w.-]+(\.[a-z]{2,})+$/ },
    company: {
      name: { type: String, required: true },
      catchPhrase: { type: String, required: true },
      bs: { type: String, required: true }
    }
  });
  
  const User = mongoose.model("User", userSchema);
  



// Create a new user (POST API)
app.post("/users", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json({ message: "User created successfully", user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Start server
const PORT = 8081;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
