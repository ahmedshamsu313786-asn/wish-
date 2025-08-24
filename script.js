// === THREE.JS SCENE SETUP ===
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("scene-container").appendChild(renderer.domElement);

// Stars Background
function addStars() {
  for (let i = 0; i < 300; i++) {
    const geometry = new THREE.SphereGeometry(0.2, 24, 24);
    const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const star = new THREE.Mesh(geometry, material);

    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(200));
    star.position.set(x, y, z);
    scene.add(star);
  }
}
addStars();

// Moon
const moonGeometry = new THREE.SphereGeometry(5, 32, 32);
const moonMaterial = new THREE.MeshStandardMaterial({ color: 0xffffcc });
const moon = new THREE.Mesh(moonGeometry, moonMaterial);
moon.position.set(0, 0, -20);
scene.add(moon);

// Light
const light = new THREE.PointLight(0xffffff, 1);
light.position.set(10, 10, 10);
scene.add(light);

// Astronaut (basic cube as placeholder)
const astronautGeometry = new THREE.BoxGeometry(2, 2, 2);
const astronautMaterial = new THREE.MeshStandardMaterial({ color: 0x00ffff });
const astronaut = new THREE.Mesh(astronautGeometry, astronautMaterial);
astronaut.position.set(0, 0, -10);
scene.add(astronaut);

// Camera
camera.position.z = 30;

// Animation
function animate() {
  requestAnimationFrame(animate);
  moon.rotation.y += 0.002;
  astronaut.rotation.y += 0.01;
  renderer.render(scene, camera);
}
animate();

// === INTERACTIONS ===
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const passwordSection = document.getElementById("password-section");
const blastSection = document.getElementById("blast-section");
const wishSection = document.getElementById("wish");

yesBtn.addEventListener("click", () => {
  document.getElementById("message").style.display = "none";
  passwordSection.style.display = "block";
});

document.getElementById("submitPassword").addEventListener("click", () => {
  const input = document.getElementById("passwordInput").value;
  if (input === "moonblast") { // <--- set your password here
    passwordSection.style.display = "none";
    blastSection.style.display = "block";
  } else {
    alert("❌ Wrong password! Try again.");
  }
});

document.getElementById("blastBtn").addEventListener("click", () => {
  blastSection.style.display = "none";
  
  // Fake explosion effect
  moon.material.color.set(0xff0000);
  setTimeout(() => {
    moon.visible = false;
    wishSection.style.display = "block";
  }, 1500);
});
