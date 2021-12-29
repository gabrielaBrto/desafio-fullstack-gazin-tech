import React, {useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import {Typography, Button} from '@material-ui/core';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import getMeta from '../../utils/getMetaTag';

const PageNotFound = () => {
    const history = useHistory();

    return (
        <>
            <div className="w-100 d-flex flex-column">
                <div className="container mt-5">
                    <Typography align="center" color="textPrimary" variant="h4">
                        404: A página que você está procurando não está aqui
                    </Typography>
                    <Typography
                        align="center"
                        color="textPrimary"
                        variant="subtitle2">
                        Você pode ter tentado acessar um caminho duvidoso ou chegou aqui por engano. Seja o que for, clique no botão para voltar para a página anterior
                    </Typography>
                    <div className="d-flex justify-content-center">
                        <img
                            src={`${getMeta('url_site')}/images/not_found.png`}
                            style={{
                                marginTop: 50,
                                display: 'inline-block',
                                maxWidth: '100%',
                                width: 400,
                            }}
                        />
                    </div>
                    <div className="d-flex justify-content-center">
                        <Button
                            onClick={() => {
                                history.goBack();
                            }}
                            startIcon={<ArrowBackIcon />}
                            color="primary"
                            variant="contained">
                            Voltar
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PageNotFound;
