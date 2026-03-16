AFRAME.registerComponent('chainsaw-cuts-tree', {
  schema: {
    sound: { type: 'string', default: '#chainsawSound' }
  },
  init: function () {
    const el = this.el;
    el.addEventListener('collide', (e) => {
      const collidedEl = e.detail.body.el;
      if (!collidedEl) return;

      if (collidedEl.classList && collidedEl.classList.contains('tree') && collidedEl.getAttribute('visible')) {
  
        const soundEntity = document.querySelector(this.data.sound);
        if (soundEntity && soundEntity.components.sound) {
          soundEntity.components.sound.playSound();
        }


        
        if (collidedEl.components['tree-fall-animation'] && collidedEl.components['tree-fall-animation'].isFalling) return;

      
        collidedEl.components['tree-fall-animation'].startFall();

       
        collidedEl.addEventListener('fall-complete', () => {
          collidedEl.setAttribute('visible', 'false');

          const treeId = collidedEl.getAttribute('id');
          const spotId = treeId.replace('tree', 'tree-spot');
          const spot = document.getElementById(spotId);
          if (spot) spot.setAttribute('visible', 'true');

          onTreeCut();



        }, { once: true });
      }
    });
  }
});

AFRAME.registerComponent('attach-to-camera-while-held', {
  init: function () {
    this.following = false;
    this.camera = document.querySelector('#cameraRig');
    this.offset = new THREE.Vector3(0.3, -0.5, -0.5); 

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



