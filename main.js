import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();


const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );


const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
camera.position.setZ(30);

renderer.render( scene, camera);

const geometry = new THREE.TorusGeometry(10, 3, 16, 100)
const material = new THREE.MeshStandardMaterial( { color: 0xFF6347 } )
const torus = new THREE.Mesh( geometry, material );

scene.add(torus)

const pointLight = new THREE.PointLight(0xffffff, 1, 0, 0.01);
pointLight.position.set(10,0,0);
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper();
scene.add(lightHelper, gridHelper)

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial( { color: 0xffffff } );
  const star = new THREE.Mesh( geometry, material );

  const [x , y , z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread( 1000 ) );

  star.position.set(x,y,z);
  scene.add(star)
}

Array(2000).fill().forEach(addStar)

function addNearStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial( { color: 0xffffff } );
  const nearStar = new THREE.Mesh( geometry, material );

  const [x , y , z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread( 100 ) );

  nearStar.position.set(x,y,z);
  scene.add(nearStar)
}
Array(20).fill().forEach(addNearStar)
Array(2000).fill().forEach(addStar)

const controls = new OrbitControls(camera, renderer.domElement);
scene.add(controls)

// const spaceTexture = new THREE.TextureLoader().load('space.jpg');
// scene.background = spaceTexture;

const jackTexture = new THREE.TextureLoader().load('jack.jpg')

const jack = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 3),
  new THREE.MeshBasicMaterial( { map: jackTexture } )
);
scene.add(jack)

const moonTexture = new THREE.TextureLoader().load('moon.jpg');
const normalTexture = new THREE.TextureLoader().load('normal.jpg')

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32), 
  new THREE.MeshStandardMaterial( { 
    map: moonTexture, 
    normalMap: normalTexture
  } )
);
scene.add(moon)

function animate() {

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  controls.update();

  requestAnimationFrame( animate );
  renderer.render( scene, camera );
}

animate()
