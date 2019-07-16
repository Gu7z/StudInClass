import React, { Component } from 'react';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Op from './operacoes'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
const op = new Op();

class AlertAluno extends Component{
  constructor(props){
    super(props)
    this.state={
      nome: '',
      turma: 0,
      alo: false,
      turmas: []
    }
  }

  salvaDados = () => {
    op.getTurmas()
    .then(
      data => data.data.map(
        turmas => this.setState({turmas: [...this.state.turmas.filter(data => data.id !== turmas.id), turmas]})
      )
    )
  }

  enviaNome = (e) => {
    this.setState({nome: e.target.value})
  }

  enviaTurma = (e) => {
    this.setState({turma: e.target.value})
  }

  novaPessoa = () => {
    const {nome, turma} = this.state
    const pessoa = {'nome': nome, 'turma': turma}
    op.post(pessoa)
    this.setState({nome: '', turma: ''})
  }

  editar = (id) => {
    const {nome, turma} = this.state
    const pessoa = {'nome': nome, 'turma': turma}
    op.put(pessoa, id)
  }

  handleClose = () => {this.setState({alo: false})}
  handleOpen = () => {this.setState({alo: true})}

	render(){
    const {turmas} = this.state
		return(
  		<div>
        <DialogContentText>
          Digite o aluno e a turma
        </DialogContentText>
        <TextField
          id="filled-name"
          label="Nome"
          margin="normal"
          onChange={this.enviaNome}
        />
        <br/>
        <br/>

          <FormControl>
            <InputLabel>Turma</InputLabel>
            <Select
            className="teste"
            open={this.state.alo}
            onClose={this.handleClose}
            onOpen={()=>{this.handleOpen(); this.salvaDados()}}
            value= {this.state.turma}
            onChange={this.enviaTurma}
          >
            {turmas.map(
                data => <MenuItem key={data.id} value={data.nome}>{data.nome}</MenuItem>
            )}
          </Select>
        </FormControl>

        <DialogActions>
          <Button onClick={this.props.handleClose} color="primary">
            Cancela
          </Button>
          <Button onClick={() => {
            if(this.props.bool){
              this.props.handleClose(); this.novaPessoa()
            }else{
              this.props.handleClose(); this.editar(this.props.id)
            }
          }} color="primary">
            Envia
          </Button>
        </DialogActions>
      </div>
		)
	}
}

export default AlertAluno;
