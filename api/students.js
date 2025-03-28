const express = require("express");
const { createClient } = require("@supabase/supabase-js");

const app = express();
app.use(express.json());

// Connect to Supabase
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// GET /students
app.get("/students", async (req, res) => {
  const { data, error } = await supabase
    .from("students")
    .select("*");

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.status(200).json(data);
});

// POST /students
app.post("/students", async (req, res) => {
  const newStudent = req.body;

  const { data, error } = await supabase
    .from("students")
    .insert([newStudent])
    .select();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.status(201).json(data);
});

module.exports = app;