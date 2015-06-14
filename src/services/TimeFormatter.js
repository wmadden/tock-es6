function ljust(stringish, minLength, padder = " ") {
  let string = stringish.toString();
  let paddingLength = minLength - string.length;
  if (paddingLength < 0) {
    return string;
  }
  return new Array( paddingLength + 1 ).join(padder) + string;
}

function timeSegments(milliseconds) {
  let seconds = Math.round(milliseconds / 1000);

  if (seconds === 0) {
    return ["00", "00"];
  }

  let result = [];
  [
    60, // 60 seconds in a minute
    60, // 60 minutes in an hour
  ].forEach( (divisor) => {
    let n = seconds % divisor;
    seconds = Math.floor(seconds / divisor);
    result.push(ljust(n, 2, "0"));
  });
  return result.reverse();
}

function formatDuration(milliseconds) {
  let result = timeSegments(milliseconds);
  return result.join(":");
}

export { formatDuration, timeSegments };
