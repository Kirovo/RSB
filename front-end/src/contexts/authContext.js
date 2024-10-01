import React from "react";


const AuthContext = React.createContext({
    profileId: undefined,
    token: undefined,
    login:()=>{},
    logout:()=>{}
});

export default AuthContext;