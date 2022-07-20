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

  function handleToggle() {
    if (audioIsPlaying) {
      handlePause();
    } else {
      handlePlay();
    }
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
    analyser.minDecibels = -90;
    analyser.maxDecibels = -3;
    analyser.smoothingTimeConstant = 0.85;
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
      analyser.fftSize = 256;
      let bufferLength = analyser.frequencyBinCount;
      let dataArray = new Uint8Array(bufferLength);

      //Update the UI
      const draw = function () {
        setAudioAnimationFrame(requestAnimationFrame(draw));
        analyser.getByteFrequencyData(dataArray);
        let ascii_visualizer = document.querySelector('.ascii-visualizer>pre');

        if (ascii_visualizer) {
          ascii_visualizer.textContent = '';

          // where the magic happens
          dataArray.forEach((level, index) => {
            let levelFloor = Math.floor(level / 10);
            if (levelFloor > char_across) { levelFloor = char_across; } // ensure it doesn't exceed our limit
            
            let REPEAT_CHARS = repeat_char.repeat(levelFloor);
            if (REPEAT_CHARS < 0) { REPEAT_CHARS = 0; }
            
            const REMAINING_CHARS = char_across - levelFloor;
            let FILLER_CHARS = filler_char.repeat(REMAINING_CHARS);
            
            ascii_visualizer.textContent += `${REPEAT_CHARS}${FILLER_CHARS}\n`
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
        <div>
          <header>
              <p className={styles.solicitor} onClick={handleToggle}>{ audioIsPlaying ? '⏸︎' : '⏵︎'}{ !audioIsPlaying && <span />}</p>
          </header>
          <main className="ascii-visualizer">
            <pre></pre>
          </main>
        </div>
      }
    </div>
  )
}