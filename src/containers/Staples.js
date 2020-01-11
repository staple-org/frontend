import React, { useState, useEffect } from "react";
import config from "../config";
import Cookie from "js-cookie";
import { FormGroup, FormControl } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import "./Staples.css";

export default function Staples(props) {
  const [staple, setStaple] = useState(null);
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    async function onLoad() {
      try {
        fetch(config.HOST+`/rest/api/1/staple/${props.match.params.id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + Cookie.get('token'),
          },
        }).then(response => response.json())
          .then(data => {
            setContent(data.staple.content);
            setStaple(data.staple);
          })
          .catch(e => alert(e.message));
      } catch (e) {
        alert(e);
      }
    }
    onLoad();
  }, [props.match.params.id]);

  async function handleArchive(event) {
    setIsLoading(true);
    event.preventDefault();
    try {
      fetch(config.HOST+`/rest/api/1/staple/${props.match.params.id}/archive`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + Cookie.get('token'),
        },
      }).then(response => {
        if (response.ok) {
          setIsLoading(false);
          props.history.push('/')
        }
      }).catch(e => alert(e.message));
    } catch (e) {
      alert(e);
    }
  }

  async function handleDelete(event) {
    setIsDeleting(true);
    event.preventDefault();
    try {
      fetch(config.HOST+`/rest/api/1/staple/${props.match.params.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + Cookie.get('token'),
        },
      }).then(response => {
        if (response.ok) {
          setIsDeleting(false);
          props.history.push('/')
        }
      }).catch(e => alert(e.message));
    } catch (e) {
      alert(e);
    }
  }

  return (
    <div className="Staples">
      {staple && (
        <form>
          <FormGroup controlId="content">
            <FormControl
              plaintext={content}
              readOnly
              defaultValue={content}
            />
          </FormGroup>
          <LoaderButton
            block
            bsSize="large"
            bsStyle="warning"
            onClick={handleArchive}
            isLoading={isLoading}
          >
            Archive
          </LoaderButton>
          <LoaderButton
            block
            bsSize="large"
            bsStyle="danger"
            onClick={handleDelete}
            isLoading={isDeleting}
          >
            Delete
          </LoaderButton>
        </form>
      )}
    </div>
  );
}