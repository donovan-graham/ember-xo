import Ember from 'ember';


export default Ember.Component.extend({

  classNames: ['board'],
  classNameBindings: ['hasEnded:disabled', 'hasWinner:winner'],

  board: null,    // {} state
  moves: null,    // [] history

  rows: null,     // []
  cols: null,     // []


  resetBaord: function() {
    this.setProperties({
      moves: [],
      board: { 1 : { 1 : null, 2: null, 3: null }, 2 : { 1 : null, 2: null, 3: null }, 3 : { 1 : null, 2: null, 3: null }},

      rows: [1,2,3,], // 3 x 3
      cols: [1,2,3,], // 3 x 3
    });
  },

  startGame: function() {
    this.resetBaord();
  }.on('init'),

  moveCount: Ember.computed.alias('moves.length'),

  currentMarker: function() {
    return (this.get('moveCount') % 2 === 0) ? 'x' : 'o'; 
  }.property('moveCount'),

  isPlayerOne: Ember.computed.equal('currentMarker', 'x'),
  isPlayerTwo: Ember.computed.equal('currentMarker', 'o'),

  hasWinner: function() {
    var board = this.get('board');
    var check;

    // .map ?

    // var cols = Ember.keys(board);
    // cols.forEach(function(y) {
    //   var rows = Ember.keys(board[y]);

    //   check = '';
    //   rows.forEach(function(x) {
    //     check += board[y][x];
    //   });      
    //   if (check === 'xxx' || check === 'ooo') { return true; }

    // });

    // rows
    check = board[1][1] + board[1][2] + board[1][3];
    if (check === 'xxx' || check === 'ooo') { return true; }

    check = board[2][1] + board[2][2] + board[2][3];
    if (check === 'xxx' || check === 'ooo') { return true; }

    check = board[3][1] + board[3][2] + board[3][3];
    if (check === 'xxx' || check === 'ooo') { return true; }

    // columns
    check = board[1][1] + board[2][1] + board[3][1];
    if (check === 'xxx' || check === 'ooo') { return true; }

    check = board[1][2] + board[2][2] + board[3][2];
    if (check === 'xxx' || check === 'ooo') { return true; }

    check = board[1][3] + board[2][3] + board[3][3];
    if (check === 'xxx' || check === 'ooo') { return true; }

    // diagonal left-right
    check = board[1][1] + board[2][2] + board[3][3];
    if (check === 'xxx' || check === 'ooo') { return true; }

    // diagonal right-left
    check = board[1][3] + board[2][2] + board[3][1];
    if (check === 'xxx' || check === 'ooo') { return true; }


    // for (var y=1; y <= this.get('rows.length'); y++) {
    //   var check;
    //   for (var x=1; x <= this.get('cols.length'); x++) {
    //   }
    // }
    return false;      

  }.property('moveCount'),

  hasEnded: function() {
    return this.get('hasWinner') || this.get('moveCount') === 9;
  }.property('hasWinner', 'moveCount'),


  actions: {
    doMove: function (x, y) {
      if (this.get('hasEnded')) { return; }
      this.get('board')[y][x] = this.get('currentMarker');

      var move = Ember.Object.create({
        x: x,
        y: y,
        mark: this.get('currentMarker')
      });
      
      this.get('moves').addObject(move);
    }, 

    resetGame: function() {
      this.resetBaord();
    }


  }

});
