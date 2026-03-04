import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useGlobalReducer from '../hooks/useGlobalReducer';
import { ContactCard } from '../components/ContactCard';

import * as api from '../api/api';

export const Contact = () => {
    const { store, dispatch } = useGlobalReducer();
    const [cargando, setCargando] = useState(false);

    useEffect(() => {
        setCargando(true);

        const comprobarAgenda = async (nombreAgenda) => {
            try {
                const existe = await api.existeAgenda(nombreAgenda);

                if (!existe) await api.postAgenda(nombreAgenda);

                await api.getContacts(dispatch);
            } catch (error) {
                console.error('Error al comprobar agenda:', error);
            }
        };

        comprobarAgenda(import.meta.env.VITE_AGENDA);
        setCargando(false);
    }, []);

    return (
        <div className="container my-5" style={{ minWidth: '400px' }}>
            <div className="card">
                <div className="card-header">
                    <div className="row">
                        <div className="col-12 col-md-8 d-flex justify-content-center justify-content-md-start align-items-center gap-2">
                            <h1>
                                {cargando
                                    ? 'Cargando lista de contactos'
                                    : 'Contactos en agenda'}
                            </h1>
                            {!cargando && (
                                <span className="badge bg-dark fs-4 rounded-3">
                                    {store.contacts.length}
                                </span>
                            )}
                        </div>

                        <div className="col-12 col-md-4 align-self-center text-center text-md-end">
                            <Link to="/add-contact" className="btn btn-success">
                                <i className="fa-solid fa-plus-circle me-2"></i>
                                Añadir contacto
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="card-body min-vh-100">
                    {store.contacts.length > 0 && (
                        <div className="d-flex flex-column gap-1">
                            {store.contacts.map((contact) => (
                                <ContactCard
                                    contact={contact}
                                    key={contact.id}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
