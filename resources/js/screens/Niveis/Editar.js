import React, { useEffect, useState } from 'react';
import Form from '../../components/Nivel/Form';
import Body from '../../components/Body/Body';
import { useHistory } from 'react-router-dom';
import { useNivel } from '../../hooks/Nivel';

const Editar = (props) => {
    const history = useHistory();
    const { updateNivel, findNivel, getNivel } = useNivel();
    const nivel = getNivel();
    const { id } = props.match.params;

    useEffect(async () => {
        await findNivel(id);
    }, []);


    const onSubmit = (formValues) => {
         updateNivel(formValues, id);
        history.goBack();
    }

    return (
        <Body>
            <div className="mt-3 mb-4">
                <h6>EDITAR NÍVEL</h6>
            </div>
            <Form 
            onSubmit={onSubmit}  
            initialValue={nivel.nivel}
            />
        </Body>
    ); 
    
}

export default Editar;