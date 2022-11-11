import ZoomPanContainer from './zoompancss.js';
import CanvasDraw from './canvasdraw.js';

const appState = {
  tool: 'move'
}

const zoomPanContainer = new ZoomPanContainer('zoomPanContainer', appState);
const canvasDraw = new CanvasDraw('canvas', appState);

// tool state
document.querySelector('#pen').addEventListener('click', () => {
  appState.tool = 'pen';
  document.getElementById('zoomPanContainer').style.cursor = 'default';
});
document.querySelector('#move').addEventListener('click', () => {
  appState.tool = 'move';
  document.getElementById('zoomPanContainer').style.cursor = 'grab';
});

/*
// init fill canvas width chess patterns
function drawChessPattern() {
  const container = zoomPanContainer.getContainer();
  const canvas = canvasDraw.getCanvas();

  const ctx = canvas.getContext('2d');

  // fill width white
  ctx.fillStyle = '#ffffff';
  //ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.imageSmoothingEnabled = false;
  ctx.webkitImageSmoothingEnabled = false;
  ctx.mozImageSmoothingEnabled = false;

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

  let rgb = [];
  rgb[0] = 255;
  rgb[1] = 50;

  let color = 0;

  for (let i = 0; i < imageData.data.length; i+= 4) {
    imageData.data[i] = rgb[color];
    imageData.data[i+1] = rgb[color];
    imageData.data[i+2] = rgb[color];

    if (color === 0) {
      color = 1;
    } else {
      color = 0;
    }

  }
  console.log(imageData.data);
  // Update the canvas with the new data
  ctx.putImageData(imageData, 0, 0);
}


drawChessPattern();
*/

function init() {
  const container = zoomPanContainer.getContainer();
  const canvas = canvasDraw.getCanvas();

  canvas.style.width = canvas.width+'px';
  canvas.style.maxWidth = canvas.width+'px';
  canvas.style.height = canvas.height+'px';
  canvas.style.maxHeight = canvas.height+'px';

  container.style.width = canvas.width+'px';
  container.style.maxWidth = canvas.width+'px';
  container.style.height = canvas.height+'px';
  container.style.maxHeight = canvas.height+'px';

}

init();
