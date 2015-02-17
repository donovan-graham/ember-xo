import Ember from 'ember';

var Promise = Ember.RSVP.Promise;

export default Ember.Component.extend({

  classNames: ['board'],
  classNameBindings: ['hasEnded:disabled', 'hasWinner:winner'],

  game: null,

  board: null,    // {} state

  moves: Ember.computed.alias('game.moves'),
  moveCount: Ember.computed.alias('moves.length'),
  // moves: null,    // [] history

  rows: null,     // []
  cols: null,     // []


  resetBaord: function() {
    this.setProperties({
      // moves: [],
      board: { 1 : { 1 : null, 2: null, 3: null }, 2 : { 1 : null, 2: null, 3: null }, 3 : { 1 : null, 2: null, 3: null }},

      rows: [1,2,3,], // 3 x 3
      cols: [1,2,3,], // 3 x 3
    });
  },

  startGame: function() {
    this.resetBaord();
  }.on('init'),



  currentMarker: function() {
    return (this.get('moveCount') % 2 === 0) ? 'x' : 'o'; 
  }.property('moveCount'),

  isPlayerOne: Ember.computed.equal('currentMarker', 'x'),
  isPlayerTwo: Ember.computed.equal('currentMarker', 'o'),

  hasWinner: function() {

    console.log(">> hasWinner:", this.get('moveCount'));

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

  // observeHasWinner: function() {
  //   console.log(">> observeHasWinner");
  //   if (this.get('hasWinner') === true) {
  //     this.send('doGameWon');
  //   }
  // }.observes('hasWinner'),


  hasEnded: function() {
    return this.get('hasWinner') || this.get('moveCount') === 9;
  }.property('hasWinner', 'moveCount'),


  isProcessing: false,

  actions: {
    doMove: function (x, y) {
      if (this.get('isProcessing') || this.get('hasEnded')) { return; }
      this.set('isProcessing', true);

      var mark = this.get('currentMarker');      
      var game = this.get('game');
      var _this = this;

      this.get('board')[y][x] = mark;

      var store = this.container.lookup('store:main');

      var move = store.createRecord('move', {
        x: x,
        y: y,
        mark: mark
      });

      move.save().then(function() {
        Promise.cast(game.get('moves')).then(function(moves) {
          moves.addObject(move);
          game.save().then(function() {
            _this.set('isProcessing', false);
          });
        });
      });
    }, 

    doGameWon: function() {
      console.log('doGameWon');

      this.set('isProcessing', true);

      var _this = this;
      var game = this.get('game');
      game.set('status', 'won').save().then(function() {
        this.set('isProcessing', false); 
      });
    },
    
    doGameEnded: function() {
      console.log('doGameEnded');

      var _this = this;
      var game = this.get('game');
      game.set('status', 'ended').save().then(function() {
        this.set('isProcessing', false); 
      });
    },




    resetGame: function() {
      if (this.get('isProcessing') || this.get('hasEnded')) { return; }
      this.resetBaord();
    }


  }

});
