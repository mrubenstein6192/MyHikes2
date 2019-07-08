import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import UserContext from '../utils/UserContext';
import { getUserProfile } from "../utils/API";
// import '../assets/css/style.css';
import LoginButton from '../components/LoginButton';


class Home extends Component {

  componentDidMount(props) {
    // read from url bar
    const userId = (this.props.location.search)
      ? this.props.location.search.split("=").pop()
      // if user id not in search bar, use id in userContext
      : (this.context.id)
        ? this.context.id
        : "";

    if (userId) {
      getUserProfile(userId)
        .then(({ data: userData }) => {
          this.context.setLogin(userData);
        });
    } else {
      this.context.setLogout();
    };
  };

  render() {

    // if user is logged in (isLoggedIn is true), redirect to /home
    if (this.context.isLoggedIn) {
      return <Redirect to='/home' />
    };

    return (
      <React.Fragment>
        <div
        className = "jumbotron jumbotron-fluid text-center"
        style = {{
          backgroundImage: 'url(https://www.banfflakelouise.com/sites/default/files/styles/l_1600_12x6/public/hiking_sentinel_pass_jake_dyson_2_horizontal.jpg?itok=jsU6BajR)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '350px'
        }}>
          <h1 className = "display-3"
          style = {{
            fontWeight: 'bold',
            color: 'black',
            marginBottom: '10px'
          }}>Welcome to MyHikes!</h1>
          <LoginButton />
        </div>

        <div className="container"
        style = {{
          color: "black",
          fontSize: "large"
        }}>
        <div className="row">
          <div className="col-12 col-md-8">
            <h2 className="display-4 my-2">Our Mission</h2>
            <p>Designed for all levels of hikers!</p>
            <p>Research hikes you would like to do in the future!</p>
            <p>Keep track of all of your hikes as you complete them!</p>
            <p>Look back with pride on all of the great experiences you've had!</p>
          </div>
          
        <div className = "col-12 col-md-4">
          <div className = "card"
          style = {{
            boxShadow: "2px 6px 10px 2px rgba(0,0,0,0.2)",
            transition: "0.3s"
          }}>
            <div className = "card-header bg-dark text-light text-center">Find Your Next Hikes</div>
            {/* <div className = "card-body">
              <Research />
            </div> */}
          </div>
        </div>
        </div>
        </div>
      </React.Fragment>
    )
  }
};

Home.contextType = UserContext;

export default Home;