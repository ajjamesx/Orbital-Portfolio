
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
  ctx.fillStyle = 'rgba(0,0,0,0.1)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  for (let p of points) {
    rotateAround(p, center, 0.005);
    const depth = Math.min(1, p.z / 300);
    const r = Math.floor(255 * depth);
    const b = Math.floor(255 * (1 - depth));
    ctx.beginPath();
    ctx.fillStyle = window.scrollY < 1300 ? `rgba(${r}, 0, ${b}, ${0.5 + 0.5 * (1 - depth)})` : `rgba(${window.scrollY/10}, 0, ${depth}, ${255})`;
    ctx.arc(p.x, p.y, 3 * (1 - depth), 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.beginPath();
  ctx.strokeStyle = '#222';
  ctx.arc(center.x, center.y, 1, 0, Math.PI * 2);
  ctx.stroke();

  requestAnimationFrame(renderSwarm);
}

renderSwarm();

// 📦 Dynamic Project Loader
const projects = [
  {
    title: "Terrain Generator",
    img: "images/texture.png",
    description: "Procedural terrain using noise and lighting.",
    rating: 4.5
  },
  {
    title: "Raycasting Engine",
    img: "images/raycast.png",
    description: "Classic 3D simulation with shadows and fog.",
    rating: 5
  },
  {
    title: "Interactive 3D Earth",
    img: "images/3dearth.png",
    description: "Earth orbit, particles, mouse controls and effects.",
    rating: 5
  },
  {
    title: "Web Portfolio",
    img: "images/website.png",
    description: "Built using HTML, CSS and JavaScript.",
    rating: 5
  },
    {
    title: "Tkinter Map With Satelite View",
    img: "images/tkinter_map.png",
    description: "Interactive map using the TkinterMapView library.",
    rating: 4.3
  },
  {
    title: "System Health Monitor",
    img: "images/systemhealth.png",
    description: "A real-time desktop monitoring tool built with Python's Tkinter GUI library, Matplotlib, and psutil.",
    rating: 4.5
  },
  {
    title: "3D Cube Animation",
    img: "images/cube.png",
    description: "3D Cube Animation with Dynamic Sky, Lighting, and Texture Mapping.",
    rating: 4.5
  },
  {
    title: "3D Cube Animation 2",
    img: "images/cube2.png",
    description: "3D Cube Animation with Rainbow hues using HSL and animated depth scaling",
    rating: 4.5
  },
  {
    title: "Web Piano App",
    img: "images/piano.png",
    description: "Lightweight piano app built with HTML, CSS, and JavaScript that features both white and black keys.",
    rating: 4.4
  },
   {
    title: " Hypnotic Spiral Art",
    img: "images/spiral.png",
    description: "Generative art experiment using the HTML5 canvas element and JavaScript.",
    rating: 5
  },
   {
    title: " Spiral Art 2",
    img: "images/art1.png",
    description: "Generative art experiment using the HTML5 canvas element and JavaScript.",
    rating: 5
  },
   {
    title: "Spiral Art 3",
    img: "images/art2.png",
    description: "Generative art experiment using the HTML5 canvas element and JavaScript.",
    rating: 5
  }

];

function generateStars(rating) {
  let fullStars = Math.floor(rating);
  let halfStar = rating % 1 >= 0.5;
  let starsHTML = '';

  for (let i = 0; i < fullStars; i++) {
    starsHTML += '★';
  }
  if (halfStar) {
    starsHTML += '☆'; // or use a half-star icon if you prefer
  }
  while (starsHTML.length < 5) {
    starsHTML += '☆';
  }

  return `<div class="star-rating">${starsHTML}</div>`;
}

const grid = document.getElementById('projectGrid');
projects.forEach(p => {
  const card = document.createElement('div');
  card.className = 'project-card';
  card.innerHTML = `
    <img src="${p.img}" alt="${p.title}" />
    <h3>${p.title}</h3>
    <p>${p.description}</p>
    ${generateStars(p.rating || 0)}
  `;
  grid.appendChild(card);
});

document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();
  let emailLogin = document.getElementById('loginEmail').value;
  let password = document.getElementById('loginPassword').value;
  if(emailLogin == localStorage.getItem('registeredEmail') && password == localStorage.getItem('registeredPass')) {
    alert('Authentication successfull' + emailLogin)
  }
  else {
    alert('Incorrect login');
  }
});

document.getElementById('registerForm').addEventListener('submit', function(e) {
  e.preventDefault();
  localStorage.setItem('registeredName', document.getElementById('registerName').value); 
  localStorage.setItem('registeredEmail', document.getElementById('registerEmail').value); 
  localStorage.setItem('registeredPass', document.getElementById('registerPassword').value); 
  const name = localStorage.getItem('registeredName');
    alert("Thank you for registering " + name);
});

document.getElementById('logoutBtn').addEventListener('click', function() {
  document.getElementById('dashboard').style.display = 'none';
});


let words = ["Welcome to my Portfolio", "Explore", "Design", "Code"];
let i = 0, j = 0;
function type() {
  console.log(window.scrollY);
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

const extrasGrid = document.getElementById('extrasGrid');
extras.forEach(e => {
  const card = document.createElement('div');
  card.className = 'project-card';
  card.innerHTML = `
    <img src="${e.img}" alt="${e.title}" />
    <h3>${e.title}</h3>
    <p>${e.description}</p>
    ${generateStars(e.rating || 0)}
  `;
  extrasGrid.appendChild(card);
});


function checkScroll() {
  if(window.scrollY > 1800 && window.scrollY < 2000) {
    document.getElementById('canvas2').style.display = "block";
  }
  else {
    document.getElementById('canvas2').style.display = "none";
  }
  requestAnimationFrame(checkScroll);
}

// JavaScript Scroll Detection
const pages = document.querySelectorAll('.page');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    } else {
      entry.target.classList.remove('visible');
    }
  });
}, { threshold: 0.5 });

pages.forEach(page => observer.observe(page));


checkScroll();