// 🌀 Orbital Swarm Animation
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function Point(x, y, z) {
  this.x = x;
  this.y = y;
  this.z = z;
}

let center = new Point(canvas.width / 2, canvas.height / 2, 100);
let points = [];

for (let i = 0; i < 200; i++) {
  const angle = Math.random() * Math.PI * 2;
  const radius = Math.random() * 300;
  points.push(new Point(
    center.x + Math.cos(angle) * radius,
    center.y + Math.sin(angle) * radius,
    Math.random() * 200
  ));
}

document.addEventListener('mousemove', (e) => {
  center.x = e.clientX;
  center.y = e.clientY;
});

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

function rotateAround(p, anchor, angle) {
  let dx = p.x - anchor.x;
  let dy = p.y - anchor.y;
  let rx = dx * Math.cos(angle) - dy * Math.sin(angle);
  let ry = dx * Math.sin(angle) + dy * Math.cos(angle);
  p.x = rx + anchor.x;
  p.y = ry + anchor.y;

  let dz = p.z - anchor.z;
  let rz = dz * Math.cos(angle) - dx * Math.sin(angle);
  p.z = rz + anchor.z;
}

function renderSwarm() {
  ctx.fillStyle = 'rgba(0,0,0,0.07)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let p of points) {
    rotateAround(p, center, 0.005);
    const depth = Math.min(1, p.z / 200);
    const r = Math.floor(255 * depth);
    const b = Math.floor(255 * (1 - depth));
    ctx.shadowBlur = 6;
    ctx.shadowColor = `rgba(${r}, 0, ${b}, 0.8)`;
    ctx.beginPath();
    ctx.fillStyle = `rgba(${r}, 0, ${b}, ${0.5 + 0.5 * (1 - depth)})`;
    ctx.arc(p.x, p.y, 3 * (1 - depth), 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.beginPath();
  ctx.strokeStyle = '#ffffff';
  ctx.arc(center.x, center.y, 6, 0, Math.PI * 2);
  ctx.stroke();

  requestAnimationFrame(renderSwarm);
}

renderSwarm();

// 📦 Dynamic Project Loader with Modal
const projects = [
  {
    title: "Terrain Generator",
    img: "images/texture.png",
    description: "Procedural terrain using noise and lighting."
  },
  {
    title: "Raycasting Engine",
    img: "images/raycast.png",
    description: "Classic 3D simulation with shadows and fog."
  },
  {
    title: "Interactive 3D Earth",
    img: "images/3dearth.png",
    description: "Earth orbit, particles, mouse controls and effects."
  },
  {
    title: "Web Portfolio",
    img: "images/website.png",
    description: "Built using HTML, CSS and JavaScript."
  },
  {
    title: "Tkinter Map With Satellite View",
    img: "images/tkinter_map.png",
    description: "Interactive map using the TkinterMapView library."
  },
  {
    title: "System Health Monitor",
    img: "images/systemhealth.png",
    description: "Real-time desktop monitoring tool with Tkinter and Matplotlib."
  },
  {
    title: "3D Cube Animation",
    img: "images/cube.png",
    description: "Cube with dynamic lighting and texture mapping."
  },
  {
    title: "Web Piano App",
    img: "images/piano.png",
    description: "Lightweight piano app with white and black keys."
  },
  {
    title: "Hypnotic Spiral Art",
    img: "images/spiral.png",
    description: "Generative art using HTML5 canvas."
  }
];

const grid = document.getElementById('projectGrid');
projects.forEach(p => {
  const card = document.createElement('div');
  card.className = 'project-card';
  card.innerHTML = `
    <img src="${p.img}" alt="${p.title}" />
    <h3>${p.title}</h3>
    <p>${p.description}</p>
  `;
  card.addEventListener("click", () => {
    document.getElementById("modalTitle").textContent = p.title;
    document.getElementById("modalDesc").textContent = p.description;
    document.getElementById("modalImage").src = p.img;
    new bootstrap.Modal(document.getElementById("projectModal")).show();
  });
  grid.appendChild(card);
});

// 🔐 Auth Logic
document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();
  let emailLogin = document.getElementById('loginEmail').value;
  let password = document.getElementById('loginPassword').value;
  if(emailLogin == localStorage.getItem('registeredEmail') && password == localStorage.getItem('registeredPass')) {
    document.getElementById('dashboard').style.display = 'block';
    document.getElementById('userName').textContent = localStorage.getItem('registeredName');
    alert('Authentication successful: ' + emailLogin);
  } else {
    alert('Incorrect login');
  }
});

document.getElementById('registerForm').addEventListener('submit', function(e) {
  e.preventDefault();
  localStorage.setItem('registeredName', document.getElementById('registerName').value); 
  localStorage.setItem('registeredEmail', document.getElementById('registerEmail').value); 
  localStorage.setItem('registeredPass', document.getElementById('registerPassword').value); 
  alert("Thank you for registering " + localStorage.getItem('registeredName'));
});

document.getElementById('logoutBtn').addEventListener('click', function() {
  document.getElementById('dashboard').style.display = 'none';
});

// 🌞 Theme Preference
if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark-theme');
  document.getElementById('themeToggle').textContent = '☀️ Light Mode';
}

document.getElementById('themeToggle').addEventListener('click', () => {
  document.body.classList.toggle('dark-theme');
  const newTheme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
  document.getElementById('themeToggle').textContent = newTheme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode';
  localStorage.setItem('theme', newTheme);
});

// ✒️ Typewriter Effect
const words = ["Welcome to my Portfolio", "Explore", "Design", "Code"];
let i = 0, j = 0;
function type() {
  if (j < words[i].length) {
    document.getElementById("typewriter").textContent += words[i][j++];
    setTimeout(type, 100);
  } else {
    setTimeout(() => {
      document.getElementById("typewriter").textContent = '';
      i = (i + 1) % words.length;
      j = 0;
      type();
    }, 1000);
  }
}
type();