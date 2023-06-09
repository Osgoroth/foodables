

export default async function RandomRecipe() {
  const res = await fetch(
    "https://www.themealdb.com/api/json/v1/1/random.php",
    { cache: "no-store" }
  );

  const data = await res.json();
  const recipe = data.meals[0];
  return <h1>{recipe.strMeal}</h1>;
  
}

