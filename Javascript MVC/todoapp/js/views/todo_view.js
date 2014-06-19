
APP.todoIndexView = Backbone.View.extend({
  // the constructor
  initialize: function (options) {
    // model is passed through
    this.todos = options.todos;
    this.todos.bind('reset', this.addAll, this);
  },

  // populate the html to the dom
  render: function () {
    this.$el.html($('#indexTemplate').html());
    this.addAll();
    return this;
  },

  addAll: function () {
    // clear out the container each time you render index
    this.$el.find('tbody').children().remove();
    _.each(this.todos.models, $.proxy(this, 'addOne'));
  },

  addOne: function (todo) {
    var view = new APP.todoRowView({
      todos: this.todos, 
      todo: todo
    });
    this.$el.find("tbody").append(view.render().el);
  }
});

APP.todoRowView = Backbone.View.extend({  
  tagName: "tr",
  // functions to fire on events
  events: {
    "click .delete": "destroy",
    "click .toggle": "addMark"
  },
  // the constructor
  initialize: function (options) {
    // model is passed through
    this.todo  = options.todo;
    this.todos = options.todos;
  },
  // populate the html to the dom
  render: function () {
    this.$el.html(_.template($('#rowTemplate').html(), this.todo.toJSON()));
    return this;
  },
  // delete the model
  destroy: function (event) {
    event.preventDefault();
    event.stopPropagation();    
    this.todos.remove(this.todo);
    this.$el.remove();
  },
  addMark: function(event){     
     this.$el.find(".toggletext").toggleClass( "addmark" );

     if(this.todo.attributes.isdone=="false"){
       this.todo.attributes.isdone="true";
     this.$el.find("#done").attr("src","images/cancleIcn.jpeg");
     }
     else{
      this.todo.attributes.isdone="false";
      this.$el.find("#done").attr("src","images/doneBtn.png");
     }
         
  }
});

APP.todoNewView = Backbone.View.extend({  
  events: {
    "click button.save": "save" 
  },
  // the constructor
  initialize: function (options) {
    this.todo  = options.todo;
    this.todos = options.todos;
    this.todo.bind('invalid', this.showErrors, this);
  },
  showErrors: function (todo, errors) {
    this.$el.find('.error').removeClass('error');
    this.$el.find('.alert').html(_.values(errors).join('<br>')).show();
      // highlight the fields with errors
    _.each(_.keys(errors), _.bind(function (key) {
      this.$el.find('*[name=' + key + ']').parent().addClass('error');
    }, this));
  },
  save: function (event) {
    event.stopPropagation();
    event.preventDefault();    
    this.todo.set({      
      description: this.$el.find('textarea[name=description]').val(),      
      id: Math.floor(Math.random() * 100) + 1
    });
    if (this.todo.isValid()){      
      this.todos.add(this.todo);
      // this.todo.save();
      // redirect back to the index
      window.location.hash = "todos/index";
    }
  },
  //populate the html to the dom
  render: function () {
    this.$el.html(_.template($('#formTemplate').html(), this.todo.toJSON()));
    return this;
  }
});


