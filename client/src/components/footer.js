import React, { Component } from 'react';
import { Link,withRouter } from 'react-router-dom';
class Footer extends Component {
  


  render() {

    return (
        <div style={{marginTop:"2%"}}>
    <footer className="page-footer font-small stylish-color-dark pt-4">


<div className="container text-center text-md-left">

  <div className="row">


    <div className="col-md-4 mx-auto">

      
      <h5 className="font-weight-bold text-uppercase mt-3 mb-4">TechHire</h5>
      <p>Explore thousands of jobs and find your perfect match</p>

    </div>

    <hr className="clearfix w-100 d-md-none" />

  
    <div className="col-md-2 mx-auto">

      <h5 className="font-weight-bold text-uppercase mt-3 mb-4">Candidates</h5>

      <ul className="list-unstyled">
      <li>
          <a href="#!">Home</a>
        </li> 
        <li>
          <a href="#!">User SignUp</a>
        </li>
     
             </ul>

    </div>

    <hr className="clearfix w-100 d-md-none" />

    <div className="col-md-2 mx-auto">

      <h5 className="font-weight-bold text-uppercase mt-3 mb-4">Recruiters</h5>

      <ul className="list-unstyled">
      <li>
          <a href="#!">Company SignUp</a>
        </li>
        <li>
          <a href="#!">Interviewer SignUp</a>
        </li>
      
     
      </ul>

    </div>
  

    <hr className="clearfix w-100 d-md-none" />

    <div className="col-md-2 mx-auto">

      <h5 className="font-weight-bold text-uppercase mt-3 mb-4">Company</h5>

      <ul className="list-unstyled">
      <li>
          <a href="#!">Why Us</a>
        </li>
        <li>
          <a href="#!">Contact Us</a>
        </li>
      </ul>

    </div>
  

  </div>


</div>



<hr />

<ul className="list-unstyled list-inline text-center">
  <li className="list-inline-item">
    <a className="btn-floating btn-fb mx-1">
      <i className="fab fa-facebook-f"> </i>
    </a>
  </li>
  <li className="list-inline-item">
    <a className="btn-floating btn-tw mx-1">
      <i className="fab fa-twitter"> </i>
    </a>
  </li>
  <li className="list-inline-item">
    <a className="btn-floating btn-gplus mx-1">
      <i className="fab fa-google-plus-g"> </i>
    </a>
  </li>
  <li className="list-inline-item">
    <a className="btn-floating btn-li mx-1">
      <i className="fab fa-linkedin-in"> </i>
    </a>
  </li>
  <li className="list-inline-item">
    <a className="btn-floating btn-dribbble mx-1">
      <i className="fab fa-dribbble"> </i>
    </a>
  </li>
</ul>
<div class="footer-copyright text-center py-3">© 2020 Copyright:
    <a href="https://mdbootstrap.com/"> TechHire.com</a>
  </div>

</footer>



      </div>
    );
  }
}

export default withRouter(Footer);