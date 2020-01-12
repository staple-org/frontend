import React, { useState } from "react";
import {ControlLabel, FormControl, FormGroup} from "react-bootstrap";
import { useFormFields } from "../libs/hooksLib";
import LoaderButton from "../components/LoaderButton";

export default function Settings(props) {
  const [fields, handleFieldChange] = useFormFields({
    maximumStaples: 25,
  });
  const [isLoading, setIsLoading] = useState(false);

  function handleSubmitClick() {
    setIsLoading(true);
  }

  function validateForm() {
    return true
  }

  return (
    <form className="SettingsForm" onSubmit={handleSubmitClick}>
      <FormGroup bsSize="large" controlId="storage">
        <ControlLabel>Storage</ControlLabel>
        <FormControl
          min="0"
          type="number"
          value={fields.maximumStaples}
          onChange={handleFieldChange}
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
  );
}