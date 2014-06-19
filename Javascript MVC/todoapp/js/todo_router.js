window.APP = window.APP || {};
APP.todoRouter = Backbone.Router.extend({
  routes: {
    "todo/new": "create",
    "todos/index": "index",
    "/*"    : "index"
  },
  initialize: function (options) {
    this.todos = options.todos;    
    //this.index();
  },  
  create: function () {
    this.currentView = new APP.todoNewView({
      todos: this.todos, todo: new APP.todoModel()
    });
    $('#primary-content').html(this.currentView.render().el);
  },
  index: function () {
    this.currentView = new APP.todoIndexView({
      todos: this.todos
    });
    $('#primary-content').html(this.currentView.render().el);   
  }
});
