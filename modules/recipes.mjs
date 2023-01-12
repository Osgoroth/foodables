db.open().catch(function (err) {
  console.error("Failed to open db: " + (err.stack || err));
});

//let clearButton = document.getElementById("clearDB");
//let recipeDropdown = document.getElementById("recipe-dropdown");
//let recipeDropdownButton = document.getElementById("dropdownMenuButton1");
//let addButton = document.getElementById("addRecipes");

let recipeCardsContainer = document.querySelector("#recipeCards");

document.addEventListener("DOMContentLoaded", loadRecipes(), false);

function loadRecipes() {
  db.recipes
    .orderBy("id")
    .toArray()
    .then((recipes) => {
      recipes.forEach((recipe) => {
        const recipeCard = `<div class="col" onclick=viewRecipe(${recipe.id})>
        <div class="card shadow-sm recipe-card">
          <svg class="bd-placeholder-img card-img-top" width="100%" height="125px" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"/><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text></svg>
          <div class="card-body">
          <h6 class="card-title">${recipe.name}</h>
          </div>
        </div>
      </div>`;
        recipeCardsContainer.insertAdjacentHTML("beforeend", recipeCard);
      });
    })
    .catch((error) => {
      log(error);
    });
}

function viewRecipe(recipeID) {
  alert("Now viewing recipe: " + recipeID);
}
