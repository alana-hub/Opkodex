export function initHomePage(): void {
  const menuButton =
    document.querySelector<HTMLButtonElement>(
      "#mobileMenuButton"
    );

  const mobileMenu =
    document.querySelector<HTMLDivElement>(
      "#mobileMenu"
    );

  if (!menuButton || !mobileMenu) return;

  menuButton.addEventListener("click", () => {
    const isHidden = mobileMenu.classList.toggle("hidden");
    menuButton.setAttribute(
      "aria-expanded",
      String(!isHidden)
    );
  });

  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.add("hidden");
      menuButton.setAttribute("aria-expanded", "false");
    });
  });
}
