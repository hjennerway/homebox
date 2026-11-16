(() => {
  let preference = "system";
  try {
    preference = JSON.parse(localStorage.getItem("homebox/preferences/location"))?.theme || preference;
  } catch {
    // Use the device preference if saved settings cannot be read.
  }

  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const theme = preference === "system" ? (prefersDark ? "dark" : "homebox") : preference;
  document.documentElement.setAttribute("data-theme", theme);
  document.documentElement.classList.add("theme-" + theme);
})();
