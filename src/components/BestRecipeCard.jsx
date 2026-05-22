import { useNavigate } from "react-router-dom";

function BestRecipeCard({ recipe }) {
  const navigate = useNavigate();

  function openDetails() {
    localStorage.setItem("selectedRecipe", JSON.stringify(recipe));
    navigate(`/recipes/${encodeURIComponent(recipe.name)}`, {
      state: { recipe }
    });
  }

  return (
    <section className="best-recipe-card" onClick={openDetails}>
      <div className="best-label">Best Match</div>

      <div className="best-content">
        <div>
          <h2>{recipe.name}</h2>
          <p className="recipe-source">
            Source: {recipe.source || "Unknown source"}
          </p>
        </div>

        <div className="score-circle">
          <strong>{recipe.match_score}%</strong>
          <span>match</span>
        </div>
      </div>

      <div className="recipe-summary-grid">
        <div>
          <h3>You have</h3>
          <p>
            {recipe.available_ingredients?.length
              ? recipe.available_ingredients.join(", ")
              : "No matching ingredients"}
          </p>
        </div>

        <div>
          <h3>Missing</h3>
          <p>
            {recipe.missing_ingredients?.length
              ? recipe.missing_ingredients.slice(0, 8).join(", ")
              : "Nothing missing"}
          </p>
        </div>
      </div>

      <p className="click-hint">Click to view recipe details</p>
    </section>
  );
}

export default BestRecipeCard;