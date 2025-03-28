const express = require("express");
const { createClient } = require("@supabase/supabase-js");

const app = express();
app.use(express.json());

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

app.get("/journal_entries", async (req, res) => {
  const { data, error } = await supabase
    .from("journal_entries")
    .select("*");

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.status(200).json(data);
});

app.post("/journal_entries", async (req, res) => {
  const payload = req.body;

  const { data, error } = await supabase
    .from("journal_entries")
    .insert([payload])
    .select();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.status(201).json(data);
});

module.exports = app;
