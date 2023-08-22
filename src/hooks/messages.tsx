import React, { ReactNode, createContext, useContext, useState } from 'react';

interface MessagesState {
    panelOpen: boolean,
    toggle: React.Dispatch<React.SetStateAction<void>>;
    open: React.Dispatch<React.SetStateAction<void>>;
    close: React.Dispatch<React.SetStateAction<void>>;
}


const MessageContext = createContext<MessagesState>({} as MessagesState);

export const MessageProvider = (props:{ children: ReactNode }) => {
    const [state, setState] = useState<boolean>(false);
    
    const toggle = () => setState(prev => !prev);
    const  open = () => setState(true);
    const close = () => setState(false);
 
    return(
       <MessageContext.Provider value = {{ panelOpen: state, toggle, open, close}}>
            {props.children}
        </MessageContext.Provider>
    );
 }

 export const useMessageState = () => {
    const context = useContext(MessageContext);
    if (context === undefined) {
      throw new Error('useMessageState must be used within a MessageStateProvider');
    }
    return context;
};