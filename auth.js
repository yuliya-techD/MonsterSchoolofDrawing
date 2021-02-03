
// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBEjib1i_7Yn6H7vzyaKisejUThmcPhtzY",
  authDomain: "msod-1cdd4.firebaseapp.com",
  projectId: "msod-1cdd4",
  storageBucket: "msod-1cdd4.appspot.com",
  messagingSenderId: "210752361504",
  appId: "1:210752361504:web:a1884d0c268d8073259845"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
console.log("all good");


var loginForm = document.getElementById("login-form");
var logout = document.getElementById("logout");
loginForm.addEventListener('submit', register);
loginForm.addEventListener('submit', login);

function register(e) {

  e.preventDefault();
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;

  console.log("email:" + email);
  console.log("password:" + password);

  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in 
      var user = userCredential.user;
      console.log(user);
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      // ..

    });
}

function login(e) {

  e.preventDefault();
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;

  if (firebase.auth().currentUser) {
    firebase.auth().signOut();
  }

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      
      email.value ="Enter email...";
      password.value="password";
      logout.style.display = "block";
      //window.location.href = 'index.html';
      loginForm.style.display = "none";
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
    });
}

function signOut() {

  firebase.auth().signOut().then(() => {
    // Sign-out successful.
    loginForm.style.display = "block";
     logout.style.display = "none";
  }).catch((error) => {
    // An error happened.
  });
}
