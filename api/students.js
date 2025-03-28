
const express = require("express");
const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();

const app = express();
app.use(express.json());

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

app.get("/", async (req, res) => {
  const { data, error } = await supabase.from("students").select("*");
  if (error) return res.status(500).json({ error });
  res.status(200).json(data);
});

app.post("/", async (req, res) => {
  const { data, error } = await supabase.from("students").insert([req.body]);
  if (error) return res.status(500).json({ error });
  res.status(200).json(data);
});

module.exports = app;
