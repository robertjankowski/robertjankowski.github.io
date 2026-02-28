(function () {
  var talkGroups = Array.prototype.slice.call(document.querySelectorAll("[data-talk-group]"));
  if (!talkGroups.length) {
    return;
  }

  var defaultVisibleCount = 3;

  function getToggle(group) {
    return group.querySelector("[data-talk-toggle]");
  }

  function getEntries(group) {
    return Array.prototype.slice.call(group.querySelectorAll(".talk-entry"));
  }

  function setExpanded(group, isExpanded) {
    var entries = getEntries(group);
    var toggle = getToggle(group);
    if (!toggle) {
      return;
    }

    entries.forEach(function (entry, index) {
      if (index < defaultVisibleCount) {
        entry.hidden = false;
        return;
      }

      entry.hidden = !isExpanded;
    });

    toggle.hidden = false;
    toggle.setAttribute("aria-expanded", isExpanded ? "true" : "false");
    toggle.textContent = isExpanded ? "show less" : "show more";
  }

  talkGroups.forEach(function (group) {
    var entries = getEntries(group);
    var toggle = getToggle(group);

    if (!toggle || entries.length <= defaultVisibleCount) {
      return;
    }

    setExpanded(group, false);

    toggle.addEventListener("click", function () {
      var isExpanded = toggle.getAttribute("aria-expanded") === "true";
      setExpanded(group, !isExpanded);
    });
  });
})();
