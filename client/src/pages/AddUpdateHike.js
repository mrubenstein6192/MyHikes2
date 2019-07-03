import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { getHikeById, createHike, updateHike } from '../utils/API';
import { Col, Form, Button } from 'react-bootstrap';
import questionsJSON from '../questionsJSON';
// import '../assets/css/style.css';
// import Swal from 'sweetalert2';


class AddUpdateHike extends Component {

  state = {
    id: '',
    count: 0,
    name: '',
    location: '',
    date: '',
    distance: '',
    time: '',
    difficulty: '',
    dogs: '',
    experience: '',
    hikeSaved: false,
  }

  componentDidMount() {
    // if an id was passed in url get entry info back
    if (this.props.match.params.id) {
      // extract entryId from url param
      const hikeId = this.props.match.params.id

      getHikeById(hikeId)
        .then(({ data: hikeData }) => {
          this.setState({
            id: hikeData._id,
            name: hikeData.name,
            location: hikeData.location,
            date: hikeData.date,
            distance: hikeData.distance,
            time: hikeData.time,
            difficulty: hikeData.difficulty,
            dogs: hikeData.dogs,
            experience: hikeData.experience
          })
        })
        .catch(err => console.log(err));
    };
  };

  handleCreateHike = (hikeInfo) => {
    createHike(hikeInfo)
      .then(() => {

        this.setState({
          hikeSaved: true
        });
      })
      .catch(err => console.log(err));
  };

  handleUpdateHike = (hikeId, hikeInfo) => {
    updateHike(hikeId, hikeInfo)
      .then(() => {

        this.setState({
          hikeSaved: true
        });
      })
      .catch(err => console.log(err));
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });
  };

  handleRadioInputChange = (event) => {
    let { name, value } = event.target;

    if (value === "true") {
      value = true;
    } else {
      value = false;
    }

    this.setState({
      [name]: value
    });
  };

  setNextQuestion = () => {
    const count = this.state.count + 1;
    this.setState({
      count: count,
    });
  }

  setPreviousQuestion = () => {
    const count = this.state.count + 1;
    this.setState({
      count: count,
    })
  }

  handleFormSubmit = (event) => {
    event.preventDefault();

    // if entry id is present (updating an entry), run update method
    // else run the create method
    if (this.state.id) {
      this.handleUpdateHike(this.state.id, {
        name: this.state.name,
        location: this.state.location,
        date: this.state.date,
        distance: this.state.distance,
        time: this.state.time,
        difficulty: this.state.difficulty,
        dogs: this.state.dogs,
        experience: this.state.experience
      });
    } else {
      this.handleCreateHike({
        name: this.state.name,
        location: this.state.location,
        date: this.state.date,
        distance: this.state.distance,
        time: this.state.time,
        difficulty: this.state.difficulty,
        dogs: this.state.dogs,
        experience: this.state.experience
      });
    };

  };

  render() {
    // if entry has been saved, redirect to /home
    if (this.state.hikeSaved) {
      return <Redirect to='/home' />
    };

    const count = this.state.count;
    const question = questionsJSON[count];
    let button1;
    let button2;

    if (count > 0 && count < questionsJSON.length - 1) {
      button1 =
        <Button className='form-button' onClick={this.setPreviousQuestion}><i class="fas fa-angle-left mr-1"></i> Prev</Button>
    };

    if (count < questionsJSON.length - 1) {
      button2 = <Button className='ml-auto form-button' onClick={this.setNextQuestion}>Next <i className="fas fa-angle-right ml-1"></i></Button>
    } else {
      button2 = <Button block variant="danger" onClick={this.handleFormSubmit}>Submit</Button>
    }

    return (
      <React.Fragment>
        <div className='wrapper pt-5'>
          <Col md={{ span: 8, offset: 2 }} lg={{ span: 6, offset: 3 }}>
            <h2 className='add-update-header text-center mb-4'>{(this.state.id) ? "Update A Hike!" : "Add a new hike!"}</h2>
            <Form>
              <Form.Group>
                <Form.Label>{question.question}</Form.Label>
                <div className='mb-3'>
                  <Form.Check
                    type='checkbox'
                    key={`${question.id}-yes`}
                    label='Yes'
                    value='true'
                    name={question.name}
                    onChange={this.handleRadioInputChange}
                    checked={this.state[question.name]}
                    inline
                  />
                  <Form.Check
                    type='checkbox'
                    key={`${question.id}-no`}
                    label='No'
                    value='false'
                    name={question.name}
                    onChange={this.handleRadioInputChange}
                    checked={!this.state[question.name]}
                    inline
                  />
                </div>
                <Form.Control
                  as='textarea'
                  rows='2'
                  onChange={this.handleInputChange}
                  name={question.note}
                  value={this.state[question.note]}
                  placeholder='Optional Notes'
                  style={{ borderRadius: '50px' }}
                  className='px-4 text-box'
                />
              </Form.Group>
              <div className='d-flex'>
                {button1}
                {button2}
              </div>
            </Form>
          </Col>
        </div>
      </React.Fragment>
    )
  }
}



export default AddUpdateHike;