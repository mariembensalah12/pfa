import React from 'react';
import { Link } from 'react-router-dom';

function Homme() {
  return (
    <div className="container mt-5">
  <div className="jumbotron bg-light text-dark" style={{ boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)" }}>
     <h1 className="display-4" style={{ color: "#000" }}>Bienvenue notre site à Rec_Inov</h1>
    <p className="lead" style={{ color: "#000" }}>Explorez et gérez votre site de recrutement digital avec élégance.</p>
        <hr className="my-4" />

        <div className="row">
          {/* Section Candidature */}
          <div className="col-md-6">
            <div className="card h-100 border-0 shadow rounded-lg">
              <div className="card-body d-flex flex-column justify-content-between">
                <h5 className="card-title text-primary">Espace Candidature</h5>
                <Link to="/logincondidat" className="btn btn-primary mt-auto">Accéder</Link>
              </div>
            </div>
          </div>

          {/* Section Entreprise */}
          <div className="col-md-6">
            <div className="card h-100 border-0 shadow rounded-lg">
              <div className="card-body d-flex flex-column justify-content-between">
                <h5 className="card-title text-primary">Espace Entreprise</h5>
                <Link to="/loginEntreprise" className="btn btn-primary mt-auto">Accéder</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homme;
