---
layout: minimal-portfolio
title: Home
permalink: /
---

{% assign email_href = site.email | replace: " (at) ", "@" | replace: " ", "" %}

<section class="home-hero" aria-labelledby="hero-title">
  <div class="hero-figures" aria-hidden="true">
    <img
      class="hero-figure hero-figure-a"
      src="{{ "/assets/img/panel5_fao_apples_S2_pyvista_view_1_with_links_transparent.png" | relative_url }}"
      alt=""
      loading="eager"
      decoding="async"
    />
  </div>
  <p class="section-label">Hello,</p>
  <h1 class="hero-title" id="hero-title">I am Robert Jankowski, a researcher working on network geometry and machine learning.</h1>
  <p class="hero-subhead">{{ site.position }} at <a href="{{ site.affiliation_link }}" rel="noopener">{{ site.affiliation }}</a>.</p>

  <ul class="quick-links">
    <li><a class="social-link" href="mailto:{{ email_href }}">{% include social-icon.html name="email" %}email</a></li>
    {% if site.google_scholar %}
    <li><a class="social-link" href="{{ site.google_scholar }}" target="_blank" rel="noopener">{% include social-icon.html name="scholar" %}Google Scholar</a></li>
    {% endif %}
    {% if site.cv_link %}
    <li><a class="social-link" href="{{ site.cv_link | relative_url }}" target="_blank" rel="noopener">{% include social-icon.html name="cv" %}CV</a></li>
    {% endif %}
    {% if site.github_link %}
    <li><a class="social-link" href="{{ site.github_link }}" target="_blank" rel="noopener">{% include social-icon.html name="github" %}GitHub</a></li>
    {% endif %}
    {% if site.linkedin %}
    <li><a class="social-link" href="{{ site.linkedin }}" target="_blank" rel="noopener">{% include social-icon.html name="linkedin" %}LinkedIn</a></li>
    {% endif %}
    {% if site.twitter %}
    <li><a class="social-link" href="{{ site.twitter }}" target="_blank" rel="noopener">{% include social-icon.html name="x" %}X</a></li>
    {% endif %}
  </ul>

  <a class="scroll-cue" href="#about">scroll &amp; explore ↓</a>
</section>

<section class="home-section" id="about">
  <p class="section-label">About</p>
  <div class="about-grid">
    {% if site.avatar %}
    <div class="about-photo">
      <img src="{{ site.avatar }}" alt="{{ site.title }} portrait" loading="lazy" />
    </div>
    {% endif %}
    <div class="about-copy">
      <p>I am a Postdoctoral Fellow at TU Delft studying shortest paths in large incomplete networks. I hold a PhD in network geometry from the University of Barcelona, where I worked on network embeddings in multidimensional hyperbolic spaces.</p>
      <p class="about-affiliation"><strong>{{ site.position }}</strong> · <a href="{{ site.affiliation_link }}" rel="noopener">{{ site.affiliation }}</a></p>
    </div>
  </div>
</section>

<section class="home-section" id="work">
  <p class="section-label">Work</p>
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

<section class="home-section" id="talks">
  <p class="section-label">Talks</p>
  <h2>Selected Talks</h2>
  <ul class="talk-highlight-list">
    <li><strong>Network representations reveal structured uncertainty in music.</strong> XIII Polish Symposium on Physics in Economics and Social Sciences, Warsaw, Poland, 2025.</li>
    <li><strong>Task complexity shapes internal representations and robustness in neural networks.</strong> IAIFI PhD Summer School, Boston, USA, 2025.</li>
    <li><strong>Mapping bipartite networks into multidimensional hyperbolic spaces.</strong> NetSci 2025, Maastricht, The Netherlands, 2025.</li>
    <li><strong>Network geometry and multidimensional hyperbolic maps of real networks.</strong> Faculty of Physics, Warsaw University of Technology, Poland, 2024.</li>
  </ul>
  <p class="section-linkline"><a href="{{ "/talks/" | relative_url }}">See full talks list</a></p>
</section>

{% if site.data.news.main and site.data.news.main.size > 0 %}
<section class="home-section" id="news">
  <p class="section-label">News</p>
  <ul class="news-list-clean">
    {% for item in site.data.news.main limit: 8 %}
    <li>
      <span class="news-date">{{ item.date }}</span>
      <p class="news-item">{{ item.text }}</p>
    </li>
    {% endfor %}
  </ul>
</section>
{% endif %}
