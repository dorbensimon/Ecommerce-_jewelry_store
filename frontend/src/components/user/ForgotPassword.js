import React, { Fragment, useState, useEffect } from 'react'

import MetaData from '../layout/MetaData'
import { Watch } from  'react-loader-spinner'
import Errormessage from '../../Errormessage';

import { useDispatch, useSelector } from 'react-redux'
import { forgotPassword } from '../../actions/userActions'

const ForgotPassword = () => {

    const [email, setEmail] = useState('')


    const dispatch = useDispatch();

    const { error, loading, message } = useSelector(state => state.forgotPassword)

    useEffect(() => {

    }, [dispatch, error, message])

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('email', email);

        dispatch(forgotPassword(formData))
    }

    return (
        <Fragment>
            <MetaData title={'Forgot Password'} />
            {
                loading ? <div id="watchicon">
                <Watch
                heigth="100"
                width="100"
                color='#0078d0'
                ariaLabel='loading'
              />
              </div>: (
                              <div className="row wrapper">
                              <div className="col-10 col-lg-5">
                                  <form className="shadow-lg" onSubmit={submitHandler}>
                                      <h4 className="mb-3">Forgot Password</h4>
                                      <div className="form-group">
                                          <label htmlFor="email_field">Enter Email</label>
                                          <input
                                              type="email"
                                              id="email_field"
                                              className="form-control"
                                              value={email}
                                              onChange={(e) => setEmail(e.target.value)}
                                          />
                                      </div>
              
                                      <button
                                          id="forgot_password_button"
                                          type="submit"
                                          className="btn update-btn btn-block mt-2 mb-1"
                                          disabled={loading ? true : false} >
                                          Send Email
                                  </button>
              
                                  </form>
                              </div>
                          </div>  
              )
            }


            {
          error && <Errormessage variant="danger">{error}</Errormessage>
        }

        </Fragment>
    )
}

export default ForgotPassword
