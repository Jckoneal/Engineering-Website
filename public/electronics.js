import './style.css';
import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const pcbScale = .25
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.z = 10;
camera.position.x;
camera.position.y; 

window.scrollTo(0, 0);

const pointLight = new THREE.PointLight(0xFFFFFF, 5, 0, 0.001);
pointLight.position.set(0,1,5);
const pointLight1 = new THREE.PointLight(0xFFFFFF, 5, 0, 0.001);
pointLight1.position.set(-2,-1,6);
const ambientLight = new THREE.AmbientLight(0xFFFFFF, 1);
scene.add(pointLight, ambientLight);

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'), 
    alpha: true
  });

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.render( scene, camera);

const loader = new GLTFLoader();

let loadedPCB;

loader.load(
  '/electronics/PilotV3.glb',
  function (gltf) {
    
    loadedPCB = gltf
    
    const pcb = gltf.scene;
    
    pcb.position.set(1, 0, 0)
    pcb.rotation.set(0.3,-0.3, 0)
    pcb.scale.set(pcbScale,pcbScale,pcbScale);
    
    scene.add(pcb);
    console.log('Model loaded');
  }
);


function moveCamera() {
    const t = document.body.scrollTop || document.documentElement.scrollTop || window.scrollY;
    console.log('Camera is moving!');
    camera.position.x =  (t * 0.0002);
    camera.position.y =  (t * 0.0002); 
    loadedPCB.scene.position.y = t* 0.012;
    loadedPCB.scene.position.z = t * -0.01;
    loadedPCB.scene.position.x = 1 + t * .05;
  
    loadedPCB.scene.rotation.x = 0.3 + (t/500);
    loadedPCB.scene.rotation.y = -0.3 - (t/100); 
  }
window.addEventListener('scroll', moveCamera);


function animate() {

  
    requestAnimationFrame( animate );
    renderer.render( scene, camera );
}
  
animate()