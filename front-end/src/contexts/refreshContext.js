import React from "react";


const RefreshContext = React.createContext({
    refresh:false,
    Refresh: ()=>{},
});

export default RefreshContext;