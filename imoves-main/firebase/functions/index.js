const functions = require("firebase-functions");

const root = require('firebase-admin')
root.initializeApp()

const database = root.firestore()

exports.new_user = functions.auth.user().onCreate((user) => {
  return database
    .collection('user')
    .doc(user.uid)
    .create(JSON.parse(JSON.stringify(user)))
})
