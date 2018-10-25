import * as THREE from 'three'

import EarthColorMap from '../public/earthmap1k.jpg'
import EarthBumpMap from '../public/earthbump1k.jpg'
import EarthLightMap from '../public/earthlights1k.jpg'
import EarthSpecMap from '../public/earthspec1k.jpg'

export default class Scene {
  constructor (element) {
    this.element = element
    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000)
    this.renderer = new THREE.WebGLRenderer()
    
    element.appendChild(this.renderer.domElement)
    const light = new THREE.PointLight( 0x404040, 3, 100, 2)
    light.position.set(5, 5, 5)
    this.scene.add(light)
  
    const geometry = new THREE.SphereBufferGeometry(3, 100, 100)
    const material = new THREE.MeshPhongMaterial({
      map: new THREE.TextureLoader().load(EarthColorMap),
      bumpMap: new THREE.TextureLoader().load(EarthBumpMap),
      bumpScale: 0.01,
      specularMap: new THREE.TextureLoader().load(EarthSpecMap),
      shininess: 50
    })

    this.cube = new THREE.Mesh(geometry, material)
    this.scene.add(this.cube)

      const a = new THREE.Mesh(new THREE.SphereBufferGeometry(0.5, 30, 30), material)
      a.position.x = 6
      this.scene.add(a)
    this.camera.position.z = 5
    this.animate()
    
    window.addEventListener('resize', this.resize.bind(this)) 
    this.resize()
  }
  animate () {
    //this.cube.rotation.x += 0.01
    this.cube.rotation.y += 0.005

    this.renderer.render(this.scene, this.camera)
    requestAnimationFrame(this.animate.bind(this))
  }
  resize () {
    const width = this.element.clientWidth
    const height = this.element.clientHeight
    this.camera.aspect = width / height
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(width, height)
  }
}
