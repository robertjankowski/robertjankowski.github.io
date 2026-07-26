---
layout: minimal-portfolio
title: Home
permalink: /
---

{% assign email_href = site.email | replace: " (at) ", "@" | replace: " ", "" %}
{% assign email_text = site.email | replace: " (at) ", "@" %}

<section class="home-hero" id="about" aria-labelledby="hero-title">
  <div class="hero-profile">
    {% if site.avatar %}
    <div class="hero-photo">
      <img src="{{ site.avatar }}" alt="{{ site.title }} portrait" loading="lazy" />
    </div>
    {% endif %}
    <div class="hero-copy">
      <h1 class="hero-title" id="hero-title">
        Robert Jankowski
      </h1>
      <p class="hero-subhead">
        {{ site.position }} at <a href="{{ site.affiliation_link }}" target="_blank" rel="noopener">{{ site.affiliation }}</a>.
      </p>
      <p class="hero-bio">
        I work with <a href="https://www.maksimkitsak.com/" target="_blank" rel="noopener">Maksim Kitsak</a> on shortest paths in large incomplete networks. I received my PhD in network geometry from the University of Barcelona, where I studied network embeddings in multidimensional hyperbolic spaces with <a href="http://complex.fmc.ub.edu/~mbogunya/" target="_blank" rel="noopener">Marián Boguñá</a> and <a href="https://mappingcomplexity.net/maserrano/" target="_blank" rel="noopener">M. Ángeles Serrano</a>.
      </p>

    </div>

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
        {% for link in site.data.publications.main %}
        {% if link.featured %}
        <article class="feature-card">
          {% if link.image %}
          <a class="feature-thumb" href="{{ link.pdf }}" target="_blank" rel="noopener">
            <img loading="lazy" src="{{ link.image | relative_url }}" alt="{{ link.title }} teaser" />
          </a>
          {% endif %}
          <div class="feature-content">
            <p class="feature-kicker">{{ link.conference_short }}</p>
            <h3 class="feature-title">
              {% if link.pdf %}
              <a href="{{ link.pdf }}" target="_blank" rel="noopener">{{ link.title }}</a>
              {% else %}
              {{ link.title }}
              {% endif %}
            </h3>
            <p class="feature-description">{{ link.authors }}</p>
            <p class="feature-meta">{{ link.conference }}</p>
            <p class="feature-links">
              {% if link.pdf %}
              <a href="{{ link.pdf }}" target="_blank" rel="noopener">pdf</a>
              {% endif %}
              {% if link.code %}
              <a href="{{ link.code }}" target="_blank" rel="noopener">code</a>
              {% endif %}
            </p>
          </div>
        </article>
        {% endif %}
        {% endfor %}
      </div>
      <p class="section-linkline"><a href="{{ "/publications/" | relative_url }}">See full publication list</a></p>
    </div>
  </div>
</section>

<section class="home-section" id="prospective-collaborators-students">
  <h2>Prospective Collaborators and Students</h2>

  I am open to collaborations with researchers and students interested in network geometry, graph machine learning, and network science of neural networks. 
  <br>
  If you are interested in working together on these topics, feel free to contact me: <a href="mailto:{{ email_href }}" aria-label="Email {{ email_href }}">{{ email_text }}</a>.

</section>
