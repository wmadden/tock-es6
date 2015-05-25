function play(audioAssetPath) {
  let audioElement = new Audio(audioAssetPath);
  audioElement.currentTime = 0.0;
  audioElement.play();
}

export { play };
