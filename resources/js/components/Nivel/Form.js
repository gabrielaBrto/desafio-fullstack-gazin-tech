import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


const Form = (props) => {
    const [nivel, setNivel] = useState('');  
    const [validation, setValidation] = useState({
        nivel: ''
    });

    useEffect(() => {
        setNivel(props.initialValue);
    }, [props]);

    const onSubmit = () => {
        let hasError = false;

        const validationData = {
            nivel: ''
        };

        if(!nivel){
            validationData.nivel = 'O campo deve ser preenchido';
            hasError = true;
        }

        setValidation(validationData);
        if (!hasError) {
            props.onSubmit(nivel);
        }
        
    }

    return (
        <form>
            <div className="row">
                <div className="col-md-7">
                    <TextField 
                    size="small" 
                    label="Nível" 
                    name="nivel"
                    variant="outlined"
                    fullWidth
                    onChange={e => setNivel(e.target.value)}
                    value={nivel}
                    error={validation.nivel.length > 0}
                    helperText={
                    validation.nivel.length > 0
                        ? validation.nivel
                        : ''
                    }
                    />
                </div>
                <div className="col-md-4 mb-4">
                    <Button variant="contained" onClick={onSubmit}>Enviar</Button>
                </div>
            </div>
        </form>
    ); 
}


export default Form;