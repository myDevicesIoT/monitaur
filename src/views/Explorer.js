import React from 'react';
import { Button, Card, Row, Col } from 'react-bootstrap';
import './Explorer.css';
import { Chart } from 'react-charts'

export default () => {
  const data = React.useMemo(
    () => [
        {
        label: 'Temperature',
        data: [[0, 1], [1, 2], [2, 4], [3, 2], [4, 7]]
        },
        {
        label: 'Humidity',
        data: [[0, 3], [1, 1], [2, 5], [3, 6], [4, 4]]
        }
    ],
    []
    )
    const axes = React.useMemo(
      () => [
        {
          primary: true,
          position: 'bottom',
          type: 'time',
          show: false
        },
        { position: 'left', type: 'linear', show: false }
      ],
      []
    )

  return (
    <div>
      <h3>Devices</h3>
      <hr></hr>
      <Row className="mb-2">
        <Col>
        <Card style={{ width: '18rem' }}>
        <Card.Body>
            <img src="http://qbgrow.com/magen/iot-admin/img/senc.svg" width="60" className="card-icon" />
            <Card.Title className="body-title">REFRIGERATOR</Card.Title>
            <h6 className="card-reading">75° F</h6>
            <Card.Text>
            Latest on March 3rd, 2020 at 3PM
            </Card.Text>
        </Card.Body>
        <div style={{ height: "100px"}}>
          <Chart data={data} axes={axes} tooltip />
        </div>
      </Card>
        </Col>
      </Row>
    </div>
  );
};