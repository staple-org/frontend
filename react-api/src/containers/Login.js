import React, { useState } from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import { useFormFields } from "../libs/hooksLib";
import "./Login.css";
import Cookie from "js-cookie";

export default function Login(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [fields, handleFieldChange] = useFormFields({
    email: "",
    password: ""
  });

  function validateForm() {
    return fields.email.length > 0 && fields.password.length > 0;
  }

  async function handleSubmit(event) {
    // TODO: Call my API here which will get back a token.
    event.preventDefault();
    setIsLoading(true);

    try {
      // await Auth.signIn(email, password);
      // fields.email; fields.password --> This is what I will need to pass down the chain.
      fetch('http://localhost:9998/get-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: fields.email,
          password: fields.password,
        }),
      }).then((response) => response.json())
      .then((responseJson) => {
        // store the token in a cookie.
        Cookie.set("token", responseJson.token);
      })
      .catch((error) => {
        console.error(error);
      });
      props.userHasAuthenticated(true);
      props.history.push("/");
      // probably will create a state and store it in state/
    } catch (e) {
      alert(e.message);
    } finally {
      setIsLoading(false);
    }
    // If everything worked out fine, we should get back the JWT token and store it for further api calls.

  }

  return (
    <div className="Login">
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="email" bsSize="large">
          <ControlLabel>Email</ControlLabel>
          <FormControl
            autoFocus
            type="email"
            value={fields.email}
            onChange={handleFieldChange}
          />
        </FormGroup>
        <FormGroup controlId="password" bsSize="large">
          <ControlLabel>Password</ControlLabel>
          <FormControl
            value={fields.password}
            onChange={handleFieldChange}
            type="password"
          />
        </FormGroup>
        <LoaderButton
          block
          type="submit"
          bsSize="large"
          isLoading={isLoading}
          disabled={!validateForm()}
        >
          Login
        </LoaderButton>
      </form>
    </div>
  );
}