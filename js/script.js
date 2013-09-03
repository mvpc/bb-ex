var articlesJSON = [
    {
        displayName: "Article 1 Title",
        summary: "Article 1 summary",
        id: "article1",
    },
    {
        displayName: "Article 2 Title",
        summary: "Article 2 summary",
        id: "article2",
    },
    {
        displayName: "Article 3 Title",
        summary: "Article 3 summary",
        id: "article3",
    },
    {
        displayName: "Article 4 Title",
        summary: "Article 4 summary",
        id: "article4",
    },
    {
        displayName: "Article 5 Title",
        summary: "Article 5 summary",
        id: "article5",
    },
];


Stream = Backbone.RelationalModel.extend({
    relations: [{
        type: Backbone.HasMany,
        key: 'articles',
        relatedModel: 'Article',
        collectionType: 'ArticleCollection',
    }]
});

Article = Backbone.RelationalModel.extend({
});

ArticleCollection = Backbone.Collection.extend({
    model: Article
});



var beesArticles = new ArticleCollection(articlesJSON.slice(0, 2));

var beesStream = new Stream({
    displayName: 'Bees Stream',
    articles: beesArticles,
});


var mothsArticles = new ArticleCollection(articlesJSON);

var mothsStream = new Stream({
    displayName: "Moth Stream",
    articles: mothsArticles,
});



StreamView = Backbone.View.extend({

    tagName: "section",
    template: "STREAM: <%= streamName %><ul><% _.each(articles, function(article) { %> <li><%= article.get('displayName') %></li> <% }); %></ul>",

    initialize: function() {
        this.render();
        this.listenTo(this.model, "add:articles", this.render);
    },
    render: function() {
        this.$el.html(_.template(this.template, {streamName: this.model.get("displayName"), articles: this.model.get("articles").models}));
        return this;
    }
});

var beesView = new StreamView({model: beesStream});
var mothsView = new StreamView({model: mothsStream});
$("#main").append(beesView.el, mothsView.el);

setTimeout(function(){
    beesArticles.add(Article.findOrCreate(articlesJSON[4]));
}, 1000);








