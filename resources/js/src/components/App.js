import React, {createRef, useCallback} from 'react';
import ReactDOM from 'react-dom';
import {SnackbarProvider} from 'notistack';
import Button from '@material-ui/core/Button';
import Routers from '@Routers/index';
import { NivelProvider } from '@Hooks/Nivel';
import { DesenvolvedorProvider } from '@Hooks/Desenvolvedor';

const App = () => {

    const notistackRef = createRef();

    const onClickDismiss = useCallback(
        (key) => () => {
            notistackRef.current.closeSnackbar(key);
        },
        [notistackRef],
    );

    return (
        <SnackbarProvider
            ref={notistackRef}
            action={(key) => (
                <Button onClick={onClickDismiss(key)}>
                    Fechar
                </Button>
            )}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            maxSnack={5}>
            <DesenvolvedorProvider>
            <NivelProvider>
                <Routers />
            </NivelProvider>
            </DesenvolvedorProvider>
        </SnackbarProvider>
    );
}

export default App;

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}
