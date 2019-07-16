import { Component } from 'react';
import axios from 'axios';

class Op extends Component{

  get = async () => {
		let retorno = await axios.get('http://localhost:8080/api/webresources/pessoas')
    return retorno
	}

  getTurmas = async () => {
		let retorno = await axios.get('http://localhost:8080/api/webresources/turmas')
    return retorno
	}

  getPessoaFromTurmas= async (turma) => {
		let retorno = await axios.get('http://localhost:8080/api/webresources/pessoas/turma/'+turma)
    return retorno
	}

  post = (pessoa) => {
    axios.post('http://localhost:8080/api/webresources/pessoas', pessoa)
  }

  postTurma = (turma) => {
    axios.post('http://localhost:8080/api/webresources/turmas', turma)
  }

  postLogin = async (login) => {
    let resposta = await axios.post('http://localhost:8080/api/webresources/users/', login)
    return resposta
  }

  put = (pessoa, id) => {
    axios.put('http://localhost:8080/api/webresources/pessoas/' + id, pessoa)
  }

  putTurma = (turma, id) => {
    axios.put('http://localhost:8080/api/webresources/turmas/' + id, turma)
  }

  delete = (id) => {
    axios.delete('http://localhost:8080/api/webresources/pessoas/' + id)
  }

  deleteTurma = (id) => {
    axios.delete('http://localhost:8080/api/webresources/turmas/' + id)
  }

  render(){
    return null
  }
}

export default Op;
