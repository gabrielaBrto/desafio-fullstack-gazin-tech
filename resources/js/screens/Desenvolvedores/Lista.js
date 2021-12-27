import React, {useState, useEffect} from 'react';
import Body from '../../components/Body/Body';
import { DataGrid } from '@material-ui/data-grid';
import { useHistory } from 'react-router-dom';
import Button from "@material-ui/core/Button";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useDesenvolvedor } from '../../hooks/Desenvolvedor';
import moment from 'moment';

const renderEditButton = (params) => {
  const history = useHistory();
  return (
      <strong>
          <IconButton
            variant="contained"
            color="primary"
            style={{ marginLeft: 16 }}
            onClick={() => { history.push(`/desenvolvedores/editar/${params.row.id}`); }}
          >
            <EditIcon />
          </IconButton>
      </strong>
  )
}

const renderDeleteButton = (params) => {
  const [open, setOpen] = useState(false);
  const { deleteDesenvolvedor } = useDesenvolvedor();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
      <strong>
          <IconButton
            variant="contained"
            color="secondary"
            style={{ marginLeft: 16 }}
            onClick={handleClickOpen}
          >
            <DeleteIcon />
          </IconButton>

            {/* MODAL DE CONFIRMAÇÃO */}
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle>
                {"Deletar Desenvolvedor(a)"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Você realmente deseja deletar o(a) desenvolvedor(a) selecionado(a)?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Não</Button>
                <Button onClick={() =>{
                  deleteDesenvolvedor(params.row.id)
                  setOpen(false);
                }}>Sim</Button>
              </DialogActions>
            </Dialog>
      </strong>
  )
}

const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    {
      field: 'nome',
      headerName: 'Nome',
      width: 150,
      editable: true,
    },
    {
      field: 'sexo',
      headerName: 'Sexo',
      width: 150,
      editable: true,
    },
    {
      field: 'datanascimento',
      headerName: 'Data de Nascimento',
      width: 150,
      editable: true,
      renderCell: (params) => {
        return <div className="rowitem">{moment(params).format("DD/MM/YYYY")}</div>;
      },
    },
    {
      field: 'idade',
      headerName: 'Idade',
      width: 150,
      editable: true,
    },
    {
      field: 'hobby',
      headerName: 'Hobby',
      width: 100,
      editable: true,
    },
    {
      field: 'nivel',
      headerName: 'Nível',
      width: 100,
      editable: true,
      renderCell: (params) => {
        return <div className="rowitem">{params.row.nivel.nivel}</div>;
      },
    },
    {
      field: 'editar',
      headerName: 'Editar',
      width: 100,
      renderCell: renderEditButton,
      disableClickEventBubbling: true,
    },
    {
      field: 'deletar',
      headerName: 'Deletar',
      width: 100,
      renderCell: renderDeleteButton,
      disableClickEventBubbling: true,
    },
  ];
  
const Lista = () => {
    const { getDesenvolvedores, getListaDesenvolvedores } = useDesenvolvedor();
    const [desenvolvedores, setDesenvolvedores] = useState([]);
    const [busca, setBusca] = useState('');
    const history = useHistory();


    useEffect(async () => {
      await getDesenvolvedores();
    }, []);
    
    useEffect(() => {
      const desenvolvedoresAtual = getListaDesenvolvedores();
      if (desenvolvedoresAtual.length >= 0) {
        setDesenvolvedores(desenvolvedoresAtual);
      }
  
    }, [getListaDesenvolvedores()]);

    return (
        <Body>
            <div className="row">
              <div className="col-md-5">
                  <TextField 
                    size="small" 
                    label="Busca" 
                    variant="outlined" 
                    fullWidth
                    onChange={e => setBusca(e.target.value)}
                    onKeyPress={(event) => {
                      if (event.key === 'Enter') {
                        getDesenvolvedores(busca);
                      }
                  }}
                  />
              </div>
              <div className="col-md-7">
                <Button 
                variant="contained" 
                color="primary"
                onClick={() => { history.push(`/desenvolvedores/novo/`); }}
                >
                  <AddIcon/>
                  Novo Desenvolvedor(a)
                </Button>
              </div>
            </div>
            <div className="mt-5" style={{ height: 400, width: '100%' }}>
                <DataGrid
                  rows={desenvolvedores}
                  columns={columns}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                  disableSelectionOnClick
                />
            </div>
          </Body>
    ); 
    
}

export default Lista;