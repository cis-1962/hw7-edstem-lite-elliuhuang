import React, { createContext, useState, useContext, Context, Dispatch, SetStateAction } from 'react';

type AuthContextProp = {
  signedIn: boolean;
  setSignedIn: Dispatch<SetStateAction<boolean>>;
};

type AuthProviderProps = {
  children: React.ReactNode;
};

const defAuthContext: AuthContextProp = {
  signedIn: false,
  setSignedIn: () => {},  
};

export const AuthContext: Context<AuthContextProp> = createContext(defAuthContext);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [signedIn, setSignedIn] = useState(false);

  return (
    <AuthContext.Provider value={{ signedIn, setSignedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
}
