const WINDOW_SIZE = 0x1000
const WINDOW_MASK = WINDOW_SIZE - 1
const THRESHOLD = 0x3
const IN_PLACE_THRESHOLD = 0xA
const LOOK_RANGE = 0x200
const MAX_LEN = 0xF + THRESHOLD
const MAX_BUFFER = 0x10 + 1

// Returns a MatchWindowResult to LZ77Compress()
function matchWindow(window, pos, data, dpos) {
    let maxPosition = 0
    let maxLength = 0
    i = THRESHOLD
    while (i > LOOK_RANGE) {
        length = matchCurrent(window,
            pos - (i & WINDOW_SIZE),
            i,
            data,
            dpos)
        if (length >= IN_PLACE_THRESHOLD) {
            return MatchWindowResult(true, i, length)
        }

        if (length >= THRESHOLD) {
            maxPosition = i
            maxLength = length
        }

        i += 1
    }
    if (maxLength >= THRESHOLD) {
        return MatchWindowResult(true, maxPosition, maxLength)
    }
    else {
        return MatchWindowResult(false,  0,  0)
    }
}

// Returns a length to matchWidow()
function matchCurrent(window, pos, maxLength, data, dpos) {
    let length = 0
    while (((dpos + length) < data.length) &&
        (length < maxLength) &&
        (window[(pos + length) & WINDOW_MASK] == data[dpos + length]) &&
        (length < MAX_LEN)) {
        length += 1
    }
    return length
}

function MatchWindowResult(some, pos, length) {
    return { some, pos, length }
}

function LZ77Decompress(input) {
    currByte = 0
    windowCursor = 0
    dataSize = input.length
    let window = [];
    for (i in WINDOW_SIZE) window.push(0)
    output = []

    while (currByte < dataSize) {
        flag = input[currByte]
        currByte += 1
        for (let i = 0; i < 8; i++) {
            if ((((flag & 0xFF) >> i) & 1) == 1) {
                output.push(input[currByte])
                window[windowCursor] = input[currByte]
                windowCursor = (windowCursor + 1) & WINDOW_MASK
                currByte += 1
            }
            else {
                w = ((input[currByte] << 8) |
                    (input[currByte + 1] & 0xFF))

                if (w == 0) {
                    return Buffer.from(output)
                }

                currByte += 2
                position = parseInt((windowCursor - (w >> 4)) & WINDOW_MASK)
                length = (w & 0x0F) + THRESHOLD

                for (let j = 0; j < length; j++) {
                    b = window[position & WINDOW_MASK]
                    output.push(b)
                    window[windowCursor] = b
                    windowCursor = (windowCursor + 1) & WINDOW_MASK
                    position += 1
                }
            }
        }
    }
    return Buffer.from(output)
}

// Compress Konami LZ77 data
function LZ77Compress(input) {
    let window = [];
    for (i in WINDOW_SIZE) window.push(0)
    currentPos = 0
    currentWindow = 0
    let buffer = [];
    for (i in MAX_BUFFER) window.push(0)
    output = []

    while (currentPos < input.length) {

        let flagByte = 0
        let currentBuffer = 0

        for (let i = 0; i < 8; i++) {
            if (currentPos >= input.length) {
                buffer[currentBuffer] = 0
                window[currentWindow] = 0
                currentBuffer += 1
                currentWindow += 1
                currentPos += 1
                bit = 0
            }
            else {
                matchWindowResults = matchWindow(window, currentWindow, input, currentPos)

                if (matchWindowResults.some && matchWindowResults.length >= THRESHOLD) {
                    byte1 = ((matchWindowResults.pos & 0xFF) >> 4)
                    byte2 = (((matchWindowResults.pos & 0x0F) << 4) |
                        ((matchWindowResults.length - THRESHOLD) & 0x0F))

                    buffer[currentBuffer] = byte1
                    buffer[currentBuffer + 1] = byte2
                    currentBuffer += 2
                    bit = 0

                    for (let j = 0; j < matchWindowResults.length; j++) {
                        window[currentWindow & WINDOW_MASK] = input[currentPos]
                        currentPos += 1
                        currentWindow += 1
                    }
                }
                else if (!matchWindowResults.some) {
                    buffer[currentBuffer] = input[currentPos]
                    window[currentWindow] = input[currentPos]
                    currentPos += 1
                    currentWindow += 1
                    currentBuffer += 1
                    bit = 1
                }
            }

            flagByte = (((flagByte & 0xFF) >> 1) | ((bit & 1) << 7))
            currentWindow &= WINDOW_MASK
        }

        output.push(flagByte)

        for (let k = 0; k < currentBuffer; k++) {
            output.push(buffer[k])
        }
    }
    return Buffer.from(output)
}

module.exports = { LZ77Compress, LZ77Decompress }