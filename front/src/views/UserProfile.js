import React, { useState, useEffect } from "react";
import axios from 'axios';
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CustomInput,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
} from "reactstrap";
import { useNavigate } from 'react-router-dom';

function UserProfile() {
  const navigate = useNavigate();

  const [condidat, setCondidat] = useState(null);
  const [profile, setProfile] = useState({
    DateNais: '',
    Genre: '',
   
    adresse: '',
    telephone: ''
  });

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      axios.get(`http://localhost:3000/candidat/${userId}`)
        .then(response => {
          setCondidat(response.data);
        })
        .catch(error => {
          console.error('There was an error fetching the profile data!', error);
        });
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const userId = localStorage.getItem('userId');
    axios.post(`http://localhost:3000/profiles`, { ...profile, candidat: userId })
      .then(response => {
        console.log('Profile updated successfully!', response.data);
         navigate(-1);
     

        
      })
      .catch(error => {
        console.error('There was an error updating the profile data!', error);
      });
  };

  if (!condidat) {
    return <div>Loading...</div>;
  }

  return (
    <div className="content">
      <Row className="justify-content-center">
        <Col md="8" className="centered-card">
          <Card>
            <CardHeader>
              <h5 className="title">Edit Profile</h5>
            </CardHeader>
            <CardBody>
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col className="pl-md-1" md="9">
                    <FormGroup>
                      <label>Email address</label>
                      <Input
                        value={condidat.candidat?.email || ''}
                        placeholder="Email"
                        type="email"
                        readOnly
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col className="pr-md-1" md="6">
                    <FormGroup>
                      <label>First Name</label>
                      <Input
                        value={condidat.candidat?.nom || ''}
                        placeholder="First Name"
                        type="text"
                        readOnly
                      />
                    </FormGroup>
                  </Col>
                  <Col className="pl-md-1" md="6">
                    <FormGroup>
                      <label>Last Name</label>
                      <Input
                        value={condidat.candidat?.prenom || ''}
                        placeholder="Last Name"
                        type="text"
                        readOnly
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col className="pr-md-1 mr-4" md="4">
                    <FormGroup>
                      <label>Date Naissance</label>
                      <Input
                        type="date"
                        value={profile.DateNais}
                        onChange={(e) => setProfile({ ...profile, DateNais: e.target.value })}
                      />
                    </FormGroup>
                  </Col>
                  <Col className="pl-md-1" md="4">
                    <FormGroup>
                      <label>Gender</label>
                      <div>
                        <CustomInput
                          type="radio"
                          id="male"
                          name="gender"
                          label="Male"
                          onChange={() => setProfile({ ...profile, Genre: 'Male' })}
                        />
                        <CustomInput
                          type="radio"
                          id="female"
                          name="gender"
                          label="Female"
                          onChange={() => setProfile({ ...profile, Genre: 'Female' })}
                        />
                      </div>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="12">
                    <FormGroup>
                      <label>Address</label>
                      <Input
                        placeholder="Address"
                        type="text"
                        value={profile.adresse}
                        onChange={(e) => setProfile({ ...profile, adresse: e.target.value })}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col className="pr-md-1" md="12">
                    <FormGroup>
                      <label>Telephone</label>
                      <Input
                        placeholder="Telephone"
                        type="text"
                        value={profile.telephone}
                        onChange={(e) => setProfile({ ...profile, telephone: e.target.value })}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="8">
                    {/* Additional content can go here */}
                  </Col>
                </Row>
                <CardFooter>
                  <Button className="btn-fill" color="primary" type="submit">
                    Save
                  </Button>
                </CardFooter>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default UserProfile;
