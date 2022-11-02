/**@type{HTMLCanvasElement} */

window.addEventListener("load", function () {
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  let particles;
  let pointer = {
    x: innerWidth,
    y: innerWidth,
  };

  let hue = 0;
  let hueRadians = 0;
  let numberParticles = 30;
  let speed = 3;
  let frameSpeed = 200;

  const particlesNumSlider = document.getElementById("numParticles");
  const particlesNumLabel = this.document.getElementById("numParticlesLabel");
  const speedSlider = document.getElementById("speed");
  const speedLabel = document.getElementById("speedLabel");
  const velSlider = document.getElementById("velSlider");
  const velLabel = document.getElementById("velLabel");

  particlesNumSlider.addEventListener("change", function (e) {
    numberParticles = e.target.value;
    updateSliders();
    init();
    animate();
    genRings();
  });
  speedSlider.addEventListener("change", function (e) {
    frameSpeed = e.target.value;
    updateSliders();
    init();
    animate();
    genRings();
  });
  velSlider.addEventListener("change", function (e) {
    speed = e.target.value;
    updateSliders();
    init();
    animate();
    genRings();
  });
  window.addEventListener("pointermove", (e) => {
    e.preventDefault()
    pointer.x = e.x;
    pointer.y = e.y;
  });
  

  class Particle {
    constructor(x, y, radius, color, vel) {
      this.pos = {
        x: x,
        y: y,
      };
      this.radius = radius;
      this.size = 5;
      this.color = color;
      this.vel = vel;
      this.lifeSpan = 200;
    }
    draw() {
      ctx.beginPath();
      ctx.fillStyle = this.color;
      ctx.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2, false);
      ctx.fill();
      ctx.closePath();
    }
    update() {
      this.pos.x += this.vel.x;
      this.pos.y += this.vel.y;
      this.lifeSpan--;
    }
  }

  function init() {
    particles = [];
    for (let i = 0; i < numberParticles; i++) {
      //360deg = 6.28radians = PI * 2
      let radian = (Math.PI * 2) / numberParticles;
      let x = canvas.width / 2;
      let y = canvas.width / 2;
    }
  }

  function genRings() {
    setTimeout(genRings, frameSpeed);
    hue = Math.sin(hueRadians);
    for (let i = 0; i < numberParticles; i++) {
      //360deg = 6.28radians = PI * 2
      let radian = (Math.PI * 2) / numberParticles;
      let x = pointer.x;
      let y = pointer.y;

      particles.push(
        new Particle(x, y, 4, "hsl(" + Math.abs(hue * 360) + ",50%, 50%)", {
          x: Math.cos(radian * i) * speed,
          y: Math.sin(radian * i) * speed,
        })
      );
    }
    hueRadians += 0.9;
  }

  function animate() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.1";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    particles.forEach((particle, i) => {
      if (particle.lifeSpan < 0) {
        particles.splice(i, 1);
      } else {
        particle.update();
        particle.draw();
      }
    });
    //console.log(particles.length);
    requestAnimationFrame(animate);
  }

  init();
  animate();
  genRings();

  function updateSliders() {
    particlesNumSlider.value = numberParticles;
    particlesNumLabel.innerText =
      " Num of Particles: " + Number(numberParticles).toFixed(1);
    speedSlider.value = frameSpeed;
    speedLabel.innerText = " Frame Speed: " + Number(frameSpeed).toFixed(1);
    velSlider.value = speed;
    velLabel.innerText = " Radial Vel: " + Number(speed).toFixed(1);
  }
  updateSliders();

  window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });

  // load end
});
