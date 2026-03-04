AFRAME.registerComponent('show-text-on-click', {
  schema: {
    targetTextId: { type: 'string', default: '' },
    duration: { type: 'int', default: 10000 },
    sound: { type: 'string', default: '' }
  },
  init: function () {
    this.timeoutId = null;

    this.el.addEventListener('click', () => {


      const textEl = document.querySelector(this.data.targetTextId);
      
      if (this.data.sound) {
        const soundEntity = document.querySelector(this.data.sound);
        if (soundEntity && soundEntity.components.sound) {
          soundEntity.components.sound.playSound();
        }
      }



      textEl.setAttribute('visible', true);


      if (this.timeoutId) clearTimeout(this.timeoutId);


      this.timeoutId = setTimeout(() => {
        textEl.setAttribute('visible', false);
        this.timeoutId = null;
      }, this.data.duration);



    });
  }
});
