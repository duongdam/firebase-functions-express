const admin = require('firebase-admin')
const serviceAccount = require('./classfunc-com-firebase-adminsdk-ykfib-b972304ba4.json');

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: 'https://classfunc-com.firebaseio.com',
    });
}

module.exports = admin;
