import React from 'react';
import Form from '../../components/Nivel/Form';
import Body from '../../components/Body/Body';
import { useHistory } from 'react-router-dom';
import { useNivel } from '../../hooks/Nivel';

const Criar = (props) => {
    const history = useHistory();
    const { createNivel } = useNivel();

    const onSubmit = (formValues) => {
        createNivel(formValues);
        history.goBack();
    }

    return (
        <Body>
            <div className="mt-3 mb-4">
                <h6>CRIAR NÍVEL</h6>
            </div>
            <Form onSubmit={onSubmit} />
        </Body>
    ); 
    
}

export default Criar;