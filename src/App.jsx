import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home.jsx";
import RecipeDetails from "./pages/RecipeDetails.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/recipes/:recipeName" element={<RecipeDetails />} />
    </Routes>
  );
}

export default App;