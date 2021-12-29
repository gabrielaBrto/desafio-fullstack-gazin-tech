import React from 'react';
import Body from '@Components/Body/Body';
import Form from '@Components/Desenvolvedor/Form';

import { useHistory } from 'react-router-dom';
import { useDesenvolvedor } from '@Hooks/Desenvolvedor';


const Criar = () => {
    const history = useHistory();
    const { createDesenvolvedor } = useDesenvolvedor();

    const onSubmit = (formValues) => {
        createDesenvolvedor(formValues);
        history.goBack();
    }

    return (
        <Body>
            <div className="mb-4">CRIAR DESENVOLVEDOR</div>
            <Form onSubmit={onSubmit} />
        </Body>
    ); 
}

export default Criar;