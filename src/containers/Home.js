import React, {useEffect, useState} from "react";
import {ListGroup, ListGroupItem, PageHeader} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import "./Home.css";
import config from "../config";
import Cookie from "js-cookie";

export default function Home(props) {
  const [staples, setStaples] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  function renderStapleList(astaples) {
    let list = undefined;
    if (astaples.staples) {
      list = astaples.staples.map(staple => {
        return (<LinkContainer key={staple.id} to={`/staples/${staple.id}`}>
          <ListGroupItem header={staple.name} key={staple.id}>
            {"Created: " + new Date(staple.created_timestamp).toLocaleString()}
          </ListGroupItem>
        </LinkContainer>)
      })
    }
    return (
      <div>
        {list}
        <LinkContainer key="new" to="/staples/new">
          <ListGroupItem>
            <h4>
              <b>{"\uFF0B"}</b> Create a new staple
            </h4>
          </ListGroupItem>
        </LinkContainer>
      </div>
    )
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
          {!isLoading && renderStapleList(staples)}
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
        fetch(config.HOST+"/rest/api/1/staple", {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + Cookie.get('token'),
          },
        }).then(response => response.json())
          .then(data => setStaples(data))
          .catch(e => alert(e.message));
      } catch (e) {
        alert(e);
      }

      setIsLoading(false);
    }

    onLoad();
  }, [props.isAuthenticated]);

  return (
    <div className="Home">
      {props.isAuthenticated ? renderStaples() : renderLander()}
    </div>
  );
}