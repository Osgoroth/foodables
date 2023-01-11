db.open().catch(function (err) {
  console.error("Failed to open db: " + (err.stack || err));
});

let clearButton = document.getElementById("clearDB");
let recipeDropdown = document.getElementById("recipe-dropdown");
let recipeDropdownButton = document.getElementById("dropdownMenuButton1");
let addButton = document.getElementById("addRecipes");

let recipeCardsContainer = document.querySelector("#recipeCards");

clearButton.onclick = function () {
  db.recipes.clear();
  while (!null) {
    recipeDropdown.firstElementChild.remove();
  }
};

recipeDropdownButton.onclick = () => {
  // db.recipes.each((recipe) =>

  populateRecipeList();
};

addButton.onclick = function () {
  db.recipes
    .bulkPut([
      {
        name: "Spaghetti",
        ingredients: [
          ["quantity", "unit", "tomato"],
          ["quantity", "unit", "spaghetti"],
          ["quantity", "unit", "beef"],
        ],
        method: "mix furiosly",
      },
      {
        name: "Pie",
        ingredients: [
          ["quantity", "unit", "pastry"],
          ["quantity", "unit", "stock"],
          ["quantity", "unit", "beef"],
        ],
        method: "mix well",
      },
    ])
    .then()
    .catch((err) => {
      alert("something went wrong" + err);
    });

  // document.getElementById("recipe-drowdown");
};

function populateRecipeList() {
  let recipe_dropdown = document.getElementById("recipe-dropdown");
  let currentRecipes = [];

  let dropdownItems = document.getElementsByClassName("dropdown-item");
  for (let i = 0; i < dropdownItems.length; i++) {
    currentRecipes.push(Number(dropdownItems[i].id));
  }

  db.recipes
    .orderBy("id")
    .toArray()
    .then((recipes) => {
      recipes.forEach((recipe) => {
        if (!currentRecipes.includes(recipe.id)) {
          let linkNode = document.createElement("a");
          let listNode = document.createElement("li");
          let textNode = document.createTextNode(recipe.name);
          linkNode.appendChild(textNode);
          linkNode.classList.add("dropdown-item");
          linkNode.id = recipe.id;
          linkNode.onclick = () => displayRecipe(recipe);
          listNode.appendChild(linkNode);
          recipe_dropdown.appendChild(listNode);
        } else {
          //...
        }
      });
    })
    .catch((error) => {
      log(error);
    });
}

function displayRecipe(recipe) {
  log(JSON.stringify(recipe, null, 2));
}
document.addEventListener("DOMContentLoaded", loadRecipes(), false);

function loadRecipes() {
  db.recipes
    .orderBy("id")
    .toArray()
    .then((recipes) => {
      recipes.forEach((recipe) => {
        const recipeCard = `
        <div class="col">
        <div class="card text-start btn btn-outline-dark">
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
