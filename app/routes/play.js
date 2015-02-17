import Ember from 'ember';

export default Ember.Route.extend({

  model: function() {
    var query = {
      orderBy: 'status',
      equalTo: 'pending',
    };
    return this.store.find('game', query);
  }

});
