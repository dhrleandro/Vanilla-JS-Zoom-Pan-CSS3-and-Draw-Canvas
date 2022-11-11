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
