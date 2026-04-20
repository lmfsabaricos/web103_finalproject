const API_BASE = process.env.PLANT_API_BASE;

const mapPlant = (plant) => ({
  name: plant.common_name ?? plant.scientific_name?.[0] ?? "Unknown",
  description: null,
  flower_family: plant.family ?? null,
  flower_meaning: null,
  image_url: plant.default_image?.regular_url ?? plant.default_image?.original_url ?? null,
});

export const fetchFlowersFromAPI = async (maxPages = 10) => {
  const allFlowers = [];

  for (let page = 1; page <= maxPages; page++) {
    const res = await fetch(`${API_BASE}/species-list?key=${process.env.PLANT_API_KEY}&page=${page}`);
    const json = await res.json();
    const data = json.data ?? [];
    allFlowers.push(...data.map(mapPlant));
    if (page >= (json.last_page ?? 1)) break;
  }

  return allFlowers;
};
