import firebase from "./firebaseConnection";
import { useState, useEffect } from "react";
import './style.css';

function App() {

  //const [titulo, setTitulo] = useState('');
  //const [autor, setAutor] = useState('');
  //const [posts, setPosts] = useState([]);
  //const [idPost, setIdPost] = useState('');
  
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  //const [user, setUser] = useState(false);
  //const [userLogged, setUserLogged] = useState({});

  const [cargo, setCargo] = useState('');
  const [nome, setNome] = useState('');

  const [user, setUser] = useState({});

  /*
  useEffect(()=>{

    async function loadPosts(){

      await firebase.firestore().collection('posts')
      .onSnapshot((doc)=>{
        let meusPosts = [];

        doc.forEach((item) => {
          meusPosts.push({
            id: item.id,
            titulo: item.data().titulo,
            autor: item.data().autor
          })
        });

        setPosts(meusPosts);
      })

    }

    loadPosts();

  }, [])
  */

  /*
  useEffect(() => {

    async function checkLogin(){

      await firebase.auth().onAuthStateChanged((user) => {
        if(user){
          //se tem logado
          setUser(true);
          setUserLogged({
            uid: user.uid,
            email: user.email
          })
        }else{
          //não tem ninguem logado
          setUser(false);
          setUserLogged({});
        }
      })

    }

    checkLogin();

  }, [])
  */

  /*
  async function handleAdd(){

    await firebase.firestore().collection('posts')
    
    //inserindo documento com id manualmente
    
    //.doc('2')
    //.set({
    // titulo: titulo,
    // autor: autor
    //})
    

    
    //inserindo documento com id automatico
    .add({
      titulo: titulo,
      autor: autor
    })

    .then( () => {
      console.log('Dados cadastrados com sucesso');
      setTitulo('');
      setAutor('');
    })
    .catch((error)=>{
      console.log('Gerou algum erro: ' + error);
    })
    

  }
  */

  /*
  async function buscaPost(){

    //await firebase.firestore().collection('posts')

    
    //.doc('hHDFQoqdSHaDlBs6Ur40')
    //.get()

    //.then((snapshot)=>{
    //  setTitulo(snapshot.data().titulo)
    //  setAutor(snapshot.data().autor)
    //})
    //.catch((error)=>{
    //  console.log('Deu algum erro ' + error)
    //})
    

    await firebase.firestore().collection('posts')
    .get()
    .then((snapshot)=>{
      let lista = [];

      snapshot.forEach((doc) => {
        lista.push({
          id: doc.id,
          titulo: doc.data().titulo,
          autor: doc.data().autor
        })
      })

      setPosts(lista);

    })
    .catch(()=>{
      console.log('Deu algum erro');
    })

  }
  */

  /*
  async function editarPost(){
    await firebase.firestore().collection('posts')
    .doc(idPost)
    .update({
      titulo: titulo,
      autor: autor
    })
    .then(()=>{
      console.log('dados atualizados com sucesso');
      setIdPost('');
      setTitulo('');
      setAutor('');
    })
    .catch(()=>{
      console.log('Erro ao atualizar');
    })
  }
  */

  /*
  async function excluirPost(id){
    await firebase.firestore().collection('posts').doc(id)
    .delete()
    .then(()=>{alert('Esse post foi excluído')})
  }
  */

  async function novoUsuario(){
    await firebase.auth().createUserWithEmailAndPassword(email, senha)
    .then(async (value) => {
      
      await firebase.firestore().collection('users')
      .doc(value.user.uid)
      .set({
        nome: nome,
        cargo: cargo,
        status: true
      })
      .then(()=>{
        setNome('');
        setCargo('');
        setEmail('');
        setSenha('');
      })

    })
    .catch((error) => {
      if(error.code === 'auth/weak-password'){
        alert('senha muito fraca')
      }else if(error.code === 'auth/email-already-in-use'){
        alert('email em uso')
      }
    })

  }

  async function logout(){
    await firebase.auth().signOut();
    setUser({});
    setEmail('');
    setSenha('');
  }

  async function login(){
    await firebase.auth().signInWithEmailAndPassword(email, senha)
    .then(async (value) => {
      await firebase.firestore().collection('users')
      .doc(value.user.uid)
      .get()
      .then((snapshot)=>{
        
        setUser({
          nome: snapshot.data().nome,
          cargo: snapshot.data().cargo,
          status: snapshot.data().status,
          email: value.user.email
        });

      })

    })
    .catch((error) => {
      console.log('erro ao logar: ' + error)
    })
  }

  /*
  async function fazerLogin(){
    await firebase.auth().signInWithEmailAndPassword(email, senha)
    .then((value)=>{
      console.log(value.user)
    })
    .catch((error)=>{
      console.log("erro no login: " + error)
    })
  }
  */

  return (
    <div className="App">
    
      <h1>ReactJS + Firebase</h1> <br/>

      {/*user && (
        <div>
          <strong>Seja bem vindo!</strong><br/>
          <span>{userLogged.uid} - {userLogged.email}</span>
          <br/><br/>
        </div>
      )*/}

      <div className="container">

        <label>Nome</label>
        <input type="text" value={nome} onChange={(e) => setNome(e.target.value)}/> <br/>

        <label>Cargo</label>
        <input type="text" value={cargo} onChange={(e) => setCargo(e.target.value)}/> <br/>

        <label>Email</label>
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)}/> <br/>

        <label>Senha</label>
        <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)}/> <br/>

        {/*<button onClick={fazerLogin}>Fazer Login</button>*/}
        <button onClick={login}>Fazer Login</button>
        <button onClick={novoUsuario}>Cadastrar</button>
        <button onClick={logout}>Sair da conta</button><br/>

      </div>

      <hr/><br/><br/>

      { Object.keys(user).length > 0 && (
        <div>
          <strong>Olá, </strong> {user.nome} <br/>
          <strong>Cargo: </strong> {user.cargo} <br/>
          <strong>Email:</strong> {user.email} <br/>
          <strong>Status:</strong> {user.status ? "Ativo" : "Inativo"} <br/>
        </div>
      )}

      {/*<br/><hr/><br/>*/}

      {/*
      <div className="container">

        <h2>Banco de dados:</h2>
        <label>Id:</label>
        <input type="text" value={idPost} onChange={(e) => setIdPost(e.target.value)}/>

        <label>Titulo:</label>
        <textarea type="text" value={titulo} onChange={(e)=>setTitulo(e.target.value)}/>
        
        <label>Autor:</label>
        <textarea type="text" value={autor} onChange={(e)=>setAutor(e.target.value)}/>

        <button onClick={handleAdd}>Cadastrar</button>
        <button onClick={buscaPost}>Buscar Post</button>
        <button onClick={editarPost}>Editar</button><br/>

        <ul>
          {posts.map((post)=>{
            return(
              <li key={post.id}>
                <span>Id: {post.id}</span><br/>
                <span>Titulo: {post.titulo}</span><br/>
                <span>Autor: {post.autor}</span><br/>
                <button onClick={()=> excluirPost(post.id)}>Excluir Post</button><br/><br/>
              </li>
            )
          })}
        </ul>

      </div>
      */}

    </div>
  );
}

export default App;
