import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase/config";
import { useState, useEffect } from "react";

export const useAuthentication = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  //cleanup
  const [cancelled, setCancelled] = useState(false);

  function checkIfIsCancelled() {
    if (cancelled) {
      return;
    }
  }

  const createUser = async (data) => {
    checkIfIsCancelled();
    setLoading(true);
    setError(null);

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      await updateProfile(user, { displayName: data.displayName });

      setLoading(false);

      return user;
    } catch (err) {
      console.log(err.message);

      let systemErrorMessage;

      if (err.message.includes("Password")) {
        systemErrorMessage = "The password must be at least 6 characters long";
      } else if (err.message.includes("email-already")) {
        systemErrorMessage = "The email already exists";
      } else {
        systemErrorMessage = "An error occurred, please try again later";
      }
      setLoading(false);

      setError(systemErrorMessage);
    }
  };

  //logout - signOut

  const logOut = async () => {
    checkIfIsCancelled();
    signOut(auth);
  };

  //login - signin
  const logIn = async (data) => {
    checkIfIsCancelled();
    setLoading(true);
    setError(null);

    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      setLoading(false);
    } catch (err) {
      let systemErrorMessage;
      if (err.message.includes("user-not-found")) {
        systemErrorMessage = "The user was not found";
      } else if (err.message.includes("wrong-password")) {
        systemErrorMessage = "Wrong password";
      } else systemErrorMessage = "An error occurred, please try again later";
      setLoading(false);
      setError(systemErrorMessage);
    }
  };

  useEffect(() => {
    return () => {
      setCancelled(true);
    };
  }, []);

  return { createUser, error, loading, logOut, logIn };
};
