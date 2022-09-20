// Code credit: https://discourse.threejs.org/t/how-do-i-render-a-video-on-sphere-in-threejs/34003/4

import * as THREE from "https://cdn.skypack.dev/three@0.136.0";
import {
  OrbitControls
} from "https://cdn.skypack.dev/three@0.136.0/examples/jsm/controls/OrbitControls.js";

let scene = new THREE.Scene();

let camera = new THREE.PerspectiveCamera(60, innerWidth / innerHeight, 1, 1000);
camera.position.set(0, 0, 10);

let renderer = new THREE.WebGLRenderer({
  antialias: true
});
renderer.setSize(innerWidth, innerHeight);
renderer.setClearColor(0x404040);
document.body.appendChild(renderer.domElement);

let controls = new OrbitControls(camera, renderer.domElement);

btnPlay.addEventListener("click", event => {
  let video = document.getElementById('video');
  video.play();
})

btnPause.addEventListener("click", event => {
  let video = document.getElementById('video');
  video.pause();
})

let g = new THREE.SphereGeometry(5, 128, 64);
g.rotateY(-0.5 * Math.PI);
let m = new THREE.MeshBasicMaterial();
let o = new THREE.Mesh(g, m);
scene.add(o);

window.addEventListener("resize", onWindowResize);

animate();

function animate() {
  requestAnimationFrame( animate );
  renderer.render(scene, camera);
}

function onWindowResize() {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(innerWidth, innerHeight);
}

let video = document.getElementById('video');
video.play();

let videoTex = new THREE.VideoTexture(video);
m.map = videoTex;
m.needsUpdate = true;
