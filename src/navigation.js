"use strict";

function Navigation() {
  return (
    <nav
      className="navbar navbar-expand-md fixed-top navbar-dark bg-dark"
      data-bs-theme="dark"
    >
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          Foodables
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse text-end"
          id="navbarNavAltMarkup"
        >
          <div className="navbar-nav">
            <a className="nav-link" aria-current="page" href="./index.html">
              Home
            </a>
            <a className="nav-link" href="./new-recipe.html">
              New Recipe
            </a>
            <a className="nav-link" href="./recipes.html">
              Recipes
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

function NavigationButtons() {
  return (
    <div className="container-sm">
      <div
        className="btn-group-vertical btn-group-lg d-block vw-75 position-absolute top-50 start-50 translate-middle"
        role="group"
        aria-label="Vertical button group"
      >
        <a type="button" className="btn btn-dark" href="./new-recipe.html">
          New Recipe
        </a>
        <a type="button" className="btn btn-dark" href="./recipes.html">
          View Recipes
        </a>
      </div>
    </div>
  );
}

const navigationNode = document.getElementById("navigation-root");
const navigationRoot = ReactDOM.createRoot(navigationNode);
navigationRoot.render(<Navigation />);

const navigationButtonNode = document.getElementById("navigation-button-root");
const navigationButtonRoot = ReactDOM.createRoot(navigationButtonNode);
navigationButtonRoot.render(<NavigationButtons />);
