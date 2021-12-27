import React, {
    useCallback, 
    createContext, 
    useState, 
    useContext,
} from 'react';
import { useSnackbar } from 'notistack';
import api from '../api/api';

const DesenvolvedorContext = createContext({});

export const DesenvolvedorProvider = ({ children }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [desenvolvedores, setDesenvolvedores] = useState([]);
  const [desenvolvedor, setDesenvolvedor] = useState({});

  const getDesenvolvedores = (busca = '') => {
    api.get(`desenvolvedores?busca=${busca}`)
    .then((res) => {  
      setDesenvolvedores(res.data.desenvolvedores);
    })
    .catch((error) => {
      enqueueSnackbar('Erro ao buscar níveis', {
        variant: 'error',
      });
    });
  } 

  const createDesenvolvedor = ({
    nome,
    nivelId,
    sexo,
    dataNascimento,
    idade,
    hobby
  }) => {
    api.post('desenvolvedores', 
      {
        nome,
        nivel_id: nivelId,
        sexo,
        datanascimento: dataNascimento,
        idade,
        hobby
      })
    .then((res) => {
        enqueueSnackbar(res.data.message, {
          variant: 'success',
        });   
        getDesenvolvedores();
      })
    .catch((error) => {
        enqueueSnackbar('Erro ao cadastrar desenvolvedor(a)', {
          variant: 'error',
        });
    });
  };

  const findDesenvolvedor = (id) => {
    api.get(`/desenvolvedores/${id}`)
      .then((res) => {
        setDesenvolvedor(res.data.desenvolvedor);
      })
    .catch((error) => {
        enqueueSnackbar('Erro ao buscar nível', {
          variant: 'error',
        });
    });
  } 

  const updateDesenvolvedor = ({
      nome,
      nivelId,
      sexo,
      dataNascimento,
      idade,
      hobby
    }, id ) => {
    api.put(`/desenvolvedores/${id}`, {
      nome,
      nivel_id: nivelId,
      sexo,
      datanascimento: dataNascimento,
      idade,
      hobby
    })
    .then((res) => {
        enqueueSnackbar(res.data.message, {
          variant: 'success',
        });
        getDesenvolvedores();
    })
    .catch((error) => {
        enqueueSnackbar('Erro ao atualizar nível', {
            variant: 'error',
        });
    });
  } 

  const deleteDesenvolvedor = (id) => {
    api.delete(`/desenvolvedores/${id}`)
    .then((res) => {
      enqueueSnackbar('Nível deletado com sucesso!', {
        variant: 'success',
      });
      getDesenvolvedores();
    })
    .catch((error) => {
      enqueueSnackbar('Erro ao deletar nível!', {
        variant: 'error',
      });
    });
  }

  const getListaDesenvolvedores = useCallback(() => desenvolvedores, [desenvolvedores]);

  const getDesenvolvedor = useCallback(() => desenvolvedor, [desenvolvedor]);

  return (
    <DesenvolvedorContext.Provider
      value={{
        createDesenvolvedor,
        getDesenvolvedor,
        getDesenvolvedores,
        getListaDesenvolvedores,
        findDesenvolvedor,
        updateDesenvolvedor,
        deleteDesenvolvedor,
      }}
    >
      {children}
    </DesenvolvedorContext.Provider>
  );
};

export function useDesenvolvedor() {
  const context = useContext(DesenvolvedorContext);
  if (!context) {
    throw new Error('useDesenvolvedor must be used within an DesenvolvedorContext');
  }
  return context;
}
