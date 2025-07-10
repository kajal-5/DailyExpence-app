import React , {useState} from 'react';

const AuthContext = React.createContext({
    token: '',
    email: '',
    isLogin : false,
    login :(token) => {},
    logout: ()=>{},

});

export const AuthContextProvider =(props)=>{

    const initialToken = localStorage.getItem('token')

    const [token , setToken] = useState(initialToken);
    const [email,setEmail] = useState("");
   
    const userIsLoggedIn = !!token; //chage bollen value

    const loginHandler =(token,email)=>{
        setToken(token);
        setEmail(email);
        localStorage.setItem('token', token);
    };
    const logoutHandler =()=>{
        setToken(null);
        setEmail("");
        localStorage.removeItem('token');
    };

    const contextValue ={
        token : token,
        isLogin :userIsLoggedIn,
        login :loginHandler,
        logout: logoutHandler,
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {props.children}
        </AuthContext.Provider>

    );
};

export default AuthContext;