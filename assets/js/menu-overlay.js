(function () {
  var toggle = document.querySelector("[data-menu-toggle]");
  var overlay = document.getElementById("site-menu");
  if (!toggle || !overlay) {
    return;
  }

  var closeButton = overlay.querySelector("[data-menu-close]");
  var previousFocus = null;
  var focusableSelectors = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';
  var backgroundRegions = [
    document.querySelector(".site-header"),
    document.getElementById("main-content"),
    document.querySelector(".site-footer"),
  ].filter(Boolean);

  function setBackgroundInert(isInert) {
    backgroundRegions.forEach(function (region) {
      if (isInert) {
        region.setAttribute("aria-hidden", "true");
        region.setAttribute("inert", "");
      } else {
        region.removeAttribute("aria-hidden");
        region.removeAttribute("inert");
      }
    });
  }

  function getFocusable() {
    return Array.prototype.slice
      .call(overlay.querySelectorAll(focusableSelectors))
      .filter(function (element) {
        return element.offsetParent !== null;
      });
  }

  function trapFocus(event) {
    if (event.key !== "Tab") {
      return;
    }

    var focusable = getFocusable();
    if (!focusable.length) {
      event.preventDefault();
      return;
    }

    var first = focusable[0];
    var last = focusable[focusable.length - 1];
    var active = document.activeElement;

    if (event.shiftKey) {
      if (active === first || !overlay.contains(active)) {
        event.preventDefault();
        last.focus();
      }
      return;
    }

    if (active === last) {
      event.preventDefault();
      first.focus();
    }
  }

  function onKeydown(event) {
    if (!overlay.classList.contains("is-open")) {
      return;
    }

    if (event.key === "Escape") {
      event.preventDefault();
      closeMenu();
      return;
    }

    trapFocus(event);
  }

  function openMenu() {
    previousFocus = document.activeElement;
    overlay.classList.add("is-open");
    overlay.setAttribute("aria-hidden", "false");
    toggle.setAttribute("aria-expanded", "true");
    document.body.classList.add("menu-open");
    setBackgroundInert(true);
    document.addEventListener("keydown", onKeydown);

    var focusable = getFocusable();
    if (focusable.length) {
      focusable[0].focus();
    }
  }

  function closeMenu() {
    overlay.classList.remove("is-open");
    overlay.setAttribute("aria-hidden", "true");
    toggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");
    setBackgroundInert(false);
    document.removeEventListener("keydown", onKeydown);

    if (previousFocus && typeof previousFocus.focus === "function") {
      previousFocus.focus();
    } else {
      toggle.focus();
    }
  }

  function toggleMenu() {
    if (overlay.classList.contains("is-open")) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  toggle.addEventListener("click", toggleMenu);

  if (closeButton) {
    closeButton.addEventListener("click", closeMenu);
  }

  overlay.addEventListener("click", function (event) {
    if (event.target.closest("[data-menu-close]")) {
      closeMenu();
      return;
    }

    if (event.target.closest("a[href]")) {
      closeMenu();
    }
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth > 1024 && overlay.classList.contains("is-open")) {
      closeMenu();
    }
  });
})();
