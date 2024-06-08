import React from "react";
import classNames from "classnames";
import { Bar } from "react-chartjs-2";
import OffresEmploi from "components/OffresOmploi"; 
import TopHardSkills from "components/TopHardSkills";
import TypeContratRepartition from "components/TypeContratRepartition"; 
import OffresEmploiParTypeContrat from "components/OffresEmploiParTypeContrat"; 
import TopSoftSkills from "components/TopSoftSkills";
//import GenderDistribution from "components/GenderDistribution";

import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
} from "reactstrap";
import GenderDistribution from "components/GenderDistribution";
import AgeDistribution from "components/AgeDistribution";
import TrendingSectors from "components/TrendingSectors";

function DashboardC(props) {
  return (
    <>
      <div className="content">
        <Row>
          <Col xs="12">
            <Card className="card-chart">
              <CardHeader>
                <Row>
                  <Col className="text-left" sm="6">
                    <CardTitle tag="h2">Tendances saisonnières</CardTitle>
                    <TrendingSectors />
                  </Col>
                </Row>
              </CardHeader>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col lg="4">
            <Card className="card-chart">
              <CardHeader>
                <div style={{ paddingTop: '10px', textAlign: 'center' }}>
                </div>
              </CardHeader>
              <CardBody>
                <TypeContratRepartition />
              </CardBody>
            </Card>
          </Col>
          <Col lg="4">
            <Card className="card-chart">
              <CardHeader>
                <h5 className ="card-category">Top Hard Skills</h5>
              </CardHeader>
              <CardBody className="text-center">
                <TopHardSkills />
              </CardBody>
            </Card>
          </Col>
          <Col lg="4">
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">Offres d'emploi</h5>
              </CardHeader>
              <CardBody className="text-center">
                <OffresEmploi />
              </CardBody>
            </Card>
          </Col>
        </Row>
    
        <Row>
          <Col lg="4">
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">Top Soft Skills</h5>
              </CardHeader>
              <CardBody className="text-center" style={{ paddingTop: '10px' }}>
                <TopSoftSkills />
              </CardBody>
            </Card>
          </Col>
          <Col lg="4">
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">Gender Distribution</h5>
              </CardHeader>
              <CardBody className="text-center">
                <GenderDistribution />
              </CardBody>
            </Card>
          </Col>
          <Col lg="4">
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">Age Distribution</h5>
              </CardHeader>
              <CardBody>
                <AgeDistribution />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default DashboardC;
