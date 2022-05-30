import { Modal, Button, Tabs, Tab, Form, Row, Col } from "react-bootstrap";
import DateRangePicker from "react-bootstrap-daterangepicker";
import moment from "moment";
import { useState } from "react";
import { useDispatch, connect } from "react-redux";
import { setData } from "../reportsBhavcopy/reportsBhavcopySlice";
import { useNavigate } from "react-router-dom";

import "bootstrap-daterangepicker/daterangepicker.css";
import config from "../../config";

function ReportsBhavcopyModal(props) {
  const { isCashBhavcopy } = props;
  const [portfolio, setPortfolio] = useState("");
  const [date, setDate] = useState(moment().format("DD/MM/yyyy"));
  const activeKey = isCashBhavcopy ? "date" : "date_range";
  const [key, setKey] = useState(activeKey);
  const url = `${config.BASE_URL}/cash-reports/bhavcopy`;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDateChange = (newDate) => {
    setDate(newDate.format("DD/MM/yyyy"));
  };

  const handlePortfolioChange = (value) => {
    setPortfolio(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        dispatch(setData(res.data));
        props.onHide();
        const url = isCashBhavcopy
          ? "/cash-reports/bhavcopy"
          : "/fo-reports/bhavcopy";
        navigate(url, { replace: true });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Cash Reports Bhavcopy
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Tabs
          id="controlled-tab-example"
          activeKey={key}
          onSelect={(k) => setKey(k)}
          className="mb-3"
        >
          {isCashBhavcopy && (
            <Tab eventKey="date" title="Specific Date">
              <Form noValidate onSubmit={handleSubmit}>
                <Form.Group controlId="date" className="mb-3">
                  <Form.Label>Select custom date</Form.Label>
                  <DateRangePicker
                    initialSettings={{
                      singleDatePicker: true,
                      startDate: date,
                      locale: {
                        format: "DD/MM/yyyy",
                      },
                    }}
                    onCallback={handleDateChange}
                  >
                    <input type="text" className="form-control col-4" />
                  </DateRangePicker>
                </Form.Group>
                <Form.Group controlId="select" className="mb-5">
                  <Form.Label>Select portfolio</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    onChange={handlePortfolioChange}
                    value={portfolio}
                  >
                    <option>Select portfolio</option>
                    <option value="1">Swarnjeet</option>
                    <option value="2">Manjeet</option>
                    <option value="3">Favroute</option>
                  </Form.Select>
                </Form.Group>
                <Row className="mb-5">
                  <Col className="d-flex justify-content-end">
                    <Button
                      variant="outline-primary"
                      type="submit"
                      className="w-100"
                    >
                      Submit
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Tab>
          )}

          <Tab eventKey="date_range" title="Date Range">
            <Form noValidate onSubmit={handleSubmit}>
              <Form.Group controlId="date" className="mb-3">
                <Form.Label>From</Form.Label>
                <DateRangePicker>
                  <input type="text" className="form-control col-4" />
                </DateRangePicker>
              </Form.Group>

              <Form.Group controlId="select" className="mb-5">
                <Form.Label>Plesae select symbol</Form.Label>
                <Form.Select aria-label="Default select example">
                  <option>Select symbol</option>
                  <option value="1">Swarnjeet</option>
                  <option value="2">Manjeet</option>
                  <option value="3">Favroute</option>
                </Form.Select>
              </Form.Group>
              <Row className="mb-5">
                <Col className="d-flex justify-content-end">
                  <Button
                    variant="outline-primary"
                    type="submit"
                    className="w-100"
                  >
                    Submit
                  </Button>
                </Col>
              </Row>
            </Form>
          </Tab>
        </Tabs>
      </Modal.Body>
    </Modal>
  );
}

// const mapDispatchToProps = (dispatch) => ({
//   setData: (data) => dispatch(setData(data)),
// });

export default connect(null, null)(ReportsBhavcopyModal);
