import React, { useContext, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import UserContext from '../utils/UserContext';
import moment from 'moment';
import { Button, Card, CardGroup, Col } from 'react-bootstrap';
// import '../assets/css/style.css';

function HikesFlipCard() {

  const userContext = useContext(UserContext)

  useEffect(() => {
    userContext.getHikes();
  }, []);

  return (
    <div>
      <CardGroup>
        {
          (userContext.hikes.length > 0)
            ? (userContext.hikes.map((hike) => {
              return (
                <Col xs={10} md={6} lg={4} className='mb-4'>
                  <Card className='hikes-card flip-card' key={userContext.hikes._id}>
                    <div className='flip-card-inner'>
                      <div className='flip-card-front'>
                        <Card.Body className='d-flex justify-content-center align-items-center'>
                          <Card.Title>{moment(hike.created).format('MMM Do, YYYY')}</Card.Title>
                        </Card.Body>
                      </div>
                      <div className='flip-card-back'>
                        <Card.Body className='d-flex flex-column justify-content-center'>
                          <NavLink to={`/update/${hike._id}`} className='sidebar-link mb-3'>
                            <Button
                              block
                              className='edit-button'
                            >
                              <i className='fas fa-edit mr-1'></i> Edit
                          </Button>
                          </NavLink>

                          <Button
                            block
                            variant='danger'
                            onClick={() => userContext.handleDeleteHike(hike._id)}
                          >
                            <i className="fas fa-trash-alt mr-1"></i> Delete
                        </Button>
                        </Card.Body>
                      </div>
                    </div>
                  </Card>
                </Col>
              )
            }))
            : <div style={{ width: '100%' }} className='d-flex justify-content-center'>
              <h4>No hikes to display!</h4>
            </div>
        }
      </CardGroup>
    </div>
  )
}

export default HikesFlipCard;