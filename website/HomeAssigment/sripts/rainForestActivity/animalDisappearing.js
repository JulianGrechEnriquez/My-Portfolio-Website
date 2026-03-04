document.addEventListener('DOMContentLoaded', () => {
  let treesCut = 0;

  const jaguar = document.querySelectorAll('.jaguars');
  const frogs = document.querySelectorAll('.frogs');
  const monkey = document.querySelectorAll('.monkeys');

  function setFrogsVisibility(visible) {
    frogs.forEach(frog => frog.setAttribute('visible', visible));
  }
  function setMonkeysVisibility(visible) {
    monkey.forEach(monkey => monkey.setAttribute('visible', visible));
  }
    function setJaguarVisibility(visible) {
    jaguar.forEach(jaguar => jaguar.setAttribute('visible', visible));
  }

  function onTreeCut() {
    treesCut = Math.min(treesCut + 1, 50);

    if (treesCut === 13) {
      setJaguarVisibility(false)
    }
    if (treesCut === 26) {
      setFrogsVisibility(false);
    }

    if (treesCut === 38) {
      setMonkeysVisibility(false);
    }
    console.log(treesCut)
  }

  function onTreeGrow() {
    treesCut = Math.max(treesCut - 1, 0);

    if (treesCut < 13 ) {
      setJaguarVisibility(true);;
    }
    if (treesCut < 26) {
      setFrogsVisibility(true);
    }
    if (treesCut < 38) {
      setMonkeysVisibility(true);
    }
  }

  window.onTreeCut = onTreeCut;
  window.onTreeGrow = onTreeGrow;
});


