import React, { useRef, useState, useEffect } from "react";
import config from "../config";
import Cookie from "js-cookie";

export default function Staples(props) {
  const [staple, setStaple] = useState(null);
  const [content, setContent] = useState("");

  useEffect(() => {
    function loadStaple() {
      // return API.get("notes", `/notes/${props.match.params.id}`);
      try {
        fetch(config.HOST+`/rest/api/1/staple/${props.match.params.id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + Cookie.get('token'),
          },
        }).then(response => response.json())
          .then(data => setStaple(data))
          .catch(e => alert(e.message));
      } catch (e) {
        alert(e);
      }
    }

    async function onLoad() {
      try {
        const staple = await loadStaple();
        console.log(staple);
        setContent(staple.content);
        setStaple(staple);
      } catch (e) {
        alert(e);
      }
    }
    onLoad();
  }, [props.match.params.id]);

  return (
    <div className="Notes"></div>
  );
}