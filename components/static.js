import React from 'react';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router'
import $ from 'jquery';

//import styles from './widget.module.sass'

export default class Static extends React.Component {
  componentDidMount () {

    var app = {
      init: function() {
        this.canvas = document.getElementById('canvas3');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = $(window).width();
        this.canvas.height = $(window).height();
        this.items = new Array();
        this.nbItems = 10000;
        this.itemSize = 2;
        this.fps = 1000 / 60;
        this.speed = 50;
        this.colorsAvailable = ['white'];
       
        for(var i=0;i<this.nbItems;i++) {
          this.items.push(
            {
              x: Math.floor(Math.random() * this.canvas.width),
              y: Math.floor(Math.random() * this.canvas.height),
              vx: Math.floor((Math.random() * app.speed) - (app.speed*0.5)),
              vy: Math.floor((Math.random() * app.speed) - (app.speed*0.5))
            }
          );
          while(this.items[i].vx == 0){
            this.items[i].vx = Math.floor((Math.random() * app.speed) - (app.speed*0.5));
            this.items[i].vy = Math.floor((Math.random() * app.speed) - (app.speed*0.5));
          }
        }
        
        this.timer = setInterval(function() {
          app.update();
          app.draw();
        }, this.fps);
      },
      update: function() {
        for(var i=0;i<this.items.length;i++) {
            this.items[i].x = this.items[i].x + this.items[i].vx;
            this.items[i].y = this.items[i].y + this.items[i].vy;
            if((this.items[i].x > this.canvas.width - (this.itemSize)) ||
               (this.items[i].x < 0 + (this.itemSize)))
                  this.items[i].vx *= -1;
            if((this.items[i].y > this.canvas.height - (this.itemSize)) ||
                 (this.items[i].y < 0 + (this.itemSize)))
                    this.items[i].vy *= -1;
        }
      },
      draw: function() { 
        this.ctx.clearRect(0,0,this.canvas.width, this.canvas.height);
        for(var i=0;i<this.items.length;i++) {
          this.ctx.fillStyle = this.colorsAvailable[Math.floor(Math.random() * this.colorsAvailable.length)];
          this.ctx.fillRect(this.items[i].x, this.items[i].y, this.itemSize, this.itemSize);
        }
      }
    };
  
    
    app.init();

  }

  render () {
    return (
      <> 
        {/*<div id="container">*/}
          <canvas id="canvas3" className="staticer">

          </canvas>
        {/*</div>*/}
      </>
    )
  }
}