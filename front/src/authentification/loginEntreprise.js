import React, { useState } from 'react';
import { MDBContainer, MDBCol, MDBRow, MDBBtn, MDBInput, MDBCheckbox } from 'mdb-react-ui-kit';
import './loginform.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


export default function LoginEntreprise({ setIsLoggedInE }) {
    const [email, setEmail] = useState('');
    const [mdp, setPassword] = useState('');
    const navigate = useNavigate();

    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch('http://localhost:3000/loginEntreprise', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, mdp })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                setIsLoggedInE(true); // Mise à jour de l'état isLoggedIn

                navigate('/admin/dashboard'); // Navigate to home page
            } else {
                alert('Invalid credentials');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    return (
     
        <MDBContainer fluid className="p-3 my-5 h-custom">
            <MDBRow>
                <MDBCol col='10' md='6'>
                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" className="img-fluid" alt="Sample image" />
                </MDBCol>
                <MDBCol col='4' md='6'>
                    <div className="d-flex flex-row align-items-center justify-content-center">
                        <p className="lead fw-normal mb-0 me-3" style={{ position: 'relative', top: '-30px' }}><h1>Log in</h1></p>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <MDBInput wrapperClass='mb-4' label='Email address' id='formControlLg' type='email' size="lg" labelStyle={{ color: '#FFFFFF' }}   style={{ borderColor: '#FFFFFF' }}  onChange={handleEmailChange} />
                        <MDBInput wrapperClass='mb-4' label='Password' id='formControlLg' type='password' size="lg"labelStyle={{ color: '#FFFFFF' }}  style={{ borderColor: '#FFFFFF' }} onChange={handlePasswordChange} />
                        <div className="d-flex justify-content-between mb-4">
                            <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
                            <a href="#!">Forgot password?</a>
                        </div>
                        <div className='text-center text-md-start mt-4 pt-2'>
                            <MDBBtn className="mb-0 px-5" size='lg' type='submit'>Login</MDBBtn>
                            <p className="small fw-bold mt-2 pt-1 mb-2">Don't have an account? <Link to="/registerentreprise" className="link-danger">Register</Link></p>
                        </div>
                    </form>
                </MDBCol>
            </MDBRow>
        </MDBContainer>

        
    );
}
