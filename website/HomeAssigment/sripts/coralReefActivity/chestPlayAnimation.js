AFRAME.registerComponent('play-on-click', {
  init: function () {
    
    this.onClick = () => {
      const mixerComponent = this.el.components['animation-mixer'];
      if (!mixerComponent || !mixerComponent.mixer) return;

      const clipName = 'Scene'; 
      const action = mixerComponent.mixer.clipAction(clipName);
      if (!action) return;

      action.setLoop(THREE.LoopOnce, 1);   
      action.reset();
      action.clampWhenFinished = true;     
      action.play();


      this.el.removeEventListener('click', this.onClick);
    };

    this.el.addEventListener('click', this.onClick);
  }
});