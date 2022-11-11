export default class CanvasDraw {

  constructor(canvasId, appState) {
    this.appState = appState;
    this.paintStart = false;
    this.canvas = document.getElementById(canvasId);
    this.ctx = canvas.getContext('2d');
    this.lastPoint = {x: 0, y: 0};

    this.canvas.addEventListener('pointerdown', this.onpointerdown.bind(this));
    window.addEventListener('pointerup', this.onpointerup.bind(this));
    this.canvas.addEventListener('pointermove', this.onpointermove.bind(this));
  }

  getOffsetPoint(event) {
    const rect = this.canvas.getBoundingClientRect();

    const mouse = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    }

    // scale
    mouse.x = mouse.x * canvas.width / rect.width;
    mouse.y = mouse.y * canvas.height / rect.height;

    return mouse;
  }

  onpointerdown(event) {
    const middleButton = (event.button === 1);

    if (this.appState.tool === 'pen' && middleButton === false) {
      this.paintStart = true;
      this.lastPoint = this.getOffsetPoint(event);
    }
  }

  onpointerup(event) {
    this.paintStart = false;
    this.lastPoint = this.getOffsetPoint(event);
  }

  onpointermove(event) {
    const mouse = this.getOffsetPoint(event);

    if (this.appState.tool === 'pen' && this.paintStart) {
      this.ctx.fillStyle = 'yellow';
      this.ctx.lineWidth = 8;
      this.ctx.lineCap = 'round';
      this.ctx.beginPath();
      this.ctx.moveTo(this.lastPoint.x, this.lastPoint.y);
      this.ctx.lineTo(mouse.x, mouse.y);
      this.ctx.stroke();
    }
    this.lastPoint = mouse;
  }

  getCanvas() {
    return this.canvas;
  }
}
