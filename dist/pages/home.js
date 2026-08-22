export function initHomePage() {
    const menuButton = document.querySelector("#mobileMenuButton");
    const mobileMenu = document.querySelector("#mobileMenu");
    if (!menuButton || !mobileMenu)
        return;
    menuButton.addEventListener("click", () => {
        const isHidden = mobileMenu.classList.toggle("hidden");
        menuButton.setAttribute("aria-expanded", String(!isHidden));
    });
    mobileMenu.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            mobileMenu.classList.add("hidden");
            menuButton.setAttribute("aria-expanded", "false");
        });
    });
}
//# sourceMappingURL=home.js.map