import React, { useState, useEffect } from 'react';
import Body from '../../components/Body/Body';
import Form from '../../components/Desenvolvedor/Form';

import { useHistory } from 'react-router-dom';
import { useDesenvolvedor } from '../../hooks/Desenvolvedor';


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