const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp();

exports.sendMessage = functions.https.onRequest( (request, response) => {
  response.set('Access-Control-Allow-Origin', '*');

  if (request.method === 'OPTIONS') {
    response.set('Access-Control-Allow-Methods', 'GET');
    response.set('Access-Control-Allow-Headers', 'Content-Type');
    response.set('Access-Control-Max-Age', '3600');
    response.status(204).send('');
  }

  admin.firestore().collection('mail').add({
    to: request.query.email,
    message: {
      subject: 'Naturipe',
      html: `Thanks for your interest in our products. Your "${request.query.file}" can be viewed here: <a href="${request.query.link}">${request.query.link}</a>`,
    },
  }).then(result => {
    response.send(result);
  });
});
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
