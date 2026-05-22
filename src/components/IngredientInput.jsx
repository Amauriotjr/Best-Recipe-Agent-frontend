import { useState } from "react";

function IngredientInput({
  ingredients,
  setIngredients,
  onSearch,
  onClear,
  loading
}) {
  const [value, setValue] = useState("");

  function addIngredient() {
    const cleanedValue = value.trim().toLowerCase();

    if (!cleanedValue) {
      return;
    }

    if (!ingredients.includes(cleanedValue)) {
      setIngredients([...ingredients, cleanedValue]);
    }

    setValue("");
  }

  function removeIngredient(ingredientToRemove) {
    setIngredients(
      ingredients.filter((ingredient) => ingredient !== ingredientToRemove)
    );
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      addIngredient();
    }
  }

  function handleSearchClick() {
    if (value.trim()) {
      const cleanedValue = value.trim().toLowerCase();

      if (!ingredients.includes(cleanedValue)) {
        onSearch([...ingredients, cleanedValue]);
        setValue("");
        return;
      }
    }

    onSearch(ingredients);
  }

  function handleClearClick() {
    setValue("");
    onClear();
  }

  return (
    <div className="search-panel">
      <div className="input-row">
        <input
          type="text"
          placeholder="Type an ingredient, for example: eggs"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          onKeyDown={handleKeyDown}
        />

        <button
          type="button"
          className="secondary-button"
          onClick={addIngredient}
        >
          Add
        </button>

        <button
          type="button"
          className="primary-button"
          onClick={handleSearchClick}
          disabled={loading}
        >
          {loading ? "Searching..." : "Search Recipes"}
        </button>

        <button
          type="button"
          className="clear-button"
          onClick={handleClearClick}
          disabled={loading}
        >
          Clear
        </button>
      </div>

      <p className="helper-text">
        Press Enter or click Add to include more ingredients.
      </p>

      {ingredients.length > 0 && (
        <div className="ingredient-list">
          {ingredients.map((ingredient) => (
            <button
              type="button"
              key={ingredient}
              className="ingredient-chip"
              onClick={() => removeIngredient(ingredient)}
              title="Click to remove"
            >
              {ingredient}
              <span>×</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default IngredientInput;