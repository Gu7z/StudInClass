import React, { Component } from 'react';
import Lista from './components/lista'
import './App.css';
import Alerta from './components/alert'
import ButAdd from './components/add'
import Login from './components/login'

class App extends Component{

	constructor(props){
		super(props)
		this.state={
			adcEdt: true,
			esc: null,
			abrir: false,
			bAluno: false,
			bTurma: true,
			bool: true,
			id: 0,
			open: false,
			logado: false
		}

		this.open = false
	}

	setaId = (id) => {
		this.setState({id: id})} //lista

	setLogado = (bool) => {
		this.setState({logado: bool})
	}

	handleClickOpen = (bool, esc) => {
    this.setState({
			adcEdt: bool, abrir:true, esc: esc
		})
  }//alerta

  handleClose = () => {
    this.setState({
			abrir:false
		})
  } // lista

	render(){
		const {logado, adcEdt, esc, abrir, bTurma, open, pessoas, bAluno, id} = this.state

		return(
			<div className = "mae">
				<div className="App">



					<Alerta
						esc={esc}
						adcEdt={adcEdt}
						open={open}
						editar={this.editar}
						id={id}
						handleClose={this.handleClose}
						abrir={abrir}
						bAluno={bAluno}
						bTurma= {bTurma}
						enviaNome={this.enviaNome}
						enviaTurma={this.enviaTurma}
						novaPessoa={this.novaPessoa}
					/>
					<Lista open={this.state.open} handleClickOpen={this.handleClickOpen} setaId={this.setaId} pessoas={pessoas}/>

				</div>


				{logado ?
					(
						<ButAdd handleClickOpen={this.handleClickOpen}/>
					)
					:
					(
						<Login setLogado={this.setLogado}/>
					)
				}


			</div>

		)
	}
}

export default App;
