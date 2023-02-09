import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  sendEmailVerification,
  getIdToken,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth, googleProvider } from "../config/firebase";
import { AuthorisationContainer, AuthorisationForm } from "../GlobalStyles";
import { useAuthValue } from '../AuthContext';


const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState('')
  const {setTimeActive} = useAuthValue()
  const navigate = useNavigate()


  console.log(auth?.currentUser?.email);
  console.log(auth?.currentUser);

  //Getting the JWT 
  const token2 = auth?.currentUser?.getIdToken(true).then(function (token) {
    console.log(token);
  });

  const signIn = (e: React.FormEvent<HTMLFormElement>)  => {
    e.preventDefault()
    signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      if (auth.currentUser) {
      if(!auth.currentUser.emailVerified) {
        sendEmailVerification(auth.currentUser)
        .then(() => {
          setTimeActive(true)
          navigate('/verify-email')
        })
      .catch(err => alert(err.message))
    }else{
      navigate('/')
    } }
    else {
      setError("No User")
    }})
    .catch(err => setError(err.message))
  }

    const signInWithGoogle = async (): Promise<void> => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/profile");
    } catch (err) {
      console.error(err);
    }
  };


  // const signIn = async (): Promise<void> => {
  //   try {
  //     await createUserWithEmailAndPassword(auth, email, password);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  // const signInWithGoogle = async (): Promise<void> => {
  //   try {
  //     await signInWithPopup(auth, googleProvider);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  

  const logout = async (): Promise<void> => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AuthorisationContainer>
    <AuthorisationForm onSubmit={signIn} name="login_form">
      <div className="registrationImageContainer">
        <img src="https://img.icons8.com/external-kosonicon-lineal-color-kosonicon/512/external-education-insurance-kosonicon-lineal-color-kosonicon.png" />
      </div>
      <input
        type="email"
        value={email}
        placeholder="Enter your email"
        required
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        value={password}
        required
        placeholder="Enter your password"
        onChange={(e) => setPassword(e.target.value)}
      />

      {error && <p>{error} </p>}

      <button type="submit">Login</button>

      <p id="or">or</p>

      <button id="google" onClick={signInWithGoogle}>
        Login with Google
      </button>

      <p id="haveAnAccount">
        Don't have an account?
        <Link to="/registration"> Register </Link>
      </p>
    </AuthorisationForm>
  </AuthorisationContainer>
    // <div>
    //   <input
    //     placeholder="Email..."
    //     onChange={(event) => setEmail(event.target.value)}
    //   />
    //   <input
    //     placeholder="Password..."
    //     onChange={(event) => setPassword(event.target.value)}
    //   />
    //   <button onClick={signIn}>Sign In</button>
    //   <button onClick={signInWithGoogle}>Sign In with Google</button>
    //   <button onClick={logout}>Logout</button>
    // </div>
  );
};

export default Login;
