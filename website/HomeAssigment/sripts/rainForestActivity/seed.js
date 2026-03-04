function spawnNewSeed() {
  const scene = document.querySelector("a-scene");

  // Create the seed model entity first
  const seedModel = document.createElement("a-entity");
  seedModel.setAttribute("gltf-model", "#seed");
  seedModel.setAttribute("scale", "0.050 0.050 0.050");
  seedModel.setAttribute("position", { x: -2, y: 0.310, z: -0.584 });
  seedModel.setAttribute("grabbable", "");
  seedModel.setAttribute("draggable", "");
  seedModel.setAttribute("dynamic-body", {
    shape: "sphere",
    mass: 1,
    linearDamping: 0.9,
    angularDamping: 0.9,
  });

  
  seedModel.classList.add("seed");
  seedModel.setAttribute("seed-behavior", "");


  scene.appendChild(seedModel);
}



AFRAME.registerComponent("seed-behavior", {
  init: function () {
    this.checkInterval = setInterval(() => this.check(), 500);
  },

  check: function () {
    const seed = this.el;
    const pos = seed.object3D.position;


    const spots = document.querySelectorAll(".tree-spot");
    for (let i = 0; i < spots.length; i++) {
      const spot = spots[i];
      const spotPos = spot.object3D.position;
      const dist = pos.distanceTo(spotPos);

      if (dist < 1 && spot.getAttribute("visible")) {

        const treeId = spot.dataset.treeId;

        const tree = document.getElementById(treeId);
        if (tree) {

          tree.setAttribute('visible', 'true');
          tree.object3D.rotation.set(0, 0, 0);

          onTreeGrow();
        }


        spot.setAttribute("visible", "false");


        seed.parentNode.removeChild(seed);


        spawnNewSeed();


        break;
      }
    }
  }
});


window.addEventListener("load", () => {
  spawnNewSeed();
});
