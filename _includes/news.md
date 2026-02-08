<h2>News</h2>

{% assign visible_count = 7 %}
{% assign total_news = site.data.news.main | size %}

<ul class="news-list">
  {% for item in site.data.news.main limit: visible_count %}
  <li><strong>[{{ item.date }}]</strong> {{ item.text }}</li>
  {% endfor %}
</ul>

{% if total_news > visible_count %}
<button class="news-toggle" type="button" aria-expanded="false" aria-controls="newsmore" onclick="toggleNews(this)">Show more</button>

<ul id="newsmore" class="news-list news-list-more" hidden>
  {% for item in site.data.news.main offset: visible_count %}
  <li><strong>[{{ item.date }}]</strong> {{ item.text }}</li>
  {% endfor %}
</ul>
{% endif %}
