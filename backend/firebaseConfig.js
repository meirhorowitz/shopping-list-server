const admin = require('firebase-admin');

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: "io.ionic.starter",
    clientEmail: "firebase-adminsdk-xxxxx@io.ionic.starter.iam.gserviceaccount.com",
    // אתה צריך להשתמש ב-private key מה-service account, לא ב-Server Key
    privateKey: "הכנס-כאן-את-ה-private-key"
  })
});

module.exports = admin;