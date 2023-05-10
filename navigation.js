"use strict";

function Navigation() {
  return React.createElement(
    "nav",
    {
      className: "navbar navbar-expand-md fixed-top navbar-dark bg-dark",
      "data-bs-theme": "dark"
    },
    React.createElement(
      "div",
      { className: "container-fluid" },
      React.createElement(
        "a",
        { className: "navbar-brand", href: "#" },
        "Foodables"
      ),
      React.createElement(
        "button",
        {
          className: "navbar-toggler",
          type: "button",
          "data-bs-toggle": "collapse",
          "data-bs-target": "#navbarNavAltMarkup",
          "aria-controls": "navbarNavAltMarkup",
          "aria-expanded": "false",
          "aria-label": "Toggle navigation"
        },
        React.createElement("span", { className: "navbar-toggler-icon" })
      ),
      React.createElement(
        "div",
        {
          className: "collapse navbar-collapse text-end",
          id: "navbarNavAltMarkup"
        },
        React.createElement(
          "div",
          { className: "navbar-nav" },
          React.createElement(
            "a",
            { className: "nav-link", "aria-current": "page", href: "./index.html" },
            "Home"
          ),
          React.createElement(
            "a",
            { className: "nav-link", href: "./new-recipe.html" },
            "New Recipe"
          ),
          React.createElement(
            "a",
            { className: "nav-link", href: "./recipes.html" },
            "Recipes"
          )
        )
      )
    )
  );
}

function NavigationButtons() {
  return React.createElement(
    "div",
    { className: "container-sm" },
    React.createElement(
      "div",
      {
        className: "btn-group-vertical btn-group-lg d-block vw-75 position-absolute top-50 start-50 translate-middle",
        role: "group",
        "aria-label": "Vertical button group"
      },
      React.createElement(
        "a",
        { type: "button", className: "btn btn-dark", href: "./new-recipe.html" },
        "New Recipe"
      ),
      React.createElement(
        "a",
        { type: "button", className: "btn btn-dark", href: "./recipes.html" },
        "View Recipes"
      )
    )
  );
}

var navigationNode = document.getElementById("navigation-root");
var navigationRoot = ReactDOM.createRoot(navigationNode);
navigationRoot.render(React.createElement(Navigation, null));

var navigationButtonNode = document.getElementById("navigation-button-root");
var navigationButtonRoot = ReactDOM.createRoot(navigationButtonNode);
navigationButtonRoot.render(React.createElement(NavigationButtons, null));