db.open().catch(function (err) {
  alert("Failed to open db: " + (err.stack || err));
});

let recipeCardsContainer = document.querySelector("#recipeCards");

document.addEventListener("DOMContentLoaded", loadRecipes(), false);

function loadRecipes() {
  db.recipes
    .orderBy("id")
    .toArray()
    .then((recipes) => {
      recipes.forEach((recipe) => {
        const recipeCard = /*html*/ ` 
        <div
          class="col"
          
        >
          <div class="card h-100 shadow-sm recipe-card">
            <div>
              <div class="btn-group position-absolute top-0 end-0 px-1 z-1">
                <button class="btn btn-link btn-sm link-secondary" onclick=""><i class="bi bi-pencil-square"></i></button>
                <button class="btn btn-link btn-sm link-secondary" onclick="deleteRecipe(${recipe.id})"><i class="bi bi-x-square"></i></button>
              </div>
            </div>
            <div onclick="viewRecipe(${recipe.id})">
              <svg
                class="bd-placeholder-img card-img-top"
                width="100%"
                height="125px"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-label="Placeholder: Thumbnail"
                preserveAspectRatio="xMidYMid slice"
                focusable="false"
              >
                <title>Placeholder</title>
                <rect width="100%" height="100%" fill="#55595c" />
                <text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text>
              </svg>
              <div class="card-body">
                <p class="d-inline-block text-truncate card-text py-0">
                  ${recipe.name}
                </p>
              </div>
            </div>
          </div>
        </div>`;
        recipeCardsContainer.insertAdjacentHTML("beforeend", recipeCard);
      });
    })
    .catch((error) => {
      alert(error);
    });
}

function viewRecipe(id) {
  db.recipes
    .get(id)
    .then((recipe) => {
      let recipeNav = document.querySelector(".recipe-nav");
      let recipeAlbum = document.querySelector(".recipe-album");
      let infoContainer = document.querySelector(".recipe-info");

      // build the recipe views
      // Info
      // hide the album view and show nav and recipe info
      // other elements are still hidden
      toggleVisibility(
        ".recipe-album",
        ".recipe-nav",
        ".floating-button-home",
        ".floating-button-back"
      );

      let recipeInfo = `<div class="row"><h1>${recipe.name}</h1></div>
        <div class="row"><p>${recipe.description}</p></div>`;
      infoContainer.insertAdjacentHTML("beforeend", recipeInfo);

      // Ingredients
      let ingredientsTableBody = document.querySelector(".ingredients-table");
      let ingredientRows = "";
      recipe.ingredients.forEach(
        (ingredient) =>
          (ingredientRows += /*html*/ `
              <tr>
                <td>${ingredient[0]} ${ingredient[1]}</td>
                <td>${ingredient[2]}</td>
              </tr>
            `)
      );
      ingredientsTableBody.insertAdjacentHTML("beforeend", ingredientRows);

      // Method
      let methodTableBody = document.querySelector(".method-table");
      let methodRows = "";
      recipe.method.forEach(
        (step) =>
          (methodRows += /*html*/ `
            <tr>
              <td>${step[0]}:</td>
              <td>${step[1]}</td>
            </tr>`)
      );
      methodTableBody.insertAdjacentHTML("beforeend", methodRows);
    })
    .catch((error) => {
      alert(error);
    });
}

function toggleVisibility(...classNames) {
  for (const className of classNames) {
    let element = document.querySelector(className);
    if (element.classList.contains("visually-hidden")) {
      element.classList.remove("visually-hidden");
    } else {
      element.classList.add("visually-hidden");
    }
  }
}

function deleteRecipe(recipeID) {
  db.recipes.delete(recipeID);
  //reload recipes
  loadRecipes();
}
