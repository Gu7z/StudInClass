import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import AlertAluno from './alertaAluno'
import AlertTurma from './alertaTurma'
import DialogTitle from '@material-ui/core/DialogTitle';
import Nav from './nav'
import DialogContent from '@material-ui/core/DialogContent';

class Alerta extends Component{

  constructor(){
    super()
    this.state={
      escolha: false,
      nomeTurma: ''
    }
  }

  novaTurma = () => {
    console.log(this.state.nomeTurma)
  }

  setTurma = (e) => {
    this.setState({nomeTurma: e.target.value})
  }

  editarTurma = () => {
    console.log(this.state.nomeTurma)
  }

  turmaAluno = (bool) =>{
    if(bool){
      this.setState({escolha: bool})
    }else{
      this.setState({escolha: bool})
    }
  }

  render(){
    const {escolha} = this.state

    if(this.props.bool){
			this.titulo = "Cadastrar"
		}else{
			this.titulo = "Editar"
		}


    return(
      <div>
        {this.props.adcEdt ?
           (
             <Dialog open={this.props.abrir} onClose={this.props.handleClose} aria-labelledby="form-dialog-title">
               <DialogTitle id="form-dialog-title">
                 <Nav turmaAluno={this.turmaAluno}/>
               </DialogTitle>
                 <DialogContent>

                   {escolha ?
                     (
                       <div>
                         <AlertTurma
                          setTurma= {this.setTurma}
                          open = {this.props.open}
                          handleClose={this.props.handleClose}
                          enviaNome={this.props.enviaNome}
                          editar={this.props.editar}
                          id = {this.props.id}
                          bool = {true}
                          novaTurma = {this.novaTurma}
                         />
                       </div>
                     )
                     :
                     (
                       <div>
                         <AlertAluno
                          open = {this.props.open}
                          handleClose={this.props.handleClose}
                          enviaNome={this.props.enviaNome}
                          enviaTurma={this.props.enviaTurma}
                          novaPessoa={this.props.novaPessoa}
                          bool = {true}
                         />
                       </div>
                     )
                   }
                 </DialogContent>
             </Dialog>
           )
           :
           (
             <div>
               <Dialog open={this.props.abrir} onClose={this.props.handleClose} aria-labelledby="form-dialog-title">
                <DialogContent>
                 {this.props.esc===0 &&
                   <AlertAluno
                    open = {this.props.open}
                    handleClose={this.props.handleClose}
                    editar={this.props.editar}
                    id = {this.props.id}
                    bool = {false}
                   />
                 }
                 {this.props.esc===1 &&
                   <AlertTurma
                    setTurma= {this.setTurma}
                    open = {this.props.open}
                    handleClose={this.props.handleClose}
                    enviaNome={this.props.enviaNome}
                    editar={this.props.editar}
                    id = {this.props.id}
                    bool = {false}
                    novaTurma = {this.novaTurma}
                   />
                 }
                 </DialogContent>
               </Dialog>
             </div>
           )
       }

      </div>
    )
  }
}

export default Alerta;
