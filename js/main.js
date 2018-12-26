// WebGL Example
// Copyright (C) 2017  Adnan Ademovic
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

var renderer = new Renderer(document.getElementById('webgl-canvas'))
renderer.setClearColor(101, 149, 237)
var gl = renderer.getContext()

var objects = []

Mesh.load(gl, '/Users/ksenia/Desktop/webgl-example-master/assets/sphere.obj', '/Users/ksenia/Desktop/webgl-example-master/assets/diffuse.png')
    .then(function (mesh) {
      objects.push(mesh)
    })

ShaderProgram.load(gl, '/Users/ksenia/Desktop/webgl-example-master/shaders/basic.vert', '/Users/ksenia/Desktop/webgl-example-master/shaders/basic.frag')
             .then(function (shader) {
               renderer.setShader(shader)
             })

var camera = new Camera()
camera.setOrthographic(16, 10, 10)
var light = new Light()

loop()

function loop () {
  renderer.render(camera, light, objects)
  light = light.rotateLightAboutY()
  // camera.position = camera.position.rotateY(Math.PI / 120)
  // camera.position = camera.position.rotateX(Math.PI / 120)
  // camera.position = camera.position.rotateZ(Math.PI / 120)
  // camera.position = camera.position.translate(0, 0, 0)
  requestAnimationFrame(loop)
}
