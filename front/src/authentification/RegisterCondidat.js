import React, { useState } from 'react';
import { MDBContainer, MDBCol, MDBRow, MDBBtn, MDBInput } from 'mdb-react-ui-kit';
import './loginform.css';
import { useNavigate } from 'react-router-dom';

export default function RegisterCondidat() {
    const [formData, setFormData] = useState({
        email: '',
        nom: '',
        prenom: '',
        mdp: ''
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Vérifier si tous les champs sont remplis
        if (!formData.email || !formData.nom || !formData.prenom || !formData.mdp) {
            alert('Please fill in all fields');
            return; // Arrêter la soumission du formulaire
        }
    
        fetch('http://localhost:3000/candidat/store', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.message === 'Candidat Added Successfully!') {
                alert('Registration successful!');
                navigate('/logincondidat'); // Navigate to login page
            } else {
                alert('An error occurred: ' + data.message);
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
                        <p className="lead fw-normal mb-0 me-3" style={{ position: 'relative', top: '-30px' }}><h1>Register</h1></p>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <MDBInput wrapperClass='mb-4' label='Email address' id='formControlLg' name='email' type='email' size="lg" labelStyle={{ color: '#FFFFFF' }}  style={{ borderColor: '#FFFFFF' }} onChange={handleChange} />
                        <MDBInput wrapperClass='mb-4' label='Nom' id='formControlLg' name='nom' type='text' size="lg" labelStyle={{ color: '#FFFFFF' }}  style={{ borderColor: '#FFFFFF' }} onChange={handleChange} />
                        <MDBInput wrapperClass='mb-4' label='Prenom' id='formControlLg' name='prenom' type='text' size="lg" labelStyle={{ color: '#FFFFFF' }}  style={{ borderColor: '#FFFFFF' }} onChange={handleChange} />
                        <MDBInput wrapperClass='mb-4' label='Password' id='formControlLg' name='mdp' type='password' size="lg" labelStyle={{ color: '#FFFFFF' }}  style={{ borderColor: '#FFFFFF' }} onChange={handleChange} />
                        <div className='text-center text-md-start mt-4 pt-2'>
                            <MDBBtn  className="mb-0 px-5" size='lg' type='submit'>Register</MDBBtn>
                        </div>
                    </form>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
}
