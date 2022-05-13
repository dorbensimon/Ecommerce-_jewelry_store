import React, { useState } from 'react'

const Search = ({ history }) => {

    const [keyword, setKeyword] = useState('');

    const searchHandler = (e) => {

        if (keyword.trim()) {
            history.push(`/search/${keyword}`)
        } else {
            history.push('/')
        }
    }


  return (
     <form onSubmit={searchHandler}>
        <div className="input-group">
            <input
                clasname="form-control"
                type="text"
                id="search_field"
                placeholder="Enter Product Name.."
                onChange={(e)=>setKeyword(e.target.value)}/>

            <div className="input-group-append col-xl-2 col-lg-3 col-md-2 col-sm-1 col-1">
                <button id="search_btn" className="btn">
                    <i className="fa fa-search" aria-hidden="true"></i>
                </button>
            </div>
        </div>
     </form>
  );
};

export default Search;
