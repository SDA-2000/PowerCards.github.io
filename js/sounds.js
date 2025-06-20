const sounds = {
  cardClick: new Audio('assets/sounds/cardClick.mp3'),
  endTurn: new Audio('assets/sounds/turnEndBtn.mp3'),
  win: new Audio('assets/sounds/win.mp3'),
  lose: new Audio('assets/sounds/lose.mp3')
};

export function playSound(name) {
  const sound = sounds[name];
  if (sound) {
    sound.currentTime = 0;
    sound.play();
  }
}