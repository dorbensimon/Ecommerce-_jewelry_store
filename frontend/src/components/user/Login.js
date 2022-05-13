import { React, Fragment,useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Link} from 'react-router-dom';


import { Watch } from  'react-loader-spinner'
import Errormessage from '../../Errormessage';
import MetaData from '../layout/MetaData';


//redux
import { login } from '../../actions/userActions';



const Login = ({ history,location }) => {

    const [email,setEmail]=useState();
    const [password,setpassword]=useState();

    const dispatch = useDispatch();

    const { loading, error, isAuthenticated } = useSelector((state) => state.auth)
    const redirect = location.search ? location.search.split('=')[1] : '/'

    const submitHandler=(e)=>{
        e.preventDefault();
        dispatch(login(email,password))
    }


    useEffect(() => {

        //if we already authenticated dont let me in to the login screen
        if(isAuthenticated){
            history.push(redirect);
        }


    },[dispatch,isAuthenticated,error,history]);


  return (
       <Fragment>
        {loading ? (
            <div id="watchicon">
                <Watch
                    heigth="100"
                    width="100"
                    color='#0078d0'
                    ariaLabel='loading'/>
            </div>
            )
             :(
                 
                     <Fragment>
                            <MetaData title={"Login"} />
                            <div className="row wrapper">
                                <div className="col-10 col-lg-4 mt-5">
                                    <form className="shadow-lg" onSubmit={submitHandler}>
                                        <div className="form-group">
                                            <label className="email-field mb-2">email</label>
                                            <input
                                             type="email"
                                              id="email_field"
                                              className="form-control"
                                              value={email}
                                              onChange={(e)=>setEmail(e.target.value)}/>
                                        </div>
                                        <div className="form-group">
                                            <label className="email-field  mb-2">Password</label>
                                            <input
                                             type="password"
                                              id="password_field"
                                              className="form-control"
                                              value={password}
                                              onChange={(e)=>setpassword(e.target.value)}/>
                                        </div>
                                        <div className="loginandregister">

                                        <Link className="float-right mb-5" to="/password/forgot"> Forgat Password</Link>

                                        <button id="login_button" type="submit" className="Loginbtn btn btn-block py-3 float-right mt-3">
                                            Login
                                        </button>

                                        <Link to="/register" className="float-right mb-5">New User ?</Link>
                                        </div>

                                    </form>

                                </div>

                            </div>

                     </Fragment>
                
             )
        }
        {
          error && <Errormessage variant="danger">{error}</Errormessage>
        }

       </Fragment>
    )
}

export default Login;
