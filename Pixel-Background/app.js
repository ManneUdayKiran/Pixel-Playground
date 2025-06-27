const canvas = document.getElementById('drawCanvas');
const ctx = canvas.getContext('2d');
const colorPicker = document.getElementById('colorPicker');
const clearBtn = document.getElementById('clearBtn');
const paletteBtn = document.getElementById('paletteBtn');

let drawing = false;
let lastX = 0;
let lastY = 0;
let currentColor = colorPicker.value;

function getPointerPos(e) {
  if (e.touches) {
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.touches[0].clientX - rect.left,
      y: e.touches[0].clientY - rect.top
    };
  } else {
    return {
      x: e.offsetX,
      y: e.offsetY
    };
  }
}

function startDrawing(e) {
  drawing = true;
  const pos = getPointerPos(e);
  lastX = pos.x;
  lastY = pos.y;
}

function draw(e) {
  if (!drawing) return;
  e.preventDefault();
  const pos = getPointerPos(e);
  ctx.strokeStyle = currentColor;
  ctx.lineWidth = 3;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(pos.x, pos.y);
  ctx.stroke();
  lastX = pos.x;
  lastY = pos.y;
}

function stopDrawing() {
  drawing = false;
}

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseleave', stopDrawing);

canvas.addEventListener('touchstart', startDrawing, { passive: false });
canvas.addEventListener('touchmove', draw, { passive: false });
canvas.addEventListener('touchend', stopDrawing);
canvas.addEventListener('touchcancel', stopDrawing);

paletteBtn.addEventListener('click', () => {
  colorPicker.click();
});

colorPicker.addEventListener('input', (e) => {
  currentColor = e.target.value;
});

clearBtn.addEventListener('click', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}); 