import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword} from "firebase/auth";
import { useState } from "react";
import './App.css';
import initializeAuthentication from './Firebase/firebase.initialize';

initializeAuthentication();
const googleProvider = new GoogleAuthProvider();

function App() {
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');

  const auth = getAuth();
//**google signin========================================= */
  const handelGoogleSignIn =()=>{
    signInWithPopup(auth, googleProvider)
    .then(result =>{
      const user = result.user;
      console.log(user);
    })
}
//**registration or submit======================================= */
const handelRegistration=(e)=>{ //***e = event stop auto reload */
  console.log(email,password);
  createUserWithEmailAndPassword(auth, email, password)
  .then(result=>{
    const user = result.user;
    console.log(user);
  })
  e.preventDefault();      //**** stop auto reload */
}
//**handel email change================ */
const handelEmailChange =(e)=>{
  // console.log(e.target.value);
  setEmail(e.target.value);
}

//** handel password ===================== */
const handelPasswrd =(e)=>{
  // console.log(e.target.value);
  setPassword(e.target.value);
}

  
  return (
    <div className="mx-5 m-5">
{/* <h2>Registration form</h2> */}

<form onSubmit={handelRegistration}>  
  <div className="row mb-3">
    <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Email</label>
    <div className="col-sm-10">
      {/* <input onChange={handelEmailChange} type="email" className="form-control"   id="inputEmail3"/>  */}
      <input onBlur={handelEmailChange} type="email" className="form-control" id="inputEmail3"required />
    </div>
  </div>

  <div className="row mb-3">
    <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Password</label>
    <div className="col-sm-10">
      <input onBlur={handelPasswrd} type="password" className="form-control" id="inputPassword3" required/>
    </div>
  </div>
  
  <div className="row mb-3">
    <div className="col-sm-10 offset-sm-2">
      <div className="form-check">
        <input className="form-check-input" type="checkbox" id="gridCheck1"/>
        <label className="form-check-label" htmlFor="gridCheck1">
          Example checkbox
        </label>
      </div>
    </div>
  </div>
  <button type="submit" className="btn btn-primary">Registar</button>
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
