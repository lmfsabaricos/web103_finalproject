// Fetches flowers from external API and maps them to your DB schema
const API_BASE = "..."; // or your chosen API

export const fetchFlowersFromAPI = async (page = 1) => {
  const res = await fetch(
    `${API_BASE}/species-list?key=${process.env.PLANT_API_KEY}&page=${page}&type=flower`,
  );
  const json = await res.json();

  return json.data.map((plant) => ({
    name: plant.common_name,
    description: plant.description ?? null,
    flower_family: plant.family ?? null,
    flower_meaning: null, // most APIs don't have this; you'll add manually or skip
    image_url: plant.default_image?.regular_url ?? null,
  }));
};
