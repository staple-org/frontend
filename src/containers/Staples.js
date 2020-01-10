import React, { useRef, useState, useEffect } from "react";

export default function Staples(props) {
  const [staple, setStaple] = useState(null);
  const [content, setContent] = useState("");

  useEffect(() => {
    function loadStaple() {
      return API.get("notes", `/notes/${props.match.params.id}`);
    }

    async function onLoad() {
      try {
        const staple = await loadStaple();
        const { content, attachment } = staple; // array deconstruct

        setContent(content);
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