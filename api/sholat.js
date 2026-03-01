export default async function handler(req, res) {
  const { type } = req.query;

  const BASE = "https://equran.id/api/v2/shalat";

  try {
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

    // jadwal bulanan
    const r = await fetch(`${BASE}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });

    const data = await r.json();
    return res.status(200).json(data);

  } catch (err) {
    return res.status(500).json({ error: "Proxy error", detail: err.message });
  }
}
