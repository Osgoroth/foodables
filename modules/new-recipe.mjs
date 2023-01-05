let ingredientID = 0;
let ingredientsList = document.getElementById("ingredientsList");
let stepList = document.getElementById("methodList");
let addIngredientButton = document.getElementById("addButton");

function addIngredient(source) {
  ingredientID++;
  source.innerText = "-";
  source.setAttribute("onclick", "removeIngredient(this)");
  source.classList.add("btn-danger");

  ingredientsList.insertAdjacentHTML(
    "beforeend",
    `<div class="input-group mb-2" id="${ingredientID}">
  <input
    type="number"
    class="form-control"
    aria-label="Amount (to the nearest gram)"
    placeholder="Amount"
  />
  <input
    type="text"
    class="form-control"
    aria-label="Unit of measure"
    placeholder="Unit of measure"
  />
  <input
    type="text"
    class="form-control"
    aria-label="Ingredient name"
    placeholder="Ingredient name"
  />
  <button
    class="btn btn-outline-secondary"
    type="button"
    onclick='addIngredient(this)'
    
  >
    +
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
  source.innerText = "-";
  source.setAttribute("onclick", "removeStep(this)");
  source.classList.add("btn-danger");

  let steps = [...stepList.children];
  stepList.insertAdjacentHTML(
    "beforeend",
    `<div class="input-group mb-3">
  <span class="input-group-text stepLabel">Step 2</span>
  <textarea
    id="step-1"
    class="form-control"
    aria-label="Step 1"
  ></textarea>
  <button
    class="btn btn-outline-secondary"
    type="button"
    onclick="addStep(this)"
  >
    +
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
  // labels.forEach((label) => {});
}
