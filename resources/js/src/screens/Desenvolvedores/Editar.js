import React, { useEffect } from 'react';
import Form from '@Components/Desenvolvedor/Form';
import Body from '@Components/Body/Body';
import { useHistory } from 'react-router-dom';
import { useDesenvolvedor } from '@Hooks/Desenvolvedor';

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
                <h6>EDITAR DESENVOLVEDOR(A)</h6>
            </div>
            <Form 
                onSubmit={onSubmit}  
                initialValue={desenvolvedor}
            />
        </Body>
    ); 
    
}

export default Editar;