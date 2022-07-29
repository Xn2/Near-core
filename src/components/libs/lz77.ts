const WINDOW_SIZE = 0x1000;
const WINDOW_MASK = WINDOW_SIZE - 1;
const THRESHOLD = 0x3;
const IN_PLACE_THRESHOLD = 0xa;
const LOOK_RANGE = 0x200;
const MAX_LEN = 0xf + THRESHOLD;
const MAX_BUFFER = 0x10 + 1;

// Returns a MatchWindowResult to LZ77Compress()
function matchWindow(window: any, pos: any, data: any, dpos: any) {
  let maxPosition = 0;
  let maxLength = 0;
  let i = THRESHOLD;
  while (i > LOOK_RANGE) {
    length = matchCurrent(window, pos - (i & WINDOW_SIZE), i, data, dpos);
    if (length >= IN_PLACE_THRESHOLD) {
      return MatchWindowResult(true, i, length);
    }

    if (length >= THRESHOLD) {
      maxPosition = i;
      maxLength = length;
    }

    i += 1;
  }
  if (maxLength >= THRESHOLD) {
    return MatchWindowResult(true, maxPosition, maxLength);
  } else {
    return MatchWindowResult(false, 0, 0);
  }
}

// Returns a length to matchWidow()
function matchCurrent(
  window: any,
  pos: any,
  maxLength: any,
  data: any,
  dpos: any
) {
  let length = 0;
  while (
    dpos + length < data.length &&
    length < maxLength &&
    window[(pos + length) & WINDOW_MASK] == data[dpos + length] &&
    length < MAX_LEN
  ) {
    length += 1;
  }
  return length;
}

function MatchWindowResult(some: any, pos: any, length: any) {
  return { some, pos, length };
}

function LZ77Decompress(input: any) {
  let currByte = 0;
  let windowCursor = 0;
  let dataSize = input.length;
  let window = [];
  for (let i in WINDOW_SIZE as any) window.push(0);
  let output = [];

  while (currByte < dataSize) {
    let flag = input[currByte];
    currByte += 1;
    for (let i = 0; i < 8; i++) {
      if ((((flag & 0xff) >> i) & 1) == 1) {
        output.push(input[currByte]);
        window[windowCursor] = input[currByte];
        windowCursor = (windowCursor + 1) & WINDOW_MASK;
        currByte += 1;
      } else {
        let w = (input[currByte] << 8) | (input[currByte + 1] & 0xff);

        if (w == 0) {
          return Buffer.from(output);
        }

        currByte += 2;
        //@ts-ignore
        let position = parseInt((windowCursor - (w >> 4)) & WINDOW_MASK);
        let length = (w & 0x0f) + THRESHOLD;

        for (let j = 0; j < length; j++) {
          let b: any = window[position & WINDOW_MASK];
          output.push(b);
          window[windowCursor] = b;
          windowCursor = (windowCursor + 1) & WINDOW_MASK;
          position += 1;
        }
      }
    }
  }
  return Buffer.from(output);
}

// Compress Konami LZ77 data
function LZ77Compress(input: any) {
  let window = [];
  for (let i in WINDOW_SIZE as any) window.push(0);
  let currentPos = 0;
  let currentWindow = 0;
  let buffer = [];
  for (let i in MAX_BUFFER as any) window.push(0);
  let output = [];

  while (currentPos < input.length) {
    let flagByte = 0;
    let currentBuffer = 0;

    for (let i = 0; i < 8; i++) {
      let bit = 0;
      if (currentPos >= input.length) {
        buffer[currentBuffer] = 0;
        window[currentWindow] = 0;
        currentBuffer += 1;
        currentWindow += 1;
        currentPos += 1;
        bit = 0;
      } else {
        let matchWindowResults = matchWindow(
          window,
          currentWindow,
          input,
          currentPos
        );

        if (matchWindowResults.some && matchWindowResults.length >= THRESHOLD) {
          let byte1 = (matchWindowResults.pos & 0xff) >> 4;
          let byte2 =
            ((matchWindowResults.pos & 0x0f) << 4) |
            ((matchWindowResults.length - THRESHOLD) & 0x0f);

          buffer[currentBuffer] = byte1;
          buffer[currentBuffer + 1] = byte2;
          currentBuffer += 2;
          bit = 0;

          for (let j = 0; j < matchWindowResults.length; j++) {
            window[currentWindow & WINDOW_MASK] = input[currentPos];
            currentPos += 1;
            currentWindow += 1;
          }
        } else if (!matchWindowResults.some) {
          buffer[currentBuffer] = input[currentPos];
          window[currentWindow] = input[currentPos];
          currentPos += 1;
          currentWindow += 1;
          currentBuffer += 1;
          bit = 1;
        }
      }

      flagByte = ((flagByte & 0xff) >> 1) | ((bit & 1) << 7);
      currentWindow &= WINDOW_MASK;
    }

    output.push(flagByte);

    for (let k = 0; k < currentBuffer; k++) {
      output.push(buffer[k]);
    }
  }
  return Buffer.from(output);
}

export { LZ77Compress, LZ77Decompress };
