import { React, Fragment, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getProducts } from '../../actions/productActions';

const Categoies = () => {
  const dispatch = useDispatch();
  const [category,setCategory] = useState('')

  const { AllCategories,loading } = useSelector((state) => state.products);
  console.log(AllCategories);

  useEffect(() => {
    dispatch(getProducts(category));
  }, [dispatch, category]);

  return (
    <div className="row">
      <ul className="pl-0">
        {
            loading ? (
                <h1>loading</h1>
            )
            :(
                AllCategories.map((category) => (
                    <li
                      style={{ cursor: 'pointer', listStyleType: 'none' }}
                      key={category}
                      onClick={() => setCategory(category)}
                    >
                      {category}
                    </li>
                  ))
            )
        }
      </ul>
    </div>
  );
};

export default Categoies;
