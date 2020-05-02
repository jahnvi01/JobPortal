import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Header extends Component {
  
 
  render() {

    return (
        <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-white">
        <Link className="navbar-brand" to="#">JobFinder</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
      
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item active">
              <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="#">Why Us</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="#">Contact</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="#">Services</Link>
            </li>
          </ul>
    
        </div>
      </nav>
      </div>
    );
  }
}
function mapStateToProps(state){

      return {

      }
    }
    function mapDispatchToStates(dispatch){
      return{
  
        logout:()=>{
        
        }
      }
    }

export default connect(mapStateToProps,mapDispatchToStates)(Header);