import { Link, useLocation, useParams } from "react-router-dom";

function RecipeDetails() {
  const location = useLocation();
  const { recipeName } = useParams();

  const storedRecipe = localStorage.getItem("selectedRecipe");

  const recipe =
    location.state?.recipe ||
    (storedRecipe ? JSON.parse(storedRecipe) : null);

  if (!recipe) {
    return (
      <main className="page">
        <Link className="back-link" to="/">
          ← Back to search
        </Link>

        <section className="empty-state">
          <h1>{decodeURIComponent(recipeName || "Recipe")}</h1>
          <p>
            Recipe details were not found. Please go back and select a recipe
            again.
          </p>
        </section>
      </main>
    );
  }

  const instructions = normalizeInstructions(recipe.instructions);

  return (
    <main className="page detail-page">
      <Link className="back-link" to="/">
        ← Back to search
      </Link>

      <section className="detail-header">
        <div>
          <span className="hero-badge">Recipe Details</span>
          <h1>{recipe.name}</h1>
          <p>
            Compatibility rate:{" "}
            <strong>{recipe.match_score}%</strong>
          </p>
        </div>

        <div className="score-circle detail-score">
          <strong>{recipe.match_score}%</strong>
          <span>match</span>
        </div>
      </section>

      <section className="detail-grid">
        <div className="detail-card">
          <h2>Ingredients you have</h2>

          {recipe.available_ingredients?.length ? (
            <ul className="tag-list">
              {recipe.available_ingredients.map((ingredient) => (
                <li key={ingredient}>{ingredient}</li>
              ))}
            </ul>
          ) : (
            <p>No matching ingredients were found.</p>
          )}
        </div>

        <div className="detail-card">
          <h2>Missing ingredients</h2>

          {recipe.missing_ingredients?.length ? (
            <ul className="tag-list missing">
              {recipe.missing_ingredients.map((ingredient) => (
                <li key={ingredient}>{ingredient}</li>
              ))}
            </ul>
          ) : (
            <p>No missing ingredients.</p>
          )}
        </div>
      </section>

      <section className="detail-card full-width">
        <h2>Original ingredients</h2>

        {recipe.original_ingredients?.length ? (
          <ul className="clean-list">
            {recipe.original_ingredients.map((ingredient, index) => (
              <li key={`${ingredient}-${index}`}>{ingredient}</li>
            ))}
          </ul>
        ) : (
          <p>No original ingredients available.</p>
        )}
      </section>

      <section className="detail-card full-width">
        <h2>Instructions</h2>

        {instructions.length ? (
          <ol className="instruction-list">
            {instructions.map((step, index) => (
              <li key={`${step}-${index}`}>{step}</li>
            ))}
          </ol>
        ) : (
          <p>No instructions available.</p>
        )}
      </section>

      <section className="detail-card full-width">
        <h2>Original recipe source</h2>

        {recipe.source_url ? (
          <a
            className="source-link"
            href={recipe.source_url}
            target="_blank"
            rel="noreferrer"
          >
            Open original recipe
          </a>
        ) : (
          <p>No source URL available.</p>
        )}
      </section>
    </main>
  );
}

function normalizeInstructions(instructions) {
  if (!instructions) {
    return [];
  }

  if (Array.isArray(instructions)) {
    return instructions
      .map((step) => String(step).trim())
      .filter(Boolean);
  }

  if (typeof instructions === "string") {
    return instructions
      .split(/\.\s+/)
      .map((step) => step.trim())
      .filter(Boolean)
      .map((step) => (step.endsWith(".") ? step : `${step}.`));
  }

  return [String(instructions)];
}

export default RecipeDetails;