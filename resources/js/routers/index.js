import React, { useEffect } from 'react';
import { Router, Route, Switch } from 'react-router-dom';    
import Niveis from '../screens/Niveis/Lista';
import CriarNiveis from '../screens/Niveis/Criar';
import EditarNiveis from '../screens/Niveis/Editar';
import Desenvolvedores from '../screens/Desenvolvedores/Lista';
import CriarDesenvolvedores from '../screens/Desenvolvedores/Criar';
import EditarDesenvolvedores from '../screens/Desenvolvedores/Editar';
import NotFound from '../components/NotFound/NotFound';
import history from './history';

const Routers = () => {

    return (
        <>
        <Router history={history}>
            <div>
                <Switch>
                    <Route 
                     exact 
                     path="/" 
                     component={Desenvolvedores} 
                    />
                    
                    <Route 
                     exact 
                     path="/niveis" 
                     component={Niveis} 
                    />
                    <Route 
                     exact 
                     path="/niveis/novo" 
                     component={CriarNiveis} 
                     />
                    <Route 
                     exact 
                     path="/niveis/editar/:id" 
                     component={EditarNiveis} 
                    />

                    <Route 
                     exact 
                     path="/desenvolvedores" 
                     component={Desenvolvedores} 
                    />
                    <Route 
                     exact 
                     path="/desenvolvedores/novo" 
                     component={CriarDesenvolvedores} 
                    />
                    <Route 
                     exact 
                     path="/desenvolvedores/editar/:id" 
                     component={EditarDesenvolvedores} 
                     />

                      <Route path="*" component={NotFound} />
                </Switch>
            </div>
        </Router>
        </>
    );
}

export default Routers;