
AFRAME.registerComponent('tree-fall-animation', {
  schema: {
    duration: { type: 'number', default: 2000 }
  },
  init: function () {
    this.startTime = null;
    this.isFalling = false;
    this.originalRotation = this.el.object3D.rotation.clone();

    
    this.sound = this.el.querySelector('a-sound');
  },
  startFall: function () {
    this.isFalling = true;
    this.startTime = null;

    if (this.sound && this.sound.components.sound) {
      if (this.sound.components.sound.isPlaying) {
        this.sound.components.sound.stopSound(); 
      }
      this.sound.components.sound.playSound();
    }
  },
  tick: function (time) {
    if (!this.isFalling) return;

    if (!this.startTime) this.startTime = time;
    const elapsed = time - this.startTime;
    const progress = Math.min(elapsed / this.data.duration, 1);

    this.el.object3D.rotation.x = this.originalRotation.x + progress * (-Math.PI / 2);

    if (progress >= 1) {
      this.isFalling = false;
      this.el.emit('fall-complete');
    }
  }
});



