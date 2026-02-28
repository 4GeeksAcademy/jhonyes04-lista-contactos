const AGENDA = import.meta.env.VITE_AGENDA;
const API_AGENDA = import.meta.env.VITE_URL_API;
const API_CONTACTS = `${API_AGENDA}/${AGENDA}/contacts`;

export const getAgendas = async () => {
    try {
        const response = await fetch(API_AGENDA);

        if (!response.ok) throw new Error('Error al obtener agendas');

        const data = await response.json();

        return data.agendas.map((agenda) => agenda.slug);
    } catch (error) {
        console.error('Error al obtener agendas:', error);
    }
};

export const postAgenda = async () => {
    try {
        const response = await fetch(API_AGENDA + '/' + AGENDA, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        });

        return response.ok;
    } catch (error) {
        console.error('Error al crear agenda:', error);
        return false;
    }
};

export const getContacts = async () => {
    try {
        const response = await fetch(API_CONTACTS);

        if (!response.ok) throw new Error('Error al obtener contactos');

        const data = await response.json();

        return data.contacts;
    } catch (error) {
        console.error('Error al obtener contactos:', error);
    }
};

export const postContact = async (contact) => {
    try {
        const response = await fetch(API_CONTACTS, {
            method: 'POST',
            body: JSON.stringify(contact),
            headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) throw new Error('Error al agregar contacto');

        return await response.json();
    } catch (error) {
        console.error('Error al agregar contacto:', error);
    }
};

export const putContact = async (id, contact) => {
    try {
        const response = await fetch(API_CONTACTS + '/' + id, {
            method: 'PUT',
            body: JSON.stringify(contact),
            headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) throw new Error('Error al actualizar contacto');

        return await response.json();
    } catch (error) {
        console.error('Error al actualizar contacto:', error);
    }
};

export const deleteContact = async (id) => {
    try {
        const response = await fetch(API_CONTACTS + '/' + id, {
            method: 'DELETE',
        });

        if (!response.ok) throw new Error('Error al eliminar contacto');

        return true;
    } catch (error) {
        console.error('Error al eliminar contacto:', error);
        return false;
    }
};

export const existeAgenda = async (nombreAgenda) => {
    try {
        const agendas = await getAgendas();

        return agendas.some((agenda) => agenda === nombreAgenda);
    } catch (error) {
        console.error('Error al comprobar existencia de agenda:', error);
        return false;
    }
};
