PlayersList = new Mongo.Collection('players');

if(Meteor.isClient)
{
  Template.leaderboard.helpers
  (
    {
      'player': function()
      {
        return PlayersList.find({}, {sort: {score: -1, name: 1} });
      },
      'selectedClass': function()
      {
        var playerId = this._id;
        var selectedPlayer = Session.get('selectedPlayer');
        if(playerId==selectedPlayer)
          return "selected"
        else
          return "notSelected"
      },
      'showSelectedPlayer': function()
      {
        var selectedPlayer = Session.get('selectedPlayer');
        return PlayersList.findOne(selectedPlayer);
      }
    }
  );

  Template.leaderboard.events
  (
    {
      'click .player': function()
      {
        var playerId = this._id;
        Session.set('selectedPlayer', playerId);
      },
      'click .increment': function()
      {
        var selectedPlayer = Session.get('selectedPlayer');
        
        PlayersList.update(selectedPlayer, {$inc: {score: 5}});

        console.log(selectedPlayer);
      },
      'click .decrement': function()
      {
        var selectedPlayer = Session.get('selectedPlayer');
        
        PlayersList.update(selectedPlayer, {$inc: {score: -5}});

        console.log(selectedPlayer);
      }
    }
  );
}

if(Meteor.isServer)
{
  console.log("hello server");
}

console.log("hello both");