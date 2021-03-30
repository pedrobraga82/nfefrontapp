import React, {useState, useEffect} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Header from '../Header';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useHistory } from "react-router-dom";



export default function UserEdit(user) {

    let history = useHistory();


    const params = useParams();
    const [id,SetId] = useState("");

    const [empresa,SetEmpresa] = useState("");
    const [password,SetPassword] = useState("");
    const [cnpj,SetCnpj] = useState("");
    const [ie,SetIe] = useState("");
    const [endereco,SetEndereco] = useState("");
    const [role,SetRole] = useState("USER");
    const [senhacert,SetSenhaCert] = useState("");
    const [username,SetUsername] = useState("");
//    const [usuario,SetUsuario] = useState(null);
//    let formData = new FormData();

    useEffect(() => {
        
        SetId(params.id)
        let url = `https://nfeview.herokuapp.com/api/getuser/${params.id}`
        axios.get(url, {
            params: {
              ID: params.id
            }
          })
          .then(function (response) {
       


            SetEmpresa(response.data.empresa)
            SetUsername(response.data.username)
            SetCnpj(response.data.cnpj)
            SetEndereco(response.data.endereco)
        //    SetPassword(response.data.password)
            SetRole(response.data.role)
            SetIe(response.data.ie)
            SetSenhaCert(response.data.senhacertificado)

        })
        .catch((err) => {
            alert("Erro ao listar usuários " + err)
        })    
       

        
        return () => {
           // cleanup
        }
    }, [])


    const onChange = (e) => {

        e.preventDefault();

        switch(e.target.name) {

            case "empresa":
                SetEmpresa(e.target.value)
                break;
            case "password":
                SetPassword(e.target.value)
                break;
            case "cnpj":
                SetCnpj(e.target.value)
                break;
            case "ie":
               SetIe(e.target.value)
                  break;              
            case "endereco":
               SetEndereco(e.target.value)
                break;     
            case "senhacert":
                    SetSenhaCert(e.target.value)   
                    break;   
                         
            default:
                break;
        }



    }


    const onClick = (e) => {


         let user = {
            empresa,
            role,
            cnpj,
            password,
            ie,
            endereco,
            username:"admin40",
            senhacertificado: senhacert
        }

        let url =  `https://nfeview.herokuapp.com/api/updateuser/${id}` 
          //+  this.state.username +  '&password=' 
          //+ base64.encode(utf8.encode(this.state.password))    

        
          axios.put(url,user)
           .then((response) => {    

                history.push("https://appnfeview.herokuapp.com/listusers");
            })
            .catch((err) => {

                alert("Erro ao cadastrar usuário " + err)
            }) 




    }

    return (
        <div>
            <Header />

            <React.Fragment>
  
                <Container maxWidth="xs">
                    <Typography variant="h4" style={styles.center}>Cadastro de Usuários</Typography>
                    <form>
                        <TextField variant="outlined" type="text" label="Empresa" fullWidth margin="normal" name="empresa" value={empresa} onChange={onChange}/>

                        <TextField variant="outlined" type="password" label="PASSWORD" fullWidth margin="normal" name="password" value={password} onChange={onChange}/>
                        <TextField variant="outlined" type="text" label="CNPJ" fullWidth margin="normal" name="cnpj" value={cnpj} onChange={onChange}/>
                        <TextField variant="outlined" type="text" label="IE" fullWidth margin="normal" name="ie" value={ie} onChange={onChange}/>
                        <TextField variant="outlined" type="text" label="Endereço" fullWidth margin="normal" name="endereco" value={endereco} onChange={onChange}/>
                        <TextField variant="outlined" type="text" label="Senha Certificado" fullWidth margin="dense" name="senhacert" value={senhacert} onChange={onChange}/>

 
                        <Button variant="contained" color="secondary" onClick={onClick}>Cadastrar</Button>
             
                    </form>
                </Container>
            </React.Fragment>
  
        
        </div>
    )
}


const styles= {
    center :{
        display: 'flex',
        justifyContent: 'center'

    },
    notification: {
        display: 'flex',
        justifyContent: 'center',
        color: '#dc3545'
    }
}
