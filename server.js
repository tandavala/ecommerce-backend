const express = require("express");
const connectDB = require("./config/db");
const app = express();

// Connect Database
connectDB();

// Init middleware
app.use(express.json({ extended: false }));

app.get("/", (req, res) => res.send("API Home page"));

// Define routes
app.use("/users", require("./routes/users"));
app.use("/auth", require("./routes/auth"));
app.use("/admin", require("./routes/admin"));
app.use("/category", require("./routes/category"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
