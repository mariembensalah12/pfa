
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';
// nodejs library that concatenates classes
import classNames from "classnames";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
import 'chartjs-plugin-labels';


// reactstrap components
import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Label,
  FormGroup,
  Input,
  Table,
  Row,
  Col,
  UncontrolledTooltip,
} from "reactstrap";



function Dashboard(props) {
  const [bigChartData, setbigChartData] = React.useState("data1");
  const barChartRef = useRef(null);
  const pieChartRef = useRef(null);
  const EXPChartRef = useRef(null);
  const langueChartRef = useRef(null);
  const skillsChartRef = useRef(null);

  const doughnutChartRef = useRef(null);
  const [data, setData] = useState([]);
  const [formationData, setFormationData] = useState([]);
  const [lieuData, setlieuData] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [aggregatedData, setAggregatedData] = useState([]);
  const [langues, setLangues] = useState([]);
  const [selectedDoma, setSelectedDom] = useState(null);
  const [hardSkills, setHardSkills] = useState([]);
  const [selectedDomain, setSelectedDomain] = useState(null);
  
  const handleDomainClick1 = (domain) => {
    setSelectedDom(domain);
  };
  const handleDomainClick = (domain) => {
    setSelectedDomain(domain);
  };
 


  const setBgChartData = (name) => {
    setbigChartData(name);
  };
  useEffect(() => {
   
    async function fetchData() {
      try {
        const response = await axios.get('http://localhost:3000/nombre_domaines');
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    async function fetchFormationData() {
      try {
        const response = await axios.get('http://localhost:3000/pourcentage_formation');
        setFormationData(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    async function fetchLieu() {
      try {
        const response = await axios.get('http://localhost:3000/lieux');
        setlieuData(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    const fetchExp = async () => {
      try {
        const response = await axios.get('http://localhost:3000/experiences');
        setExperiences(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
      }
    };
    const fetchLangues = async () => {
      try {
        const response = await axios.get('http://localhost:3000/langues');
        setLangues(response.data);
       
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
      }
    };
    const fetchHardSkills = async () => {
      try {
        const response = await axios.get('http://localhost:3000/aggregatedData');
        setHardSkills(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
      }
    };

  
    
    fetchData();
    fetchFormationData();
    fetchLieu();
    fetchExp();
    fetchLangues();
    fetchHardSkills();
    

  }, []);

  useEffect(() => {
    if (barChartRef.current) {
      barChartRef.current.destroy();
    }
    const sortedData = data.sort((a, b) => {
      // Par exemple, pour trier les données par ordre décroissant de count
      return b.count - a.count;
    });

  

    const domaines = sortedData.map(progressbar => progressbar.domaine);
    const counts = sortedData.map(progressbar => progressbar.count);

    // Déplacez la déclaration de ctx avant son utilisation
    const ctx = document.getElementById('barChart').getContext('2d');

    let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);
    gradientStroke.addColorStop(1, "rgba(29,140,248,0.2)");
    gradientStroke.addColorStop(0.4, "rgba(29,140,248,0.0)");
    gradientStroke.addColorStop(0, "rgba(29,140,248,0)");

    barChartRef.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: domaines,
        datasets: [{
          label: 'Répartition des candidats par domaine',
          data: counts,
          backgroundColor: [
            // Bleu clair
        'rgba(54, 162, 235, 0.9)',    // Turquoise
        'rgba(54, 162, 235, 0.8)',   // Bleu violet
        'rgba(54, 162, 235, 0.7)',   // Bleu gris
        'rgba(54, 162, 235, 0.6)',
        'rgba(54, 162, 235, 0.5)' // Bleu clair avec opacité
    ],
              borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 2
        }]
      },
      options: {
        indexAxis: 'y',
        plugins: {
          legend: {
            display: false
          }
        }
      }
    });
  }, [data]);
  useEffect(() => {
    if (pieChartRef.current) {
      pieChartRef.current.destroy();
    }
  
    const formations = Object.keys(formationData);
    const percentages = Object.values(formationData);
    const total = percentages.reduce((acc, curr) => acc + curr, 0);
  
    const ctx = document.getElementById('pieChart').getContext('2d');
  
    pieChartRef.current = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: formations,
        datasets: [{
          label: 'Formations bien préférées',
          data: percentages,
          backgroundColor: [
            'rgb(30,144,255)',
            'rgb(0,250,154)',
            '#e0e0e0',
            '#FFA07A',
            '#BA55D3',
            '#DAA520',
          ],
          borderColor: '#1f8ef1',
          borderWidth: 1,
        }],
      },
      options: {
        plugins: {
          labels: {
            render: 'percentage',
            fontColor: '#fff',
            precision: 1,
          },
        },
      },
    });
  }, [formationData]);
  useEffect(() => {
    if (doughnutChartRef.current) {
      doughnutChartRef.current.destroy();
    }
  
    const formations = Object.keys(lieuData);
    const percentages = Object.values(lieuData);
    console.log(percentages)
  
    const ctx = document.getElementById('doughnutchart').getContext('2d');
  
    doughnutChartRef.current = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: formations,
        datasets: [{
          label: 'Répartition géographique',
          data: percentages,
          backgroundColor: [
            'rgb(255, 99, 132)',
            '#00FA9A',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            '#D8BFD8',
          ],
          borderColor: '#1f8ef1',
          borderWidth: 1,
        }],
      },
      options: {
        plugins: {
          datalabels: {
            formatter: (value) => {
              return value + '%';
            },
          },}
      },
    });
  }, [lieuData]);
  useEffect(() => {
    if (EXPChartRef.current) {
      EXPChartRef.current.destroy();
    }

    const experienceCounts = experiences.reduce((acc, exp) => {
      acc[exp] = (acc[exp] || 0) + 1;
      return acc;
    }, {});

    const bins = Object.keys(experienceCounts);
    const counts = Object.values(experienceCounts);

    const ctx = document.getElementById('experienceChart').getContext('2d');


    const chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: bins,
        datasets: [{
          label: 'Répartition des années d\'expérience professionnelle',
          data: counts,
          backgroundColor: [
            'rgba(54, 162, 235, 0.6)','rgba(54, 162, 235, 0.7)', 
        'rgba(54, 162, 235, 0.8)',  
         
           
        
    ],          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 2
        }]
      },
      options: {
        scales: {
          x: {
            grid: {
              display: false
            }
          },
          y: {
            grid: {
              borderDash: [3, 3],
              color: 'rgba(0, 0, 0, 0.7)',
              zeroLineColor: 'rgba(0, 0, 0, 0.7)',
              drawBorder: false
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

    EXPChartRef.current = chart;
  }, [experiences]);
 
  useEffect(() => {
  
    if (langueChartRef.current) {
      langueChartRef.current.destroy();
     
    }
  
    const filteredData = selectedDoma
      ? langues.find((item) => item.Domaine === selectedDoma)
      : langues.length > 0
  ? langues[0]
  : null;
  
    const chartData = filteredData
      ? {
          labels: filteredData.Langue.map((skill) => skill.Langue),
          datasets: [
            {
              label: 'Pourcentage',
              data: filteredData.Langue.map((skill) => skill.percentage),
              backgroundColor: 'rgba(54, 162, 235, 0.6)',
              borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 2
            },
          ],
        }
      : null;
  
    const ctx = document.getElementById('langueChart').getContext('2d');
  
    langueChartRef.current = new Chart(ctx, {
      type: 'bar',
      data: chartData,
      options: {
        scales: {
          x: {
            grid: {
              display: true ,
            },
          },
          y: {
            grid: {
              borderDash: [3, 3],
              color: 'rgba(0, 0, 0, 0.7)',
              zeroLineColor: 'rgba(0, 0, 0, 0.7)',
              drawBorder: false,
            },
            ticks: {
              callback: function(value) {
                return value + '%';
              },
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    });
  }, [langues,selectedDoma]);
  useEffect(() => {
    if (skillsChartRef.current) {
      skillsChartRef.current.destroy();
    }
  
    const filteredData = selectedDomain
      ? hardSkills.find((item) => item.Domaine === selectedDomain)
      : hardSkills.length > 0
  ? hardSkills[0]
      : null;
  
    const chartData = filteredData
      ? {
          labels: filteredData.HardSkills.map((skill) => skill.HardSkills),
          datasets: [
            {
              label: 'Pourcentage',
              data: filteredData.HardSkills.map((skill) => skill.percentage),
              backgroundColor: 'rgba(54, 162, 235, 0.7)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 2
            },
          ],
        }
      : null;
  
    const ctx = document.getElementById('skillsChart').getContext('2d');
  
    skillsChartRef.current = new Chart(ctx, {
      type: 'bar',
      data: chartData,
      options: {
        scales: {
          x: {
            grid: {
              display: false,
            },
          },
          y: {
            grid: {
              borderDash: [3, 3],
              color: 'rgba(0, 0, 0, 0.7)',
              zeroLineColor: 'rgba(0, 0, 0, 0.7)',
              drawBorder: false,
            },
            ticks: {
              callback: function(value) {
                return value + '%';
              },
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    });
    
  }, [hardSkills, selectedDomain]);
  
  
  
  return (
    <>
      <div className="content">
        <Row xs='9'>
          <Col  sm='7'>
            <Card className="card-chart" style={{ minHeight: "560px" }}>
              <CardHeader>
              <CardTitle tag="h2">Tendance Sectorielle </CardTitle>
              </CardHeader>
              <CardBody >
                  
                  <canvas id="barChart" width="300" height="200"></canvas>
                  </CardBody>
                  </Card>
                  </Col>
                  <Col lg='5'>
  <Card className="card-chart" style={{ minHeight: "50px" }}>
    <CardHeader>
      <CardTitle tag="h2">Formations bien préférées</CardTitle>
    </CardHeader>
    <CardBody>
      <canvas id="pieChart" width="200" height="100" style={{ marginBottom: "10px" }} />
    </CardBody>
  </Card>
</Col>

        </Row>
        <Row>
        <Col lg="4">
            <Card className="card-chart" >
              <CardHeader>
              
                <CardTitle tag="h3">
                <CardTitle tag="h2">Répartition géographique</CardTitle>
                </CardTitle>
              </CardHeader>
              <CardBody>
              <canvas id="doughnutchart" width="400" height="300"></canvas>
              </CardBody>
            </Card>
          </Col>

          
          <Col sm="7" >
            <Card className="card-chart" style={{ minWidth: "600px" }} >
              <CardHeader>
                
                <CardTitle tag="h3">
                <CardTitle tag="h2">Répartition des années d'expérience professionnelle</CardTitle>
                </CardTitle>
              </CardHeader>
              <CardBody>
              <canvas id="experienceChart" width="800" height="400"></canvas>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
        
                
          <Col xs='12' >
            <Card className="card-chart" style={{ minWidth: "400px",minHeight:"550px" }} >
              <CardHeader>
                
                <CardTitle tag="h3">
                <CardTitle tag="h2">La répartition des langues des candidats par domaine</CardTitle>
                </CardTitle>
             
             <Col xs="6">
      
        <ButtonGroup >
          {langues.map((domain) => (
            <Button
              key={domain.Domaine}
              color={selectedDoma === domain.Domaine ? "primary" : "secondary"}
              onClick={() => handleDomainClick1(domain.Domaine)}
            >
              {domain.Domaine}
            </Button>
          ))}
        </ButtonGroup>
        </Col>
        </CardHeader>
              <CardBody>
                <div className="chart-area">


      
                <canvas id="langueChart" width="900" height="300"></canvas>
      </div>
    </CardBody>
            </Card>
          </Col>
          </Row>
          <Row>
          <Col xs='12'>
  <Card className="card-chart" style={{ minWidth: "400px" }} >
    <CardHeader>
    <Row>
    <Col className="text-left" sm="4">
      
        <CardTitle tag="h2">pourcentage des compétences techniques au condidats 

      </CardTitle>
      </Col>
  
      <Col xs="6">
      
        <ButtonGroup >
          {hardSkills.map((domain) => (
            <Button
              key={domain.Domaine}
              color={selectedDomain === domain.Domaine ? "primary" : "secondary"}
              onClick={() => handleDomainClick(domain.Domaine)}
            >
              {domain.Domaine}
            </Button>
          ))}
        </ButtonGroup>
        </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <div className="chart-area">


      
      <canvas id="skillsChart" width="300" height="50"></canvas>
      </div>
    </CardBody>
  </Card>
</Col>
</Row>

           
         
        
      </div>
    </>
  );
}

export default Dashboard;
