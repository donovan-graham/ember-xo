import Ember from 'ember';
import DS from 'ember-data';

export default DS.FirebaseSerializer.extend({

  // keyForAttribute: function(attr) {
  //   return Ember.String.decamelize(attr);
  // },

/*
  keyForRelationship: function(rawKey, kind) {
    var key = Ember.String.decamelize(rawKey);
    if (kind === "belongsTo") {
      return key + "_id";
    } else if (kind === "hasMany") {
      // We don't easily have access to singularize here but I don't believe we define hasMany keys in our data anyway
      // return singularize(key) + "_ids"
      return Ember.String.singularize.key + "_ids"; 
    } else {
      return key;
    }
  },

  serializeBelongsTo: function(record, json, relationship) {
    this._super(record, json, relationship);
    var key = relationship.key;
    var payloadKey = this.keyForRelationship ? this.keyForRelationship(key, "belongsTo") : relationship.key;
    if (typeof json[payloadKey] === "undefined" || json[payloadKey] === '') {
      delete json[payloadKey];
    }
  }
*/

});