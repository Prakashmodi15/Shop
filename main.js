// Scene, Camera, Renderer
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xaaaaaa);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.set(0,5,10);

const renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Controls
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(5,10,5);
scene.add(directionalLight);

// Floor
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(20,20),
  new THREE.MeshStandardMaterial({color:0x888888})
);
floor.rotation.x = -Math.PI/2;
scene.add(floor);

// Walls
const walls = new THREE.Mesh(
  new THREE.BoxGeometry(20,10,20),
  new THREE.MeshStandardMaterial({color:0x222222, side: THREE.BackSide})
);
walls.position.y = 5;
scene.add(walls);

// Table (placeholder)
const table = new THREE.Mesh(
  new THREE.BoxGeometry(2,1,1),
  new THREE.MeshStandardMaterial({color:0x8B4513})
);
table.position.set(0,0.5,0);
table.name = "Table";
scene.add(table);

// Chair (placeholder)
const chair = new THREE.Mesh(
  new THREE.BoxGeometry(1,1,1),
  new THREE.MeshStandardMaterial({color:0x3333ff})
);
chair.position.set(-2,0.5,0);
chair.name = "Chair";
scene.add(chair);

// Raycaster for clicks
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

window.addEventListener('click', (event)=>{
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects([table, chair]);

  if(intersects.length > 0){
    alert("You clicked on: " + intersects[0].object.name);
  }
});

// Animate
function animate(){
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();

// Resize
window.addEventListener('resize', ()=>{
  camera.aspect = window.innerWidth/window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
