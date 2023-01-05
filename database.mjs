let db = new Dexie("RecipeDatabase");
db.version(1).stores({ recipes: "++id, name, ingredients" });

// Ingredients are an array of ingredient arrays which contain ["quantity","unit","name"]
// db.recipes
//   .bulkPut([
//     {
//       name: "Spaghetti",
//       ingredients: [
//         ["quantity", "unit", "tomato"],
//         ["quantity", "unit", "spaghetti"],
//         ["quantity", "unit", "beef"],
//       ],
//       method: "mix furiosly",
//     },
//     {
//       name: "Pie",
//       ingredients: [
//         ["quantity", "unit", "pastry"],
//         ["quantity", "unit", "stock"],
//         ["quantity", "unit", "beef"],
//       ],
//       method: "mix well",
//     },
//   ])
//   .then(function () {
//     return db.recipes.toArray();
//   })
//   .then(function (recipes) {
//     //return db.recipes.each((recipe) => log(recipe.name));
//     //log("Found recipes: " + JSON.stringify(recipes, null, 2));
//   })
//   .catch((err) => {
//     alert("something went wrong" + err);
//   });
