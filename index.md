---
layout: homepage
---

<h2>About</h2>

<p class="lead">I am a Postdoctoral Fellow at TU Delft studying shortest paths in large incomplete networks. I hold a PhD in network geometry from the University of Barcelona, where I worked on network embeddings in multidimensional hyperbolic spaces.</p>

<h2>Selected Publications</h2>

<div class="selected-publications">
  {% for link in site.data.publications.main %}
    {% if link.title == "The D-Mercator method for the multidimensional hyperbolic embedding of real networks" or link.title == "Mapping bipartite networks into multidimensional hyperbolic spaces" %}
    <article class="selected-publication-card">
      <a class="selected-publication-image" href="{{ link.pdf }}" target="_blank" rel="noopener">
        <img src="{{ link.image }}" alt="{{ link.title }} teaser" />
      </a>
      <div class="selected-publication-body">
        <h3><a href="{{ link.pdf }}" target="_blank" rel="noopener">{{ link.title }}</a></h3>
        <p class="selected-publication-meta">{{ link.conference }}</p>
      </div>
    </article>
    {% endif %}
  {% endfor %}
</div>

<p class="section-link"><a href="{{ "/publications/" | relative_url }}">See full publication list</a></p>

{% include_relative _includes/news.md %}

{% include_relative _includes/contact.md %}
