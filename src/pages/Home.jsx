import { useEffect, useState } from "react";

import { getRecipeRecommendations } from "../api.js";
import IngredientInput from "../components/IngredientInput.jsx";
import BestRecipeCard from "../components/BestRecipeCard.jsx";
import RecipeCard from "../components/RecipeCard.jsx";

const SEARCH_STORAGE_KEY = "recipeSearchState";

function Home() {
  const [ingredients, setIngredients] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const savedSearch = localStorage.getItem(SEARCH_STORAGE_KEY);

    if (!savedSearch) {
      return;
    }

    try {
      const parsedSearch = JSON.parse(savedSearch);

      setIngredients(parsedSearch.ingredients || []);
      setRecommendations(parsedSearch.recommendations || []);
      setSummary(parsedSearch.summary || "");
    } catch {
      localStorage.removeItem(SEARCH_STORAGE_KEY);
    }
  }, []);

  async function searchRecipes(ingredientList) {
    const finalIngredients = ingredientList.filter(Boolean);

    if (finalIngredients.length === 0) {
      setError("Please add at least one ingredient before searching.");
      return;
    }

    setError("");
    setLoading(true);
    setRecommendations([]);
    setSummary("");

    try {
      const ingredientText = finalIngredients.join(", ");
      const data = await getRecipeRecommendations(ingredientText);

      const sortedRecommendations = [...(data.recommendations || [])].sort(
        (a, b) => b.match_score - a.match_score
      );

      const limitedRecommendations = sortedRecommendations.slice(0, 20);

      setIngredients(finalIngredients);
      setRecommendations(limitedRecommendations);
      setSummary(data.summary || "");

      localStorage.setItem(
        SEARCH_STORAGE_KEY,
        JSON.stringify({
          ingredients: finalIngredients,
          recommendations: limitedRecommendations,
          summary: data.summary || ""
        })
      );
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  }

  function clearSearch() {
    setIngredients([]);
    setRecommendations([]);
    setSummary("");
    setError("");

    localStorage.removeItem(SEARCH_STORAGE_KEY);
    localStorage.removeItem("selectedRecipe");
  }

  const bestRecipe = recommendations[0];
  const otherRecipes = recommendations.slice(1, 20);

  return (
    <main className="page">
      <section className="hero">
        <div className="hero-badge">Recipe Recommendation Agent</div>
        <h1>Find recipes based on what you already have.</h1>
        <p>
          Add your ingredients, search recipes, and see the best matches ranked
          by compatibility.
        </p>
      </section>

      <IngredientInput
        ingredients={ingredients}
        setIngredients={setIngredients}
        onSearch={searchRecipes}
        onClear={clearSearch}
        loading={loading}
      />

      {error && <div className="error-box">{error}</div>}

      {summary && (
        <section className="result-summary">
          <p>{summary}</p>
        </section>
      )}

      {bestRecipe && <BestRecipeCard recipe={bestRecipe} />}

      {otherRecipes.length > 0 && (
        <section className="recipe-list-section">
          <div className="section-title-row">
            <h2>Other Recommendations</h2>
            <span>{recommendations.length} results</span>
          </div>

          <div className="recipe-list">
            {otherRecipes.map((recipe, index) => (
              <RecipeCard
                key={`${recipe.name}-${index}`}
                recipe={recipe}
              />
            ))}
          </div>
        </section>
      )}

      {!loading && recommendations.length === 0 && !error && (
        <section className="empty-state">
          <h2>No search yet</h2>
          <p>
            Add ingredients such as <strong>flour</strong>,{" "}
            <strong>eggs</strong>, <strong>butter</strong>, or{" "}
            <strong>peanut butter</strong> to start.
          </p>
        </section>
      )}
    </main>
  );
}

export default Home;