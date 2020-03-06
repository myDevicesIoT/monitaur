import React, { useEffect, useState } from 'react';
import { Form, Card, Row, Col, Spinner, Alert } from 'react-bootstrap';
import './Explorer.css';
import { Chart } from 'react-charts'
import API from '../services/api'

export default () => {
  const api = new API()
  const [companies, setCompanies] = useState([])
  const [locations, setLocations] = useState([])
  const [devices, setDevices] = useState([])
  const [devicesloading, setDevicesLoading] = useState(true)
  const [locationLoading, setLocationLoading] = useState(false)
  const [location, setLocation] = useState({})
  const [company, setCompany] = useState(-1)


  const getLatestReadings = async (locationID, devices) => {
    for (let index = 0; index < devices.length; index++) {
      const element = devices[index];
      const metrics = await api.GetDeviceData(company, locationID, element.id);
      element.metrics = parseMetrics(metrics.summary)
    }

    return devices;
  }

  const parseMetrics = (metrics) => {
    let sensorData = {
      ts: metrics[0].ts
    }

    metrics.map( (metric) => {
      switch(metric.channel) {
        case "3":
          sensorData.temp = metric.v;
          break;
        case "4":
          sensorData.hum = metric.v;
          break;
        case "5":
          sensorData.batt = metric.v;
          break;
        case "100":
          sensorData.signal = metric.v;
        break
      }
    })

    return sensorData;
  }

  const onCompanySelect = (e) => {
    const companyID = e.target.value;
    setCompany(companyID)
    setLocationLoading(true)
    api.GetLocations(companyID)
    .then(locationResponse => {
      setLocations(locationResponse)
      setLocationLoading(false)
      setDevices([])
    })
  }

  const onLocationChange = async (e) => {
    const locationID = parseInt(e.target.value);
    setDevicesLoading(true)
    api.GetDevices(company, locationID)
    .then(devicesResponse => {
      let devs = devicesResponse.filter((device) => {
        if (device.sensor_type == 'Temperature/Humidity') {
          return device;
        }
      });

     getLatestReadings(locationID, devs).then( devices => {
      console.log(devices);
      setDevices(devices || [])
      setDevicesLoading(false)
     })


      // Promise.all(devs.map((dev) => {
      //   api.GetDeviceData(company, locationID, dev.id)
      //   .then(metrics => {
      //     console.log(metrics);
      //     dev.metrics = parseMetrics(metrics.summary)
      //     return Promise.resolve(true)
      //   })
      // }))
      // .then( result => {
      //   console.log(result);
      //   setDevices(devs || [])
      //   setDevicesLoading(false)
      // });
    })
  }

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

   useEffect(() => {
    setLocationLoading(true)
    api.GetCompanies().then(companiesResponse => {
      setCompanies(companiesResponse)
      setCompany(companiesResponse[0].id)
      api.GetLocations(companiesResponse[0].id)
      .then(locationResponse => {
        setLocations(locationResponse)
        setLocationLoading(false)
      })
    })
   }, [])

  return (
    <div>
      <h3>Devices</h3>
      <hr></hr>
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Companies</Form.Label>
          <Form.Control as="select" onChange={onCompanySelect}>
            { companies && companies.map((company) => (
              <option key={company.id} value={company.id}>{company.name}</option>
            ))}
        </Form.Control>
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          { locationLoading && <Spinner animation="border" /> }
          <Form.Label>
            Locations 
          </Form.Label>
          <Form.Control as="select" onChange={onLocationChange}>
              <option key="-1" value="-1">Select</option>
            { locations && locations.map((location) => (
                  <option key={location.id} value={location.id}>{location.name}</option>
            ))}
        </Form.Control>
        </Form.Group>
      </Form>
          { devicesloading && <Spinner animation="border" /> }
          { !devicesloading && devices && devices.length == 0 && <Alert variant="secondary"> This location does not have any Temperature/Humidity devices. </Alert>}
          { devices && devices.map((device) => (
            <Row className="mb-2" key={device.id}>
              <Col>
                <Card style={{ width: '18rem' }}>
                  <Card.Body>
                      <img src="http://qbgrow.com/magen/iot-admin/img/senc.svg" width="60" className="card-icon" />
                      <Card.Title className="body-title">{device.thing_name}</Card.Title>
                      <h5 className="card-reading">{device.metrics.temp}° F</h5>
                      <h6 className="card-reading">{device.metrics.hum}%</h6>
                      <Card.Text>
                        Latest reading {device.metrics.ts}
                      </Card.Text>
                  </Card.Body>
                  <div style={{ height: "100px"}}>
                    <Chart data={data} axes={axes} tooltip />
                  </div>
                </Card>
              </Col>
          </Row>
          ))}

      {/* <Row className="mb-2">
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
      </Row> */}
    </div>
  );
};