import React, { useEffect, useState } from 'react';
import Form from '../../components/Desenvolvedor/Form';
import Body from '../../components/Body/Body';
import { useHistory } from 'react-router-dom';
import { useDesenvolvedor } from '../../hooks/Desenvolvedor';

const Editar = (props) => {
    const history = useHistory();
    const { updateDesenvolvedor, findDesenvolvedor, getDesenvolvedor } = useDesenvolvedor();
    const desenvolvedor = getDesenvolvedor();
    const { id } = props.match.params;

    useEffect(async () => {
        await findDesenvolvedor(id);
    }, []);

    const onSubmit = (formValues) => {
        updateDesenvolvedor(formValues, id);
        history.goBack();
    }

    return (
        <Body>
            <div className="mt-3 mb-4">
                <h6>EDITAR NÍVEL</h6>
            </div>
            <Form 
                onSubmit={onSubmit}  
                initialValue={desenvolvedor}
            />
        </Body>
    ); 
    
}

export default Editar;