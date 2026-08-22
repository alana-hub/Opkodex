import { initHomePage } from "./pages/home.js";
import { initHospitalsPage } from "./pages/hospitals.js";
import { initRegisterPage } from "./pages/register.js";

function init(): void {
  initHomePage();
  initHospitalsPage();
  initRegisterPage();
}

if (document.readyState === "loading") {
  document.addEventListener(
    "DOMContentLoaded",
    init,
    { once: true }
  );
} else {
  init();
}
