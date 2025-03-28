const express = require("express");
const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();

const app = express();
app.use(express.json());

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const TABLE = "students";

app.get(`/${TABLE}`, async (req, res) => {
  const { data, error } = await supabase.from(TABLE).select("*");
  if (error) return res.status(500).json({ error: error.message });
  res.status(200).json(data);
});

app.post(`/${TABLE}`, async (req, res) => {
   console.log("BODY:", req.body); // ✅ log the body
	const payload = req.body;

  console.log("🟡 Incoming payload:", payload);

  // Basic validation (you can extend this as needed)
  if (!payload.first_name || !payload.last_name) {
    console.error("🔴 Missing required fields");
    return res.status(400).json({ error: "first_name and last_name are required." });
  }

  const { data, error } = await supabase.from(TABLE).insert([payload]).select();

  console.log("🔵 Supabase response:", { data, error });

 if (error) {
    console.error("INSERT ERROR:", error); // ✅ log error
    return res.status(500).json({ error: error.message });
  }

  res.status(201).json({
    message: "Student created successfully.",
    student: data[0],
  });
});

app.patch(`/${TABLE}/:id`, async (req, res) => {
  const id = req.params.id;
  const payload = req.body;
  const { data, error } = await supabase
    .from(TABLE)
    .update(payload)
    .eq("id", id)
    .select();
  if (error) return res.status(500).json({ error: error.message });
  res.status(200).json(data);
});

module.exports = app;
