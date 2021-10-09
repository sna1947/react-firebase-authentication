import { registerVersion } from "@firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword,signInWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail,updateProfile    } from "firebase/auth";
import { useState } from "react";
import './App.css';
import initializeAuthentication from './Firebase/firebase.initialize';

initializeAuthentication();
const googleProvider = new GoogleAuthProvider();
//**function App() section ==================================== */
function App() {
  const [name,setName] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [error, setError]=useState('');
const [isLogin, setIslogin] = useState(false);

  const auth = getAuth();
//**google signin============================================== */
  const handelGoogleSignIn =()=>{
    signInWithPopup(auth, googleProvider)
    .then(result =>{
      const user = result.user;
      console.log(user);
    })
}
//**registration or submit======================================= */
//**set password validation *****************/
//**set Regular expression ******************/
//**set catch*******************************/
  const handelRegistration = (e) => { //***e = event stop auto reload */
    e.preventDefault();      //**** stop auto reload */
    console.log(email, password);

    if (password.length < 6) {
      setError('pls write minimum 6 cheractar');
      return;
    }
    if (!/(?=.*[A-Z].*[A-Z])/.test(password)) {
      setError('must be two uppercase')
      return;
    }

    // isLogin ? processLoging(email, password) : registerNewUser(email, password); *****or 

    if (isLogin) {
      processLoging(email, password)
    } else {
      registerNewUser(email, password);
    }

  }
//** login user =============================================== */
  const processLoging = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then(result => {
        const user = result.user;
        console.log(user);
        setError('');
      })
      .catch(error=>{
        setError(error.message);
      })
  }
//**registration new user =========================================== */
  const registerNewUser = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(result => {
        const user = result.user;
        console.log(user);
        setError('');
        verrifyEmail();   //***** call for email verryfication */
        updateName();
      })
      .catch(error => {
        setError(error.message);
      });
  }
 //** handel name cange ========================================*/
  const handelNameChange=(e)=>{
    setName(e.target.value);
  }

  //**handel email change======================================== */
  const handelEmailChange = (e) => {
    // console.log(e.target.value);
    setEmail(e.target.value);
  }

  //** handel password ============================================ */
  const handelPassword = (e) => {
    // console.log(e.target.value);
    setPassword(e.target.value);
  }
  //**toggle loging================================================== */
  const toggleLogin = (e) => {
    // console.log(e.target.checked);
    setIslogin(e.target.checked);
  }
//**connect to firebase verrifyEmail ************/
  const verrifyEmail=()=>{
    sendEmailVerification(auth.currentUser)
  .then(result =>{
    console.log(result);
  })
  };
//**connect to firebase handelResetPassword ************/
  const handelResetPassword=()=>{
    sendPasswordResetEmail(auth,email)
    .then(result=>{})
  };
  //**connect to firebase handelNameChange ************/
  const updateName =()=>{
    updateProfile(auth.currentUser, {displayName: name })
      .then(result=>{ })
  }
  
  return (
    <div className="mx-5 m-5">
<h2>Plese {isLogin ? 'Loging': 'Register'}</h2>

<form onSubmit={handelRegistration}>  

{ !isLogin && <div className="row mb-3">
    <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Name</label>
    <div className="col-sm-10">
      <input onBlur={handelNameChange} type="name" className="form-control" id="inputEmail3" placeholder='type your name' required  />
    </div>
  </div>}



  <div className="row mb-3">
    <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Email</label>
    <div className="col-sm-10">
      {/* <input onChange={handelEmailChange} type="email" className="form-control"   id="inputEmail3"/>  */}
      <input onBlur={handelEmailChange} type="email" className="form-control" id="inputEmail3" placeholder='type your email' required />
    </div>
  </div>
   
  <div className="row mb-3">
    <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Password</label>
    <div className="col-sm-10">
      <input onBlur={handelPassword} type="password" className="form-control" id="inputPassword3" placeholder='type your password' required/>
    </div>
  </div>
  
  <div className="row mb-3">
    <div className="col-sm-10 offset-sm-2">
      <div className="form-check">
        <input onChange={toggleLogin} className="form-check-input" type="checkbox" id="gridCheck1"/>
        <label className="form-check-label" htmlFor="gridCheck1">
          Already Registered ?
        </label>
        <div className="row mb-3 text-danger"> {error} </div>
      </div>
    </div>
  </div>
  <button type="submit" className="btn btn-primary">{isLogin ? 'Login' : 'Registar'}</button> <button onClick={handelResetPassword} type="button" className="btn btn-success">Password Reset</button>
</form>




{/* <form onSubmit={handelRegistration}> 
  <label htmlhtmlFor="email">Email: </label>
  <input type="text" name='email'placeholder='enter your email' />
  <br />
  <br />
  <label htmlhtmlFor="password">password: </label>
  <input type="password" name='password' placeholder='password' />
  <br />
  <input type="submit" value="Registar" />
</form> */}


<div>===========================================================</div>
      <button onClick={handelGoogleSignIn}>gogle sign in</button>
    </div>
  );
}

export default App;
