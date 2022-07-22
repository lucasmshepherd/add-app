import React from 'react';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router'
import $ from 'jquery';

//import styles from './widget.module.sass'

export default class EnterTransition extends React.Component {
  componentDidMount () {

    function drawImageProp(ctx, img, x, y, w, h, offsetX, offsetY) {
      if (arguments.length === 2) {
        x = y = 0;
        w = ctx.canvas.width;
        h = ctx.canvas.height;
      }
    
      // default offset is center
      offsetX = typeof offsetX === "number" ? offsetX : 0.5;
      offsetY = typeof offsetY === "number" ? offsetY : 0.5;
    
      // keep bounds [0.0, 1.0]
      if (offsetX < 0) offsetX = 0;
      if (offsetY < 0) offsetY = 0;
      if (offsetX > 1) offsetX = 1;
      if (offsetY > 1) offsetY = 1;
    
      var iw = img.width,
        ih = img.height,
        r = Math.min(w / iw, h / ih),
        nw = iw * r,   // new prop. width
        nh = ih * r,   // new prop. height
        cx, cy, cw, ch, ar = 1;
    
      // decide which gap to fill
      if (nw < w) ar = w / nw;
      if (Math.abs(ar - 1) < 1e-14 && nh < h) ar = h / nh;  // updated
      nw *= ar;
      nh *= ar;
    
      // calc source rectangle
      cw = iw / (nw / w);
      ch = ih / (nh / h);
    
      cx = (iw - cw) * offsetX;
      cy = (ih - ch) * offsetY;
    
      // make sure source rectangle is valid
      if (cx < 0) cx = 0;
      if (cy < 0) cy = 0;
      if (cw > iw) cw = iw;
      if (ch > ih) ch = ih;
    
      // fill image in dest. rectangle
      ctx.drawImage(img, cx, cy, cw, ch,  x, y, w, h);
    }
    
    (function() {
      'use strict';
    
      let MY_REQ;
    
      var canvas = document.getElementById('canvas2'),
        ctx = canvas.getContext('2d'),
        img = new Image(),
        currentFrame = 0,
        totalFrame = 20,
        offset = 0,
        width,
        height,
        imgData,
        data,
    
        pr = window.devicePixelRatio || 1,
        w = window.innerWidth,
        h = window.innerHeight,
    
        requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
          window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    
        var cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;
    
      window.requestAnimationFrame = requestAnimationFrame;
    
      img.crossOrigin = "Anonymous";
      img.src = '/assets/images/anarchy-fund-background-optimized.jpg';
      img.onload = function() {
        init();
        glitchAnimation();
      };
    
      var init = function() {
    
        canvas.width = width = w * pr;
        canvas.height = height = h * pr;
    
        //anvas.width = width = img.width; //* .5;
        offset = width * offset;
        //canvas.height = height = ~~(img.height * (width - offset * 2) / img.width);
    
        //document.querySelector('.glitch-image').style.width = width + 'px';
        //document.querySelector('.glitch-image').style.height = height + 'px';
      }.bind(this);
    
      var glitchAnimation = function() {
    
        if (!(currentFrame % totalFrame) || currentFrame > totalFrame) {
    
          clearCanvas();
    
          drawImageProp(ctx, img, 0, 0, canvas.width, canvas.height)
    
          imgData = ctx.getImageData(0, 0, width, height);
    
          // imgData = pixelProcessor(imgData, 4, pixelCooler);
    
          ctx.putImageData(imgData, 0, 0);
    
          currentFrame = 0;
        }
    
        if (currentFrame === randInt(0, totalFrame)) {
    
          imgData = pixelProcessor(imgData, 1, pixelFlick);
    
          ctx.putImageData(imgData, 0, 0);
    
          drawGlitch(width, height, randInt(3, 10), glitchBlock);
    
          drawGlitch(width, height, randInt(3, 30), glitchLine);
        }
    
        currentFrame++;
    
        MY_REQ = window.requestAnimationFrame(glitchAnimation);
    
      };
    
      var pixelFlick = function(i, d) {
        d[i] = d[i + 16];
      };
    
      var pixelCooler = function(i, d) {
        d[i] = 5;
        d[i + 1] += randInt(1, 7);
        d[i + 2] *= randInt(6, 8) + 1;
      };
    
      var glitchBlock = function(i, x, y) {
        if (i > 3) {
          var spliceHeight = 1 + randInt(0, 50);
    
          ctx.drawImage(canvas,
            x,
            y,
            x,
            spliceHeight,
            randInt(0, x),
            y,
            randInt(x, width),
            spliceHeight);
        }
      };
    
      var glitchLine = function(i, x, y) {
        var spliceHeight = 1 + randInt(1, 50);
    
        ctx.drawImage(canvas,
          offset,
          y,
          width - offset * 2,
          spliceHeight,
          1 + randInt(0, offset * 2), //-offset / 3 + randInt(0, offset / 1.5),
          y + randInt(0, 10),
          width - offset,
          spliceHeight);
      };
    
      var pixelProcessor = function(imageData, step, callback) {
        var data = imageData.data || [],
          step = step * 4 || 4;
    
        if (data.length) {
          var rgb = [];
    
          for (var i = 0; i < data.length; i += step) {
            callback && callback(i, data);
          }
    
          return imageData;
        } else {
          return imageData;
        }
      };
    
      var drawGlitch = function(width, height, amount, callback) {
        for (var i = 0; i < (amount || 10); i++) {
          var x = Math.random() * width + 1,
            y = Math.random() * height + 1;
    
          callback(i, x, y);
        }
      };
    
      var randInt = function(a, b) {
        return ~~(Math.random() * (b - a) + a);
      };
    
      var clearCanvas = function() {
        ctx.clearRect(0, 0, width, height);
      };
    
      // setTimeout(() => {
      //   cancelAnimationFrame(MY_REQ)
      //   return document.querySelector('canvas').style.display = 'none'
      // }, 2000)
    })();

  }

  render () {
    return (
      <> 
        {/*<div id="container">*/}
          <canvas id="canvas2"></canvas>
          
          <div id="terminal-container">

          </div>
        {/*</div>*/}
      </>
    )
  }
}