import React , {useState, useEffect} from 'react';

const AuthContext = React.createContext({
    token: '',
    email: '',
    isLogin : false,
    login :(token) => {},
    logout: ()=>{},

});

let logoutTimer;

export const AuthContextProvider =(props)=>{

    const initialToken = localStorage.getItem('token')

    const [token , setToken] = useState(initialToken);
    const [email,setEmail] = useState("");
   
    const userIsLoggedIn = !!token; //chage bollen value

    const loginHandler =(token,email)=>{
        const expirationTimer = new Date().getTime()+10*60*1000;
        
        setToken(token);
        setEmail(email);
        localStorage.setItem('token', token);
        localStorage.setItem('expirationTimer', expirationTimer);
        autoLogout(expirationTimer -new Date().getTime());
    };
    const logoutHandler =()=>{
        setToken(null);
        setEmail("");
        localStorage.removeItem('token');
        localStorage.removeItem('expirationTimer');
        if(logoutTimer){
            clearTimeout(logoutTimer);
        }
    };

    const autoLogout = (duration)=>{
        if(logoutTimer) clearTimeout(logoutTimer);
        logoutTimer = setTimeout(()=>{
            logoutHandler();
            alert("Session expired . Please Login again");
        },duration);
    }

    useEffect(()=>{
        const storedToken = localStorage.getItem('token');
        const storedExpiration = localStorage.getItem('expirationTimer');
        if(storedToken && storedExpiration){
            const remainigTime = +storedExpiration - new Date().getTime();
            if(remainigTime<=0){
                logoutHandler();
            }
            else{
                setToken(storedToken);
                autoLogout(remainigTime);
            }
        }
    },[]);


    const contextValue ={
        token : token,
        email : email,
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