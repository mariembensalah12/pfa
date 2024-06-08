import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';

const TypeContratRepartition = () => {
    const [typeContratData, setTypeContratData] = useState({});

    useEffect(() => {
        axios.get('http://localhost:3000/api/OffreEmploi')
            .then(response => {
                const df = response.data;

                // Filtrer les offres d'emploi par type de contrat
                const filteredJobs = df.filter(job => {
                    const typeContrat = job['Type de contrat'].toLowerCase();
                    return typeContrat !== 'stage' && typeContrat !== 'non spécifié';
                });

                // Compter le nombre d'offres d'emploi par type de contrat après filtration
                const typeContratCounts = filteredJobs.reduce((acc, job) => {
                    let typeContrat = job['Type de contrat'].toLowerCase();

                    // Normaliser les types de contrat
                    if (typeContrat === 'cvp') {
                        typeContrat = 'civp';
                    }

                    acc[typeContrat] = (acc[typeContrat] || 0) + 1;
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
            type: 'bar', // Utiliser un graphique en barres
            data: {
                labels: Object.keys(donnees),
                datasets: [{
                    label: 'Nombre d\'offres d\'emploi par type de contrat',
                    data: Object.values(donnees),
                    backgroundColor: 'rgba(54, 162, 235, 0.6)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                indexAxis: 'y', // Afficher les barres horizontales
                responsive: true,
                scales: {
                    y: {
                        title: {
                            display: true,
                            text: 'Type de contrat'
                        }
                    },
                    x: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Nombre d\'offres d\'emploi'
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
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
