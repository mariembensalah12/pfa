import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';

const TrendingSectors = () => {
    const [domainCounts, setDomainCounts] = useState({});

    useEffect(() => {
        axios.get('http://localhost:3000/api/cv')
            .then(response => {
                const candidats = response.data;
                if (!Array.isArray(candidats)) {
                    throw new Error('Candidate data is not in array format.');
                }
                const domainCounts = {};

                candidats.forEach(candidat => {
                    const domain = candidat.Domaine;
                    if (!domainCounts[domain]) {
                        domainCounts[domain] = 0;
                    }
                    domainCounts[domain]++;
                });

                setDomainCounts(domainCounts);
            })
            .catch(error => {
                console.error('Error retrieving data:', error);
            });
    }, []);

    return (
        <div style={{ paddingTop: '10px', textAlign: 'center' }}>
            <h4>Trending Domains among Candidates</h4>
            <div className="chart-area">
                <Bar
                    data={{
                        labels: Object.keys(domainCounts),
                        datasets: [{
                            label: 'Number of candidates',
                            data: Object.values(domainCounts),
                            backgroundColor: 'rgba(255, 99, 132, 0.6)', // Rose color
                            borderColor: 'rgba(255, 99, 132, 1)', // Rose border color
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

export default TrendingSectors;
