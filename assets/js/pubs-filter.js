(function () {
  var publicationItems = Array.prototype.slice.call(document.querySelectorAll('.publication-item[data-type]'));
  if (!publicationItems.length) {
    return;
  }

  var filterRoot = document.querySelector('[data-publication-filters]');
  var filterButtons = filterRoot ? Array.prototype.slice.call(filterRoot.querySelectorAll('[data-filter]')) : [];
  var searchInput = document.querySelector('[data-publication-search]');
  var resetButton = document.querySelector('[data-publication-reset]');
  var emptyState = document.querySelector('[data-publication-empty]');
  var storageKey = 'minimal-portfolio:publications';
  var validTypes = ['all', 'published', 'preprint'];
  var activeType = 'all';

  function normalize(value) {
    return (value || '').toLowerCase().trim();
  }

  function isValidType(value) {
    return validTypes.indexOf(value) !== -1;
  }

  function updateStoredState(queryValue) {
    var trimmedQuery = (queryValue || '').trim();

    try {
      window.localStorage.setItem(
        storageKey,
        JSON.stringify({
          query: trimmedQuery,
          type: activeType,
        })
      );
    } catch (error) {
      // Ignore storage failures in restricted browsing modes.
    }

    if (typeof window.history.replaceState !== 'function' || typeof URL === 'undefined') {
      return;
    }

    try {
      var url = new URL(window.location.href);

      if (trimmedQuery) {
        url.searchParams.set('q', trimmedQuery);
      } else {
        url.searchParams.delete('q');
      }

      if (activeType !== 'all') {
        url.searchParams.set('type', activeType);
      } else {
        url.searchParams.delete('type');
      }

      window.history.replaceState(null, '', url.pathname + url.search + url.hash);
    } catch (error) {
      // Ignore URL parsing failures.
    }
  }

  function restoreStoredState() {
    var restoredQuery = '';
    var restoredType = 'all';

    try {
      var savedState = JSON.parse(window.localStorage.getItem(storageKey) || 'null');
      if (savedState && typeof savedState === 'object') {
        if (typeof savedState.query === 'string') {
          restoredQuery = savedState.query;
        }

        var savedType = normalize(savedState.type);
        if (isValidType(savedType)) {
          restoredType = savedType;
        }
      }
    } catch (error) {
      // Ignore storage failures in restricted browsing modes.
    }

    if (typeof URLSearchParams !== 'undefined') {
      try {
        var searchParams = new URLSearchParams(window.location.search);
        var queryParam = searchParams.get('q');
        var typeParam = normalize(searchParams.get('type'));

        if (typeof queryParam === 'string') {
          restoredQuery = queryParam;
        }

        if (isValidType(typeParam)) {
          restoredType = typeParam;
        }
      } catch (error) {
        // Ignore malformed query strings.
      }
    }

    activeType = restoredType;

    if (searchInput) {
      searchInput.value = restoredQuery;
    }
  }

  function applyFilters(options) {
    var queryValue = searchInput ? searchInput.value : '';
    var query = normalize(queryValue);
    var visibleCount = 0;
    var persistState = !options || options.persist !== false;

    publicationItems.forEach(function (item) {
      var itemType = item.getAttribute('data-type');
      var searchableText = item.getAttribute('data-search') || '';
      var matchesType = activeType === 'all' || itemType === activeType;
      var matchesQuery = !query || searchableText.indexOf(query) !== -1;
      var show = matchesType && matchesQuery;

      item.classList.toggle('is-hidden', !show);
      if (show) {
        visibleCount += 1;
      }
    });

    filterButtons.forEach(function (button) {
      var isActive = button.getAttribute('data-filter') === activeType;
      button.classList.toggle('is-active', isActive);
      button.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });

    if (emptyState) {
      emptyState.hidden = visibleCount !== 0;
    }

    if (resetButton) {
      var hasActiveState = activeType !== 'all' || query !== '';
      resetButton.disabled = !hasActiveState;
      resetButton.setAttribute('aria-disabled', hasActiveState ? 'false' : 'true');
    }

    if (persistState) {
      updateStoredState(queryValue);
    }
  }

  filterButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      activeType = button.getAttribute('data-filter') || 'all';
      applyFilters();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', applyFilters);
    searchInput.addEventListener('keydown', function (event) {
      if (event.key !== 'Escape') {
        return;
      }

      if (!searchInput.value && activeType === 'all') {
        return;
      }

      event.preventDefault();
      searchInput.value = '';
      activeType = 'all';
      applyFilters();
    });
  }

  if (resetButton) {
    resetButton.addEventListener('click', function () {
      if (searchInput) {
        searchInput.value = '';
      }

      activeType = 'all';
      applyFilters();

      if (searchInput) {
        searchInput.focus();
      }
    });
  }

  function copyWithFallback(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text);
    }

    return new Promise(function (resolve, reject) {
      var textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.setAttribute('readonly', 'readonly');
      textArea.style.position = 'fixed';
      textArea.style.top = '-1000px';
      textArea.style.left = '-1000px';
      document.body.appendChild(textArea);

      textArea.focus();
      textArea.select();

      try {
        var copied = document.execCommand('copy');
        if (copied) {
          resolve();
        } else {
          reject(new Error('Copy command failed'));
        }
      } catch (error) {
        reject(error);
      }

      document.body.removeChild(textArea);
    });
  }

  function setButtonState(button, label, className) {
    var originalLabel = button.getAttribute('data-original-label') || 'cite';

    button.textContent = label;
    button.classList.add(className);

    window.setTimeout(function () {
      button.textContent = originalLabel;
      button.classList.remove('is-copied');
      button.classList.remove('is-copy-error');
    }, 1500);
  }

  var citeButtons = Array.prototype.slice.call(document.querySelectorAll('[data-bibtex-target]'));
  citeButtons.forEach(function (button) {
    button.setAttribute('data-original-label', button.textContent.trim() || 'cite');

    button.addEventListener('click', function () {
      var targetId = button.getAttribute('data-bibtex-target');
      var bibtexElement = targetId ? document.getElementById(targetId) : null;
      if (!bibtexElement) {
        return;
      }

      var bibtexText = (bibtexElement.textContent || '').trim();
      if (!bibtexText) {
        return;
      }

      copyWithFallback(bibtexText)
        .then(function () {
          setButtonState(button, 'copied', 'is-copied');
        })
        .catch(function () {
          setButtonState(button, 'copy failed', 'is-copy-error');
        });
    });
  });

  restoreStoredState();
  applyFilters();
})();
