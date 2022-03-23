var _BoundedBuffer = function () {
  this.buffer = []
}
_BoundedBuffer.prototype = {
  add: function (item) {
    var length = this.buffer.push(item)
    if (length > this.limit) {
      this.buffer.splice(0, 1)
    }
  },

  drain: function (fn) {
    this.buffer.forEach(function(item) {
      fn(item)
    })
    
    this.buffer.length = 0
  }
}
export var BoundedBuffer = _BoundedBuffer
