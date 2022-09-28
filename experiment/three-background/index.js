import * as THREE from 'three'
import * as dat from "dat.gui";
import {OrbitControls} from "three/addons/controls/OrbitControls.js";
import gsap from 'gsap'
import {func} from "three/addons/nodes/shadernode/ShaderNodeBaseElements.js";

// 0. add dat gui
// const gui = new dat.GUI()
// const world = {
//     plane: {
//         width : 25,
//         height : 25,
//         widthSeg : 25,
//         heightSeg : 25
//     }
// }
// gui.add(world.plane, 'width', 1, 80).onChange(changePlaneByDat)
// gui.add(world.plane, 'height', 1, 80).onChange(changePlaneByDat)
// gui.add(world.plane, 'widthSeg', 1, 80).onChange(changePlaneByDat)
// gui.add(world.plane, 'heightSeg', 1, 80).onChange(changePlaneByDat)
// adjust the attributes through dat.gui
// function changePlaneByDat(){
//     planeMesh.geometry.dispose()
//     planeMesh.geometry = new THREE.PlaneGeometry(
//         world.plane.width, world.plane.height, world.plane.widthSeg, world.plane.heightSeg)
//     planeVertexPosition()
//     planeVertexColor()
// }


// 1. fundamental elements: scene, camera, renderer
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 2000)
const renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById('background'),
});


// 2. setup basics
const spaceTexture = new THREE.TextureLoader().load('public/pinkskyextend.jpg')
scene.background = spaceTexture
camera.position.setY(-200);
camera.position.setZ(25);
renderer.setSize(innerWidth, innerHeight)
renderer.setPixelRatio(devicePixelRatio)


// 3. add light
const light = new THREE.DirectionalLight(0xed83aa, 1)
light.position.set(0,1,1)
scene.add(light)


// 4. create objects
// 4.1 plane
const planeGeometry = new THREE.PlaneGeometry(600, 500, 70, 70)
const planeMaterial = new THREE.MeshPhongMaterial(
    {side:THREE.DoubleSide, flatShading: true, vertexColors: true})
const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial)
// planeMesh.translateY(- (innerHeight / 5))
scene.add(planeMesh)


// 5. manipulate objects
// set position for each vertex in the plane
function planeVertexPosition(){
    const randomValues = []
    const {array} = planeMesh.geometry.attributes.position
    for (let i = 0; i < array.length; i++){
        if (i % 3 === 0){
            const x = array[i]
            const y = array[i + 1]
            const z = array[i + 2]
            array[i] = x + (Math.random() - 0.5) * 3
            array[i + 1] = y + (Math.random() - 0.5) * 3
            array[i + 2] = z + (Math.random() - 0.5) * 3
        }
        randomValues.push(Math.random() * Math.PI * 2)
    }
    planeMesh.geometry.attributes.position.originalPosition = planeMesh.geometry.attributes.position.array
    planeMesh.geometry.attributes.position.randomValues = randomValues
}
planeVertexPosition()
// add color for each vertex in the plane
function planeVertexColor(){
    const vertexColors = []
    for (let i = 0; i < planeMesh.geometry.attributes.position.count; i++){
        // change each individual vertex's color
        vertexColors.push(0, 0.19, 0.4)
    }
    planeMesh.geometry.setAttribute(
        'color', new THREE.BufferAttribute(new Float32Array(vertexColors), 3))
}
planeVertexColor()



// 6. mouse interactions
// 6.1 orbit control using mouse
new OrbitControls(camera, renderer.domElement)
// 6.2 hover action
const rayCaster = new THREE.Raycaster
const mouse = {
    x: undefined,
    y: undefined
}
addEventListener('mousemove', (event) =>{
    // normalize coordinates
    mouse.x = (event.clientX / innerWidth) * 2 - 1
    mouse.y = - (event.clientY / innerWidth) * 2 + 1
})


// 7. animation
let frame = 0
function animate(){
    requestAnimationFrame(animate)
    renderer.render(scene, camera)

    // 7.1 change the plane color while hovering
    rayCaster.setFromCamera(mouse, camera)
    // use the rayCaster to point to the object where the mouse is hovering
    const intersects = rayCaster.intersectObject(planeMesh)
    if (intersects.length > 0){
        const {color} = intersects[0].object.geometry.attributes
        // 1 of 3 vertices
        color.setX(intersects[0].face.a, 0.1)
        color.setY(intersects[0].face.a, 0.5)
        color.setZ(intersects[0].face.a, 1)
        // 2 of 3 vertices
        color.setX(intersects[0].face.b, 0.1)
        color.setY(intersects[0].face.b, 0.5)
        color.setZ(intersects[0].face.b, 1)
        // 3 of 3 vertices
        color.setX(intersects[0].face.c, 0.1)
        color.setY(intersects[0].face.c, 0.5)
        color.setZ(intersects[0].face.c, 1)
        color.needsUpdate = true

        // change the color back while mouse moving away
        const initialColor = {r: 0, g: 0.19, b: 0.4}
        const hoverColor = {r: 0.1, g: 0.5, b: 1}
        gsap.to(hoverColor, {
            r: initialColor.r,
            g: initialColor.g,
            b: initialColor.b,
            duration: 1,
            onUpdate: () => {
                // 1 of 3 vertices
                color.setX(intersects[0].face.a, hoverColor.r)
                color.setY(intersects[0].face.a, hoverColor.g)
                color.setZ(intersects[0].face.a, hoverColor.b)
                // 2 of 3 vertices
                color.setX(intersects[0].face.b, hoverColor.r)
                color.setY(intersects[0].face.b, hoverColor.g)
                color.setZ(intersects[0].face.b, hoverColor.b)
                // 3 of 3 vertices
                color.setX(intersects[0].face.c, hoverColor.r)
                color.setY(intersects[0].face.c, hoverColor.g)
                color.setZ(intersects[0].face.c, hoverColor.b)
                color.needsUpdate = true
            }
        })
    }

    // 7.2 animate the wave
    const {array, originalPosition, randomValues} = planeMesh.geometry.attributes.position
    const movingRatio = 0.02
    frame += 0.01
    for (let i = 0; i < array.length; i+=3){
        // x
        array[i] = originalPosition[i] + Math.cos(frame + randomValues[i]) * movingRatio
        // y
        array[i + 1] = originalPosition[i + 1] + Math.sin(frame + randomValues[i + 1]) * movingRatio
    }
    planeMesh.geometry.attributes.position.needsUpdate = true

}
animate()

renderer.render(scene, camera)

