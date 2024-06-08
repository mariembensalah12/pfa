import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';

const TopHardSkills= () => {
    const [hardSkillsData, setHardSkillsData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/api/OffreEmploi') // Assurez-vous de mettre la bonne URL
            .then(response => {
                const df = response.data; // Assurez-vous que votre API renvoie les données dans le format approprié

                // Remplacer les valeurs NaN par une chaîne vide
                df.forEach(job => {
                    if (!job['Hard Skills']) {
                        job['Hard Skills'] = '';
                    }
                });

                // Regrouper les compétences en excluant celles que vous ne considérez pas comme des "Hard Skills"
                const excludedSkills = ['Gestion de projet']; // Ajoutez ici d'autres compétences à exclure si nécessaire
                const hardSkills = df.reduce((acc, job) => {
                    job['Hard Skills'].split(',').forEach(skill => {
                        const trimmedSkill = skill.trim();
                        if (trimmedSkill && !excludedSkills.includes(trimmedSkill)) {
                            acc[trimmedSkill] = (acc[trimmedSkill] || 0) + 1;
                        }
                    });
                    return acc;
                }, {});

                // Trier les compétences par nombre d'occurrences décroissant et sélectionner les 10 premières
                const top10HardSkills = Object.entries(hardSkills)
                    .sort((a, b) => b[1] - a[1])
                    .slice(0, 10);

                setHardSkillsData(top10HardSkills);
                afficherGraphiqueBar(top10HardSkills);
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des données:', error);
            });
    }, []);

    const afficherGraphiqueBar = (donnees) => {
        const ctx = document.getElementById('graphique-bar').getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: donnees.map(skill => skill[0]),
                datasets: [{
                    label: 'Nombre d\'offres d\'emploi',
                    data: donnees.map(skill => skill[1]),
                    backgroundColor: 'rgba(54, 162, 235, 0.6)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Nombre d\'offres d\'emploi'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Compétences'
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
            <h4>Top 10 des compétences les plus demandées (Hard Skills)</h4>
            <canvas id="graphique-bar" width="400" height="400"></canvas>
        </div>
    );
};

export default TopHardSkills;
