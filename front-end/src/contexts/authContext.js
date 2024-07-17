import React from "react";


const AuthContext = React.createContext({
    auth : undefined,
    url: undefined,
    login:()=>{},
    logout:()=>{},
    saveUrl:()=>{}
});

export default AuthContext;