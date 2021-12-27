import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import DateAdapter from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import moment from 'moment';
import { useNivel } from '../../hooks/Nivel'

import MenuItem from '@mui/material/MenuItem';

const Form = (props) => {
    const { getNiveis, getNiveisList } = useNivel();
    const [nivelId, setNivelId] = useState('');
    const [niveis, setNiveis] = useState([]);
    const [nome, setNome] = useState('');
    const [sexo, setSexo] = useState('');
    const [dataNascimento, setDataNascimento] = useState(null);
    const [idade, setIdade] = useState('');
    const [hobby, setHobby] = useState(''); 
    const [validation, setValidation] = useState({
        nome: '',
        nivelId: '',
        sexo: '',
        dataNascimento: '',
        idade: '',
        hobby: '',
    });
     
    useEffect(async () => {
        await getNiveis();

        if(props.initialValue){
            setNivelId(props.initialValue.nivel.id);
            setNome(props.initialValue.nome);
            setSexo(props.initialValue.sexo);
            setDataNascimento(props.initialValue.datanascimento);
            setIdade(props.initialValue.idade);
            setHobby(props.initialValue.hobby);
        }

    }, [props]);
      
    useEffect(() => {
        const niveisAtuais = getNiveisList();
        if (niveisAtuais.length > 0) {
            setNiveis(niveisAtuais);
        }
    }, [getNiveisList()]);


    const onSubmit = () => {
        var momentDate = moment(dataNascimento);
        var momentDataNascimento = momentDate.format("YYYY-MM-DD")

        const validationData = {
            nome: '',
            nivelId: '',
            sexo: '',
            dataNascimento: '',
            idade: '',
            hobby: '',
        };
        
        let hasError = false;

        if (!nome) {
            validationData.nome = 'O campo nome deve ser preenchido';
            hasError = true;
        }

        if (!nivelId) {
            validationData.nivelId = 'O campo nível deve ser preenchido';
            hasError = true;
        }

        if (!sexo) {
            validationData.sexo = 'O campo sexo deve ser preenchido';
            hasError = true;
        }

        if (!dataNascimento) {
            validationData.dataNascimento = 'O campo data de nascimento deve ser preenchido';
            hasError = true;
        }

        if (!idade) {
            validationData.idade = 'O campo idade deve ser preenchido';
            hasError = true;
        }

        if (!hobby) {
            validationData.hobby = 'O campo hobby deve ser preenchido';
            hasError = true;
        }

        setValidation(validationData);
        if (!hasError) {
            props.onSubmit({
                nome,
                nivelId,
                sexo,
                dataNascimento: momentDataNascimento,
                idade,
                hobby
            });
        }
    }

    return (
        <form>
            <div className="row mb-3">
                <div className="col-md-6">
                    <TextField 
                    error={validation.nome.length > 0}
                    helperText={
                        validation.nome.length > 0
                            ? validation.nome
                            : ''
                    }
                    size="small" 
                    label="Nome" 
                    value={nome}
                    variant="outlined"
                    fullWidth
                    onChange={e => setNome(e.target.value)}
                    />
                </div>
                <div className="col-md-6">
                <TextField 
                     error={validation.nivelId.length > 0}
                     helperText={
                         validation.nivelId.length > 0
                             ? validation.nivelId
                             : ''
                     }
                    label="Nivel"
                    size="small" 
                    variant="outlined"
                    fullWidth
                    value={nivelId}
                    select
                    onChange={e => setNivelId(e.target.value)}
                    >
                    {niveis.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                        {option.nivel}
                        </MenuItem>
                    ))}
                    </TextField>
                </div>
            </div>
            <div className="row mb-3">
                <div className="col-md-6">
                    <TextField 
                     error={validation.sexo.length > 0}
                     helperText={
                         validation.sexo.length > 0
                             ? validation.sexo
                             : ''
                     }
                    label="Sexo"
                    size="small" 
                    variant="outlined"
                    fullWidth
                    value={sexo}
                    onChange={e => setSexo(e.target.value)}
                    />
                </div>
                <div className="col-md-6">
                <LocalizationProvider dateAdapter={DateAdapter}>
                <DatePicker
                    label="Data de Nascimento"
                    value={dataNascimento}
                    onChange={(newValue) => {
                    setDataNascimento(newValue);
                    }}
                    inputFormat	="dd/MM/yyyy"
                    renderInput={(params) => <TextField 
                        {...params} 
                        size="small"
                        fullWidth
                        variant="outlined"
                        error={validation.dataNascimento.length > 0}
                        helperText={
                            validation.dataNascimento.length > 0
                                ? validation.dataNascimento
                                : ''
                        }
                    />}
                />
                </LocalizationProvider>
                </div>
            </div>
            <div className="row mb-4">
                <div className="col-md-6">
                    <TextField 
                     error={validation.idade.length > 0}
                     helperText={
                         validation.idade.length > 0
                             ? validation.idade
                             : ''
                     }
                    size="small" 
                    label="Idade" 
                    variant="outlined"
                    fullWidth
                    value={idade}
                    onChange={e => setIdade(e.target.value)}
                    />
                </div>
                <div className="col-md-6">
                    <TextField 
                     error={validation.hobby.length > 0}
                     helperText={
                         validation.hobby.length > 0
                             ? validation.hobby
                             : ''
                     }
                    size="small" 
                    label="Hobby" 
                    variant="outlined"
                    value={hobby}
                    fullWidth
                    onChange={e => setHobby(e.target.value)}
                    />
                </div>
            </div>
            <div className="mb-4 mt-3 d-flex justify-content-end">
                <Button variant="contained" onClick={onSubmit}>Enviar</Button>
            </div>
        </form>
    ); 
}


export default Form;