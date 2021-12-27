import React, {useState, useEffect} from 'react';
import Body from '../../components/Body/Body';
import { DataGrid } from '@material-ui/data-grid';
import { useHistory } from 'react-router-dom';
import Button from "@material-ui/core/Button";
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useNivel } from '../../hooks/Nivel';

const renderEditButton = (params) => {
  const history = useHistory();
  return (
      <strong>
          <IconButton
              variant="contained"
              color="primary"
              style={{ marginLeft: 16 }}
              onClick={() => { history.push(`/niveis/editar/${params.row.id}`); }}
          >
              <EditIcon />
          </IconButton>
      </strong>
  )
}

const renderDeleteButton = (params) => {
  const [open, setOpen] = useState(false);
  const { deleteNivel } = useNivel();

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
                {"Deletar Nível"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Você realmente deseja deletar o nível selecionado?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Não</Button>
                <Button onClick={() =>{
                  deleteNivel(params.row.id)
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
      field: 'nivel',
      headerName: 'Nível',
      width: 200,
      editable: true,
    },
    {
      field: 'desenvolvedor_count',
      headerName: 'Desenvolvedores',
      width: 200,
      editable: true,
    },
    {
      field: 'editar',
      headerName: 'Editar',
      width: 150,
      renderCell: renderEditButton,
      disableClickEventBubbling: true,
    },
    {
      field: 'deletar',
      headerName: 'Deletar',
      width: 150,
      renderCell: renderDeleteButton,
      disableClickEventBubbling: true,
    },
  ];
  
const Lista = () => {
    const { getNiveis, getNiveisList } = useNivel();
    const [niveis, setNiveis] = useState([]);
    const [busca, setBusca] = useState('');
    const history = useHistory();


    useEffect(async () => {
      await getNiveis();
    }, []);
    
    useEffect(() => {
      const niveisAtuais = getNiveisList();
      if (niveisAtuais.length > 0) {
        setNiveis(niveisAtuais);
      }
  
    }, [getNiveisList()]);

    return (
        <Body>
            <div className="row">
              <div className="col-md-6">
                  <TextField 
                    size="small" 
                    label="Busca" 
                    variant="outlined" 
                    fullWidth
                    onChange={e => setBusca(e.target.value)}
                    onKeyPress={(event) => {
                      if (event.key === 'Enter') {
                        getNiveis(busca);
                      }
                  }}
                  />
              </div>
              <div className="col-md-2">
                <Button 
                variant="contained" 
                color="primary"
                onClick={() => { history.push(`/niveis/novo/`); }}
                >
                  <AddIcon/>
                  Novo Nível
                </Button>
              </div>
            </div>
            <div className="mt-5" style={{ height: 400, width: '100%' }}>
                <DataGrid
                  rows={niveis}
                  columns={columns}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                  checkboxSelection
                  disableSelectionOnClick
                />
            </div>
          </Body>
    ); 
    
}

export default Lista;