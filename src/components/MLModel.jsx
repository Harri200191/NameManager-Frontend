import React from "react";
import { useState } from "react";
import loadingimage from "../assets/loading.gif"
import mouseClick from "../assets/mouse-click.mp3";
import {Howl, Howler} from "howler";
import SoundButton from "./SoundButton";

const MLModel = () => {
  const [isloading, setisloading] = useState(false)
  const [inputText, setInputText] = useState("");
  const [result, setResult] = useState("");
  const [result_Sent, setResult_Sent] = useState("");
  const [result_Sent2, setResult_Sent2] = useState("");
  const [result_Sent3, setResult_Sent3] = useState("");
  const [text, setText] = useState('');
  const [wordCount, setWordCount] = useState(0);

  function FormatOutput(value){
    const formattedValue = (parseFloat(value) * 100).toFixed(1);
    return formattedValue;
  }

  // Function to update the state and count words
  const handleTextChange = (e) => {
    const newText = e.target.value;
    setText(newText);

    // Split the text by whitespace to count words
    const words = newText.split(/\s+/);

    // Remove empty strings from the array (e.g., consecutive spaces)
    const filteredWords = words.filter((word) => word !== '');

    // Update the word count
    setWordCount(filteredWords.length);
  };

  async function query2(data) {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/SamLowe/roberta-base-go_emotions",
      {
        headers: { Authorization: process.env.REACT_APP_AUTH_KEY },
        method: "POST",
        body: JSON.stringify(data),
      }
    );
    const result = await response.json();
    return result;
  }

  async function query(data) {
    setisloading(true);
    const response = await fetch(
      "https://api-inference.huggingface.co/models/facebook/bart-large-cnn",
      {
        headers: { Authorization: process.env.REACT_APP_AUTH_KEY },
        method: "POST",
        body: JSON.stringify(data),
      }
    );

    setisloading(true);
    const result = await response.json();
    return result;
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (inputText != "") {
        const resultText = query({ "inputs": inputText , "return_full_text": true }).then((response) => {
          setResult(response[0].summary_text);
          setisloading(false)
        }); 
        const resultsentiment = query2({"inputs": inputText}).then((response) => {
          console.log(response);
          setResult_Sent(response[0][0]);
          setResult_Sent2(response[0][1]);
          setResult_Sent3(response[0][2]);
          setisloading(false)
        });
    } else {
      setResult("");
      setResult_Sent("");
      setResult_Sent2("");
      setResult_Sent3("");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea
          id="inputText"
          type="text"
          value={inputText}
          onChange={(e) => {
            setInputText(e.target.value)
            handleTextChange(e)
            }
          }
          placeholder="Add the text that you want to summarize...."
          rows="15"
          cols="60"
        />

        <SoundButton/>
        
        <p><b><i>Word Count:</i></b> {wordCount}</p>
      </form>
      {      
      isloading && (
          <div className="--flex-center">
            <img src = {loadingimage} alt='Loading...'></img>
          </div>)
      }
      {result_Sent &&
          (<div className="Result-Sent">
            <p>This piece of text has the sentiments: </p>{result_Sent && <p>{result_Sent.label}</p>}
            <p> with score </p>{result_Sent && <p>{FormatOutput(result_Sent.score)}</p>}
            <p>%, </p>{result_Sent2 && <p>{result_Sent2.label}</p>}
            <p> with score </p>{result_Sent2 && <p>{FormatOutput(result_Sent2.score)}</p>}
            <p>% and </p>{result_Sent3 && <p>{result_Sent3.label}</p>}
            <p> with score </p>{result_Sent3 && <p>{FormatOutput(result_Sent3.score)}</p>}
            <p>%. </p>
          </div>
          )
      }
      {result &&
          (
          <div>
            <hr/>
            <div className="Final-Head"><b className="Summary-head"> Summary: </b></div>
            <div className="output-txt">{result && <p>{result}</p>}</div>
          </div>
          )
      }
        
    </div>
  );
};


export default MLModel;
