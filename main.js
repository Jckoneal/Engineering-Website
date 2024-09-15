import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader';

const scene = new THREE.Scene();

const loader = new GLTFLoader();



const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );


const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
camera.position.setZ(30);

renderer.render( scene, camera);

scene.background = new THREE.Color( 0xffffff );

// const geometry = new THREE.TorusGeometry(10, 3, 16, 100)
// const material = new THREE.MeshStandardMaterial( { color: 0xFF6347 } )
// const torus = new THREE.Mesh( geometry, material );
// scene.add(torus);

let loadedSkateboard;

loader.load(
  '/Skateboard/Skateboard.glb',
  function (gltf) {
    
    loadedSkateboard = gltf
    
    const skateboard = gltf.scene;
    
    skateboard.position.set(0, -4, 3)
    skateboard.scale.set(0.35,0.35,0.35)
    
    scene.add(skateboard);
    
  },
  
  function ( xhr ) {
    
    console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
    
  }
);



const pointLight = new THREE.PointLight(0xffffff, 2, 0, 0.01);
pointLight.position.set(0,1,5);
const ambientLight = new THREE.AmbientLight(0xffffff, 2);
scene.add(pointLight, ambientLight);

const lightHelper = new THREE.PointLightHelper(pointLight);
scene.add(lightHelper)

// const gridHelper = new THREE.GridHelper();
// scene.add(gridHelper)




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

const controls = new OrbitControls(camera, renderer.domElement);
scene.add(controls)

const jackTexture = new THREE.TextureLoader().load('./Jack.jpg')

const jack = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 3),
  new THREE.MeshBasicMaterial( { map: jackTexture } )
);
scene.add(jack)

jack.position.x = 3; 
jack.position.y = 0; 
jack.position.z = -5;

const moonTexture = new THREE.TextureLoader().load('./moon.jpg');
const normalTexture = new THREE.TextureLoader().load('./normal.jpg')

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32), 
  new THREE.MeshStandardMaterial( { 
    map: moonTexture, 
    normalMap: normalTexture
  } )
);
moon.position.set(15,20,-20)
scene.add(moon)

// Set camera at 0

camera.position.z = 1;
camera.position.x;
camera.position.y; 


function moveCamera() {
  const t = document.body.scrollTop || document.documentElement.scrollTop || window.scrollY;


  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z +=0.05;
  
  jack.rotation.x += 0.02;
  jack.rotation.y += 0.01;
  jack.rotation.z += 0.02;
  jack.position.x = 3 - (t * 0.01);

  loadedSkateboard.scene.position.x = t * 0.005 ;
  loadedSkateboard.scene.position.y = -4 + (t * 0.005);
  loadedSkateboard.scene.rotation.y = 1.6 + (t * 0.005);
  loadedSkateboard.scene.rotation.x = t * 0.0005;
  // loadedSkateboard.scene.position.z = t * 0.01 ;

  camera.position.z = (1 + t * 0.01);
  camera.position.x = ( t * 0.0002);
  camera.position.y = ( t * 0.0002); 
}

window.onscroll = moveCamera

function animate() {

  // torus.rotation.x += 0.01;
  // torus.rotation.y += 0.005;
  // torus.rotation.z += 0.01;

  controls.update();

  requestAnimationFrame( animate );
  renderer.render( scene, camera );
}

animate()
