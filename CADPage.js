import './style.css';
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader';

const scene = new THREE.Scene();
const loader = new GLTFLoader();
const loader1 = new GLTFLoader();
const loader2 = new GLTFLoader();
const skateboardScale = 0.5;
const bikeScale = 0.08
const wheelScale = 1
const navBarHeight = 100;
const offsetForCadPage = 800;

window.scrollTo(0, navBarHeight);

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );


const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'), 
  alpha: true
});

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );


renderer.render( scene, camera);

// scene.background = new THREE.Color( 0xffffff );

// const geometry = new THREE.TorusGeometry(10, 3, 16, 100)
// const material = new THREE.MeshStandardMaterial( { color: 0xFF6347 } )
// const torus = new THREE.Mesh( geometry, material );
// scene.add(torus);

let loadedBike;

// loader2.load(
//   './DHBike.glb',
//   function (gltf) {
    
//     loadedBike = gltf
    
//     const bike = gltf.scene;
    
//     bike.position.set(-6, -40, -5)
//     bike.rotation.set(3.14/2,-3.14/2,-3.14/2)
//     bike.scale.set(bikeScale,bikeScale,bikeScale);
    
//     scene.add(bike);
    
//   },
  
//   function ( xhr ) {
    
//     console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
    
//   }
// );

let loadedSkateboard;

loader.load(
  '/Skateboard/Skateboard.glb',
  function (gltf) {
    
    loadedSkateboard = gltf
    
    const skateboard = gltf.scene;
    
    skateboard.position.set(0, -100, 0)
    skateboard.scale.set(skateboardScale,skateboardScale,skateboardScale);
    
    scene.add(skateboard);
    
  },
  
  function ( xhr ) {
    
    console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
    
  }
);

let loadedWheel;

loader.load(
  './Wheel.glb',
  function (gltf) {
    
    loadedWheel = gltf
    
    const wheel = gltf.scene;
    
    wheel.position.set(0, -100, 0)
    wheel.scale.set(wheelScale,wheelScale,wheelScale);
    
    scene.add(wheel);
    
  },
  
  function ( xhr ) {
    
    console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
    
  }
);
let loadedTrucks;

loader1.load(
  './Trucks.glb',
  function (gltf) {
    
    loadedTrucks = gltf
    
    const trucks = gltf.scene;
    
    trucks.position.set(2.5, -100, 0)
    trucks.scale.set(15,15,15)
    
    scene.add(trucks);
    
  },
  
  function ( xhr ) {
    
    console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
    
  }
);

const pointLight = new THREE.PointLight(0xFFFFFF, 5, 0, 0.001);
pointLight.position.set(0,1,5);
const pointLight1 = new THREE.PointLight(0xFFFFFF, 5, 0, 0.001);
pointLight1.position.set(-2,-1,6);
const ambientLight = new THREE.AmbientLight(0xFFFFFF, 2);
scene.add(pointLight, ambientLight);

const softbox = new THREE.Mesh(
  new THREE.BoxGeometry(100,100,1),
  new THREE.MeshStandardMaterial( {color: 0xFFFFFF} ),
)
scene.add(softbox)
softbox.position.set(0,0,7)

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial( { color: 0xffffff } );
  const star = new THREE.Mesh( geometry, material ); 
  const [x , y , z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread( 1000 ) );

  star.position.set(x,y,z);
  scene.add(star)
}


function addNearStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial( { color: 0xffffff } );
  const nearStar = new THREE.Mesh( geometry, material );

  const [x , y , z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread( 100 ) );

  nearStar.position.set(x,y,z);
  scene.add(nearStar)
}

const Screenshot1 = new THREE.TextureLoader().load('./CADScreenshot1.jpg')

const CADScreenshot1 = new THREE.Mesh(
  new THREE.BoxGeometry(8,6,0.1),
  new THREE.MeshBasicMaterial( { map: Screenshot1 })
)
scene.add(CADScreenshot1)
CADScreenshot1.position.set(5, -16.5, -4)

const textureLoader = new THREE.TextureLoader




const moonTexture = new THREE.TextureLoader().load('./moon.jpg');
const normalTexture = new THREE.TextureLoader().load('./normal.jpg')

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32), 
  new THREE.MeshStandardMaterial( { 
    map: moonTexture, 
    normalMap: normalTexture
  } )
);


camera.position.z = 6;
camera.position.x;
camera.position.y; 

 

function moveCamera() {
  const t = document.body.scrollTop || document.documentElement.scrollTop || window.scrollY;
  loadedWheel.scene.position.x =  6 +  (( offsetForCadPage + t-1200-navBarHeight) * (-0.004)) ;
  loadedWheel.scene.position.y =  -11 + (( offsetForCadPage +t-1000-navBarHeight) * 0.0125);
  loadedWheel.scene.rotation.y = 1.5+ (( offsetForCadPage +t-navBarHeight) * -0.01);
  loadedSkateboard.scene.position.x =  0.1 +  (( offsetForCadPage +t-1200-navBarHeight) * 0.004) ;
  loadedSkateboard.scene.position.y =  (-13.5) + (( offsetForCadPage +t-1000-navBarHeight) * 0.0125);
  loadedSkateboard.scene.rotation.y = 2 + (( offsetForCadPage +t-navBarHeight) * 0.005);
  loadedSkateboard.scene.rotation.x = ( offsetForCadPage +t-2000-navBarHeight) * -0.0005;
  CADScreenshot1.position.y =   (-34) + (( offsetForCadPage +t-navBarHeight) * 0.025);
  CADScreenshot1.rotation.y = 1.3 + (( offsetForCadPage +t-navBarHeight) * 0.001);
  loadedTrucks.scene.position.y =   (-5.75) + (( offsetForCadPage +t-1000-navBarHeight) * 0.01);
  loadedTrucks.scene.rotation.y = (( offsetForCadPage +t-navBarHeight) * 0.005);
  loadedTrucks.scene.rotation.x = ( offsetForCadPage +t-1500-navBarHeight) * 0.0005;
  
  camera.position.x = ( ( offsetForCadPage + t-navBarHeight) * 0.0002);
  camera.position.y = ( ( offsetForCadPage + t-navBarHeight) * 0.0002); 
}

window.onscroll = moveCamera

function animate() {

  // torus.rotation.x += 0.01;
  // torus.rotation.y += 0.005;
  // torus.rotation.z += 0.01;

  // controls.update();

  requestAnimationFrame( animate );
  renderer.render( scene, camera );
}

animate()
