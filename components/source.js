import React from 'react';

import styles from './widget.module.sass'

export default class Source extends React.Component {

  componentDidMount () {

      var charString =
        "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヰヱヲ0123456789+-*/$%&";
      var charArray = charString.split("");
      var charStep = 16;
      var fontColor = "#7cfc00";
      var fontSize = "14";
      var canvasColor = "rgba(0,0,0,0.2)";
      var refreshRate = 1500 / 18;
      var maxChars = 100;
      var canvas,
        ctx,
        height,
        width,
        delta,
        now,
        then = Date.now(),
        xCoords = [],
        chars = [],
        startAnimChars = [],
        startAnimCounter = 0;
    
      function randomChar() {
        return charArray[Math.floor(Math.random() * charArray.length)];
      }
    
      function randX() {
        return xCoords[Math.floor(Math.random() * xCoords.length)];
      }
    
      var charObj = function () {
        this.char = randomChar();
        this.posX = randX();
        this.posY = charStep;
      };
    
      charObj.prototype.update = function () {
        this.char = randomChar();
        this.posY += charStep;
      };
    
      function initCoords() {
        var numCoords = width / charStep;
        for (var i = 0; i < numCoords; xCoords[i++] = i * charStep - 14);
      }
    
      function update() {
        for (var i = 0; i < chars.length; chars[i++].update()) {
          if (chars[i].posY > height) {
            chars.splice(i, 1);
          }
        }
        if (chars.length < maxChars) {
          var delay = Math.ceil(Math.random() * 20);
          window.setTimeout(function () {
            var c = new charObj();
            chars.push(c);
          }, delay);
        }
      }
    
      function draw() {
        ctx.fillStyle = canvasColor;
        ctx.fillRect(0, 0, width, height);
        ctx.save();
        ctx.fillStyle = fontColor;
        ctx.shadowColor = "white";
        ctx.shadowBlur = 5;
        for (var i = 0; i < chars.length; i++) {
          ctx.fillText(chars[i].char, chars[i].posX, chars[i].posY);
        }
        ctx.restore();
        update();
      }
    
      function animate() {
        window.requestAnimationFrame(animate);
        now = Date.now();
        delta = now - then;
        if (delta > refreshRate) {
          then = now - (delta % refreshRate);
          draw();
        }
      }
    
      function startAnimation() {
        var textIndeces = [
          [3, 4],
          [2, 5],
          [1, 2, 3, 4, 5, 6],
          [1, 6],
          [1, 6],
          [1, 2, 3, 4, 5, 6]
        ];
        for (var i = 0; i < textIndeces.length; i++) {
          for (var j = 0; j < textIndeces[i].length; j++) {
            var c = new charObj();
            c.posX = (textIndeces[i][j] + 1) * charStep;
            c.posY = (i + 2) * charStep;
            startAnimChars.push(c);
          }
        }
        var anim = setInterval(function () {
          startAnimCounter++;
          ctx.save();
          ctx.fillStyle = fontColor;
          ctx.shadowColor = "white";
          ctx.shadowBlur = 5;
          for (var i = 0; i < startAnimChars.length; i++) {
            ctx.fillText(
              startAnimChars[i].char,
              startAnimChars[i].posX,
              startAnimChars[i].posY
            );
            startAnimChars[i].char = randomChar();
          }
          ctx.restore();
          if (startAnimCounter > 30) {
            for (var i = 0; i < startAnimChars.length; i++) {
              var c = startAnimChars[i];
              chars.push(c);
              startAnimChars.splice(startAnimChars[i], 1);
            }
            window.clearInterval(anim);
          }
        }, 200);
      }
    
      function hover(e) {
        var c = new charObj();
        var x = Math.ceil(e.clientX / charStep) * charStep;
        var y = Math.ceil(e.clientY / charStep) * charStep;
        c.posX = x;
        c.posY = y;
        chars.push(c);
      }
    
      function init() {
        canvas = document.getElementById("canvas");
        height = "400";
        width = "700";
        canvas.height = height;
        canvas.width = width;
        ctx = canvas.getContext("2d");
        ctx.font = "14px courier";
        ctx.imageSmoothingEnabled = false;
        //window.onmousemove = hover;
        initCoords();
        animate();
        startAnimation();
      }
    
      init();
    
  }

  render () {
    return (
      <> 
        <canvas id="canvas" className={styles.canvas}></canvas>
      </>
    )
  }
}