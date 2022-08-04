
/// firebase web sayfasinda; su asamalar izlenir.

//  docs =>  build => authantication => web => get started

// burada karsimiza cikan sdk kodlari alinir. bu sdk kodlarinin tam olarak calisabilmesi icin firebaseconfig kodlari;  settings icerisinde project settings kismindan alinir.

// settings e gidebilmek icin go to console diyoruz. 

// Önemli: .env dosyasi olusturulduktan sonra app yeniden start edilir. 



import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth"; // signup 

const firebaseConfig = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);


/// eger istersek; bu dosyada sadece config islemlerini yapip diger kodlari farkli bir dosyada yazabiliriz. Bu durumda buradan sadece auth u export edip diger dosyada import etmemiz yeterlidir.  


//////////////////////////  sign up new user:

        // original hali:

// export const signUpFunc = (email, password) => {
//     createUserWithEmailAndPassword(auth, email, password)
//       .then((userCredential) => {
//         // Signed in
//         const user = userCredential.user;
//       })
//       .catch((error) => {
//         const errorCode = error.code;
//         const errorMessage = error.message;
//       });
// };


    /// async await:

export const signUpFunc = async (email, password, navigate) => {
  try {
    let userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log(userCredential.user);
    // hook lar component icinde yada custom hook icinde kullanilabilir. normal func icinde de calismaz. class component lerde kullanilamaz
    navigate("/");
  } catch (error) {
    console.log(error);
  }
};




    /////////////  sign in existing user:

export const signInFunc = async (email, password, navigate) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log(userCredential);
        navigate("/");
    } catch (error) {
        console.log(error);
    }
};




    //// signOut: 

export const signOutFunc = () => {
    try {
        const userCredential = signOut(auth);
        console.log(userCredential);
    } catch (error) {
        console.log(error);
    }
};






