const express = require("express");
const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();

const app = express();
app.use(express.json());

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const TABLE = "groupnotes";

app.get(`/${TABLE}`, async (req, res) => {
  const { data, error } = await supabase.from(TABLE).select("*");
  if (error) return res.status(500).json({ error: error.message });
  res.status(200).json(data);
});

app.post(`/${TABLE}`, async (req, res) => {
  const payload = req.body;
  const { data, error } = await supabase.from(TABLE).insert([payload]).select();
  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data);
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
