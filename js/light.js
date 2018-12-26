function Light () {
  this.lightDirection = new Vector3(-1, -1, -1)
  this.ambientLight = 0.3
}

Light.prototype.rotateLightAboutZ = function () {
  var output = new Light()
  angle = Number(Math.PI / 120)
  var c = Math.cos(angle)
  var s = Math.sin(angle)
  var mat = [c, -s, 0, s, c, 0, 0, 0, 1]
  output.lightDirection.x = c*this.lightDirection.x - s*this.lightDirection.y
  output.lightDirection.y = s*this.lightDirection.x + c*this.lightDirection.y
  output.lightDirection.z = this.lightDirection.z
  // output.lightDirection = this.lightDirection.add(new Vector3(0.01, 0.01, 0.01))
  output.ambientLight = 0.3
  this.lightSpecular = [0.8, 0.8, 0.8]
  this.materialShine = 100.0
  return output
}

Light.prototype.rotateLightAboutY = function () {
  var output = new Light()
  angle = Number(Math.PI / 120)
  var c = Math.cos(angle)
  var s = Math.sin(angle)
  var mat = [c, -s, 0, s, c, 0, 0, 0, 1]
  output.lightDirection.x = c*this.lightDirection.x + s*this.lightDirection.z
  output.lightDirection.y = this.lightDirection.y
  output.lightDirection.z = -s*this.lightDirection.x + c*this.lightDirection.z
  // output.lightDirection = this.lightDirection.add(new Vector3(0.01, 0.01, 0.01))
  output.ambientLight = 0.3
  this.lightSpecular = [0.8, 0.8, 0.8]
  this.materialShine = 100.0
  return output
}

Light.prototype.use = function (shaderProgram) {
  var dir = this.lightDirection
  var gl = shaderProgram.gl
  gl.uniform3f(shaderProgram.lightDirection, dir.x, dir.y, dir.z)
  gl.uniform1f(shaderProgram.ambientLight, this.ambientLight)
}
