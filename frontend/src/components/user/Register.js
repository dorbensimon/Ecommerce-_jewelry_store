import { React, Fragment,useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';


// import Errormessage from '../../Errormessage';
import MetaData from '../layout/MetaData';


//redux
import { Register as RegisterUser } from '../../actions/userActions';



const Register = ({history}) => {

    const [user,setUser]=useState({
        name:'',
        email:"",
        password:"",
    });

    const {name,email,password} =user;

    const dispatch = useDispatch();

    const { loading, error, isAuthenticated } = useSelector((state) => state.auth)

    useEffect(() => {

        //if we already authenticated dont let me in to the login screen
        if(isAuthenticated){
            history.push('/');
        }


    },[dispatch,isAuthenticated,error,history]);

    const submitHandler=(e)=>{
        e.preventDefault();

        const foramData = new FormData();
        foramData.set('name',name);
        foramData.set('email',email);
        foramData.set('password',password);


        dispatch(RegisterUser(foramData))
    }

    const onChange = e => {

            setUser({ ...user, [e.target.name]: e.target.value })
        
    }




  return (
    <Fragment>
        <MetaData title={"Login"} />
        <div className="row wrapper">
            <div className="register col-10 col-lg-5 mt-5">
                <form className="shadow" onSubmit={submitHandler} encType="multipart/form-data">
                    <div className="form-group">
                        <label htmlFor="name_field">Name</label>
                        <input
                                type="name"
                                id="name_field"
                                className="form-control"
                                name='name'
                                value={name}
                                onChange={onChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email_field">Email</label>
                        <input
                                type="email"
                                id="email_field"
                                className="form-control"
                                name='email'
                                value={email}
                                onChange={onChange}
                         />
                    </div>


                    <div className="form-group">
                        <label htmlFor="password_field">password</label>
                        <input 
                                type="password"
                                id="password_field"
                                className="form-control"
                                name='password'
                                value={password}
                                onChange={onChange}
                        />
                    </div>


                    <button 
                    className="Loginbtn btn btn-block py-3 float-right mt-3"
                    id="register_button"
                    type="submit"
                    disabled={loading ? true : false}>
                            Register
                    </button>

                </form>

            </div>

        </div>
    </Fragment>
  
  );
};

export default Register;
