const express = require("express");
const fetch = require("node-fetch");
const router = express.Router();

router.post("/gpt-action", async (req, res) => {
  const { route, method, payload } = req.body;

  if (!route || !method) {
    return res.status(400).json({ error: "Missing route or method" });
  }

  try {
    const response = await fetch(`https://sgs-middleware-api-4.vercel.app${route}`, {
      method: method.toUpperCase(),
      headers: {
        "Content-Type": "application/json"
      },
      body: method.toUpperCase() === "GET" ? undefined : JSON.stringify(payload)
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (err) {
    res.status(500).json({ error: "Proxy failed", details: err.message });
  }
});

module.exports = router;
