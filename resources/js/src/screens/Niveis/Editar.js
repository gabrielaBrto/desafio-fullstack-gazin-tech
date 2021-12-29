import React, { useEffect } from 'react';
import Form from '@Components/Nivel/Form';
import Body from '@Components/Body/Body';
import { useHistory } from 'react-router-dom';
import { useNivel } from '@Hooks/Nivel';

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