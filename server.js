const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json()); // For parsing JSON body
app.use(express.static(__dirname)); // Serves static files

// Route to serve index.html
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

// Route to fetch demo cloud monitoring data
app.get("/api/data", (req, res) => {
    const data = {
        ec2: { instances: 5, utilization: "40%" },
        s3: { buckets: 3, utilization: "25%" },
        rds: { databases: 2, utilization: "60%" },
        kubernetes: { pods: 10, utilization: "35%" }
    };
    res.json(data);
});

// Route to fetch data from db.json (if exists)
app.get("/api/db", (req, res) => {
    fs.readFile(__dirname + "/db.json", "utf8", (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Error reading database file" });
        }
        res.json(JSON.parse(data));
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
