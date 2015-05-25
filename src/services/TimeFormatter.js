function ljust(stringish, minLength, padder = " ") {
  let string = stringish.toString();
  let paddingLength = minLength - string.length;
  if (paddingLength < 0) {
    return string;
  }
  return new Array( paddingLength + 1 ).join(padder) + string;
}

function formatDuration(milliseconds) {
  let seconds = Math.round(milliseconds / 1000);
  if (seconds === 0) {
    return "00:00";
  }

  let result = [
    60, // 60 seconds in a minute
    60, // 60 minutes in an hour
  ].map( (count) => {
    let n = seconds % count;
    seconds = Math.floor(seconds / count);
    return ljust(n, 2, "0");
  });

  return result.reverse().join(":");
}

export { formatDuration };
