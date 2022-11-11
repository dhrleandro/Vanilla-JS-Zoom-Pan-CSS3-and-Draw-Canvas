export default class CanvasDraw {

  constructor(canvasId, appState) {
    this.appState = appState;
    this.paintStart = false;
    this.canvas = document.getElementById(canvasId);
    this.ctx = canvas.getContext('2d');

    this.canvas.addEventListener('pointerdown', this.onpointerdown.bind(this));
    window.addEventListener('pointerup', this.onpointerup.bind(this));
    this.canvas.addEventListener('pointermove', this.onpointermove.bind(this));
  }

  onpointerdown(event) {
    const middleButton = (event.button === 1);

    if (this.appState.tool === 'pen' && middleButton === false) {
      this.paintStart = true;
    }
  }

  onpointerup() {
    this.paintStart = false;
  }

  onpointermove(event) {
    const rect = canvas.getBoundingClientRect();
    const mouse = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    }

    // scale
    mouse.x = mouse.x * canvas.width / rect.width;
    mouse.y = mouse.y * canvas.height / rect.height;

    if (this.appState.tool === 'pen' && this.paintStart) {
      this.ctx.fillStyle = 'yellow';
      this.ctx.fillRect(mouse.x - 2, mouse.y - 2, 4, 4);
    }
  }

  getCanvas() {
    return this.canvas;
  }
}
