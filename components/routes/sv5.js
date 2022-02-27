const router = require('express').Router()
const { decryptHTTP, encryptHTTP } = require('../libs/crypto.js')
const objectFactory = require('../libs/objectFactory.js')
const { EVENT5, COURSES5, SDVX_AUTOMATION_SONGS, EXTENDS5 } = require('../../data/sv5data.js')
const config = require("../../config.json")
const res = require('express/lib/response')

router.use(decryptHTTP)

router.post("/core/KFC*/game/sv5_common", async (req, res) => {
    const initResponse = getSV5CommonData();
    const ciphered = encryptHTTP(initResponse)
    res.set('X-Eamuse-Info', ciphered.key)
    res.set('X-Compress', "none");
    res.send(ciphered.body);
})

function getSV5CommonData() {
    let obj = {
        "declaration": {
            "attributes": {
                "version": "1.0",
                "encoding": "SHIFT_JIS"
            }
        },
        "elements": [
            {
                "type": "element",
                "name": "response",
                "elements": [
                    {
                        "type" : "element",
                        "name" : "game",
                        "elements" : [{
                            "type" : "element",
                            "name" : "music_limited",
                            "elements" : []
                        },
                        {
                            "type" : "element",
                            "name" : "event",
                            "elements" : []
                        }]
                    }
                ]
            }
        ]
    }
    let songNum = 2000
    for (let i = 1; i < songNum; ++i) {
        for (let j = 0; j < 5; ++j) {
          obj.elements[0].elements[0].elements[0].elements.push({
            "type" : "element",
            "name" : "info",
            "elements" : [{
                "type" : "element",
                "name" : "music_id",
                "attributes": {
                    "__type" : "s32"
                },
                "elements" :[{"type" : "text" , "text" : i}]
            },
            {
                "type" : "element",
                "name" : "music_type",
                "attributes": {
                    "__type" : "u8"
                },
                "elements" :[{"type" : "text" , "text" : j}]
            },
            {
                "type" : "element",
                "name" : "limited",
                "attributes": {
                    "__type" : "u8"
                },
                "elements" :[{"type" : "text" , "text" : "3"}]
            }]
          });
        }
      }
      
      for (i of EVENT5){
        obj.elements[0].elements[0].elements[0].elements.push({
            "type" : "element",
            "name" : "info",
            "elements" : [{
                "type" : "element",
                "name" : "event_id",
                "attributes": {
                    "__type" : "str"
                },
                "elements" :[{"type" : "text" , "text" : i}]
            },]
          });
      }
      return obj
};
module.exports = router