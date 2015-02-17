import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'div',
  classNames: ['square'],
  classNameBindings: ['isDisabled:disabled'],

  attributeBindings: ['dataId:data-id'],

  action: null,
  x: null,
  y: null,
  
  board: null,    // {}  
  moveCount: 0,

  dataId: function() {
    return "sq.%@1.%@2".fmt(this.get('x'), this.get('y'));
  }.property('x', 'y'),

  marker: function () {
    return this.get('board')[this.get('y')][this.get('x')];
  }.property('moveCount'),
  
  isDisabled: Ember.computed.notEmpty('marker'),

  // isDisabled: function() {
  //   return !Ember.isEmpty(this.get('marker'));
  // }.property('hasEnded', 'marker'),
  // isCross: Ember.computed.equal('played', 'x'),
  // isNought: Ember.computed.equal('played', 'o'),
  // isDisabled: Ember.computed.or('isCross', 'isNought'),

  click: function() {
    if (this.get('isDisabled')) { return; }
    this.sendAction('action', this.get('x'), this.get('y'));
  }

});