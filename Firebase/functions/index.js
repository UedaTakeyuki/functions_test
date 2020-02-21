//const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp();
let fireStore = admin.firestore();

// Hashid
const Hashids = require('hashids/cjs')
let hashids = new Hashids("For Internal ID of",
                          8,
                          "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ");

// Take the text parameter passed to this HTTP endpoint and insert it into the
// Realtime Database under the path /messages/:pushId/original
exports.addMessage = functions.https.onRequest(async (req, res) => {
  // Grab the text parameter.
  const original = req.query.text;
  // Push the new message into the Realtime Database using the Firebase Admin SDK.
  const snapshot = await admin.database().ref('/messages').push({original: original});
  // Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
  res.redirect(303, snapshot.ref.toString());
});

// Listens for new messages added to /messages/:pushId/original and creates an
// uppercase version of the message to /messages/:pushId/uppercase
exports.makeUppercase = functions.database.ref('/messages/{pushId}/original')
    .onCreate((snapshot, context) => {
      // Grab the current value of what was written to the Realtime Database.
      const original = snapshot.val();
      console.log('Uppercasing', context.params.pushId, original);
      const uppercase = original.toUpperCase();
      // You must return a Promise when performing asynchronous tasks inside a Functions such as
      // writing to the Firebase Realtime Database.
      // Setting an "uppercase" sibling in the Realtime Database returns a Promise.
      return snapshot.ref.parent.child('uppercase').set(uppercase);
    });

exports.newID = functions.https.onRequest(async (req, res) => {
  let citiesRef = fireStore.collection('system').doc('uid_counter');
  let snapshot = await citiesRef.get();
  let counter = snapshot.get('counter');
  console.log('current counter = ', counter);
  res.status(200).send({ counter: counter});
  snapshot.ref.update({counter: coounter})
//  res.send('aho');
});

exports.createID = functions.firestore.document('users/{userId}').onCreate(async (snap, context) => {
  // ... Your code here
  const newValue = snap.data();
  console.log(newValue)
  let citiesRef = fireStore.collection('system').doc('uid_counter');
  let snapshot = await citiesRef.get();
  let counter = snapshot.get('counter');
  let id = hashids.encode(counter++);
  console.log(id)
  snap.ref.update({id: id});
  snapshot.ref.update({counter: counter}); 
});
