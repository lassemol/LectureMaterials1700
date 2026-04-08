import { bindEvents } from "./events.js";
import { loadCyborgs } from "./cyborg.js";

document.addEventListener("DOMContentLoaded", function () {
    bindEvents();
    loadCyborgs();
});