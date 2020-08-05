const functions = require('firebase-functions');
const admin = require('firebase-admin');

// Take the text parameter passed to this HTTP endpoint and insert it into
// Cloud Firestore under the path /messages/:documentId/original
exports = module.exports = functions.https.onRequest(async (req, res) => {
  // Grab the text parameter.
  const original = req.query.text;
  // Push the new message into Cloud Firestore using the Firebase Admin SDK.
  const writeResult = await admin.firestore().
      collection('messages').
      add({original: original});
  // Send back a message that we've succesfully written the message
  res.json({result: `Message with ID: ${writeResult.id} added.`});
});

