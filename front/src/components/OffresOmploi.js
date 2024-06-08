import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';

const OffresEmploi = () => {
    const [offresParLocalisationTunisie, setOffresParLocalisationTunisie] = useState({});
    const [offresParLocalisationHorsTunisie, setOffresParLocalisationHorsTunisie] = useState({});
    const [afficherTunisie, setAfficherTunisie] = useState(true);
    const chartRef = useRef(null);

    useEffect(() => {
        axios.get('http://localhost:3000/api/OffreEmploi')
            .then(response => {
                const offres = response.data;
                const offresParLocalisationTunisie = {};
                const offresParLocalisationHorsTunisie = {};

                const regionsTunisieMap = {
                    'tunis': 'Tunis',
                    'technopole tunis': 'Tunis',
                    'Technopole': 'Tunis',
                    'Charguia':'Tunis',
                    'ariana': 'Ariana',
                    'borj louzir ariana': 'Ariana',
                    'Borj Louzir': 'Borj Louzir', // Modifier ici pour Borj Louzir
                    'ben arous': 'Ben Arous',
                    'ben arrous': 'Ben Arous',
                    'sousse': 'Sousse',
                    'sfax': 'Sfax',
                    'gabes': 'Gabes',
                    'bizerte': 'Bizerte',
                    'nabeul': 'Nabeul',
                    'monastir': 'Monastir',
                    'kairouan': 'Kairouan',
                    'gafsa': 'Gafsa',
                    'kasserine': 'Kasserine',
                    'médenine': 'Médenine',
                    'medenine': 'Médenine',
                    'tataouine': 'Tataouine',
                    'kebili': 'Kebili',
                    'tozeur': 'Tozeur',
                    'siliana': 'Siliana',
                    'zaghouan': 'Zaghouan',
                    'beja': 'Beja',
                    'béja': 'Beja',
                    'jendouba': 'Jendouba',
                    'kef': 'Kef',
                    'mahdia': 'Mahdia',
                    'manouba': 'Manouba'
                };
                

                const normaliserLocalisation = (localisation) => {
                    const localisationLowerCase = localisation.toLowerCase();
                    return regionsTunisieMap[localisationLowerCase] || localisation;
                };

                offres.forEach(offre => {
                    let localisation = normaliserLocalisation(offre['Localisation']);

                    if (Object.values(regionsTunisieMap).includes(localisation)) {
                        if (!offresParLocalisationTunisie[localisation]) {
                            offresParLocalisationTunisie[localisation] = 0;
                        }
                        offresParLocalisationTunisie[localisation]++;
                    } else {
                        if (!offresParLocalisationHorsTunisie[localisation]) {
                            offresParLocalisationHorsTunisie[localisation] = 0;
                        }
                        offresParLocalisationHorsTunisie[localisation]++;
                    }
                });

                // Exclure Borj Louzir, Technopole et Charguia de offresParLocalisationHorsTunisie
                delete offresParLocalisationHorsTunisie['Borj Louzir'];
                delete offresParLocalisationHorsTunisie['Technopole'];
                delete offresParLocalisationHorsTunisie['Charguia'];

                // Ajouter Borj Louzir, Technopole et Charguia à offresParLocalisationTunisie
                offresParLocalisationTunisie['Borj Louzir'] = offresParLocalisationHorsTunisie['Borj Louzir'] || 0;
                offresParLocalisationTunisie['Technopole'] = offresParLocalisationHorsTunisie['Technopole'] || 0;
                offresParLocalisationTunisie['Charguia'] = offresParLocalisationHorsTunisie['Charguia'] || 0;

                // Supprimer Borj Louzir, Technopole et Charguia de offresParLocalisationHorsTunisie
                delete offresParLocalisationHorsTunisie['Borj Louzir'];
                delete offresParLocalisationHorsTunisie['Technopole'];
                delete offresParLocalisationHorsTunisie['Charguia'];

                setOffresParLocalisationTunisie(offresParLocalisationTunisie);
                setOffresParLocalisationHorsTunisie(offresParLocalisationHorsTunisie);
                afficherGraphiqueCirculaire(offresParLocalisationTunisie);
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des offres d\'emploi:', error);
            });
    }, []);

    // Function to generate an array of visually appealing random colors
    const generateRandomColors = (numColors) => {
        const colors = [];
        const hueIncrement = 360 / numColors; // Calculate the increment for hue
        let hue = 0;

        for (let i = 0; i < numColors; i++) {
            // Generate random saturation (40-100) and lightness (40-60)
            const saturation = Math.floor(Math.random() * 61) + 40;
            const lightness = Math.floor(Math.random() * 21) + 40;
            const color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
            colors.push(color);

            hue += hueIncrement; // Increment the hue for the next color
        }
        return colors;
    };

    const afficherGraphiqueCirculaire = (donnees) => {
        const ctx = document.getElementById('graphique-circulaire').getContext('2d');

        // Destroy the previous chart instance if it exists
        if (chartRef.current) {
            chartRef.current.destroy();
        }

        // Generate random colors ensuring they are visually appealing and distinct
        const colors = generateRandomColors(Object.keys(donnees).length);

        chartRef.current = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: Object.keys(donnees),
                datasets: [{
                    label: 'Répartition des offres d\'emploi par localisation',
                    data: Object.values(donnees),
                    backgroundColor: colors,
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'right'
                    }
                },
                animation: {
                    animateRotate: true,
                    animateScale: true
                },
                tooltips: {
                    callbacks: {
                        label: function(tooltipItem, data) {
                            const dataset = data.datasets[tooltipItem.datasetIndex];
                            const total = dataset.data.reduce((acc, val) => acc + val, 0);
                            const currentValue = dataset.data[tooltipItem.index];
                            const percentage = parseFloat(((currentValue / total) * 100).toFixed(1));
                            return `${data.labels[tooltipItem.index]}: ${currentValue} (${percentage}%)`;
                        }
                    }
                }
            }
        });
    };

    const handleToggleGraphique = () => {
        setAfficherTunisie(!afficherTunisie);
        if (afficherTunisie) {
            afficherGraphiqueCirculaire(offresParLocalisationHorsTunisie);
        } else {
            afficherGraphiqueCirculaire(offresParLocalisationTunisie);
        }
    };

    return (
        <div style={{ paddingTop: '10px', textAlign: 'center' }}>
            <h4>Répartition des offres d'emploi par localisation</h4>
            <canvas id="graphique-circulaire" width="400" height="400"></canvas>
            <button onClick={handleToggleGraphique} style={{ marginTop: '20px' }}>
                {afficherTunisie ? 'Afficher les offres dans les autres pays' : 'Afficher les offres en Tunisie'}
            </button>
        </div>
    );
};

export default OffresEmploi;
