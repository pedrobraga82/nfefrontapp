import React,{useEffect} from 'react';
import Header from '../Header';
import axios from 'axios';
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import { useHistory } from 'react-router-dom';

export default function UserList() {
  const { useState } = React;
  const history = useHistory();


/*   const [columns, setColumns] = useState([
    { title: 'id', field: 'id' },
    { title: 'arquivo', field: 'arquivo'},
    { title: 'cnpj', field: 'cnpj' },
    { title: 'endereco', field: 'endereco'},
    { title: 'ie', field: 'ie', width: 130 },
    { title: 'password', field: 'password' },
    { title: 'role', field: 'role'},
    { title: 'salt', field: 'salt'},
    { title: 'token', field: 'token' },
    { title: 'empresa', field: 'empresa' }
    
  ]);
 */
  const [users,SetUsers] = useState("");
//  const [arquivo,SetArquivo] = useState(undefined);


  function EditUser(e) {

      const cnpj = e.target.value;
      const user = users.filter((e) => {
        //alert(ie)  
        return e.cnpj === cnpj
      });

      history.push(`/edituser/${JSON.stringify(user[0].id)}`) 

  } 

  function CadCert(e) {

    e.preventDefault()

    
    const cnpj = e.target.name;
      
    const user = users.filter((e) => {
          
          return e.cnpj === cnpj
        });

        let formData = new FormData();
        formData.append("file",e.target.files[0],cnpj)
        formData.append("id",user[0].id);
    let url =  `https://nfeview.herokuapp.com/api/caduser/file/${user[0].id}`
        fetch(url, { 
            method: 'POST',
            body: formData
          }).then(
              //response => response.json();
              alert('')
              )
          .then(result => console.log('Files successfully uploaded!'))
          .catch(error => console.log('error occurred!')); 
        



  }


   function Dados() {

    {  
       return users.map((result) =>  {

        return(
         <tr>
            <td>{result.username} </td>
            <td>{result.empresa} </td> 
            <td> {result.cnpj} </td> 
            <td> {result.ie}</td> 
            <td>
            <Button variant="secondary" value={result.cnpj} size="sm" onClick={EditUser}>
              Editar
           </Button>
           </td>
{/*           <TextField variant="outlined" type="file" label="Arquivo" 
               margin="dense" name="arquivo" value={arquivo}                        
                 onChange={CadCert}/>  */} 
            <td>
              <input type="file" id ="botao" name={result.cnpj} size="sm"  onChange={CadCert}>
              </input>
              </td>     



           
         </tr> ) 
       

     })

 }



   }

  useEffect(() => {


        let url =  'https://nfeview.herokuapp.com/api/userslist' 

        axios.get(url)
      .then((response) => {    
            let data = response.data;
            let dados = [{}]


          data.forEach(obj => {
            dados.push(obj)
          })

          SetUsers(dados);
            
              })
        .catch((err) => {
            alert("Erro ao listar usuários " + err)
        })  
        


        return () => {
            //cleanup
        }
    }, [])


  return (

    <div style={styles.center}>
      <Header />
      <br></br>
      <br></br>
      <br></br>
      
      <Table striped bordered hover variant="dark" >
      <thead>
        <tr>
          <th>Username</th>
          <th>Empresa</th>
          <th>CNPJ</th>
          <th>IE</th>  
        </tr>
      </thead>
      <tbody>

        {users && Dados()}
     </tbody> 

    </Table>



  </div>


  )
}



const styles= {
  center: {
    //margin: 'auto',
    width: '90%',
    border: '3px solid green',
  //  padding: '10px'
  }
  
  
}
