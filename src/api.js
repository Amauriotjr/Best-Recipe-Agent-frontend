const API_URL = import.meta.env.VITE_API_URL || "https://best-recipe-agent-backend.onrender.com";

export async function getRecipeRecommendations(ingredients) {
  const response = await fetch(`${API_URL}/recommend`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      ingredients,
      max_results: 20
    })
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    const message =
      errorData?.detail || "Could not fetch recipe recommendations.";

    throw new Error(message);
  }

  return response.json();
}

export function getApiUrl() {
  return API_URL;
}