import React, { Component } from 'react';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
class Nav extends Component{

	render(){
		return(
  		<div className="teste">
  			<BottomNavigation
          showLabels
        >
          <BottomNavigationAction label="Turma" onClick={() => this.props.turmaAluno(true)}/>
          <BottomNavigationAction label="Aluno" onClick={() => this.props.turmaAluno(false)}/>
        </BottomNavigation>

      </div>
		)
	}
}

export default Nav;
