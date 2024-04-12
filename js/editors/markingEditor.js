class MarkingEditor {
  // Constructor for the MarkingEditor class
  constructor(viewport, world, targetSegments) {
    // Set the viewport, world, and targetSegments properties of the MarkingEditor object
    this.viewport = viewport;
    this.world = world;
    this.targetSegments = targetSegments;

    // Set the canvas and context properties of the MarkingEditor object
    this.canvas = viewport.canvas;
    this.ctx = this.canvas.getContext("2d");

    // Set the mouse and intent properties of the MarkingEditor object to null
    this.mouse = null;
    this.intent = null;

    // Set the markings property of the MarkingEditor object to the markings property of the world object
    this.markings = world.markings;
  }

  // Method to enable the MarkingEditor object
  enable() {
    // Call the #addEventListeners method to add event listeners to the canvas
    this.#addEventListeners();
  }

  // Method to disable the MarkingEditor object
  disable() {
    // Call the #removeEventListeners method to remove event listeners from the canvas
    this.#removeEventListeners();
  }

  // Method to add event listeners to the canvas
  #addEventListeners() {
    // Bind the #handleMouseDown and #handleMouseMove methods to the MarkingEditor object
    this.boundMouseDown = this.#handleMouseDown.bind(this);
    this.boundMouseMove = this.#handleMouseMove.bind(this);

    // Add event listeners for the mousedown and mousemove events on the canvas
    this.canvas.addEventListener("mousedown", this.boundMouseDown);
    this.canvas.addEventListener("mousemove", this.boundMouseMove);

    // Prevent the context menu from appearing when right-clicking on the canvas
    this.boundContextMenu = (evt) => evt.preventDefault();
    this.canvas.addEventListener("contextmenu", this.boundContextMenu);
  }

  // Method to remove event listeners from the canvas
  #removeEventListeners() {
    // Remove event listeners for the mousedown and mousemove events from the canvas
    this.canvas.removeEventListener("mousedown", this.boundMouseDown);
    this.canvas.removeEventListener("mousemove", this.boundMouseMove);

    // Remove the context menu event listener from the canvas
    this.canvas.removeEventListener("contextmenu", this.boundContextMenu);
  }

  // Method to handle the mousemove event on the canvas
  #handleMouseMove(evt) {
    // Set the mouse property of the MarkingEditor object to the current mouse position
    this.mouse = this.viewport.getMouse(evt, true);

    // Get the nearest segment to the mouse position
    const seg = getNearestSegment(
      this.mouse,
      this.targetSegments,
      10 * this.viewport.zoom
    );

    // If a segment is found, project the mouse position onto the segment and set the intent property
    // of the MarkingEditor object to the result
    if (seg) {
      const proj = seg.projectPoint(this.mouse);
      if (proj.offset >= 0 && proj.offset <= 1) {
        this.intent = this.createMarking(proj.point, seg.directionVector());
      } else {
        this.intent = null;
      }
    } else {
      this.intent = null;
    }
  }

  // Method to handle the mousedown event on the canvas
  #handleMouseDown(evt) {
    // If the left mouse button is clicked
    if (evt.button == 0) {
      // If the intent property of the MarkingEditor object is not null, add the intent to the markings
      // property of the MarkingEditor object and set the intent property to null
      if (this.intent) {
        this.markings.push(this.intent);
        this.intent = null;
      }
    }

    // If the right mouse button is clicked
    if (evt.button == 2) {
      // Loop through the markings in the markings property of the MarkingEditor object
      for (let i = 0; i < this.markings.length; i++) {
        const poly = this.markings[i].poly;

        // If the mouse position is inside the polygon of a marking, remove the marking from the markings
        // property of the MarkingEditor object
        if (poly.containsPoint(this.mouse)) {
          this.markings.splice(i, 1);
          return;
        }
      }
    }
  }

  // Method to display the intent property of the MarkingEditor object on the canvas
  display() {
    // If the intent property of the MarkingEditor object is not null, draw the intent on the canvas
    if (this.intent) {
      this.intent.draw(this.ctx);
    }
  }
}
