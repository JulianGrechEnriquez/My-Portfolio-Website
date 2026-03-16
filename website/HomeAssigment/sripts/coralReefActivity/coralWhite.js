AFRAME.registerComponent('set-white-color', {
  init: function () {
    this.el.addEventListener('model-loaded', () => {
      this.el.object3D.traverse((node) => {
        if (node.isMesh && node.material && node.material.color) {
          node.material.color.set('#ffffff');
        }
      });
    });
  }
});

function countWhiteCorals() {
  const coralEls = document.querySelectorAll('.reef-coral');
  let whiteCount = 0;

  coralEls.forEach((el) => {
    el.object3D.traverse((node) => {
      if (node.isMesh && node.material && node.material.color) {
        const colorHex = '#' + node.material.color.getHexString().toLowerCase();
        if (colorHex === '#ffffff') {
          whiteCount++;
          return;
        }
      }
    });
  });


  return whiteCount;
}



function animal(whiteCount) {
  const seaTurtles = document.querySelectorAll('.seaturtel');
  const clownfish = document.querySelectorAll('.clownfish');
  const hermitcrab = document.querySelectorAll('.hermitcrab');
  const shark = document.querySelectorAll('.shark');
  if (whiteCount < 45) {
    seaTurtles.forEach(turtle => {
      turtle.setAttribute('visible', true);
    });
  }
  if (whiteCount < 35) {
    clownfish.forEach(clownfish => {
      clownfish.setAttribute('visible', true);

    });
  }
  if (whiteCount < 25) {
    hermitcrab.forEach(hermitcrab => {
      hermitcrab.setAttribute('visible', true);

    });
  }

  if (whiteCount < 15) {
    shark.forEach(shark => {
      shark.setAttribute('visible', true);

    });
  }

}
