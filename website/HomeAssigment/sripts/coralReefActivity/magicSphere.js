
AFRAME.registerComponent('change-color', {
  init: function () {
    this.changeColorInterval = setInterval(() => {
      const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
      this.el.setAttribute('color', randomColor);
    }, 2000);

    this.el.addEventListener('collide', (e) => {
      const otherEl = e.detail.body.el;
      if (otherEl && otherEl.classList.contains('collidable')) {
        const currentColor = this.el.getAttribute('color');
        otherEl.object3D.traverse((node) => {
          if (node.isMesh && node.material && node.material.color) {
            node.material.color.set(currentColor);
          }
        });

        const whiteCount = countWhiteCorals();
        animal(whiteCount);


      }
    });
  },
  remove: function () {
    clearInterval(this.changeColorInterval);
  }
});

AFRAME.registerComponent('attach-to-camera-while-held', {
  init: function () {
    this.following = false;
    this.camera = document.querySelector('#cameraRig');
    this.offset = new THREE.Vector3(0, 0, -3); 

    this.el.addEventListener('grab-start', () => {
      this.following = true;
      this.el.setAttribute('dynamic-body', 'mass: 0');
    });

    this.el.addEventListener('grab-end', () => {
      this.following = false;
      this.el.setAttribute('dynamic-body', 'mass: 1');
    });
  },

  tick: function () {
    if (!this.following || !this.camera) return;

    const offset = this.offset.clone();
    const cameraObj = this.camera.object3D;
    const targetQuat = new THREE.Quaternion();

    cameraObj.updateMatrixWorld();
    cameraObj.localToWorld(offset);

    cameraObj.getWorldQuaternion(targetQuat);

    this.el.object3D.position.copy(offset);
    this.el.object3D.quaternion.copy(targetQuat);
  }
});