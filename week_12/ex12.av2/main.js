let oh, hh, snare, bass, sub; //INSTRUMENT. will serve as a container that holds a sound source 
let ohPat, hPat, cPat, subPat, bPat; //INSTRUMENT PATTERN. it will be an array of numbers that we can manipulate to make beats
let ohPhrase, hPhrase, sPhrase, bPhrase, subPhrase; //INSTRUMENT PHRASE. which defines how the instrument pattern is interpreted. 
let drums; //PART. we will attach the phrase to the part, which will serve as our transport to drive the phrase
let bpmCTRL;
let beatLength;
let cellWidth;
let cnv, playPause;
let sPat;
let cursorPos;

function setup() {
  cnv = createCanvas(1280, 360);
  cnv.mousePressed(canvasPressed);

  beatLength = 16;
  cellWidth = width / beatLength;
  cursorPos = 0;
// samples
  oh = loadSound('./sounds/hh_open.wav', () => {});
  hh = loadSound('./sounds/hh_closed.wav', () => {});
  snare = loadSound('./sounds/snare.wav', () => {});
  bass = loadSound('./sounds/kick.wav', () => {});
  sub = loadSound('./sounds/bass_hit.wav', () => {});
// predifined sequence
  ohPat = [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0];
  hPat = [1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1];
  cPat = [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0];
  bPat = [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0];
  subPat = [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  sPat = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

  ohPhrase = new p5.Phrase('oh', (time) => {
    oh.play(time);
  }, ohPat);
  hPhrase = new p5.Phrase('hh', (time) => {
    hh.play(time);
  }, hPat);
  sPhrase = new p5.Phrase('snare', (time) => {
    snare.play(time);
  }, cPat);
  bPhrase = new p5.Phrase('bass', (time) => {
    bass.play(time);
  }, bPat);
  subPhrase = new p5.Phrase('sub', (time) => {
    sub.play(time);
  }, subPat);

  //play button
  playPause = createButton("Play Your Beat!")
    .position(width * .72, 600)
    .mousePressed(() => {
    if (hh.isLoaded() && snare.isLoaded() && bass.isLoaded() && oh.isLoaded() && sub.isLoaded()) {
      if (!drums.isPlaying) {
        userStartAudio();
        drums.loop();
        playPause.html("Pause the Beat")
      } else {
        drums.stop();
        playPause.html("Play Your Beat!")
      }
    } else {
      console.log('drums loading...');
    }
  }) 

//sequence parts
  drums = new p5.Part();

  drums.addPhrase(ohPhrase);
  drums.addPhrase(hPhrase);
  drums.addPhrase(sPhrase);
  drums.addPhrase(bPhrase);
  drums.addPhrase(subPhrase);
  drums.addPhrase('seq', sequence, sPat);
  //BPM Slider
  bpmCTRL = createSlider(10, 250, 80, 1);
  bpmCTRL.position(windowWidth * .25, 550);
  bpmCTRL.addClass('slider');
  bpmCTRL.input(() => {
    drums.setBPM(bpmCTRL.value())
  });
  drums.setBPM('80');

  drawMatrix();
}

//Spacebar Start
function keyPressed() {
  if (key === " ") {
    if (oh.isLoaded() && hh.isLoaded() && snare.isLoaded() && bass.isLoaded() && sub.isLoaded()) {
      if (!drums.isPlaying) {
        userStartAudio();
        drums.loop();
      } else {
        drums.stop();
      }
    } else {
      console.log('drums loading...');
    }
  }
} 

function canvasPressed() {
  let rowClicked = floor(5 * mouseY / height);
  let indexClicked = floor(16 * mouseX / width);
  if (rowClicked === 0) {
    console.log('first row' + indexClicked);
    ohPat[indexClicked] = +!ohPat[indexClicked];
  } else if (rowClicked === 1) {
    console.log('second row');
    hPat[indexClicked] = +!hPat[indexClicked];
  } else if (rowClicked === 2) {
    console.log('third row');
    cPat[indexClicked] = +!cPat[indexClicked];
  } else if (rowClicked === 3) {
    console.log('fourth row');
    bPat[indexClicked] = +!bPat[indexClicked];
  } else if (rowClicked === 4) {
    console.log('fifth row');
    subPat[indexClicked] = +!subPat[indexClicked];
  }
  
  drawMatrix();
}

const drawMatrix = () => {
  background(10);
  stroke('lightgray');
  strokeWeight(1);
  fill('blue');
  for (let i = 0; i < beatLength + 1; i++) {
    line(i * cellWidth, 0, i * cellWidth, height);
  }
  for (let i = 0; i < 6; i++) {
    line(0, i * height / 5, width, i * height / 5);
  }
  stroke('white');
  strokeWeight(1);
  for (let i = 0; i < beatLength; i++) {
    if (ohPat[i] === 1) {
      fill('deepskyblue');
      ellipse(i * cellWidth + 0.5 * cellWidth, height * .6 / 6, 40);
    }
    if (hPat[i] === 1) {
      fill('dodgerblue');
      ellipse(i * cellWidth + 0.5 * cellWidth, height / 3.33, 40);
    }
    if (cPat[i] === 1) {
      fill('yellow');
      ellipse(i * cellWidth + 0.5 * cellWidth, height / 2, 40);
    }
    if (bPat[i] === 1) {
      fill('darkorange')
      ellipse(i * cellWidth + 0.5 * cellWidth, height * 4.2 / 6, 40);
    }
    if (subPat[i] === 1) {
      fill('crimson')
      ellipse(i * cellWidth + 0.5 * cellWidth, height * 5.4 / 6, 40);
    }
  }
}

const sequence = (time, beatIndex) => {
	console.log(beatIndex);
    setTimeout(() => {drawMatrix();
    drawPlayhead(beatIndex);}, time * 1000);
}

const drawPlayhead = (beatIndex) => {
  stroke('limegreen');
  strokeWeight(4)
  fill(0, 255, 10, 30);
  rect((beatIndex - 1) * cellWidth, 0, cellWidth, height);
}

const touchStarted = () => {
  if (getAudioContext().state !== 'running') {
    getAudioContext().loop();
  }
}