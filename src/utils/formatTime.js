export default function formatTime(secondsNum) {
  let hours = Math.floor(secondsNum / 3600);
  let minutes = Math.floor((secondsNum - hours * 3600) / 60);
  let seconds = Math.floor(secondsNum - hours * 3600 - minutes * 60);

  if (hours < 10) {
    hours = "0" + hours;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  return hours + ":" + minutes + ":" + seconds;
}
