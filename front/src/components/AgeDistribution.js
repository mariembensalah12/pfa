import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { differenceInYears } from 'date-fns';

const calculateAge = (dateOfBirth) => {
    const today = new Date();
    return differenceInYears(today, new Date(dateOfBirth));
};

const AgeDistribution = () => {
    const [ageCounts, setAgeCounts] = useState({});

    useEffect(() => {
        axios.get('http://localhost:3000/condidatt')
            .then(response => {
                const candidats = response.data.response; // Extract the array of candidate data
                if (!Array.isArray(candidats)) {
                    throw new Error('Candidate data is not in array format.');
                }
                const ageCounts = {};

                candidats.forEach(candidat => {
                    const age = calculateAge(candidat.dateNais);
                    if (age <= 40) { // Check if the age is less than or equal to 40
                        if (!ageCounts[age]) {
                            ageCounts[age] = 0;
                        }
                        ageCounts[age]++;
                    }
                });

                setAgeCounts(ageCounts);
            })
            .catch(error => {
                console.error('Error retrieving data:', error);
            });
    }, []);

    return (
        <div style={{ paddingTop: '10px', textAlign: 'center' }}>
            <h4>Age Distribution des Candidats </h4>
            <div className="chart-area">
                <Bar
                    data={{
                        labels: Object.keys(ageCounts),
                        datasets: [{
                            label: 'Number of candidates',
                            data: Object.values(ageCounts),
                            backgroundColor: 'rgba(54, 162, 235, 0.6)',
                            borderColor: 'rgba(54, 162, 235, 1)',
                            borderWidth: 1
                        }]
                    }}
                    options={{
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                display: false
                            }
                        }
                    }}
                />
            </div>
        </div>
    );
};

export default AgeDistribution;
