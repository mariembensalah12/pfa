import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';

const TypeContratRepartition = () => {
    const [typeContratData, setTypeContratData] = useState({});

    useEffect(() => {
        axios.get('http://localhost:3000/api/OffreEmploi')
            .then(response => {
                const df = response.data;

                // Filtrer les offres d'emploi par type de contrat (en excluant "stage" et "non spécifié")
                const filteredJobs = df.filter(job => 
                    job['Type de contrat'].toLowerCase() !== 'stage' && 
                    job['Type de contrat'].toLowerCase() !== 'non spécifié'
                );

                // Compter le nombre d'offres d'emploi par type de contrat après filtration
                const typeContratCounts = filteredJobs.reduce((acc, job) => {
                    const contratType = job['Type de contrat'].toLowerCase(); // Normaliser en minuscules
                    acc[contratType] = (acc[contratType] || 0) + 1;
                    return acc;
                }, {});

                setTypeContratData(typeContratCounts);
                afficherGraphiqueBar(typeContratCounts); // Afficher le graphique avec les données filtrées
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des données:', error);
            });
    }, []);

    const afficherGraphiqueBar = (donnees) => {
        const ctx = document.getElementById('graphique-barre').getContext('2d');
        new Chart(ctx, {
            type: 'bar', // Type de graphique
            data: {
                labels: Object.keys(donnees), // Labels sur l'axe des x
                datasets: [{
                    label: 'Nombre d\'offres d\'emploi par type de contrat', // Légende
                    data: Object.values(donnees), // Données
                    backgroundColor: 'rgba(54, 162, 235, 0.6)', // Couleur de fond des barres
                    borderColor: 'rgba(54, 162, 235, 1)', // Couleur de bordure des barres
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true, // Rendre le graphique responsive
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Nombre d\'offres d\'emploi' // Titre de l'axe des y
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Type de contrat' // Titre de l'axe des x
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false // Désactiver l'affichage de la légende
                    }
                }
            }
        });
    };

    return (
        <div style={{ paddingTop: '10px', textAlign: 'center' }}>
            <h4>Répartition des offres d'emploi par type de contrat</h4>
            <canvas id="graphique-barre" width="400" height="400"></canvas> {/* Canvas pour afficher le graphique */}
        </div>
    );
};

export default TypeContratRepartition;
