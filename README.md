# Best Recipe Agent - Frontend

Best Recipe Agent Frontend is a React application that provides a clean and minimal user interface for searching recipe recommendations based on available ingredients.

The frontend communicates with the Best Recipe Agent Backend API, which is built with FastAPI and uses MongoDB to retrieve and rank recipes.

---

## Live Deployment

Frontend Application:

```text
https://best-recipe-agent-frontend.vercel.app
```

Backend API:

```text
https://best-recipe-agent-backend.onrender.com
```

Backend Swagger Documentation:

```text
https://best-recipe-agent-backend.onrender.com/docs
```

Backend Repository:

```text
https://github.com/Amauriotjr/Best-Recipe-Agent-backend
```

---

## Project Goal

The goal of this frontend is to allow users to enter ingredients they already have and receive ranked recipe recommendations.

The user can:

- add ingredients one by one;
- search for recipes;
- view the best matching recipe highlighted at the top;
- view up to 20 recommendations;
- click a recipe to open a details page;
- see available ingredients;
- see missing ingredients;
- see original ingredients;
- see recipe instructions;
- open the original recipe source link;
- clear the search and start again.

---

## Main Features

- Minimal and responsive interface
- Ingredient search bar
- Add multiple ingredients
- Remove selected ingredients
- Clear search button
- Recipe recommendations ranked by match score
- Best recipe highlighted at the top
- Recipe cards displayed in rectangular layout
- Recipe details page
- Search state saved when returning from details
- Integration with deployed FastAPI backend
- Ready for Vercel deployment

---

## Technologies Used

- React
- Vite
- React Router DOM
- JavaScript
- CSS
- Vercel
- Git
- GitHub

---

## Frontend Workflow

The frontend follows this flow:

```text
User enters ingredients
→ React sends POST request to backend
→ Backend returns ranked recipes
→ Frontend displays best recipe and other recommendations
→ User clicks a recipe
→ Frontend opens recipe details page
```

The frontend consumes the backend endpoint:

```text
POST /recommend
```

---

## Project Structure

```text
Best-Recipe-Agent-frontend/
│
├── src/
│   ├── api.js
│   ├── App.jsx
│   ├── main.jsx
│   ├── styles.css
│   │
│   ├── components/
│   │   ├── BestRecipeCard.jsx
│   │   ├── IngredientInput.jsx
│   │   └── RecipeCard.jsx
│   │
│   └── pages/
│       ├── Home.jsx
│       └── RecipeDetails.jsx
│
├── .env.example
├── .gitignore
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

## Pages

### Home Page

The home page allows the user to:

- type an ingredient;
- add ingredients;
- remove ingredients;
- search recipes;
- clear the current search;
- view recipe recommendations.

The best matching recipe appears larger at the top of the page.

Other recipes appear below as rectangular cards.

---

### Recipe Details Page

The details page displays:

- recipe title;
- compatibility rate;
- ingredients the user has;
- missing ingredients;
- original ingredients;
- instructions;
- original recipe source link.

The user can click:

```text
Back to search
```

to return to the previous search results without losing the current search.

---

## Environment Variables

Create a `.env` file in the project root.

Example:

```env
VITE_API_URL=http://127.0.0.1:8000
```

For production, use the deployed backend URL:

```env
VITE_API_URL=https://best-recipe-agent-backend.onrender.com
```

The `.env` file must not be committed to GitHub.

A safe example file is included as:

```text
.env.example
```

Example `.env.example`:

```env
VITE_API_URL=http://127.0.0.1:8000
```

---

## Installation

Clone the repository:

```bash
git clone https://github.com/Amauriotjr/Best-Recipe-Agent-frontend.git
cd Best-Recipe-Agent-frontend
```

Install dependencies:

```bash
npm install
```

---

## Running the Frontend Locally

Start the development server:

```bash
npm run dev
```

Open the application:

```text
http://localhost:5173
```

The backend must also be running.

Local backend URL:

```text
http://127.0.0.1:8000
```

---

## Running the Backend Locally

The backend is located in a separate repository:

```text
https://github.com/Amauriotjr/Best-Recipe-Agent-backend
```

To run the backend locally:

```bash
uvicorn src.main:app --reload
```

Backend Swagger UI:

```text
http://127.0.0.1:8000/docs
```

---

## API Integration

The frontend sends requests to the backend using the API URL configured in:

```text
VITE_API_URL
```

The request is sent to:

```text
POST /recommend
```

Example request body:

```json
{
  "ingredients": "flour, sugar, eggs, butter",
  "max_results": 20
}
```

Example response:

```json
{
  "user_ingredients": [
    "flour",
    "sugar",
    "eggs",
    "butter"
  ],
  "total_recommendations": 20,
  "summary": "The best recommendation is Example Recipe with a match score of 75.0%.",
  "recommendations": [
    {
      "name": "Example Recipe",
      "match_score": 75.0,
      "available_ingredients": [
        "flour",
        "sugar",
        "eggs"
      ],
      "missing_ingredients": [
        "butter"
      ],
      "original_ingredients": [
        "1 cup flour",
        "1 cup sugar",
        "2 eggs",
        "1/2 cup butter"
      ],
      "instructions": [
        "Mix all ingredients.",
        "Bake until ready."
      ],
      "source_url": "https://example.com"
    }
  ]
}
```

---

## User Interface Behavior

### Ingredient Input

The user can type an ingredient and click:

```text
Add
```

or press:

```text
Enter
```

The ingredient is added as a chip.

The user can remove an ingredient by clicking the chip.

---

### Search

When the user clicks:

```text
Search Recipes
```

the frontend sends the ingredient list to the backend.

The returned recipes are sorted by compatibility score.

The best match is displayed at the top.

Up to 20 recipes are displayed.

---

### Clear Search

The user can click:

```text
Clear
```

This clears:

- selected ingredients;
- recipe recommendations;
- summary;
- selected recipe;
- saved search state.

---

### Back to Search

When the user opens a recipe details page and clicks:

```text
Back to search
```

the previous search state is restored.

This allows the user to explore multiple recipes without losing the search results.

---

## Build

To create a production build:

```bash
npm run build
```

The build output is generated in:

```text
dist/
```

To preview the production build locally:

```bash
npm run preview
```

---

## Deployment on Vercel

This frontend is deployed on Vercel.

Recommended Vercel configuration:

```text
Framework Preset:
Vite
```

```text
Build Command:
npm run build
```

```text
Output Directory:
dist
```

```text
Install Command:
npm install
```

Required environment variable:

```env
VITE_API_URL=https://best-recipe-agent-backend.onrender.com
```

After changing an environment variable on Vercel, redeploy the project.

---

## CORS Requirement

The backend must allow requests from the deployed Vercel frontend URL.

In the backend `src/main.py`, the Vercel URL should be included in the CORS allowed origins list.

Example:

```python
allow_origins=[
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "https://best-recipe-agent-frontend.vercel.app"
]
```

---

## GitHub Notes

The following files and folders should not be committed:

```text
node_modules/
dist/
.env
.env.local
```

They are ignored by `.gitignore`.

---

## Deployment Strategy

The project uses a separated deployment strategy:

```text
Frontend:
Vercel

Backend:
Render

Database:
MongoDB Atlas
```

This makes the system easier to maintain because each part has a specific responsibility.

---

## Project Status

Current version: `1.0.0`

The frontend currently supports:

- ingredient input;
- multiple ingredient selection;
- recipe search;
- ranked recipe display;
- best match highlighting;
- recipe details page;
- saved search state;
- clear search button;
- Vercel deployment.

---

## Future Improvements

Possible improvements include:

- user accounts;
- saved favorite recipes;
- recipe image display;
- filters by category;
- filters by cuisine;
- filters by difficulty;
- loading skeletons;
- pagination;
- improved mobile animations.

---

## Related Repository

Backend repository:

```text
https://github.com/Amauriotjr/Best-Recipe-Agent-backend
```

---

## License

This project is for academic and educational purposes.