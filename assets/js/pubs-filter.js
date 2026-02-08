(function () {
  var publicationItems = Array.prototype.slice.call(document.querySelectorAll('.publication-item[data-type]'));
  if (!publicationItems.length) {
    return;
  }

  var filterRoot = document.querySelector('[data-publication-filters]');
  var filterButtons = filterRoot ? Array.prototype.slice.call(filterRoot.querySelectorAll('[data-filter]')) : [];
  var searchInput = document.querySelector('[data-publication-search]');
  var emptyState = document.querySelector('[data-publication-empty]');
  var activeType = 'all';

  function normalize(value) {
    return (value || '').toLowerCase().trim();
  }

  function applyFilters() {
    var query = normalize(searchInput ? searchInput.value : '');
    var visibleCount = 0;

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
  }

  filterButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      activeType = button.getAttribute('data-filter') || 'all';
      applyFilters();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', applyFilters);
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

  applyFilters();
})();
