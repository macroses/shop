<template>
  <canvas></canvas>
</template>

<script>
export default {
  mounted() {
    let canvas = document.querySelector('canvas');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let ctx = canvas.getContext('2d');

    let mouse = {
      x: undefined,
      y: undefined
    };


    window.addEventListener('resize', function() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      init();
    });

    class Circle {
      constructor(x, y, dx, dy, radius, color) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.radius = radius;
        this.minRadius = radius;
        this.color = color;
        this.draw = function() {
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
          ctx.strokeStyle = this.color;
          ctx.stroke();
          ctx.fillStyle = this.color;
          ctx.fill();
        };
        this.update = function() {
          if (this.x + radius >= innerWidth || this.x - radius <= 0) {
            this.dx = -this.dx;
          }
          if (this.y + radius >= innerHeight || this.y - radius <= 0) {
            this.dy = -this.dy;
          }
          this.x += this.dx;
          this.y += this.dy;
          this.draw();
        };
      }
    }

    let circleArray = [];

    function init() {
      circleArray = [];
      for (let i = 0; i < 10; i++) {
        let r = Math.random() * 100 + 1;
        let x = Math.random() * (innerWidth - r * 2) + r;
        let y = Math.random() * (innerHeight - r * 2) + r;
        let dx = (Math.random() - 0.5) * 5;
        let dy = (Math.random() - 0.5) * 5;
        let color = `rgba(255,255,255, 0.1)`;
        circleArray.push(new Circle(x, y, dx, dy, r, color));
      }
    }

    function animate() {
      requestAnimationFrame(animate);
      ctx.clearRect(0, 0, innerWidth, innerHeight);
      for (let i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
      }
    }

    init();
    animate();
  }
}
</script>

<style lang="scss" scoped>
canvas {
  position: absolute;
  height: 100%;
  z-index: -1;
}
</style>

