import React, { createContext, useContext, useState } from "react";


export const AuthContext = createContext();


export function useAuthContext() {
	return useContext(AuthContext);
}


export const AuthProvider = (props) => {
	const [user, setUser] = useState(null);


	const signIn = ({ userKey, username, password }) => {
		setUser({ userKey: userKey, username: username, password: password });
	}

	const signOut = () => {
		setUser(null);
	}


	return (
		<AuthContext.Provider value={ { userData: user, signIn, signOut } }>
			{ props.children }
		</AuthContext.Provider>);
}
