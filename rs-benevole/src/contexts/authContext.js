import React from "react";


const AuthContext = React.createContext({
    auth : undefined,
    login:()=>{},
    logout:()=>{}
});

export default AuthContext;