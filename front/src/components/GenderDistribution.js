import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';

const GenderDistribution = () => {
    const [maleCount, setMaleCount] = useState(0);
    const [femaleCount, setFemaleCount] = useState(0);

    useEffect(() => {
        axios.get('http://localhost:3000/condidatt')
            .then(response => {
                const candidats = response.data.response;
                console.log('Candidats data:', candidats); // Add this line to log the candidats data
                if (Array.isArray(candidats)) {
                    const maleCount = candidats.filter(candidat => candidat.genre.toUpperCase() === 'M').length;
                    const femaleCount = candidats.filter(candidat => candidat.genre.toUpperCase() === 'F').length;
                    setMaleCount(maleCount);
                    setFemaleCount(femaleCount);
                    afficherGraphiquePie(maleCount, femaleCount);
                } else {
                    console.error('Invalid data format:', candidats);
                }
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des données:', error);
            });
    }, []);
    // Empty dependency array ensures this effect runs only once on component mount

    const afficherGraphiquePie = (maleCount, femaleCount) => {
        const ctx = document.getElementById('gender-pie-chart').getContext('2d');
        new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['Hommes', 'Femmes'],
                datasets: [{
                    label: 'Répartition par genre',
                    data: [maleCount, femaleCount],
                    backgroundColor: ['rgba(54, 162, 235, 0.6)', 'rgba(255, 99, 132, 0.6)'],
                    borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)'],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top'
                    },
                    title: {
                        display: true,
                        text: 'Répartition des candidats par genre'
                    }
                }
            }
        });
    };

    return (
        <div style={{ paddingTop: '10px', textAlign: 'center' }}>
            <h4>Répartition des candidats par genre</h4>
            <canvas id="gender-pie-chart" width="400" height="400"></canvas>
        </div>
    );
};

export default GenderDistribution;
