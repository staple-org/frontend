import React, { useState, useEffect } from "react";
import { PageHeader, ListGroup, ListGroupItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "./Home.css";

export default function Home(props) {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  function renderStapleList(staples) {
    return [{}].concat(staples).map((staple, i) =>
      i !== 0 ? (
        <LinkContainer key={staple.id} to={`/notes/${staple.id}`}>
          <ListGroupItem header={staple.content.trim().split("\n")[0]}>
            {"Created: " + new Date(staple.createdAt).toLocaleString()}
          </ListGroupItem>
        </LinkContainer>
      ) : (
        <LinkContainer key="new" to="/staples/new">
          <ListGroupItem>
            <h4>
              <b>{"\uFF0B"}</b> Create a new staple
            </h4>
          </ListGroupItem>
        </LinkContainer>
      )
    );
  }

  function renderLander() {
    return (
      <div className="lander">
        <h1>Staple</h1>
        <p>A simple note taking app</p>
      </div>
    );
  }

  function renderStaples() {
    return (
      <div className="staples">
        <PageHeader>Your Staples</PageHeader>
        <ListGroup>
          {!isLoading && renderStapleList(notes)}
        </ListGroup>
      </div>
    );
  }

  useEffect(() => {
    async function onLoad() {
      if (!props.isAuthenticated) {
        return;
      }

      try {
        const notes = await loadStaples();
        setNotes(notes);
      } catch (e) {
        alert(e);
      }

      setIsLoading(false);
    }

    onLoad();
  }, [props.isAuthenticated]);

  function loadStaples() {
    // return API.get("notes", "/notes");
  }

  return (
    <div className="Home">
      {props.isAuthenticated ? renderStaples() : renderLander()}
    </div>
  );
}