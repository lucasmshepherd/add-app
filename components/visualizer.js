import React, { useCallback, useRef, useState, useEffect } from "react";
import styles from './visualizer.module.sass'


export default function Visualizer() {
  const AUDIO_SRC = "/assets/audio/delec.ogg";

  const [audioFile, setAudioFile] = useState(null);
  const [audioIsLoading, setAudioIsLoading] = useState(true);
  const [audioIsPlaying, setAudioIsPlaying] = useState(false);
  const [audioAnimationFrame, setAudioAnimationFrame] = useState(null);

  function handlePlay() {
    // if audio hasn't been started
    if (!audioAnimationFrame) {
      handleAudioStart();
    }
    // any time the play button is hit
    audioFile.play();
    setAudioIsPlaying(true);
  }
  
  function handlePause() {
    audioFile.pause();
    setAudioIsPlaying(false);

    // stop the animation
    window.cancelAnimationFrame(audioAnimationFrame);
    setAudioAnimationFrame(null);
  }

  function handleAudioStart() {
    // display settings
    let repeat_char = '/';
    const filler_char = '-';
    const char_across = 20;

    // get the stream from the audio file
    const audioStream = audioFile.captureStream();
    
    // forked web audio context
    let audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    // different audio nodes
    let analyser = audioCtx.createAnalyser();
    analyser.minDecibels = -70;
    analyser.maxDecibels = -3;
    analyser.smoothingTimeConstant = 0.8;
    let distortion = audioCtx.createWaveShaper();
    let gainNode = audioCtx.createGain();
    let biquadFilter = audioCtx.createBiquadFilter();
    let convolver = audioCtx.createConvolver();
    
    const source = audioCtx.createMediaStreamSource(audioStream);
    source.connect(analyser);
    analyser.connect(distortion);
    distortion.connect(biquadFilter);
    biquadFilter.connect(convolver);
    convolver.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    visualize();
    
    function visualize() {
      analyser.fftSize = 128;
      let bufferLength = analyser.frequencyBinCount;
      let dataArray = new Uint8Array(bufferLength);
      let dataArray2 = new Uint8Array([dataArray[3],dataArray[16],dataArray[27]]);

      //Update the UI
      const draw = function () {
        setAudioAnimationFrame(requestAnimationFrame(draw));
        analyser.getByteFrequencyData(dataArray2);
        let ascii_visualizer = document.querySelector('.visualizer---row-container');

        if (ascii_visualizer) {
          ascii_visualizer.innerHTML = '';

          // where the magic happens
          dataArray2.forEach((level, index) => {
            let levelFloor = Math.floor(level / 14); // lower number equals great amplitude
            if (levelFloor > char_across) { levelFloor = char_across; } // ensure it doesn't exceed our limit
            
            let repeatChars = repeat_char.repeat(levelFloor);
            if (repeatChars < 0) { repeatChars = 0; }
            
            const REMAINING_CHARS = char_across - levelFloor;
            let fillerChars = filler_char.repeat(REMAINING_CHARS);
            
            ascii_visualizer.innerHTML += `<div class="visualizer--row"><span style="color: #8dc927;">${repeatChars}</span><span style="color:#767676">${fillerChars}</span></div>`
          });
        }
      };
        
      draw();
    }
  }
  useEffect(() => {
    setAudioFile(new Audio(AUDIO_SRC));
  }, [])

  useEffect(() => {
    setAudioIsLoading(false);
  }, [audioFile])

  return (
    <div id="visualizer" className={styles.visualizer}>
      { !audioIsLoading &&
        <div className="visualizer--click-target" style={{cursor: 'pointer'}}  onClick={ audioIsPlaying ? handlePause : handlePlay}>
          <div className="visualizer---row-container">
            {
              [...Array(3),]
              .map((value, index) => {
                return (
                  <div className='visualizer--row' key={index}>
                    <span style={{ color:'#767676'}}>--------------------</span>
                  </div>
                )
              })
            }
          </div>
        </div>
      }
    </div>
  )
}