import React, {
    useCallback, 
    createContext, 
    useState, 
    useContext,
} from 'react';
import { useSnackbar } from 'notistack';
import api from '../api/api';

const NivelContext = createContext({});

export const NivelProvider = ({ children }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [niveis, setNiveis] = useState([]);
  const [nivel, setNivel] = useState({});

  const getNiveis = useCallback(async (busca = '') => {
    
    api.get(`niveis?busca=${busca}`)
      .then((res) => {  
        setNiveis(res.data.niveis);
      })
      .catch((error) => {
        enqueueSnackbar('Erro ao buscar níveis', {
          variant: 'error',
        });
      });
  });

  const createNivel = (nivel) => {
      api.post('niveis', {"nivel":nivel})
      .then((res) => {
        enqueueSnackbar('Nível cadastrado com sucesso', {
          variant: 'success',
        });   
      })
      .catch((error) => {
        enqueueSnackbar('Erro ao cadastrar nível', {
          variant: 'error',
        });
        getNiveis();
      });
  };

  const findNivel = useCallback(async (id) => {
    api.get(`/niveis/${id}`)
      .then((res) => {
        setNivel(res.data.nivel);
      })
      .catch((error) => {
        console.clear();
        enqueueSnackbar('Erro ao buscar nível', {
          variant: 'error',
        });
      });
  });

  const updateNivel = useCallback(async (nivel, id) => {
    api.put(`/niveis/${id}`, {
      nivel:nivel})
      .then((res) => {
        enqueueSnackbar(res.data.message, {
          variant: 'success',
        });
        getNiveis();
      })
      .catch((error) => {
        enqueueSnackbar('Erro ao atualizar nível', {
          variant: 'error',
        });
      });
  });

  const deleteNivel = useCallback(
    async (id) => {
      api.delete(`/niveis/${id}`)
        .then((res) => {
          enqueueSnackbar('Nível deletado com sucesso!', {
            variant: 'success',
          });
          getNiveis()
        })
        .catch((error) => {
          console.clear();
          if(error.response.status == 501){
            enqueueSnackbar('Não foi possível deletar este nível, pois existem desenvolvedores relacionados a ele', {
              variant: 'error',
            });
          }else{
            enqueueSnackbar('Erro ao deletar nível!', {
              variant: 'error',
            });
          }
        });
    },
  );

  const getNiveisList = useCallback(() => niveis, [niveis]);

  const getNivel = useCallback(() => nivel, [nivel]);

  return (
    <NivelContext.Provider
      value={{
        createNivel,
        getNivel,
        getNiveis,
        getNiveisList,
        findNivel,
        updateNivel,
        deleteNivel,
      }}
    >
      {children}
    </NivelContext.Provider>
  );
};

export function useNivel() {
  const context = useContext(NivelContext);
  if (!context) {
    throw new Error('useNivel must be used within an NivelContext');
  }
  return context;
}
