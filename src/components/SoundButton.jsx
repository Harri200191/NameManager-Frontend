import React from 'react';
import mouseClick from "../assets/mouse-click.mp3";

class SoundButton extends React.Component {
  constructor(props) {
    super(props);
    this.audioRef = React.createRef(); // Reference to the audio element
  }

  // Function to play the sound when the button is clicked
  playSound = () => {
    this.audioRef.current.play();
  };

  render() {
    return (
      <div>
        <button onClick={this.playSound} id = "clickButton" className="--butt" type="submit">
          Submit
        </button>
        <audio ref={this.audioRef}>
          <source src={mouseClick} type="audio/mp3" />
          Your browser does not support the audio element.
        </audio>
      </div>
    );
  }
}

export default SoundButton;
