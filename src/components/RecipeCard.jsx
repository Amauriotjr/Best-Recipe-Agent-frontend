import { useNavigate } from "react-router-dom";

function RecipeCard({ recipe }) {
  const navigate = useNavigate();

  function openDetails() {
    localStorage.setItem("selectedRecipe", JSON.stringify(recipe));
    navigate(`/recipes/${encodeURIComponent(recipe.name)}`, {
      state: { recipe }
    });
  }

  return (
    <article className="recipe-card" onClick={openDetails}>
      <div className="recipe-card-header">
        <div>
          <h3>{recipe.name}</h3>
          <p className="recipe-source">
            Source: {recipe.source || "Unknown source"}
          </p>
        </div>

        <div className="small-score">{recipe.match_score}%</div>
      </div>

      <div className="recipe-card-body">
        <div>
          <span className="section-label">You have</span>
          <p>
            {recipe.available_ingredients?.length
              ? recipe.available_ingredients.join(", ")
              : "No matching ingredients"}
          </p>
        </div>

        <div>
          <span className="section-label">Missing</span>
          <p>
            {recipe.missing_ingredients?.length
              ? recipe.missing_ingredients.slice(0, 8).join(", ")
              : "Nothing missing"}
          </p>
        </div>
      </div>
    </article>
  );
}

export default RecipeCard;