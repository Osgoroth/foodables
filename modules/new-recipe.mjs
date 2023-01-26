let ingredientID = 0;
let ingredientsList = document.getElementById("ingredientsList");
let stepList = document.getElementById("methodList");

function addIngredient(source) {
  ingredientID++;
  source.innerHTML = '<i class="bi bi-trash3"></i>';
  source.setAttribute("onclick", "removeIngredient(this)");
  source.classList.remove("btn-outline-secondary");
  source.classList.add("btn-danger");

  ingredientsList.insertAdjacentHTML(
    "beforeend",
    `<div class="input-group mb-2" id="${ingredientID}">
    <input
    id="amount"
    type="number"
    class="form-control"
    aria-label="Amount (to the nearest gram)"
    placeholder="Amount"
    required
  />
  <input
    id="unit"
    type="text"
    class="form-control"
    aria-label="Unit of measure"
    placeholder="Unit of measure"
    required
  />
  <input
    id="ingredientName"
    type="text"
    class="form-control"
    aria-label="Ingredient name"
    placeholder="Ingredient name"
    required
  />
  <button
    class="btn btn-outline-secondary"
    type="button"
    onclick='addIngredient(this)'
    
  >
  <i class="bi bi-plus"></i>
  </button>
  </div>`
  );
}

function removeIngredient(source) {
  let parent = source.parentNode;
  parent.remove();

  //log(parent.id);
}

function addStep(source) {
  source.innerHTML = '<i class="bi bi-trash3"></i>';
  source.setAttribute("onclick", "removeStep(this)");
  source.classList.remove("btn-outline-secondary");
  source.classList.add("btn-danger");

  stepList.insertAdjacentHTML(
    "beforeend",
    `<div class="input-group mb-3">
        <span class="input-group-text stepLabel">Step 2</span>
        <textarea
          id="step"
          class="form-control"
          aria-label="Step 1"
          required
        ></textarea>
        <button
          class="btn btn-outline-secondary"
          type="button"
          onclick="addStep(this)"
        >
      <i class="bi bi-plus"></i>
      </button>
    </div>`
  );
  updateLabel();
}

function removeStep(source) {
  let parent = source.parentNode;
  parent.remove();
  //rename all labels
  updateLabel();
}

function updateLabel() {
  let labels = [...document.getElementsByClassName("stepLabel")];
  for (let index = 0; index < labels.length; index++) {
    const label = labels[index];
    label.innerHTML = `Step ${index + 1}`;
  }
}

function saveRecipe() {
  db.open().catch(function (err) {
    console.error("Failed to open db: " + (err.stack || err));
  });

  db.recipes
    .put({
      name: document.querySelector("#recipeName").value,
      description: document.querySelector("#recipeDescription").value,
      ingredients: getIngredients(),
      method: getMethod(),
    })
    .catch(function (err) {
      console.error("Failed to add recipe: " + (err.stack || err));
    });
}

function getIngredients() {
  let ingredients = [];
  let ingredientList = [...document.querySelector("#ingredientsList").children];
  for (let index = 0; index < ingredientList.length; index++) {
    const ingredient = ingredientList[index];
    ingredients.push([
      ingredient.querySelector("#amount").value,
      ingredient.querySelector("#unit").value,
      ingredient.querySelector("#ingredientName").value,
    ]);
  }
  return ingredients;
}

function getMethod() {
  let method = [];
  let steps = [...document.querySelector("#methodList").children];
  for (let index = 0; index < steps.length; index++) {
    const step = steps[index];
    method.push([
      step.querySelector(".stepLabel").innerHTML,
      step.querySelector("#step").value,
    ]);
  }
  return method;
}
