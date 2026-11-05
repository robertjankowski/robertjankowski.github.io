---
layout: minimal-portfolio
title: Home
permalink: /
description: Robert Jankowski studies network biology and the network science of AI using network science and geometry. Seeking assistant professor opportunities.
---

{% assign email_href = site.email | replace: " (at) ", "@" | replace: " ", "" %}
{% assign email_text = site.email | replace: " (at) ", "@" %}

<section class="home-hero" id="about" aria-labelledby="hero-title">
  <div class="hero-profile">
    {% if site.avatar %}
    <div class="hero-photo">
      <img src="{{ site.avatar | relative_url }}" alt="{{ site.title }} portrait" loading="lazy" />
    </div>
    {% endif %}
    <div class="hero-heading">
      <h1 class="hero-title" id="hero-title">
        Robert Jankowski
      </h1>
    </div>
    <div class="hero-copy">
      <p class="hero-subhead">
        {{ site.position }} at <a href="{{ site.affiliation_link }}" target="_blank" rel="noopener">{{ site.affiliation }}</a>.
      </p>
      <p class="hero-bio">
        I use network science and geometry to understand biological systems and artificial intelligence. My research focuses on protein interaction networks and on the structure, representations, and robustness of neural networks.
      </p>
      <p class="faculty-notice">
        I’m seeking an <strong>assistant professor position</strong> to build a research program in network biology and the <span class="faculty-notice-topic">network science of AI</span>.
      </p>
      <p class="hero-background">
        Currently, I work with <a href="https://www.maksimkitsak.com/" target="_blank" rel="noopener">Maksim Kitsak</a> on network biology and network complementarity. I received my PhD in physics from the University of Barcelona, where I studied network embeddings in multidimensional hyperbolic spaces with <a href="https://mappingcomplexity.net/maserrano/" target="_blank" rel="noopener">M. Ángeles Serrano</a> and <a href="http://complex.fmc.ub.edu/~mbogunya/" target="_blank" rel="noopener">Marián Boguñá</a>.
      </p>
      <div class="hero-actions">
        <ul class="quick-links">
          <li><a class="social-link" href="mailto:{{ email_href }}" aria-label="Email {{ email_href }}">{% include social-icon.html name="email" %}{{ email_text }}</a></li>
          {% if site.cv_link %}
          <li><a class="social-link" href="{{ site.cv_link | relative_url }}" target="_blank" rel="noopener">{% include social-icon.html name="cv" %}CV</a></li>
          {% endif %}
          {% if site.google_scholar %}
          <li><a class="social-link" href="{{ site.google_scholar }}" target="_blank" rel="noopener">{% include social-icon.html name="scholar" %}Google Scholar</a></li>
          {% endif %}
        </ul>
      </div>
    </div>
  </div>
</section>

{% if site.data.news.main and site.data.news.main.size > 0 %}
<section class="home-section" id="news">
  <h2>News</h2>
  <ul class="news-list-clean">
    {% for item in site.data.news.main limit: 5 %}
    <li>
      <span class="news-date">{{ item.date }}</span>
      <p class="news-item">{{ item.text }}</p>
    </li>
    {% endfor %}
  </ul>
</section>
{% endif %}

<section class="home-section" id="selected-publications">
  <div class="work-block">
    <div>
      <h2>Selected Publications</h2>
      <div class="feature-grid">
        {% assign featured_publications = site.data.publications.main | where: "featured", true | sort: "featured_order" %}
        {% for link in featured_publications %}
        <article class="feature-card">
          {% if link.image %}
          <a class="feature-thumb" href="{{ link.pdf }}" target="_blank" rel="noopener">
            <img loading="lazy" src="{{ link.image | relative_url }}" alt="{{ link.title }} teaser" />
          </a>
          {% endif %}
          <div class="feature-content">
            <h3 class="feature-title">
              {% if link.pdf %}
              <a href="{{ link.pdf }}" target="_blank" rel="noopener">{{ link.title }}</a>
              {% else %}
              {{ link.title }}
              {% endif %}
            </h3>
            <p class="feature-description">{% assign feature_authors = link.authors | split: ", " %}{% for author in feature_authors %}<span class="author-name">{{ author }}</span>{% unless forloop.last %}, {% endunless %}{% endfor %}</p>
            <p class="feature-meta">{{ link.conference }}</p>
          </div>
        </article>
        {% endfor %}
      </div>
      <p class="section-linkline"><a href="{{ "/publications/" | relative_url }}">See full publication list</a></p>
    </div>
  </div>
</section>

<!-- <section class="home-section" id="prospective-collaborators-students">
  <h2>Prospective Collaborators</h2>

  I am open to collaborations with researchers interested in network geometry, graph machine learning, and network science of neural networks. 
  <br>
  If you are interested in working together on these topics, feel free to contact me: <a href="mailto:{{ email_href }}" aria-label="Email {{ email_href }}">{{ email_text }}</a>.

</section> -->
