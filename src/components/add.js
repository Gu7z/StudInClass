import React, { Component } from 'react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

class ButAdd extends Component{

	render(){
		return(
  		<div className="Butao">
  			<Fab color="primary" aria-label="Add"  onClick={() => this.props.handleClickOpen(true)}>
  				<AddIcon />
  			</Fab>
      </div>
		)
	}
}

export default ButAdd;
