import { useState } from "react";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import Loader from "../loader";
import DateRangePicker from "react-bootstrap-daterangepicker";
import "bootstrap-daterangepicker/daterangepicker.css";

function CreatePivot() {
  const [date, setDate] = useState("05/23/2022");
  const [loader, setLoader] = useState(false);
  const [message, setMessage] = useState("");

  const handleDateChange = (newDate) => {
    setDate(newDate.format("MM/DD/yyyy"));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoader(true);

    const url = `/pivots`;
    fetch(url, {
      method: "POST",
      body: JSON.stringify({ from: date }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setMessage(res.message);
        setLoader(false);
      })
      .catch((error) => {
        setLoader(false);
        console.error(error);
      });
  };

  return (
    <Container fluid>
      <div>
        <Form noValidate onSubmit={handleSubmit}>
          <Row className="mb-5">
            <Col>
              <Form.Group controlId="date">
                <Form.Label>Select date *</Form.Label>
                <DateRangePicker
                  initialSettings={{
                    singleDatePicker: true,
                    startDate: date,
                  }}
                  onCallback={handleDateChange}
                >
                  <input type="text" className="form-control col-4" />
                </DateRangePicker>
              </Form.Group>
            </Col>

            <Col>
              <Form.Group controlId="select" className="mb-5">
                <Form.Label>
                  <span className="opacity-zero">Click the button</span>
                </Form.Label>
                <Button
                  variant="outline-primary"
                  type="submit"
                  className="w-100"
                >
                  Submit
                </Button>
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </div>
      <main style={{ overflow: "auto" }}>
        {loader ? (
          <Loader />
        ) : (
          <h4 className="text-center">
            {message
              ? message
              : "Please select the date from date picker menu and submit the form"}
          </h4>
        )}
      </main>
    </Container>
  );
}

export default CreatePivot;
