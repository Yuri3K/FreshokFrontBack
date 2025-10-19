import dotenv from 'dotenv';
import admin from 'firebase-admin'

dotenv.config();

if (!admin.apps.length) {
  admin.initializeApp();
}

const db = admin.firestore();

export { admin, db }