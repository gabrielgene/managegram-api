var Client = require('instagram-private-api').V1;
var device = new Client.Device('managerinsta97');
var storage = new Client.CookieFileStorage(__dirname + '/cookies/managerinsta97.json');
var myUser = 'managerinsta97'
var myPass = 'insta@123'
// And go for login
Client.Session.create(device, storage, 'managerinsta97', 'insta@123')
  .then(function (session) {
    // Now you have a session, we can follow / unfollow, anything...
    // And we want to follow Instagram official profile
    return [session, Client.Account.searchForUser(session, myUser)]
  })
  .spread(function (session, account) {
    // return Client.Relationship.autocompleteUserList(session)
    // return Client.Relationship.get(session, account.id)
    // return Client.Thread.configureText(session, account.id, `test 2`)
    // return Client.Thread.recentRecipients(session)
    return Client.Account.showProfile(session)
  })
  .then(function (relationship) {
    console.log(relationship)
    // {followedBy: ... , following: ... }
    // Yey, you just followed @instagram
  })
