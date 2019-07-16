import React, { Component } from 'react';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import Op from './operacoes'
const op = new Op();

class AlertTurma extends Component{

  constructor(props){
    super(props)
    this.state={
      nome: '',
    }
  }

  enviaNome = (e) => {
    this.setState({nome: e.target.value})
  }

  novaTurma = () => {
    const {nome} = this.state
    const turma = {'nome': nome}
    op.postTurma(turma)
    this.setState({nome: ''})
  }

  editarTurma = (id) => {
    const {nome} = this.state
    const turma = {'nome': nome}
    op.putTurma(turma, id)
    this.setState({nome: ''})
  }

	render(){
		return(
  		<div>
        <DialogContentText>
          Digite a turma
        </DialogContentText>
        <TextField
          id="filled-name"
          label="Turma"
          margin="normal"
          className="teste"
          onChange={this.enviaNome}
        />
        <DialogActions>
          <Button onClick={this.props.handleClose} color="primary">
            Cancela
          </Button>
          <Button onClick={() => {
            if(this.props.bool){
              this.props.handleClose(); this.novaTurma()
            }else{
              this.props.handleClose(); this.editarTurma(this.props.id)
            }
          }} color="primary">
            Envia
          </Button>
        </DialogActions>
      </div>
		)
	}
}

export default AlertTurma;
