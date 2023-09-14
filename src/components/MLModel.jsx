import React from "react";
import { useState } from "react";

const MLModel = () => {
  async function query(data) {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/Hari93/res",
      {
        headers: {
          Authorization: "Bearer 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",
        },
        method: "POST",
        body: JSON.stringify(data),
      }
    );
    const result = await response.json();
    return result;
  }

  const [inputText, setInputText] = useState("");
  const [result, setResult] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputText != "") {
      const resultText = query({ inputs: inputText }).then((response) => {
        setResult(response[0].generated_text);
      });
    } else {
      setResult("");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea
          id="inputText"
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Add the text that you want to summarize...."
          rows="15"
          cols="60"
        />
        <button className="--butt" type="submit">
          Submit
        </button>
      </form>
      <div className="output-txt">{result && <p>{result}</p>}</div>
    </div>
  );
};

export default MLModel;
