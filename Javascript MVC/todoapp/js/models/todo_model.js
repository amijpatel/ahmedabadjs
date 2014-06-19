
APP.todoModel = Backbone.Model.extend({
  // you can set any defaults you would like here
  defaults: { 
    isdone: "false",   
    description: ""    
  },

  validate: function (attrs) {
    var errors = {};    
    if (!attrs.description) errors.description = "Description is Required";
    if (!_.isEmpty(errors)) {
      return errors;
    }
  }
});

APP.todoCollection = Backbone.Collection.extend({
  // Reference to this collection's model.
  model: APP.todoModel
});
