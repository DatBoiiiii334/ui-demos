class TileContainer {
  constructor(container) {
    this.container = container
    this.currentX = 0
    this.currentY = 0
    this.width = container.dataset.width || 3
    this.height = container.dataset.height || 3

    this.viewTile = this.viewTile.bind(this)
    this.scrollDown = this.scrollDown.bind(this)
    this.scrollUp = this.scrollUp.bind(this)
    this.scrollLeft = this.scrollLeft.bind(this)
    this.scrollRight = this.scrollRight.bind(this)
  }

  viewTile(x = this.currentX, y = this.currentY) {
    console.info(`Scrolling from ${this.currentX},${this.currentY} to ${x},${y}`)
    if (x >= this.width) {
      x = this.width - 1
    }
    if (y >= this.height) {
      y = this.height - 1
    }
    if (x < 0) {
      x = 0
    }
    if (y < 0) {
      y = 0
    }

    this.currentX = x
    this.currentY = y
    const translateX = x * 100
    const translateY = y * 100
    this.container.style.transform = `translate(-${translateX}vw, -${translateY}vh)`
    return true
  }

  scrollDown(n = 1) {
    this.currentY += n
    return this.viewTile()
  }

  scrollUp(n = 1) {
    this.currentY -= n
    return this.viewTile()
  }

  scrollRight(n = 1) {
    console.log(this)
    this.currentX += n
    return this.viewTile()
  }

  scrollLeft(n = 1) {
    this.currentX -= n
    return this.viewTile()
  }

  scrollNext() {
    if(this.currentX === 2) {
      this.currentY += 1
      this.currentX = 0
    } else {
      this.currentX += 1
    }
    this.viewTile()
  }

  scrollPrev() {
    if(this.currentX === 0) {
      this.currentY -= 1
      this.currentX = 2
    } else {
      this.currentX -= 1
    }
    this.viewTile()
  }
}

const containerDiv = document.querySelector('.tile-container')
tileContainer = new TileContainer(containerDiv)

document.body.addEventListener('click', () => {
  if(tileContainer.currentY === 2 && tileContainer.currentX === 2) {
    scrollNext = false
  }
  if(tileContainer.currentY === 0 && tileContainer.currentX === 0) {
    scrollNext = true
  }

  if(scrollNext) tileContainer.scrollNext()
  else tileContainer.scrollPrev()
})  