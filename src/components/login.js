import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import Op from './operacoes'
const op = new Op();
class Login extends Component{

  constructor(){
    super()
    this.state = {
      login: '',
      senha: '',
      abrir: false
    };
  }

  handleClose = () => {
    this.setState({abrir: false})
  }

  handleClickOpen = () => {
    this.setState({abrir: true})
  }

  enviaLogin = (event) => {
    this.setState({login: event.target.value})
  }

  enviaSenha = (event) => {
    this.setState({senha: event.target.value})
  }

  logar = () => {
    let login = {'nome': this.state.login, 'senha': this.state.senha}
    op.postLogin(login).then(data => {
      if(data.data.length > 0){
        this.props.setLogado(true)
      }
    })
  }



	render(){
    const {abrir} = this.state
		return(
  		<div className="ButaoLogin">
  			<Button variant="contained" color="primary" onClick={this.handleClickOpen}>
          Login
  			</Button>
        <Dialog open={abrir} onClose={this.handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">
            Login
          </DialogTitle>
          <DialogContent>
            <TextField
              id="filled-name"
              label="Login"
              margin="normal"
              onChange={this.enviaLogin}
            />
            <br/>
            <TextField
              className="login"
              id="filled-senha"
              label="Senha"
              margin="normal"
              type="password"
              onChange={this.enviaSenha}
            />
            <br/>
            <Button onClick={this.handleClose} color="primary">
              Cancela
            </Button>
            <Button onClick={() => {this.logar(); this.handleClose()}} color="primary">
              Login
            </Button>
          </DialogContent>
        </Dialog>
      </div>
		)
	}
}

export default Login;
