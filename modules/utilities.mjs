/**
 * @param {String} url - address for the HTML to fetch
 * @return {String} the resulting HTML string fragment
 */
async function fetchHtmlAsText(url) {
  return await (await fetch(url)).text();
}

async function loadComponent(component) {
  const contentDiv = document.getElementById(component);
  contentDiv.innerHTML = await fetchHtmlAsText(`/components/${component}.html`);
}
