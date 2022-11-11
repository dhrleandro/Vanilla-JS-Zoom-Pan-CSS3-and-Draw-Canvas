export default class ZoomPanContainer {
  constructor(containerId, appState) {
    this.appState = appState;
    this.scale = 1,
    this.panning = false,
    this.pointX = 0,
    this.pointY = 0,
    this.start = { x: 0, y: 0 },
    this.zoom = document.getElementById(containerId);

    window.addEventListener('pointerdown', this.onmousedown.bind(this));
    window.addEventListener('pointerup', this.onmouseup.bind(this));
    window.addEventListener('pointermove', this.onmousemove.bind(this));
    window.addEventListener('wheel', this.onwheel.bind(this));

    this.mouseMiddleButton = false;
  }

  setTransform() {
    this.zoom.style.transform = "translate(" + this.pointX + "px, " + this.pointY + "px) scale(" + this.scale + ")";
  }

  onmousedown(e) {
    // https://stackoverflow.com/questions/1795734/triggering-onclick-event-using-middle-click
    // https://www.w3.org/TR/pointerevents/#the-button-property
    const middleButton = (e.button === 1);
    this.mouseMiddleButton = middleButton;

    // permite mover se a ferramenta for 'move' ou se estiver usando a roda do mouse (que não interferirá no desenho)
    if (this.appState.tool !== 'move' && middleButton === false) return;

    e.preventDefault();
    this.start = { x: e.clientX - this.pointX, y: e.clientY - this.pointY };
    this.panning = true;
  }

  onmouseup(e) {
    const middleButton = (e.button === 1);
    this.mouseMiddleButton = false;

    if (this.appState.tool !== 'move' && middleButton === false) return;

    this.panning = false;
  }

  onmousemove(e) {
    if (this.appState.tool !== 'move' && this.mouseMiddleButton === false) return;
    if (!this.panning) {
      return;
    }
    this.pointX = (e.clientX - this.start.x);
    this.pointY = (e.clientY - this.start.y);
    this.setTransform();
  }

  onwheel(e) {
    var xs = (e.clientX - this.pointX) / this.scale,
      ys = (e.clientY - this.pointY) / this.scale,
      delta = (e.wheelDelta ? e.wheelDelta : -e.deltaY);
    (delta > 0) ? (this.scale *= 1.2) : (this.scale /= 1.2);
    this.pointX = e.clientX - xs * this.scale;
    this.pointY = e.clientY - ys * this.scale;

    this.setTransform();
  }
}
