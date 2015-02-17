import Ember from 'ember';


export default Ember.Controller.extend({

  pendingGames: Ember.computed.alias('content'),
  activeGame: null,
  isProcessing: false,

  actions: {
    doNewGame: function() {
      if (this.get('isProcessing')) { return; }
      this.set('isProcessing', true);

      var _this = this;
      this.store.createRecord('game').save().then(function(game) {
        _this.setProperties({
          activeGame: game,
          isProcessing: false
        });
      });
    },

    doCancelGame: function() {
      if (this.get('isProcessing')) { return; }      
      this.set('isProcessing', true);

      var _this = this;
      this.get('activeGame').set('status', 'canceled').save().then(function(game) {
        _this.setProperties({
          activeGame: null,
          isProcessing: false
        });
      });
    }
  } 
  

  // var Promise = Ember.RSVP.Promise;
  
  // App.PostController = Ember.ObjectController.extend({
  //     actions: {
  //       publishComment: function(post, comment) {
  //         comment.save().then(function() {
  //           Promise.cast(post.get('comments')).then(function(comments) {
  //             comments.addObject(comment);
  //             post.save().then(function() {}, function() {});
  //           });
  //         });
  //       }
  //     }
  //   });

     // actions: {
     //    publishComment: function() {
     //      if (!this.commentIsValid()) { return; }
     //      var store = this.get('store');
     //      Ember.RSVP.hash({
     //        user: this.get('util').getUserByUsername(this.get('commentUsername'))
     //      }).then(function(promises) {
     //        // Create a new comment
     //        var comment = store.createRecord('comment', {
     //          body: this.get('commentBody'),
     //          published: new Date().getTime(),
     //          user: promises.user
     //        });
     //        // Tell the post about the comment
     //        this.sendAction('onPublishComment', this.get('post'), comment);
     //        // Reset the fields
     //        this.setProperties({
     //          commentUsername: '',
     //          commentBody: ''
     //        });
     //      }.bind(this));
     //    },

     
     //    removeComment: function(comment) {
     //      var post = this.get('post');
     //      Promise.cast(post.get('comments')).then(function(comments) {

     //        // remove comment from post's comment array
     //        comments.removeObject(comment);

     //        // destroy the comment object
     //        comment.destroyRecord();

     //        // save the updated post
     //        post.save();
     //      });
     //    }
     //  },


});
