import React from "react";


const TokenContext = React.createContext({
    token : undefined,
    saveToken:()=>{}
});

export default TokenContext;