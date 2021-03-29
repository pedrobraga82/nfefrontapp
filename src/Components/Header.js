import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import {Link} from 'react-router-dom'; 
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import Typography from '@material-ui/core/Typography';

const username = localStorage.getItem('username');
const token = localStorage.getItem('token');
const role = localStorage.getItem('role');

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));


export default function Header() {

  const classes = useStyles();

    if (role == "ADMIN") {

      return (

            <AppBar position="static">
          
            <Toolbar>

                <Link to={{
                    pathname: "/menuadmin"}}
                    >
                <h5 style={{color:'white'}}>  Página Inicial </h5>
                </Link>
                <Typography variant="h6" className={classes.title}>
            
            </Typography>
                <Link to={{
                    pathname: "/"}}
                    >
                  
                  <Button color="inherit">Sair</Button>



                </Link>
                </Toolbar>
  
            </AppBar>
          )

    }
    else {

      return (

        <AppBar position="static">
          
        <Toolbar>

            <Link to={{
                    pathname: "/menuuser"}}
                    >
            <h5 style={{color:'white'}}>  Página Inicial </h5>
            </Link>
            <br></br>
            <Typography variant="h6" className={classes.title}>
            
          </Typography>
            <Link to={{
                    pathname: "/"}}
                    >
                  <Button color="inherit">Sair</Button>
                </Link>
        </Toolbar>
        </AppBar>


      )

    }

  

}


const styles= {
  texto :{

      color:'white'

  }
  
  
}  
  