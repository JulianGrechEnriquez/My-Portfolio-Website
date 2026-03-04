
AFRAME.registerComponent('temp-controller', {
  init: function () {
    this.temp = -10;
    this.textEl = document.querySelector('#temperatureText');
    this.boxEls = document.querySelectorAll('.iceBox');
    this.snowSystem = document.querySelector('#snowSystem');

    const baseScale = 10;

    this.updateVisuals = () => {
      this.textEl.setAttribute('text', {
        value: `Temperature: ${this.temp}°C`,
        color: 'white',
        width: 4
      });



      this.boxEls.forEach(box => {
        if (this.temp >= 35) {
          box.setAttribute('visible', 'false');
        } else {
          box.setAttribute('visible', 'true');
          let scaleFactor = Math.max(0.2, Math.min(2, 1 - this.temp * 0.05));
          let newScale = baseScale * scaleFactor;
          box.setAttribute('scale', `${newScale} ${newScale} ${newScale}`);
        }
      });

      let clampedTemp = Math.max(-5, Math.min(34, this.temp));
      let particleCount = Math.max(100, 5000 - (clampedTemp + 10) * 100);
      this.snowSystem.setAttribute('particle-system', 'particleCount', particleCount);


      document.querySelectorAll('.penguin').forEach(p => {
        p.setAttribute('visible', this.temp <= 5);
      });

      document.querySelectorAll('.wolf').forEach(wolf => {
        wolf.setAttribute('visible', this.temp <= 10);
      });

      document.querySelectorAll('.seal').forEach(seal => {
        seal.setAttribute('visible', this.temp <= 15);
      });


      document.querySelectorAll('.polarbear').forEach(bear => {
        bear.setAttribute('visible', this.temp <= 30);
      });





    };


    document.querySelector('#increaseBtn').addEventListener('click', () => {
      this.temp = Math.min(this.temp + 5, 40);
      this.updateVisuals();
    });

    document.querySelector('#decreaseBtn').addEventListener('click', () => {
      this.temp = Math.max(this.temp - 5, -10);
      this.updateVisuals();
    });

    this.updateVisuals();
  }
});


document.querySelector('a-scene').setAttribute('temp-controller', '');