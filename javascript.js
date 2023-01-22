const canvas = document.getElementById("main-canvas");

window.onload = function () {
  const context = canvas.getContext("2d");
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;

  window.onresize = function () {
    resizeCanvas();
    drawFractal();
    updateSlider();
  };

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  //settings
  context.lineCap = "round";

  // canvas variables
  const maxLevel = 5;
  const branches = 2;

  let size =
    canvas.width < canvas.height ? canvas.width * 0.2 : canvas.height * 0.2;

  let sides = 5;
  let spread = 0.5;
  let scale = 0.5;
  let color = "hsl(" + Math.random() * 360 + ", 100%, 50%)";
  let lineWidth = 15;

  //canvas shadow
  context.shadowColor = "rgba(0, 0, 0, 0.7)";
  context.shadowOffsetX = 8;
  context.shadowOffsetX = 4;
  context.shadowBlur = 10;

  //controls
  const randomButton = document.getElementById("random-button");
  const resetButton = document.querySelector("#reset-button");
  const spreadSlider = document.querySelector("#spread");
  const spreadLabel = document.querySelector('[for="spread"]');
  const sidesSlider = document.querySelector("#sides");
  const sidesLabel = document.querySelector('[for="sides"]');

  spreadSlider.addEventListener("change", function (e) {
    spread = e.target.value;
    updateSlider();
    drawFractal();
  });

  sidesSlider.addEventListener("change", function (e) {
    sides = e.target.value;
    updateSlider();
    drawFractal();
  });

  function drawBranch(level) {
    if (level > maxLevel) return;
    context.beginPath();
    context.moveTo(0, 0), context.lineTo(size, 0);
    context.stroke();
    for (let i = 0; i < branches; i++) {
      context.save();
      context.translate(size - (size / branches) * i, 0);
      context.scale(scale, scale);

      context.save();
      context.rotate(spread);
      drawBranch(level + 1);
      context.restore();

      context.save();
      context.rotate(-spread);
      drawBranch(level + 1);
      context.restore();

      context.restore();
    }
  }
  function drawFractal() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.save();
    context.lineWidth = lineWidth;
    context.strokeStyle = color;

    context.translate(canvas.width / 2, canvas.height / 2);

    for (let i = 0; i < sides; i++) {
      context.rotate((Math.PI * 2) / sides);
      drawBranch(0);
    }
    context.restore();
  }
  drawFractal();
  updateSlider();

  function randomizeFractal() {
    sides = Math.floor(Math.random() * 7 + 3);
    scale = Math.random() * 0.3 + 0.3;
    spread = Math.random() * 2.8 + 0.1;
    color = "hsl(" + Math.random() * 360 + ", 100%, 50%)";
  }

  randomButton.addEventListener("click", function () {
    randomizeFractal();
    updateSlider();
    drawFractal();
  });

  resetButton.addEventListener("click", function () {
    resetFractal();
    updateSlider();
    drawFractal();
  });
  function resetFractal() {
    sides = 5;
    scale = 0.5;
    spread = 0.7;
    color = "hsl(40, 100%, 50%)";
  }

  function updateSlider() {
    spreadSlider.value = spread;
    spreadLabel.textContent = "Spread: " + Number(spread).toFixed(2);
    sidesSlider.value = sides;
    sidesLabel.textContent = "Sides: " + sides;
  }
};
