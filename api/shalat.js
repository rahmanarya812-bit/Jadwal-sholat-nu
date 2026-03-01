export default async function handler(req, res) {
  const BASE = "https://equran.id/api/v2/shalat";
  const { type } = req.query;

  try {
    // Allow CORS (optional, tapi aman)
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
      return res.status(200).end();
    }

    if (type === "provinsi") {
      const r = await fetch(`${BASE}/provinsi`);
      const data = await r.json();
      return res.status(200).json(data);
    }

    if (type === "kabkota") {
      const r = await fetch(`${BASE}/kabkota`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(req.body),
      });
      const data = await r.json();
      return res.status(200).json(data);
    }

    // default: jadwal bulanan
    const r = await fetch(`${BASE}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });

    const data = await r.json();
    return res.status(200).json(data);

  } catch (err) {
    return res.status(500).json({ error: "Proxy error", detail: err?.message || String(err) });
  }
}
