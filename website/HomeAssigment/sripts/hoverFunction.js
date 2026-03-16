AFRAME.registerComponent('spin-on-hover', {
      schema: { spotlightId: { type: 'string' } },
      init: function () {
        this.isHovered = false;
        this.rotationSpeed = 0.5;
        this.originalScale = new THREE.Vector3();
        this.scaleFactor = 1.5;

        this.el.addEventListener('mouseenter', () => {
          this.isHovered = true;
          const spotlight = document.querySelector(this.data.spotlightId);
          if (spotlight) spotlight.setAttribute('visible', true);
          this.el.object3D.scale.set(
            this.originalScale.x * this.scaleFactor,
            this.originalScale.y * this.scaleFactor,
            this.originalScale.z * this.scaleFactor
          );
        });

        this.el.addEventListener('mouseleave', () => {
          this.isHovered = false;
          const spotlight = document.querySelector(this.data.spotlightId);
          if (spotlight) spotlight.setAttribute('visible', false);
          this.el.object3D.scale.copy(this.originalScale);
        });
      },
      tick: function () {
        if (!this.isHovered) {
          const rotation = this.el.getAttribute('rotation');
          this.el.setAttribute('rotation', {
            x: rotation.x,
            y: rotation.y + this.rotationSpeed,
            z: rotation.z
          });
        }
      },
      update: function () {
        this.originalScale.copy(this.el.object3D.scale);
      }
    });