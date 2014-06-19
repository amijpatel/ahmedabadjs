    var router = new APP.todoRouter({
      todos: new APP.todoCollection()
    });
    // we manually pass in the initial data, but this would be called with a collection.fetch() normally
    router.todos.reset([
      {  
        "isdone": "false",      
        "description": "To do 1"
      },
      {  
        "isdone": "false",      
        "description": "To do 2"
      },
      {   
        "isdone": "false",    
        "description": "To do 3"
      }
    ]);        
    Backbone.history.start();