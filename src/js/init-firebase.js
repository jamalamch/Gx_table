  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyA3n8uKK9tkZFyEmJIf_PSi0u14EWakPHc",
    authDomain: "gxtraduct.firebaseapp.com",
    databaseURL: "https://gxtraduct.firebaseio.com",
    projectId: "gxtraduct",
    storageBucket: "gxtraduct.appspot.com",
    messagingSenderId: "19755809744",
    appId: "1:19755809744:web:edc0a9bc7538a745eed7d5",
    measurementId: "G-GRCQQ0996L"
  };
  // Initialize Firebase
  var defaultProject = firebase.initializeApp(firebaseConfig);

  console.log(defaultProject.name); 

  var db = firebase.firestore();

//   db.collection("users").add({
//     first: "Ada",
//     last: "Lovelace",
//     born: 1815
// })
// .then(function(docRef) {
//     console.log("Document written with ID: ", docRef.id);
// })
// .catch(function(error) {
//     console.error("Error adding document: ", error);
// });

// db.collection("users").add({
//     first: "Alan",
//     middle: "Mathison",
//     last: "Turing",
//     born: 1912
// })
// .then(function(docRef) {
//     console.log("Document written with ID: ", docRef.id);
// })
// .catch(function(error) {
//     console.error("Error adding document: ", error);
// });
db.collection("users").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
    });
});