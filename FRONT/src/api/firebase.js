import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'

const app = initializeApp({
  apiKey: "AIzaSyDAF7XxG5B5o-SacDUpGgAqoV94Wy7Zevs",
  authDomain: "bon-appetit-41806.firebaseapp.com",
  projectId: "bon-appetit-41806",
  storageBucket: "bon-appetit-41806.appspot.com",
  messagingSenderId: "645255033530",
  appId: "1:645255033530:web:0e043042fce97c53a4c883"
})

export const firebaseDB = getStorage(app)