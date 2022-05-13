import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { Watch } from  'react-loader-spinner'
import MetaData from '../layout/MetaData';

const Profile = () => {

    const { user, loading } = useSelector(state => state.auth)

    return (
        <Fragment>
            {loading ? 
            <div id="watchicon">
            <Watch
            heigth="100"
            width="100"
            color='#0078d0'
            ariaLabel='loading'
            />
        </div>: (
                <Fragment>
                    <MetaData title={'Your Profile'} />
                    <div className="row justify-content-around mt-5 user-info">
                        <div className="col-12 col-md-3">
                            <Link to="/me/update" id="edit_profile" className="btn btn-primary btn-block my-5">
                                Edit Profile
                            </Link>
                        </div>

                        <div className="col-12 col-md-5">
                            <h4>Full Name</h4>
                            <p>{user.name}</p>

                            <h4>Email Address</h4>
                            <p>{user.email}</p>

                            <h4>Joined On</h4>
                            <p>{String(user.createdAt).substring(0, 10)}</p>

                            {user.role !== 'admin' && (
                                <Link to="/orders/me" className="btn bg-warning btn-block mr-1 mt-5">
                                    My Orders
                                </Link>
                            )}

                            <Link to="/password/update" className="btn btn-primary btn-block ml-3 mt-5">
                                Change Password
                            </Link>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    )
}

export default Profile
