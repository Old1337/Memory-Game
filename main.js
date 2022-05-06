const startBtn = document.querySelector(".control-buttons button");
const restartBtn = document.querySelector(".restart");

const loseSound = document.getElementById("lose");
const winSound = document.getElementById("win");
const gameSound = document.getElementById("game");

let winMsg = document.querySelector(".result .win-msg");
let loseMsg = document.querySelector(".result .lose-msg");

const duration = 1000;
const blocksContainer = document.querySelector(".memory-game-blocks");
const blocks = Array.from(blocksContainer.children);
const orderRange = [...Array(blocks.length).keys()];

startBtn.addEventListener("click", () => {
  const userName = prompt("What is your name");

  if (!userName.trim()) {
    document.querySelector(".name span").innerHTML = "Unknown";
  } else {
    document.querySelector(".name span").innerHTML = userName;
  }
  gameSound.play();
  startBtn.parentElement.remove();

  countDown = setInterval(countDown, 1000);
});

restartBtn.addEventListener("click", () => {
  document.querySelector(".tries span").innerHTML = 0;
  document.querySelector(".timer span").innerHTML = 45;

  blocks.forEach((block) => block.classList.remove("matches"));

  winMsg.classList.remove("active");
  loseMsg.classList.remove("active");

  blocksContainer.classList.remove("no-click");

  shuffle(orderRange);

  blocks.forEach((block, index) => {
    block.style.order = orderRange[index];
  });
});

function countDown() {
  let timer = document.querySelector(".timer span");
  if (timer.innerHTML == 0) {
    isAllMatched(blocks);
  } else {
    timer.innerHTML--;
  }
}
shuffle(orderRange);

blocks.forEach((block, index) => {
  block.style.order = orderRange[index];

  block.addEventListener("click", () => {
    flipBlock(block);
  });
});

function isAllMatched(array) {
  const name = document.querySelector(".name span").innerHTML;
  if (!array.every((e) => e.classList.contains("matches"))) {
    blocksContainer.classList.add("no-click");

    loseMsg.innerHTML = `You Failed, good luck next time ${name}`;
    loseMsg.classList.add("active");
  } else {
    winMsg.innerHTML = `Congratulations ${name}, you have won the game`;
    winMsg.classList.add("active");
  }
}

function flipBlock(selectedBlock) {
  selectedBlock.classList.add("active");

  const flippedBlocks = blocks.filter((block) =>
    block.classList.contains("active")
  );

  if (flippedBlocks.length === 2) {
    stopClick();
    isMatched(flippedBlocks[0], flippedBlocks[1]);
  }
}

function isMatched(firstBlock, secondBlock) {
  let triesEl = document.querySelector(".tries span");

  if (firstBlock.dataset.technology === secondBlock.dataset.technology) {
    firstBlock.classList.remove("active");
    secondBlock.classList.remove("active");

    firstBlock.classList.add("shake");
    secondBlock.classList.add("shake");

    firstBlock.lastElementChild.classList.add("active");
    secondBlock.lastElementChild.classList.add("active");
    winSound.play();

    firstBlock.classList.add("matches");
    secondBlock.classList.add("matches");
  } else {
    setTimeout(() => {
      firstBlock.classList.remove("active");
      secondBlock.classList.remove("active");
      loseSound.play();
      triesEl.innerHTML++;
    }, duration);
  }
}
function stopClick() {
  blocksContainer.classList.add("no-click");

  setTimeout(() => {
    blocksContainer.classList.remove("no-click");
  }, duration);
}

function shuffle(array) {
  let current = array.length;

  while (current > 0) {
    randomIndex = Math.floor(Math.random() * current);
    current--;

    [array[current], array[randomIndex]] = [array[randomIndex], array[current]];
  }
  return array;
}
