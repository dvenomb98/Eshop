import { createContext, useContext, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { auth } from '../firebase';



const UserContext = createContext();


export const AuthContextProvider = ({ children }) => {
   const [user, setUser] = useState(null);
   const [isLoading, setIsLoading] = useState(true)
   


   const signIn = (email, password) =>  {
    return signInWithEmailAndPassword(auth, email, password)
   }

   const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

   const logout = () => {
     return signOut(auth)
   }


   useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsLoading(false)
      

    });
    return () => {
      unsubscribe();
    };
  }, []);

  



  return (
    <UserContext.Provider value={{ createUser, signIn, user, logout, isLoading}}>
      {!isLoading && children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};