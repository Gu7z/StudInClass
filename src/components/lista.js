import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import '../App.css';
import edit from '../edit.svg'
import Op from './operacoes'

const op = new Op();


class Lista extends Component{
  constructor(props){
    super(props)
    this.state = {
      pessoas: [],
      turmas: [],
      alunosTurma: [],
      menu1: null,
      menu2: null,
      text: 'Selecionar',
      text2: 'Selecionar Turma',
      second: false
    }
  }

  handleClick = (event) => {
    this.setState({menu1: event.currentTarget})
  }

  handleClick2 = (event) => {
    this.setState({menu2: event.currentTarget})
  }

  handleClose = () => {
    this.setState({menu1: null});
  }

  handleClose2 = () => {
    this.setState({menu2: null});
  }

  componentDidMount(){
  		this.interval = setInterval( ()=> this.salvaDados() , 1000)
	}

  salvaDados = () => {
    op.get()
    .then(
      data => data.data.map(
        pessoa => this.setState({pessoas: [...this.state.pessoas.filter(data => data.id !== pessoa.id), pessoa]})
      )
    )

    op.getTurmas()
    .then(
      data => data.data.map(
        turmas => this.setState({turmas: [...this.state.turmas.filter(data => data.id !== turmas.id), turmas]})
      )
    )

    op.getPessoaFromTurmas(this.state.text2)
    .then(
      data=>
      {
        data.data.map(aluno=>{
          if(aluno.turma == this.state.text2){
            this.setState({alunosTurma: [...this.state.alunosTurma.filter(data => data.id !== aluno.id), aluno]})
          }
        })
      }
    )
  }

  //

  deleta = (id) => {
    this.setState({pessoas: this.state.pessoas.filter(data => data.id !== id)})
    op.delete(id)
  }

  deletaTurma = (id) => {
    this.setState({turmas: this.state.turmas.filter(data => data.id !== id)})
    op.deleteTurma(id)
  }

  mudaTexto = (text) => {
    if(text === 'Turmas'){
      this.setState({text: text, second: true})
    }else{
      this.setState({text: text, second: false})
    }
  }

  mudaTexto2 = (text) => {
    this.setState({text2: text, alunosTurma:[]})
  }

  render(){
    const {second, alunosTurma, turmas, text, text2, menu1, menu2, pessoas} = this.state

    let bool = null;

    if(text === 'Alunos'){
      bool = 0
    }else if (text === 'Turmas' && text2 !== 'Selecionar Turma'){
      bool = 2
    }else if (text === 'Turmas'){
      bool = 1
    }else{
      bool = 3
    }

    return(

      <div>
        <Paper>
          <div className="testin">
            <Button variant="contained" color="primary" aria-controls="simple-menu" aria-haspopup="true" onClick={this.handleClick}>
              {text}
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={menu1}
              keepMounted
              open={Boolean(menu1)}
              onClose={this.handleClose}
            >
              <MenuItem onClick={()=>{this.mudaTexto('Turmas'); this.handleClose()}}>Turmas</MenuItem>
              <MenuItem onClick={()=>{this.mudaTexto('Alunos'); this.handleClose()}}>Alunos</MenuItem>
            </Menu>

            {second === true &&
              (
                <div>
                  <Button variant="contained" color="primary" aria-controls="simple-menu" aria-haspopup="true" onClick={this.handleClick2}>
                  {text2}
                  </Button>
                  <Menu
                    id="simple-menu"
                    anchorEl={menu2}
                    keepMounted
                    open={Boolean(menu2)}
                    onClose={this.handleClose2}
                  >
                  <MenuItem onClick={()=>{this.mudaTexto2('Selecionar Turma'); this.handleClose2()}}>Turmas</MenuItem>
                  {turmas.map(
                      turmas => <MenuItem key={turmas.id} onClick={()=>{this.mudaTexto2(turmas.nome); this.handleClose2()}}>{turmas.nome}</MenuItem>
                    )
                  }
                  </Menu>
                </div>
              )
            }

          </div>

          <Table>
            <TableHead>
              {bool === 0 &&
                (
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell align="right">Nome</TableCell>
                      <TableCell align="right">Turma</TableCell>
                      <TableCell align="right">Editar</TableCell>
                      <TableCell align="right">Remove</TableCell>
                    </TableRow>
                )
              }

              {bool === 1 &&
                (
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell align="right">Nome</TableCell>
                    <TableCell align="right">Editar</TableCell>
                    <TableCell align="right">Remove</TableCell>
                  </TableRow>
                )
              }

              {bool === 2 &&
                (
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell align="right">Nome</TableCell>
                    <TableCell align="right">Editar</TableCell>
                    <TableCell align="right">Remove</TableCell>
                  </TableRow>
                )
              }

            </TableHead>
              {bool === 0 &&
                (
                  <TableBody>
                    {pessoas.map(data => (
                      <TableRow key={data.id}>
                        <TableCell component="th" scope="row">
                          {data.id}
                        </TableCell>
                        <TableCell align="right">{data.nome}</TableCell>
                        <TableCell align="right">{data.turma}</TableCell>
                        <TableCell align="right">
                          <Fab onClick={() => {this.props.handleClickOpen(false, 0); this.props.setaId(data.id)}} color="primary" aria-label="Add">
                            <img className="edit" src={edit} alt="logo" />
                          </Fab>
                        </TableCell>
                        <TableCell align="right">
                        <Button onClick={() => this.deleta(data.id)} variant="contained" color="secondary">
                          Delete
                          <DeleteIcon/>
                        </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                )
              }

              {bool === 1 &&
                <TableBody>
                  {turmas.map(data => (
                    <TableRow key={data.id}>
                      <TableCell component="th" scope="row">
                        {data.id}
                      </TableCell>
                      <TableCell align="right">{data.nome}</TableCell>
                      <TableCell align="right">
                        <Fab onClick={() => {this.props.handleClickOpen(false, 1); this.props.setaId(data.id)}} color="primary" aria-label="Add">
                          <img className="edit" src={edit} alt="logo" />
                        </Fab>
                      </TableCell>
                      <TableCell align="right">
                      <Button onClick={() => this.deletaTurma(data.id)} variant="contained" color="secondary">
                        Delete
                        <DeleteIcon/>
                      </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              }

              {bool === 2 &&
                (
                  <TableBody>
                    {alunosTurma.map(data => (
                      <TableRow key={data.id}>
                        <TableCell component="th" scope="row">
                          {data.id}
                        </TableCell>
                        <TableCell align="right">{data.nome}</TableCell>
                        <TableCell align="right">
                          <Fab onClick={() => {this.props.handleClickOpen(false, 0); this.props.setaId(data.id)}} color="primary" aria-label="Add">
                            <img className="edit" src={edit} alt="logo" />
                          </Fab>
                        </TableCell>
                        <TableCell align="right">
                        <Button onClick={() => this.deleta(data.id)} variant="contained" color="secondary">
                          Delete
                          <DeleteIcon/>
                        </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                )
              }

          </Table>
        </Paper>
      </div>

    )
  }
}

export default Lista;
