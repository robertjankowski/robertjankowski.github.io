<h1 id="publications"></h1>

<h2>
  Publications
  <span class="section-link">[
    <a href="https://scholar.google.com/citations?user=lmMHrzcAAAAJ" target="_blank" rel="noopener">Google Scholar</a>
  ]</span>
</h2>

<div class="publications">
  <ol class="bibliography">
    {% for link in site.data.publications.main %}
    <li>
      <div class="pub-row">
        <div class="abbr">
          <img src="{{ link.image }}" class="teaser" alt="{{ link.title }} teaser" />
          <abbr class="badge">{{ link.conference_short }}</abbr>
        </div>

        <div>
          <div class="title">
            {% if link.pdf %}
            <a href="{{ link.pdf }}" target="_blank" rel="noopener">{{ link.title }}</a>
            {% else %}
            {{ link.title }}
            {% endif %}
          </div>
          <div class="author">{{ link.authors }}</div>
          <div class="periodical"><em>{{ link.conference }}</em></div>

          <div class="links">
            {% if link.pdf %}
            <a href="{{ link.pdf }}" class="btn" role="button" target="_blank" rel="noopener">PDF</a>
            {% endif %}
            {% if link.code %}
            <a href="{{ link.code }}" class="btn" role="button" target="_blank" rel="noopener">Code</a>
            {% endif %}
            {% if link.page %}
            <a href="{{ link.page }}" class="btn" role="button" target="_blank" rel="noopener">Project Page</a>
            {% endif %}
            {% if link.data %}
            <a href="{{ link.data }}" class="btn" role="button" target="_blank" rel="noopener">Dataset</a>
            {% endif %}
            {% if link.bibtex %}
            <a href="{{ link.bibtex }}" class="btn" role="button" target="_blank" rel="noopener">BibTeX</a>
            {% endif %}
            {% if link.notes %}
            <span class="note">{{ link.notes }}</span>
            {% endif %}
            {% if link.others %}
            {{ link.others }}
            {% endif %}
          </div>
        </div>
      </div>
    </li>
    {% endfor %}
  </ol>
</div>
