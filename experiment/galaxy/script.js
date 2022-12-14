import * as THREE from 'three';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import * as dat from 'dat.gui'

/**
 * Basic
 */
// debug
const gui = new dat.GUI()
// scene, camera, renderer
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 2000)
const renderer = new THREE.WebGLRenderer();
// basic setting
renderer.setSize(innerWidth, innerHeight)
renderer.setPixelRatio(devicePixelRatio)
document.body.appendChild(renderer.domElement)


/**
 Galaxy
 */
const parameters = {}
parameters.count = 1000

let geometry = null
let material = null

function generateGalaxy(){
    /*
     * Geometry
     */
    geometry = new THREE.BufferGeometry()
    const positions = new Float32Array(parameters.count * 3)
    for (let i = 0; i < parameters.count; i++){
        const i3 = i * 3
        positions[i3] = (Math.random() - 0.5) * 3
        positions[i3 + 1] = (Math.random() - 0.5) * 3
        positions[i3 + 2] = (Math.random() - 0.5) * 3
    }
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

    /*
     * Material
     */
    material = new THREE.PointsMaterial({
        size: parameters.size,
        sizeAttenuation: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending
    })

    /*
     * Points
     */
    const points = new THREE.Points(geometry, material)
    scene.add(points)
}

generateGalaxy()