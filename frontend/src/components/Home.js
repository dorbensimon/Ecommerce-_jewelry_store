import { React, Fragment,useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MetaData from './layout/MetaData';
import { Watch } from  'react-loader-spinner'
import Pagination from 'react-js-pagination'

//Slider for filter price
import 'rc-slider/assets/index.css';
import Slider, { Range } from 'rc-slider';


import { getProducts } from '../actions/productActions';

import Errormessage from '../Errormessage';

//component
import Product from './product/Products';
//image
import APwatch from '../components/layout/APwatch'

const Home = ({ match }) => {
  
  const [currentPage,setcurrentPage]= useState(1)
  const [price,setPrice] = useState([1,1000000])
  const [category,setCategory] = useState('')

  const categories = [
    'Rings',
    'Necklaces',
    'Watches',
    'Bracelets',
  ]

    const dispatch = useDispatch();

    const { loading, products, error, productscount,resPerPage } = useSelector((state) => state.products);

    const keyword = match.params.keyword;

    useEffect(() => {
        dispatch(getProducts(keyword,currentPage,price,category));

 
    }, [dispatch,currentPage,error,keyword,price,category]);

    function setCurrentPageNo(pageNumber){
      setcurrentPage(pageNumber)
      console.log(pageNumber)
  }

    return (
        <Fragment>
        {loading ? (
          <div id="watchicon">
          <Watch
          heigth="100"
          width="100"
          color='#0078d0'
          ariaLabel='loading'
        />
        </div>
      ):error?(
         <Errormessage variant="danger">{error}</Errormessage>
      ) : (
        <Fragment>
          <MetaData title={'Generation Jewelry'} />
          <APwatch/>
          <div className="categorydiv">
          <ul className="categoriesbutton">
                                {categories.map(category=>(
                                  <li className="licategoriesbutton"
                                      key={category}
                                      onClick={()=>setCategory(category)}>
                                        {category}
                                  </li>
                                ))}
                              </ul>
                              </div>
          <h1 id="products_heading"> Lastet Products</h1>
          <div className="container container-fluid">
          <section id="products" className="container mt=5">
            <div className="row">
              {keyword ? (
                  <Fragment>
                    <div className="col-6 col-md-3 mt-5 mb-5">
                        <div className="px-5">
                            <Range
                              marks={{
                                1: `$1`,
                                100000: `$100000`
                              }}
                              min={1}
                              max={100000}
                              defaultValue={[1, 100000]}
                              tipFormatter={value => `$${value}`}
                              tipProps={{
                                placement: "top",
                                visible: true
                              }}
                              value={price}
                              onChange={price => setPrice(price)}
                            />

                            <hr className="my-5"/>
                            <div className="mt-5">
                              <h4 className="mb-3">Categories</h4>
                              <ul className="pl-0">
                                {categories.map(category=>(
                                  <li style={{cursor:'pointer',listStyleType:'none'}}
                                      key={category}
                                      onClick={()=>setCategory(category)}>
                                        {category}
                                  </li>
                                ))}
                              </ul>
                            </div>

                      </div>
                    </div>

                    <div className="col-6 col-md-9">
                        <div className="row">
                          {
                           products && products.map((product) => (<Product key={product._id} product={product} col={4} />))
                          }
                        </div>
                    </div>
                  </Fragment>
              ):(
                products && products.map((product) => (<Product key={product._id} product={product} col={3} />))
              )}


            </div>
          </section>
          {resPerPage <= productscount && (
                     <div className="Pagination" >
                     <Pagination
                          activePage={currentPage}
                          itemsCountPerPage={resPerPage}
                          totalItemsCount={productscount}
                          onChange={setCurrentPageNo}
                          nextPageText={'Next'}
                          prevPageText={'Prev'}
                          firstPageText={'First'}
                          lastPageText={'Last'}
                          itemClass='page-item'
                          linkClass='page-link'
                     />
                 </div>
          )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
