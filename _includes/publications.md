<section class="page-intro">
  <p class="section-label">Work</p>
  <h1 class="page-title">Publications</h1>
  <p class="page-lead">
    {% if site.google_scholar %}
    See also <a href="{{ site.google_scholar }}" target="_blank" rel="noopener">Google Scholar</a>.
    {% endif %}
  </p>
</section>

<div class="publication-filters" data-publication-filters role="group" aria-label="Filter publications by type">
  <button class="publication-filter is-active" type="button" data-filter="all" aria-pressed="true">all</button>
  <button class="publication-filter" type="button" data-filter="published" aria-pressed="false">published</button>
  <button class="publication-filter" type="button" data-filter="preprint" aria-pressed="false">preprint</button>
</div>

<section aria-label="Publications archive">
  <ol class="publication-list">
    {% for link in site.data.publications.main %}
    {% assign publication_type = link.type | default: "published" | downcase %}
    <li class="publication-item" data-type="{{ publication_type }}">
      <article class="publication-card">
        <div class="publication-media">
          <img loading="lazy" src="{{ link.image | relative_url }}" alt="{{ link.title }} teaser" />
        </div>
        <div>
          <p class="publication-tag">{{ link.conference_short }} · {{ publication_type }}</p>
          <h2 class="publication-title">
            {% if link.pdf %}
            <a href="{{ link.pdf }}" target="_blank" rel="noopener">{{ link.title }}</a>
            {% else %}
            {{ link.title }}
            {% endif %}
          </h2>
          <p class="publication-authors">{{ link.authors }}</p>
          <p class="publication-meta"><em>{{ link.conference }}</em></p>

          <p class="publication-actions">
            {% if link.pdf %}
            <a href="{{ link.pdf }}" target="_blank" rel="noopener">pdf</a>
            {% endif %}
            {% if link.code %}
            <a href="{{ link.code }}" target="_blank" rel="noopener">code</a>
            {% endif %}
            {% if link.page %}
            <a href="{{ link.page }}" target="_blank" rel="noopener">project page</a>
            {% endif %}
            {% if link.data %}
            <a href="{{ link.data }}" target="_blank" rel="noopener">dataset</a>
            {% endif %}
            {% if link.bibtex %}
            <a href="{{ link.bibtex }}" target="_blank" rel="noopener">bibtex</a>
            {% endif %}
          </p>

          {% if link.notes %}
          <p class="publication-note">{{ link.notes }}</p>
          {% endif %}
          {% if link.others %}
          <p class="publication-note">{{ link.others }}</p>
          {% endif %}
        </div>
      </article>
    </li>
    {% endfor %}
  </ol>
</section>

<script>
  (function () {
    var filterRoot = document.querySelector("[data-publication-filters]");
    if (!filterRoot) {
      return;
    }

    var filters = Array.prototype.slice.call(filterRoot.querySelectorAll("[data-filter]"));
    var items = Array.prototype.slice.call(document.querySelectorAll(".publication-item[data-type]"));

    function applyFilter(type) {
      items.forEach(function (item) {
        var itemType = item.getAttribute("data-type");
        var show = type === "all" || itemType === type;
        item.classList.toggle("is-hidden", !show);
      });

      filters.forEach(function (button) {
        var active = button.getAttribute("data-filter") === type;
        button.classList.toggle("is-active", active);
        button.setAttribute("aria-pressed", active ? "true" : "false");
      });
    }

    filters.forEach(function (button) {
      button.addEventListener("click", function () {
        applyFilter(button.getAttribute("data-filter"));
      });
    });
  })();
</script>
