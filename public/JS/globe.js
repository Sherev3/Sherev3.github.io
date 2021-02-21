import * as THREE from '/build/three.module.js';
import { OrbitControls } from '/jsm/controls/OrbitControls.js';


// DATA IMPORT
let data = [];
let xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        let response = JSON.parse(xhttp.responseText);
        let output = Object.values(response);
        for (let i = 0; i < output.length; i++) {
            data.push(output[i]);
        }
    }
};
xhttp.open("GET", "../DATA/Final_data.json", false);
xhttp.send();
console.log(data);

// THREEJS CODE

// CREATE scene where objects will be placed (kind of like a stage)
const scene = new THREE.Scene();

// CREATE camera to see objects (kind of like sitting in the audience)
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

// CREATE renderer to display the created objects (kind of like the people who place the diferent sets on the stage)
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// CREATE controls so that we can interact with the objects/have interactivity
const controls = new OrbitControls(camera, renderer.domElement);

// Create earth
// Earthmap is used for the basic texture which has the various continents/counteries/etc. on it
let earthMap = new THREE.TextureLoader().load('../IMAGES/earthlights4k.jpg');

// EarthBump is used give the texture some "depth" so it is more appealing on the eyes and data visuals
let earthBumpMap = new THREE.TextureLoader().load('../IMAGES/earthbump4k.jpg'); 

// EarthSpecMap gies the earth some shininess to the environment, allowing reflectivity off of the lights
let earthSpecMap = new THREE.TextureLoader().load('../IMAGES/earthspec4k.jpg');

// Geometry is what the shape/size of the globe will be
let earthGeometry = new THREE.SphereGeometry( 10, 32, 32);

// Material is how the globe will look like
let earthMaterial = new THREE.MeshPhongMaterial({
    map: earthMap,
    bumpMap: earthBumpMap,
    bumpScale: 0.10,
    specularMap: earthSpecMap,
    specular: new THREE.Color('white')
});

// Earth is the final product which ends up being rendered on scene, also is used as a grandparent for the points of interest
let earth = new THREE.Mesh(earthGeometry, earthMaterial);

// Add the earth to scene
scene.add( earth );

// CREATE variable to store array of lights
let lights = [];

// CreateLights is a function which creates the lights and adds them to the scene.
function createLights(scene){
    lights[0] = new THREE.PointLight("#004d99", .5, 0);
    lights[1] = new THREE.PointLight("#004d99", .5, 0);
    lights[2] = new THREE.PointLight("#004d99", .7, 0);
    lights[3] = new THREE.AmbientLight("#ffffff");

    lights[0].position.set(200, 0, -400);
    lights[1].position.set(200, 200, 400);
    lights[2].position.set(-200, -200, -50);

    scene.add(lights[0]);
    scene.add(lights[1]);
    scene.add(lights[2]);
    scene.add(lights[3]);
}
function addSceneObjects(scene) {
    createLights(scene);
}

addSceneObjects(scene);

camera.position.z = 20;

// Add event listeners so DOM knows what functions to use when objects/items are interacted with
window.addEventListener('resize', onWindowResize, false);


// Resizes the window when it changes
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
};

function animate() {
	requestAnimationFrame( animate );
    render();
	renderer.render( scene, camera );
    controls.update();
} 

function render(){
    renderer.render( scene, camera );
}
animate();