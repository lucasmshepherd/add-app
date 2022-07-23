import React from 'react';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router'
import $ from 'jquery';

//import styles from './widget.module.sass'

export default class Terminal extends React.Component {
  componentDidMount () {
    
    var cursor = $('#cursor');
    var terminal = $('#terminal');
    var text = ["Anarchy Development DAO\nWARN: This site is under construction\n$> ", ""];
    var commandHistory = [];
    var lineY = 1;
    var index = 0;
    var historyIndex = 0;

    var commands = [
        { name: "clear",    function: clearConsole },
        { name: "owl",      function: owlConsole }
    ]
    
    function owlConsole() {
        text[lineY++] = ["> owl\n"];
        //printConsole(text);
        text[lineY++] = ["executing bgchckr.exe "];
        setTimeout(function() { text[lineY++] = ["executing bgchckr.exe 2"];  }, 500);
        //setTimeout(printConsole(text), 300);
    }
    
    function clearConsole() {
        text = [];
        lineY = 0;
    }

    setInterval(function () {
        cursor.toggleClass('invisible');
    }, 500);
    
    function printConsole(txt) {
        cursor.remove();
        terminal.html(text);
        terminal.append('<span id="cursor"></span>');
        cursor = $('#cursor');
    }
    
    function processCommand(rawData) {
        var args = rawData.split(" ");
        var command = args[0];
        commandHistory[historyIndex] += rawData;
        args.shift();
        var unknownComand = true;
        for (var i = 0; i < commands.length; i++) {
            if (command === commands[i].name) {
                commands[i].function(args);
                unknownComand = false;
                break;
            }
        }
        if (unknownComand == true) {
            lineY++;
            text[lineY] = "\ncommand not found";
        }
        historyIndex++;
        console.log(lineY);
    }
    
    function nextLine() {
        processCommand(text[lineY]);
        if (lineY != 0) {
            lineY++;
            text[lineY] = "\n";
        }
        else
            text[lineY] = "";
    
        text[lineY] += "$> ";
        lineY++;
        text[lineY] = "";
        printConsole(text);
    }
    
    function erase(n) {
        text[lineY] = text[lineY].slice(0, -n);
        index--;
        printConsole(text);
    }
    
    $(function () {
        printConsole(text)
    })
    
    $('html').on('keydown', function (e) {
        e = e || window.event;
        var keyCode = typeof e.which === "number" ? e.which : e.keyCode;
    
        // Backspace? Erase!
        if (keyCode === 8 && e.target.tagName !== "INPUT" && e.target.tagName !== "TEXTAREA") {
            e.preventDefault();
            if (index != 0)
                erase(1);
        }
    });
    
    $(document).on("keypress", function (e) {
        // Make sure we get the right event
        e = e || window.event;
        var keyCode = typeof e.which === "number" ? e.which : e.keyCode;
    
        // Which key was pressed?
        switch (keyCode) {
            // ENTER
            case 13:
            {
                nextLine();
                break;
            }
            default:
            {
                var data = String.fromCharCode(keyCode);
                if (data != undefined) {
                    var length = text[lineY].length;
                    text[lineY] += data;
                    index = index + (text[lineY].length - length);
                    printConsole(text);
                }
                break;
            }
        }
    });

  }

  render () {
    return (
      <> 
        {/*<div id="container">*/}
          <div id="terminal-container" className="random">
            <div id="terminal">

            </div>
          </div>
        {/*</div>*/}
      </>
    )
  }
}