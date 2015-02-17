import DS from 'ember-data';

export default DS.Model.extend({
  
  status:           DS.attr('string', { defaultValue: 'pending'} ),
  created_at:       DS.attr('date', { defaultValue: moment.utc().toDate() } ),
  moves:            DS.hasMany('move', { async: true } )

});




/*

App.Post = DS.Model.extend({
  comments: DS.hasMany("comment", { async: true })
});

App.Comment = DS.Model.extend({
  post: DS.belongsTo("post", { async: true })
});


{
  "posts": {
    "post_id_1": {
      "comments": {
        "comment_id_1": true
      }
    }
  },
  "comments": {
    "comment_id_1": {
      "body": "This is a comment",
      "post": "post_id_1"
    }
  }
}

*/



/*

App.Post = DS.Model.extend({
  comments: DS.hasMany("comment", { embedded: true })
});


{
  "posts": {
    "post_id_1": {
      "user": {
        "id": "myusername"
      }
    }
  }
}

*/
