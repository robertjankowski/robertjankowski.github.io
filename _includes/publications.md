<section class="page-intro">
  <p class="section-label">Work</p>
  <h1 class="page-title">Publications</h1>
  <p class="page-lead">
    {% if site.google_scholar %}
    See also <a href="{{ site.google_scholar }}" target="_blank" rel="noopener">Google Scholar</a>.
    {% endif %}
  </p>
</section>

<div class="publication-toolbar">
  <div class="publication-search">
    <label class="visually-hidden" for="publication-search-input">Search publications by title, author, venue, or year</label>
    <input
      id="publication-search-input"
      class="publication-search-input"
      type="search"
      placeholder="Search by title, author, venue, year"
      autocomplete="off"
      data-publication-search
    />
  </div>

  <div class="publication-filters" data-publication-filters role="group" aria-label="Filter publications by type">
    <button class="publication-filter is-active" type="button" data-filter="all" aria-pressed="true">all</button>
    <button class="publication-filter" type="button" data-filter="published" aria-pressed="false">published</button>
    <button class="publication-filter" type="button" data-filter="preprint" aria-pressed="false">preprint</button>
  </div>
</div>

<p class="filter-empty-message" data-publication-empty hidden>No publications match your current filter.</p>

<section aria-label="Publications archive">
  <ol class="publication-list">
    {% for link in site.data.publications.main %}
    {% assign publication_type = link.type | default: "published" | downcase %}
    {% assign publication_year = link.year | default: "" %}
    {% capture publication_search %}
      {{ link.title }} {{ link.authors | strip_html }} {{ link.conference_short }} {{ link.conference }} {{ publication_year }}
    {% endcapture %}
    <li class="publication-item" data-type="{{ publication_type }}" data-search="{{ publication_search | strip_newlines | strip | downcase | escape }}">
      <article class="publication-card">
        {% if link.image %}
        <div class="publication-media">
          <img loading="lazy" src="{{ link.image | relative_url }}" alt="{{ link.title }} teaser" />
        </div>
        {% endif %}

        <div>
          <p class="publication-tag">{{ link.conference_short }}{% if publication_year != "" %} · {{ publication_year }}{% endif %} · {{ publication_type }}</p>
          <h2 class="publication-title">
            {% if link.pdf %}
            {% if link.pdf contains '://' %}
            <a href="{{ link.pdf }}" target="_blank" rel="noopener">{{ link.title }}</a>
            {% else %}
            <a href="{{ link.pdf | relative_url }}">{{ link.title }}</a>
            {% endif %}
            {% else %}
            {{ link.title }}
            {% endif %}
          </h2>
          <p class="publication-authors">{{ link.authors }}</p>
          <p class="publication-meta"><em>{{ link.conference }}</em></p>

          <p class="publication-actions">
            {% if link.pdf %}
            {% if link.pdf contains '://' %}
            <a href="{{ link.pdf }}" target="_blank" rel="noopener">pdf</a>
            {% else %}
            <a href="{{ link.pdf | relative_url }}">pdf</a>
            {% endif %}
            {% endif %}

            {% if link.code %}
            {% if link.code contains '://' %}
            <a href="{{ link.code }}" target="_blank" rel="noopener">code</a>
            {% else %}
            <a href="{{ link.code | relative_url }}">code</a>
            {% endif %}
            {% endif %}

            {% if link.page %}
            {% if link.page contains '://' %}
            <a href="{{ link.page }}" target="_blank" rel="noopener">project page</a>
            {% else %}
            <a href="{{ link.page | relative_url }}">project page</a>
            {% endif %}
            {% endif %}

            {% if link.doi %}
            {% if link.doi contains '://' %}
            <a href="{{ link.doi }}" target="_blank" rel="noopener">doi</a>
            {% else %}
            <a href="https://doi.org/{{ link.doi }}" target="_blank" rel="noopener">doi</a>
            {% endif %}
            {% endif %}

            {% if link.arxiv %}
            {% if link.arxiv contains '://' %}
            <a href="{{ link.arxiv }}" target="_blank" rel="noopener">arxiv</a>
            {% else %}
            <a href="https://arxiv.org/abs/{{ link.arxiv }}" target="_blank" rel="noopener">arxiv</a>
            {% endif %}
            {% endif %}

            {% if link.data %}
            {% if link.data contains '://' %}
            <a href="{{ link.data }}" target="_blank" rel="noopener">data</a>
            {% else %}
            <a href="{{ link.data | relative_url }}">data</a>
            {% endif %}
            {% endif %}

            {% if link.slides %}
            {% if link.slides contains '://' %}
            <a href="{{ link.slides }}" target="_blank" rel="noopener">slides</a>
            {% else %}
            <a href="{{ link.slides | relative_url }}">slides</a>
            {% endif %}
            {% endif %}

            {% if link.bibtex %}
            <button
              class="publication-cite"
              type="button"
              data-bibtex-target="publication-bibtex-{{ forloop.index }}"
              aria-label="Copy BibTeX citation for {{ link.title | strip_html | escape }}"
            >
              cite
            </button>
            {% endif %}
          </p>

          {% if link.bibtex %}
          <pre id="publication-bibtex-{{ forloop.index }}" class="publication-bibtex" hidden>{{ link.bibtex }}</pre>
          {% endif %}

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
