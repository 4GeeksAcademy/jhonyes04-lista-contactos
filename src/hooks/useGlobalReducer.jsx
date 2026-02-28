import { useContext, useReducer, createContext } from 'react';
import contactReducer, { initialContacts } from '../store';

const ContactContext = createContext();

export const ContactProvider = ({ children }) => {
    const [state, dispatch] = useReducer(contactReducer, initialContacts());

    return (
        <ContactContext.Provider value={{ state, dispatch }}>
            {children}
        </ContactContext.Provider>
    );
};

export const useGlobalReducer = () => {
    const { dispatch, state } = useContext(ContactContext);
    return { dispatch, state };
};

export default useGlobalReducer;
