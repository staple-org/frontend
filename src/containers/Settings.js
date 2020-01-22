import React, { useState } from "react";
import {Col, ControlLabel, FormControl, FormGroup, Grid, Row} from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import {useFormFields} from "../libs/hooksLib";

export default function Settings(props) {
  const [fields, handleFieldChange] = useFormFields({
    password: "",
    confirmPassword: "",
  });
  const [maxStaples, setMaxStaples] = useState(25);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    console.log("Maximum set to: ", maxStaples);
    setIsLoading(false);
  }

  function validateChangePasswordForm() {
    return (
      fields.password.length > 0 &&
      fields.password === fields.confirmPassword
    );
  }

  async function handleChangePasswordSubmit(event) {
    event.preventDefault();
  }

  function editMaxStaples(event) {
    setMaxStaples(event.target.value)
  }

  function validateForm() {
    return true
  }

  return (
    <Grid>
      <Row className="show-grid">
        <Col xs={12} md={8}>
          <form className="SettingsForm" onSubmit={handleSubmit}>
            <FormGroup bsSize="large" controlId="storage">
              <ControlLabel>Maximum Staples</ControlLabel>
              <FormControl
                min="0"
                type="number"
                value={maxStaples}
                onChange={editMaxStaples}
                placeholder="Number of maximum staples to store"
              />
            </FormGroup>
            <hr />
            <LoaderButton
              block
              type="submit"
              bsSize="large"
              isLoading={isLoading}
              disabled={!validateForm()}
            >
              Save
            </LoaderButton>
          </form>
        </Col>
        <Col xs={6} md={4}>
          <form className="ChangePasswordForm" onSubmit={handleChangePasswordSubmit}>
            <FormGroup controlId="password" bsSize="large">
              <ControlLabel>New password</ControlLabel>
              <FormControl
                type="password"
                value={fields.password}
                onChange={handleFieldChange}
              />
            </FormGroup>
            <FormGroup controlId="confirmPassword" bsSize="large">
              <ControlLabel>Confirm new password</ControlLabel>
              <FormControl
                type="password"
                onChange={handleFieldChange}
                value={fields.confirmPassword}
              />
            </FormGroup>
            <hr />
            <LoaderButton
              block
              type="submit"
              bsSize="large"
              isLoading={isLoading}
              disabled={!validateChangePasswordForm()}
            >
              Change
            </LoaderButton>
          </form>
        </Col>
      </Row>
    </Grid>
  );
}