import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from './header';
class Home extends Component {
  
 
  render() {

    return (
        <div>
        
    <div className="row home">
        <div className="col-md-6 offset-3" style={{alignSelf:"flex-end"}}>
            <h2 style={{color:"white",fontSize:"40px"}}> Choose Your Role</h2>
        </div>
        <div className="col-md-3"></div>
        
    <div className="col-md-6 offset-3">
    <Link to='/user-signup'><button type="button" className="btn btn-light home-btn">Candidate</button></Link>

    <Link to='/company-signup'><button type="button" className="btn btn-light home-btn">Company</button></Link>

    <Link to='/interviewer-signup'> <button type="button" className="btn btn-light home-btn">Interviewer</button></Link>
    </div>
    <div className="col-md-3"></div>
    </div>



      </div>
    );
  }
}

export default (Home);