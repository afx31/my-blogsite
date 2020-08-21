import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import { getLinksFirstPostId } from '../../actions/post';

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const [civicLink, setCivicLink] = useState('');
  const [wagoLink, setWagoLink] = useState('');

  useEffect(() => {
    async function fetchData() {
      setCivicLink(await getLinksFirstPostId('civic'));
      setWagoLink(await getLinksFirstPostId('wago'));
    };
    fetchData();
  }, []);

  const authLinks = (
    <ul className='nav navbar-nav ml-auto'>
      <li className='navbar-item'>
        <Link to='/create-post' className='nav-link'>
          <button className='btn btn-sm btn-success'>
            Create a Post
          </button>
        </Link>
      </li>
      <li className='navbar-item'>
        <Link to='/' className='nav-link'>
          <button className='btn btn-sm btn-primary' onClick={logout}>
            Logout
          </button>
        </Link>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul className='nav navbar-nav ml-auto'>
      <li className='navbar-item'>
        <Link to='/login' className='nav-link'>
          <button className='btn btn-sm btn-success'>Log in</button>
        </Link>
      </li>
      <li className='navbar-item'>
        <Link to='/register' className='nav-link'>
          <button className='btn btn-sm btn-primary'>Sign up</button>
        </Link>
      </li>
    </ul>
  );

  return (
    <>
      {/* <div className='cover-img-container'>
        <img
          src={require('../../img/cover.jpg')}
          className='img-fluid cover-img'
          alt='Responsive'
        />
      </div> */}
      <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
        <button
          className='navbar-toggler'
          type='button'
          data-toggle='collapse'
          data-target='#navbarNav'
          aria-controls='navbarNav'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='navbar-collapse collapse' id='navbarNav'>
          <ul className='nav navbar-nav'>
            <li className='nav-item'>
              <Link to='/' className='nav-link'>
                <i class="fas fa-home"></i>
                {/* Home <span className='sr-only'>(current)</span> */}
              </Link>
            </li>
          </ul>
          <ul className='nav navbar-nav navbar-center'>
            <li>
              <Link to={`/viewpost/civic/${civicLink}`} className='nav-link'>
                Civic
              </Link>
            </li>       
            <li>
              <Link to={`/viewpost/wago/${wagoLink}`} className='nav-link'>
                Wago
              </Link>
            </li>
            <li>
              <Link to={`/viewpost/frogo/${civicLink}`} className='nav-link'>
                Frogo
              </Link>
            </li>
            <li>
              <Link to={`/viewpost/ef9/${civicLink}`} className='nav-link'>
                EF9
              </Link>
            </li>
          </ul>
          {!loading && <>{isAuthenticated ? authLinks : guestLinks}</>}
        </div>
      </nav>
    </>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
