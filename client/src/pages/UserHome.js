import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import HikesFlipCard from '../components/HikesFlipCard';
import UserContext from '../utils/UserContext';


class UserHome extends Component {

  state = {
    isShowing: "Saved Hikes",
  }

  handleSavedHikes = () => {
    this.setState({
      isShowing: 'Saved Hikes'
    })
  }


  render() {

    const isShowing = this.state.isShowing;
    let showing;
    let header;

    if (isShowing === "Saved Hikes") {
      header = <h2 className='hikes-header text-center mb-4'> {this.context.firstName}'s Saved Hikes</h2>;
      showing = <HikesFlipCard />;
    
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
          }}>Welcome to MyHikes!</h1>
          
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
}
}
UserHome.contextType = UserContext;
export default UserHome;