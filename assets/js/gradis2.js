// get initial elements
const players = document.querySelectorAll('lottie-player');
const feetPlayer = document.getElementById('feet');
const bodyArmsPlayer = document.getElementById('bodyarms');
const headPlayer = document.getElementById('head');
const facePlayer = document.getElementById('face');
const backgroundPlayer = document.getElementById('gradis-background');
const gmContainer = document.querySelector('.gmContainer');
const toggleButton = document.getElementById('toggle-play');

let amIReady;
let feetReady = false;
let bodyArmsReady = false;
let headReady = false;
// let eyesReady = false;
// let pupilsReady = false;
let faceReady = false;
let backgroundReady = false;

let mainColor = '';
let headColors = [];
let headStops = [];
let earStops = [];
let bodyColors = [];
let bodyStops = [];
let splitedTokenId = null;
let currentSpecie;
let randomBodyNumber;
let selectedBackgroundColor;
let numberOfHeadStops;
let numberOfTotalColors;
let numberOfBodyStops;
let amountOfBodyColorsPosition;

// the seed for a random function
let seed = parseInt(window.gradis.random_hash().slice(0, 16), 16);
// the random function
const R = new window.gradis.Random(seed);

function getDomElements() {
  window.gradisHead = headPlayer.shadowRoot.querySelectorAll('radialGradient');
  window.gradisBody =
    bodyArmsPlayer.shadowRoot.querySelectorAll('radialGradient');
  window.gradisFeet = feetPlayer.shadowRoot.querySelectorAll('radialGradient');
  window.gradisBackground =
    backgroundPlayer.shadowRoot.querySelectorAll('path');
  setInitColors();
}

function setInitColors() {
  const initHeadColors = currentSpecie.initHeadColors;
  const initEarsColors = currentSpecie.initEarsColors;
  const initBodyColors = currentSpecie.initBodyColors;
  const initiArmsColors = currentSpecie.initiArmsColors;
  const initiFeetColors = currentSpecie.initFeetColors;

  initHeadColors.forEach((headStop) => {
    for (
      let index = 0;
      index < window.gradisHead[headStop].children.length;
      index++
    ) {
      window.gradisHead[headStop].children[index].attributes[
        'stop-color'
      ].value = '';
    }
  });

  initEarsColors.forEach((earColor) => {
    for (
      let index = 0;
      index < window.gradisHead[earColor].children.length;
      index++
    ) {
      window.gradisHead[earColor].children[index].attributes[
        'stop-color'
      ].value = '';
    }
  });

  initBodyColors.forEach((bodyColor) => {
    for (
      let index = 0;
      index < window.gradisBody[bodyColor].children.length;
      index++
    ) {
      window.gradisBody[bodyColor].children[index].attributes[
        'stop-color'
      ].value = '';
    }
  });

  initiArmsColors.forEach((armColors) => {
    for (
      let index = 0;
      index < window.gradisBody[armColors].children.length;
      index++
    ) {
      window.gradisBody[armColors].children[index].attributes[
        'stop-color'
      ].value = '';
    }
  });

  initiFeetColors.forEach((foottColors) => {
    for (
      let index = 0;
      index < window.gradisFeet[foottColors].children.length;
      index++
    ) {
      window.gradisFeet[foottColors].children[index].attributes[
        'stop-color'
      ].value = '';
    }
  });

  if (
    window.GRADIS_SPECIE != '10' &&
    window.GRADIS_SPECIE != '12' &&
    window.GRADIS_SPECIE != '14' &&
    window.GRADIS_SPECIE != '15' &&
    window.GRADIS_SPECIE != '17' &&
    window.GRADIS_SPECIE != '18' &&
    window.GRADIS_SPECIE != '20' &&
    window.GRADIS_SPECIE != '21' &&
    window.GRADIS_SPECIE != '23' &&
    window.GRADIS_SPECIE != '27' &&
    window.GRADIS_SPECIE != '33' &&
    window.GRADIS_SPECIE != '37' &&
    window.GRADIS_SPECIE != '38'
  ) {
    window.gradisHead[5].children[4].attributes['offset'].value = '85%';
    window.gradisHead[5].children[4].attributes['stop-opacity'].value = '0';
  }
}

function removeStopColors() {
  const headStopsToRemove = currentSpecie.removeHeadStops;
  const earsStopsToRemove = currentSpecie.removeEarsStops;
  const bodyStopsToRemove = currentSpecie.removeBodyStops;
  const feetStopsToRemove = currentSpecie.removeFeetStops;

  headStopsToRemove.forEach((headStop) => {
    for (
      let index = 0;
      index < window.gradisHead[headStop].children.length;
      index++
    ) {
      if (
        window.gradisHead[headStop].children[index].attributes['stop-color']
          .value === ''
      ) {
        window.gradisHead[headStop].children[index].remove();
      }
    }
  });

  earsStopsToRemove.forEach((earStop) => {
    for (
      let index = 0;
      index < window.gradisHead[earStop].children.length;
      index++
    ) {
      if (
        window.gradisHead[earStop].children[index].attributes['stop-color']
          .value === ''
      ) {
        window.gradisHead[earStop].children[index].remove();
      }
    }
  });

  bodyStopsToRemove.forEach((bodyStop) => {
    for (
      let index = 0;
      index < window.gradisBody[bodyStop].children.length;
      index++
    ) {
      if (
        window.gradisBody[bodyStop].children[index].attributes['stop-color']
          .value === ''
      ) {
        window.gradisBody[bodyStop].children[index].remove();
      }
    }
  });

  feetStopsToRemove.forEach((footStop) => {
    for (
      let index = 0;
      index < window.gradisFeet[footStop].children.length;
      index++
    ) {
      if (
        window.gradisFeet[footStop].children[index].attributes['stop-color']
          .value === ''
      ) {
        window.gradisFeet[footStop].children[index].remove();
      }
    }
  });
}

function setEarStops(numberOfTotalColors) {
  switch (numberOfTotalColors) {
    case 0:
      earStops.push({
        color: mainColor,
        offset: '100%',
      });
      break;
    case 1:
      earStops.push({
        color: headColors[0],
        offset: '0%',
      });
      earStops.push({
        color: mainColor,
        offset: '100%',
      });
      break;
    case 2:
      earStops.push({
        color: headColors[0],
        offset: '0%',
      });
      earStops.push({
        color: headColors[1],
        offset: '50%',
      });
      earStops.push({
        color: mainColor,
        offset: '100%',
      });
      break;
    case 3:
      earStops.push({
        color: headColors[0],
        offset: '0%',
      });
      earStops.push({
        color: headColors[1],
        offset: '50%',
      });
      earStops.push({
        color: mainColor,
        offset: '80%',
      });
      break;

    default:
      break;
  }
}

function coloringEars() {
  const earsNodes = currentSpecie.ears;
  earStops.forEach((earStop, index) => {
    earsNodes.forEach((earNode) => {
      window.gradisHead[earNode].children[index].attributes[
        'stop-color'
      ].value = earStop.color;
      window.gradisHead[earNode].children[index].attributes['offset'].value =
        earStop.offset;
    });
  });
}

function setHeadStops(numberOfHeadStops) {
  switch (numberOfHeadStops) {
    case 1:
      headStops.push({
        color: mainColor,
        offset: '80%',
      });
      break;
    case 2:
      headStops.push({
        color: headColors[0],
        offset: '1%',
      });
      headStops.push({
        color: mainColor,
        offset: '80%',
      });
      break;
    case 3:
      headStops.push({
        color: headColors[0],
        offset: '1%',
      });
      headStops.push({
        color: headColors.length === 2 ? headColors[1] : headColors[0],
        offset: '50%',
      });
      headStops.push({
        color: mainColor,
        offset: '80%',
      });
      break;
    case 4:
      headStops.push({
        color: headColors[0],
        offset: '1%',
      });
      headStops.push({
        color: headColors.length === 2 ? headColors[1] : headColors[0],
        offset: '65%',
      });
      headStops.push({
        color: headColors[0],
        offset: '75%',
      });
      headStops.push({
        color: mainColor,
        offset: '80%',
      });
      break;
    case 8:
      headStops.push({
        color: headColors[0],
        offset: '1%',
      });
      headStops.push({
        color: headColors.length === 2 ? headColors[1] : headColors[0],
        offset: '35%',
      });
      headStops.push({
        color: headColors[0],
        offset: '55%',
      });
      headStops.push({
        color: headColors.length === 2 ? headColors[1] : headColors[0],
        offset: '66%',
      });
      headStops.push({
        color: headColors[0],
        offset: '69%',
      });
      headStops.push({
        color: headColors.length === 2 ? headColors[1] : headColors[0],
        offset: '74%',
      });
      headStops.push({
        color: headColors[0],
        offset: '77%',
      });
      headStops.push({
        color: mainColor,
        offset: '80%',
      });
      break;
    default:
      break;
  }
}

function setBodyStops(numberOfBodyStops) {
  switch (numberOfBodyStops) {
    case 1:
      bodyStops.push({
        color: mainColor,
        offset: '80%',
      });
      break;
    case 2:
      bodyStops.push({
        color: bodyColors[0],
        offset: '1%',
      });
      bodyStops.push({
        color: mainColor,
        offset: '80%',
      });
      break;
    case 3:
      bodyStops.push({
        color: bodyColors[0],
        offset: '1%',
      });
      bodyStops.push({
        color: bodyColors.length === 2 ? bodyColors[1] : bodyColors[0],
        offset: '60%',
      });
      bodyStops.push({
        color: mainColor,
        offset: '80%',
      });
      break;

    default:
      break;
  }
}

function coloringHeadAndEars() {
  if (numberOfHeadStops === 1) {
    numberOfTotalColors = 0;
  } else if (numberOfHeadStops === 2) {
    numberOfTotalColors = 1;
  } else {
    numberOfTotalColors = splitedTokenId
      ? parseInt(splitedTokenId[5])
      : R.random_choice(window.GRADIS_AMOUNT_OF_COLORS);
  }

  if (numberOfHeadStops !== 1 && !splitedTokenId) {
    for (let index = 0; index < numberOfTotalColors; index++) {
      headColors.push(R.random_choice(window.GRADIS_SECONDARY_COLORS));
    }
  } else if (splitedTokenId && numberOfHeadStops !== 1) {
    const headAmountOfColors = splitedTokenId[5];
    const headColorsPosition = {
      '01': [6],
      '02': [6, 7],
      '03': [6, 7, 8],
    };
    headColorsPosition[headAmountOfColors].map((colors) =>
      headColors.push(window.SECONDARY_COLORS[parseInt(splitedTokenId[colors])])
    );

    console.log('HEAD COLORS', headColors);
  }
  setHeadStops(numberOfHeadStops);

  setEarStops(numberOfTotalColors, numberOfHeadStops);
  // window.gradisHead[0] right ear
  // window.gradisHead[2] left ear
  // window.gradisHead[4] head

  const headNodes = currentSpecie.head;
  headNodes.forEach((headNode) => {
    // console.log(headNode);
    for (let index = 0; index < headStops.length; index++) {
      try {
        window.gradisHead[headNode].children[index].attributes[
          'stop-color'
        ].value = headStops[index].color;
        window.gradisHead[headNode].children[index].attributes['offset'].value =
          headStops[index].offset;
      } catch (error) {}
    }
  });

  coloringEars(); // this also coloring the species number 10
}

function coloringArmsAndHands(i) {
  // gradisBody[0] right hand
  // gradisBody[2] right arm
  // gradisBody[4] left hand
  // gradisBody[6] left arm
  // gradisBody[8] body
  // right hand
  window.gradisBody[0].children[i].attributes['stop-color'].value =
    bodyStops[i].color;
  window.gradisBody[0].children[i].attributes['offset'].value =
    bodyStops[i].offset;
  // right arm
  window.gradisBody[2].children[i].attributes['stop-color'].value =
    bodyStops[i].color;
  window.gradisBody[2].children[i].attributes['offset'].value =
    bodyStops[i].offset;
  // left hand
  window.gradisBody[4].children[i].attributes['stop-color'].value =
    bodyStops[i].color;
  window.gradisBody[4].children[i].attributes['offset'].value =
    bodyStops[i].offset;
  // left arm
  window.gradisBody[6].children[i].attributes['stop-color'].value =
    bodyStops[i].color;
  window.gradisBody[6].children[i].attributes['offset'].value =
    bodyStops[i].offset;
}

function coloringFeet(i) {
  // gradisFeet[0] left foot
  // gradisFeet[2] right foot

  // left foot
  window.gradisFeet[0].children[i].attributes['stop-color'].value =
    bodyStops[i].color;
  window.gradisFeet[0].children[i].attributes['offset'].value =
    bodyStops[i].offset;
  // right foot
  window.gradisFeet[2].children[i].attributes['stop-color'].value =
    bodyStops[i].color;
  window.gradisFeet[2].children[i].attributes['offset'].value =
    bodyStops[i].offset;
}

function coloringBodyHandsArms() {
  // const numberOfBodyStops = 3;
  let numberOfTotalColors;
  if (numberOfBodyStops === 1) {
    numberOfTotalColors = 0;
  } else if (numberOfBodyStops === 2) {
    numberOfTotalColors = 1;
  } else {
    if (splitedTokenId) {
      // const headAmountOfColors = splitedTokenId[5];

      // const bodyStopPosition = {
      //   '01': 7,
      //   '02': 8,
      //   '03': 9,
      // };
      // console.log('>>>', splitedTokenId[5]);
      // amountOfBodyColorsPosition = bodyStopPosition[headAmountOfColors] + 1;

      numberOfTotalColors = parseInt(
        splitedTokenId[amountOfBodyColorsPosition]
      );
    } else {
      numberOfTotalColors = R.random_choice(
        window.GRADIS_AMOUNT_OF_BODY_COLORS
      );
    }
  }

  if (numberOfBodyStops !== 1 && !splitedTokenId) {
    for (let index = 0; index < numberOfTotalColors; index++) {
      bodyColors.push(R.random_choice(window.GRADIS_SECONDARY_COLORS));
    }
  } else if (splitedTokenId && numberOfHeadStops !== 1) {
    const bodyAmountOfSecondaryCurrentColors =
      splitedTokenId[amountOfBodyColorsPosition];

    const bodyColorsPosition = {
      '01': [amountOfBodyColorsPosition + 1],
      '02': [amountOfBodyColorsPosition + 1, amountOfBodyColorsPosition + 2],
      '03': [
        amountOfBodyColorsPosition + 1,
        amountOfBodyColorsPosition + 2,
        amountOfBodyColorsPosition + 3,
      ],
    };

    bodyColorsPosition[bodyAmountOfSecondaryCurrentColors.toString()].forEach(
      (position) => {
        bodyColors.push(
          window.SECONDARY_COLORS[parseInt(splitedTokenId[position])]
        );
      }
    );
  }
  console.log('BODY COLORS', bodyColors);

  setBodyStops(numberOfBodyStops);

  // coloring body, hands and Arms
  // gradisBody[0] right hand
  // gradisBody[2] right arm
  // gradisBody[4] left hand
  // gradisBody[6] left arm
  // gradisBody[8] body
  for (let index = 0; index < bodyStops.length; index++) {
    window.gradisBody[8].children[index].attributes['stop-color'].value =
      bodyStops[index].color;
    window.gradisBody[8].children[index].attributes['offset'].value =
      bodyStops[index].offset;
    coloringArmsAndHands(index);
    coloringFeet(index);
  }
}

function coloringBackground() {
  window.gradisBackground[0].attributes['fill'].value = selectedBackgroundColor;
  document.body.style.backgroundColor = selectedBackgroundColor;
  // window.gradisBackground[0].attributes['fill'].value = '#fff';
  // document.body.style.backgroundColor = '#fff';
}

function getTokenId() {
  const urlParams = new URLSearchParams(window.location.search);
  const tokenId = urlParams.get('tokenid');
  if (!tokenId) {
    const randomSpecieNumber =
      window.GRADIS_RANDOM_SPECIES[R.random_int(0, 199)];
    window.GRADIS_SPECIE = randomSpecieNumber;
    currentSpecie = window.GRADIS_SPECIE_INFO[window.GRADIS_SPECIE];
    randomBodyNumber = window.GRADIS_RANDOM_BODY[R.random_int(0, 99)];
    mainColor = R.random_choice(window.GRADIS_BASE_COLORS);
    numberOfHeadStops = R.random_choice(window.GRADIS_HEAD_STOPS);
    numberOfBodyStops = R.random_choice(window.GRADIS_BODY_STOPS);

    selectedBackgroundColor =
      window.GRADIS_BACKGROUND_COLORS[R.random_int(0, 99)];
  } else {
    console.log('<<<<TOKEN ID>>>>', tokenId);
    splitedTokenId = tokenId.match(/.{2}/g);
    window.GRADIS_SPECIE = splitedTokenId[1].toString();
    currentSpecie = window.GRADIS_SPECIE_INFO[window.GRADIS_SPECIE];
    console.log('GRADIS_SPECIE', window.GRADIS_SPECIE);
    randomBodyNumber = splitedTokenId[2].toString();
    console.log('BODY', randomBodyNumber);
    mainColor = window.BASE_COLORS[parseInt(splitedTokenId[3])];
    console.log('MAINCOLOR', mainColor);
    numberOfHeadStops = parseInt(splitedTokenId[4]);
    console.log('HEAD STOPS', splitedTokenId[4]);

    // get body stops
    const headAmountOfColors = splitedTokenId[5];
    console.log('HEAD AMOUNT OF COLORS', splitedTokenId[5]);

    const bodyStopPosition = {
      '01': 7,
      '02': 8,
      '03': 9,
    };

    console.log('BODY STOP POSITION', bodyStopPosition[headAmountOfColors]);
    console.log(
      'BODY STOPS',
      splitedTokenId[bodyStopPosition[headAmountOfColors]]
    );
    amountOfBodyColorsPosition = bodyStopPosition[headAmountOfColors] + 1;
    numberOfBodyStops = parseInt(
      splitedTokenId[bodyStopPosition[headAmountOfColors]]
    );

    console.log('BODY STOPS REAL', numberOfBodyStops);

    console.log('BACKGROUND', splitedTokenId[splitedTokenId.length - 1]);
    selectedBackgroundColor =
      window.BACKGROUND_COLORS[
        parseInt(splitedTokenId[splitedTokenId.length - 1])
      ];
  }
}

function coloringGradis() {
  getDomElements();
  coloringHeadAndEars();
  coloringBodyHandsArms();
  coloringBackground();
  removeStopColors();
  removeStopColors();
  removeStopColors();
  removeStopColors();
  removeStopColors();
  gmContainer.style.display = 'none';
}

function playAll() {
  if (feetReady & bodyArmsReady & headReady & faceReady) {
    clearInterval(amIReady);
    feetPlayer.setLooping(true);
    feetPlayer.play();
    bodyArmsPlayer.setLooping(true);
    bodyArmsPlayer.play();
    headPlayer.setLooping(true);
    headPlayer.play();
    facePlayer.setLooping(true);
    facePlayer.play();
    window.GRADIS_ANIMATION = true;
  } else {
    console.log('not ready, yet!');
  }
}

function stopAll() {
  feetPlayer.pause();
  bodyArmsPlayer.pause();
  headPlayer.pause();
  facePlayer.pause();
  window.GRADIS_ANIMATION = false;
}

function tootleAnimation() {
  if (window.GRADIS_ANIMATION) {
    stopAll();
  } else {
    playAll();
  }
}

window.addEventListener('load', (event) => {
  window.GRADIS_ANIMATION = false;
  getTokenId();
  feetPlayer.load(`./assets/gradis/feet_${randomBodyNumber}.json`);
  bodyArmsPlayer.load(`./assets/gradis/body_and_arms_${randomBodyNumber}.json`);
  headPlayer.load(`./assets/gradis/head_${window.GRADIS_SPECIE}.json`);
  facePlayer.load(`./assets/gradis/face_${window.GRADIS_SPECIE}.json`);

  feetPlayer.addEventListener('ready', () => {
    feetReady = true;
  });
  bodyArmsPlayer.addEventListener('ready', () => {
    bodyArmsReady = true;
  });
  headPlayer.addEventListener('ready', () => {
    headReady = true;
  });
  facePlayer.addEventListener('ready', () => {
    faceReady = true;
  });

  // document.addEventListener('click', () => {
  //   window.GRADIS_ANIMATION === true ? stopAll() : playAll();
  // });

  toggleButton.addEventListener('click', () => tootleAnimation());

  // amIReady = setInterval(playAll, 200);

  if (players[4].getLottie() !== null || players[6].getLottie() !== undefined) {
    setTimeout(function () {
      coloringGradis();
    }, 2000);
  }
});
