export default async function handler(req, res) {
  const { lat, lon } = req.query;

  try {
    if (!lat || !lon) {
      return res.status(400).json({ error: "lat & lon wajib" });
    }

    // Reverse geocode via OpenStreetMap Nominatim
    // NOTE: Nominatim butuh User-Agent
    const url =
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${encodeURIComponent(lat)}&lon=${encodeURIComponent(lon)}&accept-language=id`;

    const r = await fetch(url, {
      headers: {
        "User-Agent": "jadwal-sholat-nu-vercel/1.0 (contact: you@example.com)",
        "Accept": "application/json",
      },
    });

    if (!r.ok) {
      return res.status(502).json({ error: "reverse geocode failed", status: r.status });
    }

    const data = await r.json();

    // Nominatim address fields bisa beda-beda tergantung wilayah
    const a = data.address || {};
    const province =
      a.state || a.province || a.region || a.state_district || null;

    const cityLike =
      a.city || a.town || a.municipality || a.county || a.city_district || a.suburb || null;

    return res.status(200).json({
      lat,
      lon,
      province,
      cityLike,
      raw: a,
      display_name: data.display_name || null,
    });
  } catch (err) {
    return res.status(500).json({ error: "reverse proxy error", detail: err?.message || String(err) });
  }
}
