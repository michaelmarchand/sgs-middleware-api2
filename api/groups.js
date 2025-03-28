const express = require("express");
const router = express.Router();
const supabase = require("../supabase");

router.get("/", async (req, res) => {
  const { data, error } = await supabase.from("groups").select("*");
  if (error) return res.status(500).json({ error: error.message });
  res.status(200).json(data);
});

router.post("/", async (req, res) => {
  const { data, error } = await supabase.from("groups").insert([req.body]);
  if (error) return res.status(500).json({ error: error.message });
  res.status(200).json(data);
});

router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase
    .from("groups")
    .update(req.body)
    .eq("id", id);
  if (error) return res.status(500).json({ error: error.message });
  res.status(200).json(data);
});

module.exports = router;
