import { environment } from "../../environments/environment"
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseApp = initializeApp(environment.firebaseConfig)

export const firebaseAuth = getAuth(firebaseApp)
