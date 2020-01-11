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

  async function handleSubmit(event) {

    event.preventDefault();

    // mark as archvied here.
    // if (file.current && file.current.size > config.MAX_ATTACHMENT_SIZE) {
    //   alert(
    //     `Please pick a file smaller than ${config.MAX_ATTACHMENT_SIZE /
    //     1000000} MB.`
    //   );
    //   return;
    // }

    setIsLoading(true);
    props.history.push('/')
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
            bsStyle="danger"
            onClick={handleSubmit}
            isLoading={isDeleting}
          >
            Archive
          </LoaderButton>
        </form>
      )}
    </div>
  );
}