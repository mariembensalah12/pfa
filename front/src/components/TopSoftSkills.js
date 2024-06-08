import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';

const TopSoftSkills = () => {
    const [softSkillsData, setSoftSkillsData] = useState([]);
    const canvasRef = useRef(null); // Use a ref to access the canvas element

    useEffect(() => {
        axios.get('http://localhost:3000/api/OffreEmploi')
            .then(response => {
                const df = response.data;

                df.forEach(job => {
                    if (!job['Soft Skills']) {
                        job['Soft Skills'] = '';
                    }
                });

                const excludedSkills = ['Gestion de projet'];
                const softSkills = df.reduce((acc, job) => {
                    job['Soft Skills'].split(',').forEach(skill => {
                        const trimmedSkill = skill.trim();
                        if (trimmedSkill && !excludedSkills.includes(trimmedSkill)) {
                            acc[trimmedSkill] = (acc[trimmedSkill] || 0) + 1;
                        }
                    });
                    return acc;
                }, {});

                const top10SoftSkills = Object.entries(softSkills)
                    .sort((a, b) => b[1] - a[1])
                    .slice(0, 10);

                setSoftSkillsData(top10SoftSkills);
                afficherGraphiqueBar(top10SoftSkills);
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des données:', error);
            });
    }, []);

    const afficherGraphiqueBar = (donnees) => {
        const ctx = canvasRef.current.getContext('2d'); // Access the canvas element using useRef
        
        // Ensure the canvas element is available
        if (ctx) {
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
                                text: 'Soft Skills'
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
        } else {
            console.error('Canvas element not found');
        }
    };

    return (
        <div style={{ paddingTop: '10px', textAlign: 'center' }}>
            <h4>Top 10 des compétences les plus demandées (Soft Skills)</h4>
            <canvas ref={canvasRef} width="400" height="400"></canvas> {/* Use ref to access the canvas element */}
        </div>
    );
};

export default TopSoftSkills;
