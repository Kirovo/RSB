import React from "react";


const ModalContext = React.createContext({
    modal : undefined,
    closeModal: () => {},
    createPostModal: () => {}
});

export default ModalContext;