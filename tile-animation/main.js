/**
 * TileContainer class used to manage what tile is currently shown
 */
class TileContainer {
  /**
   * TileContainer constructor
   * @param {Node} container the container div
   */
  constructor(container) {
    this.container = container
    this.currentX = 0
    this.currentY = 0
    this.width = container.dataset.width || 3
    this.height = container.dataset.height || 3

    // Bind the functions so they can be called from event listeners
    this.viewTile = this.viewTile.bind(this)
    this.scrollDown = this.scrollDown.bind(this)
    this.scrollUp = this.scrollUp.bind(this)
    this.scrollLeft = this.scrollLeft.bind(this)
    this.scrollRight = this.scrollRight.bind(this)
  }

  /**
   * Scroll to the coordinates of a given tile. the range is (0,0) to (this.width-1, this.height-1)
   * @param {number} x the x coordinate of the tile
   * @param {number} y the y coordinate of the tile
   */
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
  }

  /**
   * Scroll down by n tiles
   * @param {number=1} n the amount of tiles to scroll by
   */
  scrollDown(n = 1) {
    this.currentY += n
    this.viewTile()
  }

  /**
   * Scroll up by n tiles
   * @param {number=1} n the amount of tiles to scroll by
   */
  scrollUp(n = 1) {
    this.currentY -= n
    this.viewTile()
  }

  /**
   * Scroll right by n tiles
   * @param {number=1} n the amount of tiles to scroll by
   */
  scrollRight(n = 1) {
    console.log(this)
    this.currentX += n
    this.viewTile()
  }

  /**
   * Scroll left by n tiles
   * @param {number=1} n the amount of tiles to scroll by
   */
  scrollLeft(n = 1) {
    this.currentX -= n
    this.viewTile()
  }

  /**
   * Scrolls to the next tile in the tree
   */
  scrollNext() {
    if (this.currentX === 2) {
      this.currentY += 1
      this.currentX = 0
    } else {
      this.currentX += 1
    }
    this.viewTile()
  }

  /**
   * Scroll to the previous tile in the tree
   */
  scrollPrev() {
    if (this.currentX === 0) {
      this.currentY -= 1
      this.currentX = 2
    } else {
      this.currentX -= 1
    }
    this.viewTile()
  }
}

// Your container div
const containerDiv = document.querySelector('.tile-container')

// Instantiate the container
tileContainer = new TileContainer(containerDiv)

// Go to the prev/next tile when clicking on the container
containerDiv.addEventListener('click', () => {
  if (tileContainer.currentY === 2 && tileContainer.currentX === 2)
    scrollNext = false

  if (tileContainer.currentY === 0 && tileContainer.currentX === 0)
    scrollNext = true

  if (scrollNext)
    tileContainer.scrollNext()
  else
    tileContainer.scrollPrev()
})