class gameControler {
  turn = "X";
  modal = null;
  constructor() {
    this.modal = new bootstrap.Modal("#myModal");
    $(".col-4").on("click", (event) => this.handleClick(event));
    $("#gameReset").on("click", () => this.resetBoard());
    this.displayTurn();
  }
  resetBoard() {
    $(".col-4").each((i, element) => (element.innerHTML = ""));
    this.turn = "X";
    this.modal.hide();
  }
  displayTurn() {
    $("#turnIndicator").text(`It is ${this.turn}'s turn!`);
  }
  handleClick(event) {
    const cell = event.currentTarget;

    if (cell.innerHTML.trim() !== "") {
      return;
    }
    let marker = "";
    if (this.turn === "X") {
      marker =
        '<img src="node_modules/bootstrap-icons/icons/x-lg.svg" alt="X" class="h-100 w-100"/>';
    } else {
      marker =
        '<img src="node_modules/bootstrap-icons/icons/circle.svg" alt="O" class="h-100 w-100"/>';
    }
    $(cell).append(marker);
    if (this.checkForWin(this.turn)) {
      this.triggerWinner(this.turn);
      return;
    }
    if (this.checkForTie()) {
      this.triggerTie();
      return;
    }
    if (this.turn === "X") {
      this.turn = "O";
    } else {
      this.turn = "X";
    }
    this.displayTurn();
  }
  triggerWinner(who) {
    $("#result").text(`${who} is the winner!!`);
    this.modal.show();
  }
  triggerTie() {
    $("#result").text(`It's a TIE!!`);
    this.modal.show();
  }
  checkForWin(who) {
    const storage = $(".col-4")
      .map((i, element) =>
        element.innerHTML.trim() === ""
          ? false
          : element.firstElementChild.alt === who
      )
      .toArray();

    if (this.checkIndex(storage, 0, 1, 2)) {
      return true;
    }
    if (this.checkIndex(storage, 3, 4, 5)) {
      return true;
    }
    if (this.checkIndex(storage, 6, 7, 8)) {
      return true;
    }
    if (this.checkIndex(storage, 0, 3, 6)) {
      return true;
    }
    if (this.checkIndex(storage, 1, 4, 7)) {
      return true;
    }
    if (this.checkIndex(storage, 2, 5, 8)) {
      return true;
    }
    if (this.checkIndex(storage, 0, 4, 8)) {
      return true;
    }
    if (this.checkIndex(storage, 2, 4, 6)) {
      return true;
    }
    return false;
  }
  checkForTie() {
    return $(".col-4")
      .toArray()
      .reduce(
        (carry, element) => carry && element.innerHTML.trim() !== "",
        true
      );
  }
  checkIndex(holder, i1, i2, i3) {
    return holder[i1] && holder[i2] && holder[i3];
  }
}

const game = new gameControler();
