export const initialContacts = () => {
    return {
        contacts: [],
    };
};

export default function contactReducer(store, action = {}) {
    switch (action.type) {
        case 'GET_CONTACTS':
            return {
                ...store,
                contacts: action.payload,
            };

        case 'ADD_CONTACT':
            return {
                ...store,
                contacts: [...store.contacts, action.payload],
            };

        case 'UPDATE_CONTACT':
            return {
                ...store,
                contacts: store.contacts.map((contact) =>
                    contact.id === action.payload.id ? action.payload : contact,
                ),
            };

        case 'DELETE_CONTACT':
            return {
                ...store,
                contacts: store.contacts.filter(
                    (contact) => contact.id !== action.payload,
                ),
            };

        default:
            throw new Error('Acción desconcida');
    }
}
