import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
// import UserHome from './pages/UserHome';
// import AddUpdateEntry from './pages/AddUpdateEntry';
import Navbar from './components/Navbar';
import UserContext from './utils/UserContext';
import { deleteHike, getUserProfile, loginCheck } from './utils/API';

// import Swal from 'sweetalert2';

class App extends React.Component {
  
  state = {
    isLoggedIn: false,
    hikes: [],
    id: "",
    firstName: "",
    email: "",
    setLogin: (userData) => {
      this.setState({
        id: userData._id,
        firstName: userData.firstName,
        email: userData.email,
        isLoggedIn: true,
        hikes: userData.hikes
      });
    },
    handleDeleteHike: (hikeId) => {
      deleteHike(hikeId)
        .then(getUserProfile)
        .then(({ data: {hikes} }) => {
          this.setState({hikes});
          
        })
        .catch(err => {
          console.log(err);
        });
    },
    getHikes: () => {
      getUserProfile()
        .then(({data: {hikes}}) => {
          this.setState({hikes})
        })
        .catch(err => {
          console.log(err);
        });
    },
    setLogout: () => {
      this.setState({
        isLoggedIn: false,
      });
    },
    checkLogin: () => {
      loginCheck()
        .then(({data: userInfo}) => {
          console.log(userInfo);
          this.setState({
            isLoggedIn: userInfo.isLoggedIn,
            firstName: userInfo.firstName,
            email: userInfo.email,
            id: userInfo._id
          })
        })
        .catch(err => console.log(err));
    }
  };

  render () {
    return (
      <Router>
        <UserContext.Provider value={this.state}>
        <Navbar />
        
        <div>
          <Switch>
            <Route exact path='/' component={Home}/>
            {/* <Route exact path='/home' component={UserHome} /> */}
            {/* <Route exact path='/add' component={AddUpdateEntry} />
            <Route exact path='/update/:id' component={AddUpdateEntry} /> */}
            
            <Route render={() => 404} />
          </Switch>
        </div>
        
        </UserContext.Provider>
      </Router>
    );
  }
}

export default App;