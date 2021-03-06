const { EVENT6, COURSES6, SDVX_AUTOMATION_SONGS, EXTENDS6 } = require('../../data/sv6data.js');
const db = require('../sequelize.js')
const config = require('../../config.json')
const musicdb = require('../../data/music_db.json').mdb.music
let rooms = []

function getSV6CommonData() {
    let obj = {
        "declaration": {
            "attributes": {
                "version": "1.0",
                "encoding": "UTF-8"
            }
        },
        "elements": [
            {
                "type": "element",
                "name": "response",
                "elements": [
                    {
                        "type": "element",
                        "name": "game",
                        "elements": [{
                            "type": "element",
                            "name": "music_limited",
                            "elements": []
                        },
                        {
                            "type": "element",
                            "name": "event",
                            "elements": []
                        },
                        {
                            "type": "element",
                            "name": "skill_course",
                            "elements": []
                        },
                        {
                            "type": "element",
                            "name": "arena",
                            "elements": [
                                {
                                    "type": "element",
                                    "name": "season",
                                    "attributes": {
                                        "__type": "u16"
                                    },
                                    "elements": [
                                        {
                                            "type": "text",
                                            "text": "0"
                                        }
                                    ]
                                },
                                {
                                    "type": "element",
                                    "name": "time_start",
                                    "attributes": {
                                        "__type": "time"
                                    },
                                    "elements": [
                                        {
                                            "type": "text",
                                            "text": "1651704980"
                                        }
                                    ]
                                },
                                {
                                    "type": "element",
                                    "name": "time_end",
                                    "attributes": {
                                        "__type": "time"
                                    },
                                    "elements": [
                                        {
                                            "type": "text",
                                            "text": "1652704980"
                                        }
                                    ]
                                },
                                {
                                    "type": "element",
                                    "name": "shop_start",
                                    "attributes": {
                                        "__type": "time"
                                    },
                                    "elements": [
                                        {
                                            "type": "text",
                                            "text": "1651704980"
                                        }
                                    ]
                                },
                                {
                                    "type": "element",
                                    "name": "shop_end",
                                    "attributes": {
                                        "__type": "time"
                                    },
                                    "elements": [
                                        {
                                            "type": "text",
                                            "text": "1652704980"
                                        }
                                    ]
                                },
                                {
                                    "type": "element",
                                    "name": "is_open",
                                    "attributes": {
                                        "__type": "bool"
                                    },
                                    "elements": [
                                        {
                                            "type": "text",
                                            "text": "1"
                                        }
                                    ]
                                },
                                {
                                    "type": "element",
                                    "name": "is_shop",
                                    "attributes": {
                                        "__type": "bool"
                                    },
                                    "elements": [
                                        {
                                            "type": "text",
                                            "text": "1"
                                        }
                                    ]
                                },
                            ]
                        },
                        ]
                    }
                ]
            }
        ]
    }
    let songNum = 2000
    for (let i = 1; i < songNum; ++i) {
        for (let j = 0; j < 5; ++j) {
            obj.elements[0].elements[0].elements[0].elements.push({
                "type": "element",
                "name": "info",
                "elements": [{
                    "type": "element",
                    "name": "music_id",
                    "attributes": {
                        "__type": "s32"
                    },
                    "elements": [{ "type": "text", "text": i }]
                },
                {
                    "type": "element",
                    "name": "music_type",
                    "attributes": {
                        "__type": "u8"
                    },
                    "elements": [{ "type": "text", "text": j }]
                },
                {
                    "type": "element",
                    "name": "limited",
                    "attributes": {
                        "__type": "u8"
                    },
                    "elements": [{ "type": "text", "text": "3" }]
                }]
            });
        }
    }

    for (i of EVENT6) {
        obj.elements[0].elements[0].elements[1].elements.push({
            "type": "element",
            "name": "info",
            "elements": [{
                "type": "element",
                "name": "event_id",
                "attributes": {
                    "__type": "str"
                },
                "elements": [{ "type": "text", "text": i }]
            },]
        });
    }

    for (season of COURSES6) {
        for (course of season.courses) {
            const tracks = []
            for (track of course.tracks) {
                let tracksObj = {
                    "type": "element",
                    "name": "track",
                    "elements": []
                }
                tracksObj.elements.push({
                    "type": "element",
                    "name": "track_no",
                    "attributes": {
                        "__type": "s16"
                    },
                    "elements": [{
                        "type": "text",
                        "text": track.no
                    }]
                });
                tracksObj.elements.push({
                    "type": "element",
                    "name": "music_id",
                    "attributes": {
                        "__type": "s32"
                    },
                    "elements": [{
                        "type": "text",
                        "text": track.mid
                    }]
                })
                tracksObj.elements.push({
                    "type": "element",
                    "name": "music_type",
                    "attributes": {
                        "__type": "s8"
                    },
                    "elements": [{
                        "type": "text",
                        "text": track.mty
                    }]
                });
                tracks.push(tracksObj)
            }
            obj.elements[0].elements[0].elements[2].elements.push({
                "type": "element",
                "name": "info",
                "elements": [
                    {
                        "type": "element",
                        "name": "season_id",
                        "attributes": {
                            "__type": "s32"
                        },
                        "elements": [{ "type": "text", "text": season.id }]
                    },
                    {
                        "type": "element",
                        "name": "season_name",
                        "attributes": {
                            "__type": "str"
                        },
                        "elements": [{ "type": "text", "text": season.name }]
                    },
                    {
                        "type": "element",
                        "name": "season_new_flg",
                        "attributes": {
                            "__type": "bool"
                        },
                        "elements": [{ "type": "text", "text": season.isNew }]
                    },
                    {
                        "type": "element",
                        "name": "course_id",
                        "attributes": {
                            "__type": "s16"
                        },
                        "elements": [{ "type": "text", "text": course.id }]
                    },
                    {
                        "type": "element",
                        "name": "course_name",
                        "attributes": {
                            "__type": "str"
                        },
                        "elements": [{ "type": "text", "text": course.name }]
                    },
                    {
                        "type": "element",
                        "name": "course_type",
                        "attributes": {
                            "__type": "s16"
                        },
                        "elements": [{ "type": "text", "text": "0" }]
                    },
                    {
                        "type": "element",
                        "name": "skill_level",
                        "attributes": {
                            "__type": "s16"
                        },
                        "elements": [{ "type": "text", "text": course.level }]
                    },
                    {
                        "type": "element",
                        "name": "skill_name_id",
                        "attributes": {
                            "__type": "s16"
                        },
                        "elements": [{ "type": "text", "text": course.nameID }]
                    },
                    {
                        "type": "element",
                        "name": "matching_assist",
                        "attributes": {
                            "__type": "bool"
                        },
                        "elements": [{ "type": "text", "text": course.assist }]
                    },
                    {
                        "type": "element",
                        "name": "clear_rate",
                        "attributes": {
                            "__type": "s32"
                        },
                        "elements": [{ "type": "text", "text": "5000" }]
                    },
                    {
                        "type": "element",
                        "name": "avg_score",
                        "attributes": {
                            "__type": "u32"
                        },
                        "elements": [{ "type": "text", "text": "15000000" }]
                    },
                    tracks[0],
                    tracks[1],
                    tracks[2]
                ]
            });
        }
    }
    return obj
}

function scoreSort(a, b) {
    if (a.score < b.score) return 1;
    if (a.score > b.score) return -1;
    return 0
}

async function getSV6HiScoreData() {
    const scores = await db.ServerBest.findAll();
    const final = [];
    for (score of scores) {
        const user = await db.User.findOne({ where: { cardID: score.cardID } })
        const globalScores = await db.Score.findAll({where : { musicID : score.musicID, musicType : score.musicType}});
        let avgScore = 0
        let clearRate = 0
        for (globalScore of globalScores){
             avgScore += parseInt(globalScore.score)
             if(parseInt(globalScore.clearType) > 1) clearRate++
        }
        avgScore = (avgScore / globalScores.length).toFixed(0)
        clearRate = ((clearRate * 100 / globalScores.length)*100).toFixed(0)
        final.push({
            "type": "element",
            "name": "d",
            "elements": [
                {
                    "type": "element",
                    "name": "id",
                    "attributes": {
                        "__type": "u32"
                    },
                    "elements": [
                        {
                            "type": "text",
                            "text": score.musicID
                        }
                    ]
                },
                {
                    "type": "element",
                    "name": "ty",
                    "attributes": {
                        "__type": "u32"
                    },
                    "elements": [
                        {
                            "type": "text",
                            "text": score.musicType
                        }
                    ]
                },
                {
                    "type": "element",
                    "name": "a_sq",
                    "attributes": {
                        "__type": "str"
                    },
                    "elements": [
                        {
                            "type": "text",
                            "text": user.friendCode
                        }
                    ]
                },
                {
                    "type": "element",
                    "name": "a_nm",
                    "attributes": {
                        "__type": "str"
                    },
                    "elements": [
                        {
                            "type": "text",
                            "text": user.ign
                        }
                    ]
                },
                {
                    "type": "element",
                    "name": "a_sc",
                    "attributes": {
                        "__type": "u32"
                    },
                    "elements": [
                        {
                            "type": "text",
                            "text": score.score
                        }
                    ]
                },
                {
                    "type": "element",
                    "name": "l_sq",
                    "attributes": {
                        "__type": "str"
                    },
                    "elements": [
                        {
                            "type": "text",
                            "text": user.friendCode
                        }
                    ]
                },
                {
                    "type": "element",
                    "name": "l_nm",
                    "attributes": {
                        "__type": "str"
                    },
                    "elements": [
                        {
                            "type": "text",
                            "text": user.ign
                        }
                    ]
                },
                {
                    "type": "element",
                    "name": "l_sc",
                    "attributes": {
                        "__type": "u32"
                    },
                    "elements": [
                        {
                            "type": "text",
                            "text": score.score
                        }
                    ]
                },
                {
                    "type": "element",
                    "name": "avg_sc",
                    "attributes": {
                        "__type": "u32"
                    },
                    "elements": [
                        {
                            "type": "text",
                            "text": avgScore
                        }
                    ]
                },
                {
                    "type": "element",
                    "name": "cr",
                    "attributes": {
                        "__type": "s32"
                    },
                    "elements": [
                        {
                            "type": "text",
                            "text": clearRate
                        }
                    ]
                }
            ]
        }
        )
    }
    const obj = {
        "declaration": {
            "attributes": {
                "version": "1.0",
                "encoding": "UTF-8"
            }
        },
        "elements": [
            {
                "type": "element",
                "name": "response",
                "elements": [
                    {
                        "type": "element",
                        "name": "game",
                        "attributes": {
                            "status": "0"
                        },
                        "elements": [
                            {
                                "type": "element",
                                "name": "sc",
                                "elements": final
                            }
                        ]
                    }
                ]
            }
        ]
    }
    return obj
}

async function getSV6InquireData(cardID) {
    let results = await db.User.findOne({ where: { cardID } })
    if (!results) {
        return {
            "declaration": {
                "attributes": {
                    "version": "1.0",
                    "encoding": "UTF-8"
                }
            },
            "elements": [
                {
                    "type": "element",
                    "name": "response",
                    "elements": [
                        {
                            "type": "element",
                            "name": "cardmng",
                            "attributes": {
                                "status": "112"
                            }
                        }
                    ]
                }
            ]
        }
    }
    return {
        "declaration": {
            "attributes": {
                "version": "1.0",
                "encoding": "UTF-8"
            }
        },
        "elements": [
            {
                "type": "element",
                "name": "response",
                "elements": [
                    {
                        "type": "element",
                        "name": "cardmng",
                        "attributes": {
                            "binded": "1",
                            "dataid": cardID,
                            "ecflag": "1",
                            "expired": "0",
                            "newflag": "0",
                            "refid": cardID,
                            "status": "0"
                        }
                    }
                ]
            }
        ]
    }
}

async function getSV6AuthpassData(cardID, passCode, session) {
    let status = "0"
    let result = await db.User.findOne({ where: { cardID, passCode } })
    if (!result) status = "116";
    if (result) await result.update({ session })
    return {
        "declaration": {
            "attributes": {
                "version": "1.0",
                "encoding": "UTF-8"
            }
        },
        "elements": [
            {
                "type": "element",
                "name": "response",
                "elements": [
                    {
                        "type": "element",
                        "name": "cardmng",
                        "attributes": {
                            "status": status
                        }
                    }
                ]
            }
        ]
    }
}

async function createSV6PlayerAccount(cardID, passCode) {
    let result = await db.User.findOne({ where: { cardID } })
    if (result) return false;
    const gameConfig = genSV6DefaultGameConfigObject("")
    try {
        await db.User.create({ cardID, passCode, isComplete: false, gameConfig, isClaimed: false, friendCode: gameConfig.code, rivals: [] })
    }
    catch (e) {
        console.log(e)
    }
    return {
        "declaration": {
            "attributes": {
                "version": "1.0",
                "encoding": "ASCII"
            }
        },
        "elements": [
            {
                "type": "element",
                "name": "response",
                "elements": [
                    {
                        "type": "element",
                        "name": "cardmng",
                        "attributes": {
                            "dataid": cardID,
                            "refid": cardID,
                            "status": "0"
                        }
                    }
                ]
            }
        ]
    }
}

function genSV6DefaultGameConfigObject(name) {
    const friendCode = genFriendCode();
    const obj = {
        "name": name,
        "code": friendCode,
        "sdvx_id": friendCode,
        "gamecoin_packet": "0",
        "gamecoin_block": "0",
        "appeal_id": "0",
        "last_music_id": "0",
        "last_music_type": "0",
        "sort_type": "0",
        "headphone": "0",
        "blaster_energy": "0",
        "blaster_count": "0",
        "extrack_energy": "0",
        "hispeed": "0",
        "lanespeed": "0",
        "gauge_option": "0",
        "ars_option": "0",
        "notes_option": "0",
        "early_late_disp": "0",
        "draw_adjust": "0",
        "eff_c_left": "0",
        "eff_c_right": "1",
        "narrow_down": "0",
        "kac_id": name,
        "skill_level": "0",
        "skill_base_id": "0",
        "skill_name_id": "0",
        "ea_shop": {
            "packet_booster": "1",
            "blaster_pass_enable": "1",
            "blaster_pass_limit_date": "0"
        },
        "eaappli": {
            "relation": "1"
        },
        "cloud": {
            "relation": "1"
        },
        "block_no": "0",
        "skill": "0",
        "play_count": "0"
    }
    return obj
}

function genFriendCode() {
    let code = ""
    const alpha = "0123456789"
    for (let i = 0; i < 9; i++) {
        if (i == 4) {
            code += "-";
            continue;
        }
        code += alpha[Math.floor(Math.random() * alpha.length)]
    }
    return code
}

function unlockNavigators(items) {
    for (let i = 0; i < 300; ++i) items.push({
        "type": "element",
        "name": "info",
        "elements": [
            {
                "type": "element",
                "name": "type",
                "attributes": {
                    "__type": "u8"
                },
                "elements": [
                    {
                        "type": "text",
                        "text": "11"
                    }
                ]
            },
            {
                "type": "element",
                "name": "id",
                "attributes": {
                    "__type": "u32"
                },
                "elements": [
                    {
                        "type": "text",
                        "text": i
                    }
                ]
            },
            {
                "type": "element",
                "name": "param",
                "attributes": {
                    "__type": "u32"
                },
                "elements": [
                    {
                        "type": "text",
                        "text": "15"
                    }
                ]
            }
        ]
    });
    return items;
}

function unlockAppealCards(items) {
    for (let i = 0; i < 6000; ++i) items.push({
        "type": "element",
        "name": "info",
        "elements": [
            {
                "type": "element",
                "name": "type",
                "attributes": {
                    "__type": "u8"
                },
                "elements": [
                    {
                        "type": "text",
                        "text": "1"
                    }
                ]
            },
            {
                "type": "element",
                "name": "id",
                "attributes": {
                    "__type": "u32"
                },
                "elements": [
                    {
                        "type": "text",
                        "text": i
                    }
                ]
            },
            {
                "type": "element",
                "name": "param",
                "attributes": {
                    "__type": "u32"
                },
                "elements": [
                    {
                        "type": "text",
                        "text": "1"
                    }
                ]
            }
        ]
    });
    return items;
}

async function completeSV6PlayerAccount(cardID, ign, session) {
    let result = await db.User.findOne({ where: { cardID } })
    if (!result || !result.isComplete === false) return false;
    const gameConfig = genSV6DefaultGameConfigObject(ign)
    await result.update({ ign, skillLV: 0, apecaID: 0, session, gameConfig, isComplete: true, friendCode: gameConfig.code })
    return {
        "declaration": {
            "attributes": {
                "version": "1.0",
                "encoding": "UTF-8"
            }
        },
        "elements": [
            {
                "type": "element",
                "name": "response",
                "elements": [
                    {
                        "type": "element",
                        "name": "game",
                        "attributes": {
                            "status": "0"
                        },
                        "elements": [
                            {
                                "type": "element",
                                "name": "result",
                                "attributes": {
                                    "__type": "u8"
                                },
                                "elements": [
                                    {
                                        "type": "text",
                                        "text": "0"
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    }
}



async function getSV6FrozenData() {
    return {
        "declaration": {
            "attributes": {
                "version": "1.0",
                "encoding": "UTF-8"
            }
        },
        "elements": [
            {
                "type": "element",
                "name": "response",
                "elements": [
                    {
                        "type": "element",
                        "name": "game",
                        "attributes": {
                            "status": "0"
                        }
                    }
                ]
            }
        ]
    }
}

async function genID(){
    const alpha = "abcdefghijklmnopqrstuvwxyz0123456789"
    let ID = ""
    for (let i = 0 ; i < 16; i++){
        ID += alpha[Math.floor(Math.random() * alpha.length)]
    }
    return ID
}

async function getSV6EntrySData(session, contents) {
    let slotAvailable = false
    let roomIndex = -1
    if (rooms.length) {
        for (i in rooms){
            if (rooms[i].players.length != 4){
                slotAvailable = true 
                roomIndex = i
            }
        }
    }
    if (!slotAvailable){
        const id = await genID()
        rooms.push({
            id : id,
            mid : parseInt(contents.mid._text) || 0,
            players : [{ session, globalIP : contents.gip._text, localIP : contents.lip._text, port : contents.port._text }],
        })
        setTimeout(function(){
            const search = (element) => element.id == id;
            const index = rooms.findIndex(search)
            rooms.splice(index, 1);
        }, 10000)
        console.log(JSON.stringify(rooms))
        return {
            "declaration": {
                "attributes": {
                    "version": "1.0",
                    "encoding": "UTF-8"
                }
            },
            "elements": [
                {
                    "type": "element",
                    "name": "response",
                    "elements": [
                        {
                            "type": "element",
                            "name": "game",
                            "elements" : [
                                {
                                    "type": "element",
                                    "name" : "entry_id",
                                    "attributes" : {
                                        "__type" : "u32"
                                    },
                                    "elements" : [
                                        {
                                            "type" : "text",
                                            "text" : "0"
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    }
    else{
        let secondcall = false
        const data = [
            {
                "type": "element",
                "name" : "entry_id",
                "attributes" : {
                    "__type" : "u32"
                },
                "elements" : [
                    {
                        "type" : "text",
                        "text" : "0"
                    }
                ]
            }
        ]
        for(player of rooms[roomIndex].players){
            if (player.globalIP === contents.gip._text) secondcall = true
            data.push({
                "type": "element",
                "name" : "entry",
                "elements" : [
                    {
                        "type": "element",
                        "name" : "port",
                        "attributes" : {
                            "__type" : "u16"
                        },
                        "elements" : [
                            {
                                "type" : "text",
                                "text" : player.port
                            }
                        ]
                    },
                    {
                        "type": "element",
                        "name" : "gip",
                        "attributes" : {
                            "__type" : "4u8"
                        },
                        "elements" : [
                            {
                                "type" : "text",
                                "text" : player.globalIP
                            }
                        ]
                    },
                    {
                        "type": "element",
                        "name" : "lip",
                        "attributes" : {
                            "__type" : "4u8"
                        },
                        "elements" : [
                            {
                                "type" : "text",
                                "text" : player.localIP
                            }
                        ]
                    },
                ]
            })
        }
        if(!secondcall) rooms[roomIndex].players.push({ session, globalIP : contents.gip._text, localIP : contents.lip._text, port : contents.port._text })
        console.log(JSON.stringify(rooms))
        return {
            "declaration": {
                "attributes": {
                    "version": "1.0",
                    "encoding": "UTF-8"
                }
            },
            "elements": [
                {
                    "type": "element",
                    "name": "response",
                    "elements": [
                        {
                            "type": "element",
                            "name": "game",
                            "elements" : data
                        }
                    ]
                }
            ]
        }
    }
}

async function getSV6LoadMData(cardID) {
    const user = await db.User.findOne({ where: { cardID } })
    if (!user) return false;
    const scores = await db.BestScore.findAll({ where: { cardID } })
    let preparedScores = []
    for (score of scores) {
        preparedScores.push({
            "type": "element",
            "name": "info",
            "elements": [{
                "type": "element",
                "name": "param",
                "attributes": {
                    "__type": "u32",
                    "__count": "21"
                },
                "elements": [
                    {
                        "type": "text",
                        "text": getScoreString(score)
                    }
                ]
            }]
        });
    }
    const obj = {
        "declaration": {
            "attributes": {
                "version": "1.0",
                "encoding": "UTF-8"
            }
        },
        "elements": [
            {
                "type": "element",
                "name": "response",
                "elements": [
                    {
                        "type": "element",
                        "name": "game",
                        "attributes": {
                            "status": "0"
                        },
                        "elements": [
                            {
                                "type": "element",
                                "name": "music",
                                "elements": preparedScores
                            }
                        ]
                    }
                ]
            }
        ]
    }
    return obj
}

function getScoreString(score) {
    return `${score.musicID} ${score.musicType} ${score.score} ${score.exscore} ${score.clearType} ${score.scoreGrade} 0 0 ${score.btnRate} ${score.longRate} ${score.volRate} 0 0 0 0 0 0 0 0 0 0`
}

async function getSV6RivalData(cardID) {
    const user = await db.User.findOne({ where: { cardID } })
    const rivals = []
    if (!user) return false;
    if (user.rivals.length) {
        for (i in user.rivals) {
            const rival = user.rivals[i]
            rivals.push({
                "type": "element",
                "name": "rival",
                "elements": await getRivalData(rival, i)
            })
        }
    }
    return {
        "declaration": {
            "attributes": {
                "version": "1.0",
                "encoding": "UTF-8"
            }
        },
        "elements": [
            {
                "type": "element",
                "name": "response",
                "elements": [
                    {
                        "type": "element",
                        "name": "game",
                        "attributes": {
                            "status": "0"
                        },
                        "elements": rivals
                    }
                ]
            }
        ]
    }
}

async function getRivalData(rival, num) {
    const scores = await db.BestScore.findAll({ where: { cardID: rival.cardID } })
    if (!scores.length) return [];
    const final = []
    final.push({
        "type": "element",
        "name": "no",
        "attributes": {
            "__type": "s16"
        },
        "elements": [{ "type": "text", "text": num }]
    });
    final.push({
        "type": "element",
        "name": "seq",
        "attributes": {
            "__type": "str"
        },
        "elements": { "type": "text", "text": rival.friendCode }
    });
    final.push({
        "type": "element",
        "name": "name",
        "attributes": {
            "__type": "str"
        },
        "elements": [{ "type": "text", "text": rival.name }]
    });
    for (score of scores) {
        const scoreString = `${score.musicID} ${score.musicType} ${score.score} ${score.clearType} ${score.scoreGrade}`
        final.push({
            "type": "element",
            "name": "music",
            "elements": [
                {
                    "type": "element",
                    "name": "param",
                    "attributes": {
                        "__type": "u32",
                        "__count": "5"
                    },
                    "elements": [{ "type": "text", "text": scoreString }]
                }
            ]
        })
    }
    return final
}

async function getSV6PlaySData() {
    return {
        "declaration": {
            "attributes": {
                "version": "1.0",
                "encoding": "UTF-8"
            }
        },
        "elements": [
            {
                "type": "element",
                "name": "response",
                "elements": [
                    {
                        "type": "element",
                        "name": "game",
                        "attributes": {
                            "status": "0"
                        }
                    }
                ]
            }
        ]
    }
}

async function getSV6SaveEData() {
    return {
        "declaration": {
            "attributes": {
                "version": "1.0",
                "encoding": "UTF-8"
            }
        },
        "elements": [
            {
                "type": "element",
                "name": "response",
                "elements": [
                    {
                        "type": "element",
                        "name": "game",
                        "attributes": {
                            "status": "0"
                        }
                    }
                ]
            }
        ]
    }
}

async function getSV6LoungeData() {
    return {
        "declaration": {
            "attributes": {
                "version": "1.0",
                "encoding": "UTF-8"
            }
        },
        "elements": [
            {
                "type": "element",
                "name": "response",
                "elements": [
                    {
                        "type": "element",
                        "name": "game",
                        "attributes": {
                            "status": "0"
                        },
                        "elements": [
                            {
                                "type": "element",
                                "name": "interval",
                                "attributes": {
                                    "__type": "u32"
                                },
                                "elements": [
                                    {
                                        "type": "text",
                                        "text": "30"
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    }
}

async function loadSV6PlayerAccount(cardID, session) {
    let result = await db.User.findOne({ where: { cardID, session } })
    if (!result) return false;
    let items = []
    let gameConfig = result.gameConfig
    items = unlockNavigators(items);
    items = unlockAppealCards(items);
    items = await getAchievements(items, cardID)
    return {
        "declaration": {
            "attributes": {
                "version": "1.0",
                "encoding": "UTF-8"
            }
        },
        "elements": [
            {
                "type": "element",
                "name": "response",
                "elements": [
                    {
                        "type": "element",
                        "name": "game",
                        "attributes": {
                            "status": "0"
                        },
                        "elements": [
                            {
                                "type": "element",
                                "name": "result",
                                "attributes": {
                                    "__type": "u8"
                                },
                                "elements": [
                                    {
                                        "type": "text",
                                        "text": "0"
                                    }
                                ]
                            },
                            {
                                "type": "element",
                                "name": "name",
                                "attributes": {
                                    "__type": "str"
                                },
                                "elements": [
                                    {
                                        "type": "text",
                                        "text": gameConfig.name.toString()
                                    }
                                ]
                            },
                            {
                                "type": "element",
                                "name": "code",
                                "attributes": {
                                    "__type": "str"
                                },
                                "elements": [
                                    {
                                        "type": "text",
                                        "text": gameConfig.code.toString()
                                    }
                                ]
                            },
                            {
                                "type": "element",
                                "name": "sdvx_id",
                                "attributes": {
                                    "__type": "str"
                                },
                                "elements": [
                                    {
                                        "type": "text",
                                        "text": gameConfig.code.toString()
                                    }
                                ]
                            },
                            {
                                "type": "element",
                                "name": "gamecoin_packet",
                                "attributes": {
                                    "__type": "u32"
                                },
                                "elements": [
                                    {
                                        "type": "text",
                                        "text": gameConfig.gamecoin_packet.toString()
                                    }
                                ]
                            },
                            {
                                "type": "element",
                                "name": "gamecoin_block",
                                "attributes": {
                                    "__type": "u32"
                                },
                                "elements": [
                                    {
                                        "type": "text",
                                        "text": gameConfig.gamecoin_block.toString()
                                    }
                                ]
                            },
                            {
                                "type": "element",
                                "name": "appeal_id",
                                "attributes": {
                                    "__type": "u16"
                                },
                                "elements": [
                                    {
                                        "type": "text",
                                        "text": gameConfig.appeal_id.toString()
                                    }
                                ]
                            },
                            {
                                "type": "element",
                                "name": "last_music_id",
                                "attributes": {
                                    "__type": "s32"
                                },
                                "elements": [
                                    {
                                        "type": "text",
                                        "text": gameConfig.last_music_id.toString()
                                    }
                                ]
                            },
                            {
                                "type": "element",
                                "name": "last_music_type",
                                "attributes": {
                                    "__type": "u8"
                                },
                                "elements": [
                                    {
                                        "type": "text",
                                        "text": gameConfig.last_music_type.toString()
                                    }
                                ]
                            },
                            {
                                "type": "element",
                                "name": "sort_type",
                                "attributes": {
                                    "__type": "u8"
                                },
                                "elements": [
                                    {
                                        "type": "text",
                                        "text": gameConfig.sort_type.toString()
                                    }
                                ]
                            },
                            {
                                "type": "element",
                                "name": "headphone",
                                "attributes": {
                                    "__type": "u8"
                                },
                                "elements": [
                                    {
                                        "type": "text",
                                        "text": gameConfig.headphone.toString()
                                    }
                                ]
                            },
                            {
                                "type": "element",
                                "name": "blaster_energy",
                                "attributes": {
                                    "__type": "u32"
                                },
                                "elements": [
                                    {
                                        "type": "text",
                                        "text": gameConfig.blaster_energy.toString()
                                    }
                                ]
                            },
                            {
                                "type": "element",
                                "name": "blaster_count",
                                "attributes": {
                                    "__type": "u32"
                                },
                                "elements": [
                                    {
                                        "type": "text",
                                        "text": gameConfig.blaster_count.toString()
                                    }
                                ]
                            },
                            {
                                "type": "element",
                                "name": "extrack_energy",
                                "attributes": {
                                    "__type": "u16"
                                },
                                "elements": [
                                    {
                                        "type": "text",
                                        "text": gameConfig.extrack_energy.toString()
                                    }
                                ]
                            },
                            {
                                "type": "element",
                                "name": "hispeed",
                                "attributes": {
                                    "__type": "s32"
                                },
                                "elements": [
                                    {
                                        "type": "text",
                                        "text": gameConfig.hispeed.toString()
                                    }
                                ]
                            },
                            {
                                "type": "element",
                                "name": "lanespeed",
                                "attributes": {
                                    "__type": "u32"
                                },
                                "elements": [
                                    {
                                        "type": "text",
                                        "text": gameConfig.lanespeed.toString()
                                    }
                                ]
                            },
                            {
                                "type": "element",
                                "name": "gauge_option",
                                "attributes": {
                                    "__type": "u8"
                                },
                                "elements": [
                                    {
                                        "type": "text",
                                        "text": gameConfig.gauge_option.toString()
                                    }
                                ]
                            },
                            {
                                "type": "element",
                                "name": "ars_option",
                                "attributes": {
                                    "__type": "u8"
                                },
                                "elements": [
                                    {
                                        "type": "text",
                                        "text": gameConfig.ars_option.toString()
                                    }
                                ]
                            },
                            {
                                "type": "element",
                                "name": "notes_option",
                                "attributes": {
                                    "__type": "u8"
                                },
                                "elements": [
                                    {
                                        "type": "text",
                                        "text": gameConfig.notes_option.toString()
                                    }
                                ]
                            },
                            {
                                "type": "element",
                                "name": "early_late_disp",
                                "attributes": {
                                    "__type": "u8"
                                },
                                "elements": [
                                    {
                                        "type": "text",
                                        "text": gameConfig.early_late_disp.toString()
                                    }
                                ]
                            },
                            {
                                "type": "element",
                                "name": "draw_adjust",
                                "attributes": {
                                    "__type": "s32"
                                },
                                "elements": [
                                    {
                                        "type": "text",
                                        "text": gameConfig.draw_adjust.toString()
                                    }
                                ]
                            },
                            {
                                "type": "element",
                                "name": "eff_c_left",
                                "attributes": {
                                    "__type": "u8"
                                },
                                "elements": [
                                    {
                                        "type": "text",
                                        "text": gameConfig.eff_c_left.toString()
                                    }
                                ]
                            },
                            {
                                "type": "element",
                                "name": "eff_c_right",
                                "attributes": {
                                    "__type": "u8"
                                },
                                "elements": [
                                    {
                                        "type": "text",
                                        "text": gameConfig.eff_c_right.toString()
                                    }
                                ]
                            },
                            {
                                "type": "element",
                                "name": "narrow_down",
                                "attributes": {
                                    "__type": "u8"
                                },
                                "elements": [
                                    {
                                        "type": "text",
                                        "text": gameConfig.narrow_down.toString()
                                    }
                                ]
                            },
                            {
                                "type": "element",
                                "name": "kac_id",
                                "attributes": {
                                    "__type": "str"
                                },
                                "elements": [
                                    {
                                        "type": "text",
                                        "text": gameConfig.name.toString()
                                    }
                                ]
                            },
                            {
                                "type": "element",
                                "name": "skill_level",
                                "attributes": {
                                    "__type": "s16"
                                },
                                "elements": [
                                    {
                                        "type": "text",
                                        "text": gameConfig.skill_level.toString()
                                    }
                                ]
                            },
                            {
                                "type": "element",
                                "name": "skill_base_id",
                                "attributes": {
                                    "__type": "s16"
                                },
                                "elements": [
                                    {
                                        "type": "text",
                                        "text": gameConfig.skill_base_id.toString()
                                    }
                                ]
                            },
                            {
                                "type": "element",
                                "name": "skill_name_id",
                                "attributes": {
                                    "__type": "s16"
                                },
                                "elements": [
                                    {
                                        "type": "text",
                                        "text": gameConfig.skill_name_id.toString()
                                    }
                                ]
                            },
                            {
                                "type": "element",
                                "name": "play_count",
                                "attributes": {
                                    "__type": "u32"
                                },
                                "elements": [
                                    {
                                        "type": "text",
                                        "text": gameConfig.play_count.toString()
                                    }
                                ]
                            },
                            {
                                "type": "element",
                                "name": "ea_shop",
                                "elements": [
                                    {
                                        "type": "element",
                                        "name": "packet_booster",
                                        "attributes": {
                                            "__type": "s32"
                                        },
                                        "elements": [
                                            {
                                                "type": "text",
                                                "text": gameConfig.ea_shop.packet_booster
                                            }
                                        ]
                                    },
                                    {
                                        "type": "element",
                                        "name": "blaster_pass_enable",
                                        "attributes": {
                                            "__type": "bool"
                                        },
                                        "elements": [
                                            {
                                                "type": "text",
                                                "text": gameConfig.ea_shop.blaster_pass_enable
                                            }
                                        ]
                                    },
                                    {
                                        "type": "element",
                                        "name": "blaster_pass_limit_date",
                                        "attributes": {
                                            "__type": "u64"
                                        },
                                        "elements": [
                                            {
                                                "type": "text",
                                                "text": Math.floor((Date.now() / 1000) + 100000)
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "type": "element",
                                "name": "eaappli",
                                "elements": [
                                    {
                                        "type": "element",
                                        "name": "relation",
                                        "attributes": {
                                            "__type": "s8"
                                        },
                                        "elements": [
                                            {
                                                "type": "text",
                                                "text": gameConfig.eaappli.relation
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "type": "element",
                                "name": "cloud",
                                "elements": [
                                    {
                                        "type": "element",
                                        "name": "relation",
                                        "attributes": {
                                            "__type": "s8"
                                        },
                                        "elements": [
                                            {
                                                "type": "text",
                                                "text": gameConfig.cloud.relation
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "type": "element",
                                "name": "arena",
                                "elements": [
                                    {
                                        "type": "element",
                                        "name": "rank_point",
                                        "attributes": {
                                            "__type": "s32"
                                        },
                                        "elements": [
                                            {
                                                "type": "text",
                                                "text": "22000"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "element",
                                        "name": "shop_point",
                                        "attributes": {
                                            "__type": "s32"
                                        },
                                        "elements": [
                                            {
                                                "type": "text",
                                                "text": "20000"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "element",
                                        "name": "ultimate_rate",
                                        "attributes": {
                                            "__type": "s32"
                                        },
                                        "elements": [
                                            {
                                                "type": "text",
                                                "text": "1"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "element",
                                        "name": "rank_play_cnt",
                                        "attributes": {
                                            "__type": "u16"
                                        },
                                        "elements": [
                                            {
                                                "type": "text",
                                                "text": "1"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "element",
                                        "name": "ultimate_play_cnt",
                                        "attributes": {
                                            "__type": "u16"
                                        },
                                        "elements": [
                                            {
                                                "type": "text",
                                                "text": "1"
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "type": "element",
                                "name": "skill",
                                "elements": await getSkillAnalyzerCourses(cardID)
                            },
                            {
                                "type": "element",
                                "name": "item",
                                "elements": items
                            },
                            {
                                "type": "element",
                                "name": "param",
                                "elements": await getParams(cardID)
                            },
                        ]
                    }
                ]
            }
        ]
    }
}

async function getAchievements(items, cardID) {
    let achievements = await db.Achievement.findAll({ where: { cardID } });
    for (entry of achievements) {
        items.push({
            "type": "element",
            "name": "info",
            "elements": [
                {
                    "type": "element",
                    "name": "type",
                    "attributes": {
                        "__type": "u8"
                    },
                    "elements": [
                        {
                            "type": "text",
                            "text": entry.type
                        }
                    ]
                },
                {
                    "type": "element",
                    "name": "id",
                    "attributes": {
                        "__type": "u32"
                    },
                    "elements": [
                        {
                            "type": "text",
                            "text": entry.paramID
                        }
                    ]
                },
                {
                    "type": "element",
                    "name": "param",
                    "attributes": {
                        "__type": "u32",
                    },
                    "elements": [
                        {
                            "type": "text",
                            "text": entry.param
                        }
                    ]
                }
            ]

        })
    }
    return items
}

async function getParams(cardID) {
    let params = await db.Param.findAll({ where: { cardID } })
    if (!params) return []
    let final = []
    for (entry of params) {
        final.push(
            {
                "type": "element",
                "name": "info",
                "elements": [
                    {
                        "type": "element",
                        "name": "type",
                        "attributes": {
                            "__type": "s32"
                        },
                        "elements": [
                            {
                                "type": "text",
                                "text": entry.type
                            }
                        ]
                    },
                    {
                        "type": "element",
                        "name": "id",
                        "attributes": {
                            "__type": "s32"
                        },
                        "elements": [
                            {
                                "type": "text",
                                "text": entry.paramID
                            }
                        ]
                    },
                    {
                        "type": "element",
                        "name": "param",
                        "attributes": {
                            "__type": "s32",
                            "__count": entry.param.split(' ').length
                        },
                        "elements": [
                            {
                                "type": "text",
                                "text": entry.param
                            }
                        ]
                    }
                ]

            }
        )
    }
    return final
}

async function saveSV6Score(session, scoreContents) {
    const user = await db.User.findOne({ where: { cardID: scoreContents.refid._text } });
    var track;
    if (scoreContents.track.length > 1)
        track = scoreContents.track[scoreContents.track.length - 1];
    else
        track = scoreContents.track;
    
    const userBest = await db.BestScore.findOne({ where: { cardID: scoreContents.refid._text, musicID: track.music_id._text, musicType: track.music_type._text } });
    const serverBest = await db.ServerBest.findOne({ where: { musicID: track.music_id._text, musicType: track.music_type._text } });
    if (!user) return false;
    if (user.session !== session) return false;
    const scoreObj = {
        playID: track.play_id._text,
        cardID: scoreContents.refid._text,
        musicID: track.music_id._text,
        musicType: track.music_type._text,
        score: track.score._text,
        exscore: track.exscore._text,
        clearType: track.clear_type._text,
        scoreGrade: track.score_grade._text,
        maxChain: track.max_chain._text,
        just: track.just._text,
        critical: track.critical._text,
        near: track.near._text,
        error: track.error._text,
        effectiveRate: track.effective_rate._text,
        btnRate: track.btn_rate._text,
        longRate: track.long_rate._text,
        volRate: track.vol_rate._text,
        mode: track.mode._text,
        gaugeType: track.gauge_type._text,
        notesOption: track.notes_option._text,
        onlineNum: track.online_num._text,
        localNum: track.local_num._text,
        challengeType: track.challenge_type._text,
        retryCnt: track.retry_cnt._text,
        judge: track.judge._text,
        dropFrame: track.drop_frame._text,
        dropFrameMax: track.drop_frame_max._text,
        etc: track.etc._text,
        mixID: track.mix_id._text,
        mixLike: track.mix_like._text,
    }
    await db.Score.create(scoreObj)
    if (!userBest) db.BestScore.create(scoreObj)
    if (userBest) {
        if (parseInt(track.score._text) > userBest.score) {
            await userBest.update({ score: scoreObj.score, notesOption: scoreObj.notesOption, scoreGrade: scoreObj.scoreGrade, just: scoreObj.just, critical: scoreObj.critical, near: scoreObj.near, error: scoreObj.error, mode: scoreObj.mode, btnRate: scoreObj.btnRate, volRate: scoreObj.volRate, longRate: scoreObj.longRate })
        }
        if (parseInt(track.exscore._text) > userBest.exscore) {
            await userBest.update({ exscore: scoreObj.exscore, notesOption: scoreObj.notesOption, just: scoreObj.just, critical: scoreObj.critical, near: scoreObj.near, error: scoreObj.error, mode: scoreObj.mode })
        }
        if (parseInt(track.clear_type._text) > userBest.clearType) {
            await userBest.update({ clearType: scoreObj.clearType, notesOption: scoreObj.notesOption, mode: scoreObj.mode, effectiveRate: scoreObj.effectiveRate })
        }
    }
    if (!serverBest) await db.ServerBest.create({cardID : scoreObj.cardID, musicID : scoreObj.musicID, musicType : scoreObj.musicType, score : scoreObj.score})
    if (serverBest){
        if (parseInt(track.score._text) > serverBest.score) {
            await serverBest.update({ score: scoreObj.score, cardID : scoreObj.cardID})
        }
    }
    return {
        "declaration": {
            "attributes": {
                "version": "1.0",
                "encoding": "UTF-8"
            }
        },
        "elements": [
            {
                "type": "element",
                "name": "response",
                "elements": [
                    {
                        "type": "element",
                        "name": "game",
                        "attributes": {
                            "status": "0"
                        }
                    }
                ]
            }
        ]
    }
}

async function saveSV6(session, cardID, configContents) {
    const user = await db.User.findOne({ where: { cardID } })
    if (!user) return false;
    if (user.session !== session) return false;
    const newConfig = {
        "name": user.ign,
        "code": user.gameConfig.code,
        "sdvx_id": user.gameConfig.code,
        "appeal_id": configContents.appeal_id._text,
        "gamecoin_packet": parseInt(user.gameConfig.gamecoin_packet) + parseInt(configContents.earned_gamecoin_packet._text),
        "gamecoin_block": parseInt(user.gameConfig.gamecoin_block) + parseInt(configContents.earned_gamecoin_block._text),
        "last_music_id": configContents.music_id._text,
        "last_music_type": configContents.music_type._text,
        "sort_type": configContents.sort_type._text,
        "headphone": configContents.headphone._text,
        "blaster_energy": parseInt(user.gameConfig.blaster_energy) + parseInt(configContents.earned_blaster_energy._text),
        "blaster_count": "0",
        "extrack_energy": parseInt(user.gameConfig.extrack_energy) + parseInt(configContents.earned_extrack_energy._text),
        "hispeed": configContents.hispeed._text,
        "lanespeed": configContents.lanespeed._text,
        "gauge_option": configContents.gauge_option._text,
        "ars_option": configContents.ars_option._text,
        "notes_option": configContents.notes_option._text,
        "early_late_disp": configContents.early_late_disp._text,
        "draw_adjust": configContents.draw_adjust._text,
        "eff_c_left": configContents.eff_c_left._text,
        "eff_c_right": configContents.eff_c_right._text,
        "narrow_down": configContents.narrow_down._text,
        "kac_id": user.ign,
        "skill_level": configContents.skill_level._text,
        "skill_base_id": configContents.skill_base_id._text,
        "skill_name_id": configContents.skill_name_id._text,
        "ea_shop": {
            "packet_booster": "1",
            "blaster_pass_enable": "1",
            "blaster_pass_limit_date": "0"
        },
        "eaappli": {
            "relation": "1"
        },
        "cloud": {
            "relation": "1"
        },
        "block_no": "0",
        "skill": "0",
        "play_count": parseInt(user.gameConfig.play_count) + 1
    }
    const params = await db.Param.findAll({ where: { cardID } })
    if (!params.length) {
        for (entry of configContents.param.info) {
            db.Param.create({ cardID, type: entry.type._text, paramID: entry.id._text, param: entry.param._text })
        }
    }
    if(typeof configContents.course !== "undefined"){
        const skillContents = configContents.course
        skillContents.refid = {_text : cardID}
        await SaveSV6SkillData(session, skillContents)
    }
    else {
        for (newParam of configContents.param.info) {
            let exists = false
            for (currentParam of params) {
                if (currentParam.type.toString() == newParam.type._text && currentParam.paramID.toString() == newParam.id._text) {
                    exists = true
                    if (currentParam.param !== newParam.param._text) {
                        await currentParam.update({ param: newParam.param._text })
                    }
                }
            }
            if (!exists) {
                db.Param.create({ cardID, type: newParam.type._text, paramID: newParam.id._text, param: newParam.param._text })
            }
        }
    }
    const achievements = await db.Achievement.findAll({ where: { cardID } })
    if (!achievements.length) {
        for (entry of configContents.item.info) {
            db.Achievement.create({ cardID, type: entry.type._text, paramID: entry.id._text, param: entry.param._text })
        }
    }
    else if (types.get(configContents.item.info) === types.array) {
        for (newParam of configContents.item.info) {
            let exists = false
            for (currentParam of achievements) {
                if (currentParam.type.toString() == newParam.type._text && currentParam.paramID.toString() == newParam.id._text) {
                    exists = true
                    if (currentParam.param !== newParam.param._text) {
                        await currentParam.update({ param: newParam.param._text })
                    }
                }
            }
            if (!exists) {
                db.Achievement.create({ cardID, type: newParam.type._text, paramID: newParam.id._text, param: newParam.param._text })
            }
        }
    }
    else if (types.get(configContents.item.info) === types.object) {
        let exists = false
        for (currentParam of achievements) {
            if (currentParam.type.toString() == configContents.item.info.type._text && currentParam.paramID.toString() == configContents.item.info.id._text) {
                exists = true
                if (currentParam.param !== configContents.item.info.param._text) {
                    await currentParam.update({ param: configContents.item.info.param._text })
                }
            }
        }
        if (!exists) {
            db.Achievement.create({ cardID, type: configContents.item.info.type._text, paramID: configContents.item.info.id._text, param: configContents.item.info.param._text })
        }
    }

    try {
        await user.update({ gameConfig: newConfig, apecaID: configContents.appeal_id._text, skillLV: configContents.skill_level._text })
        return {
            "declaration": {
                "attributes": {
                    "version": "1.0",
                    "encoding": "UTF-8"
                }
            },
            "elements": [
                {
                    "type": "element",
                    "name": "response",
                    "elements": [
                        {
                            "type": "element",
                            "name": "game",
                            "attributes": {
                                "status": "0"
                            }
                        }
                    ]
                }
            ]
        }
    }
    catch (e) {
        console.error(e)
        return false
    }
}

async function getSV6PaseliCheckinData(cardID, passCode) {
    const user = await db.User.findOne({ where: { cardID, passCode } });
    if (!user) return false;
    return {
        "declaration": {
            "attributes": {
                "version": "1.0",
                "encoding": "UTF-8"
            }
        },
        "elements": [
            {
                "type": "element",
                "name": "response",
                "elements": [
                    {
                        "type": "element",
                        "name": "eacoin",
                        "elements": [
                            {
                                "type": "element",
                                "name": "balance",
                                "attributes": {
                                    "__type": "s32"
                                },
                                "elements": [
                                    {
                                        "type": "text",
                                        "text": "573"
                                    }
                                ]
                            },
                            {
                                "type": "element",
                                "name": "sessid",
                                "attributes": {
                                    "__type": "str"
                                },
                                "elements": [
                                    {
                                        "type": "text",
                                        "text": "X"
                                    }
                                ]
                            },
                            {
                                "type": "element",
                                "name": "acstatus",
                                "attributes": {
                                    "__type": "u8"
                                },
                                "elements": [
                                    {
                                        "type": "text",
                                        "text": "1"
                                    }
                                ]
                            },
                            {
                                "type": "element",
                                "name": "sequence",
                                "attributes": {
                                    "__type": "s16"
                                },
                                "elements": [
                                    {
                                        "type": "text",
                                        "text": "1"
                                    }
                                ]
                            },
                            {
                                "type": "element",
                                "name": "acid",
                                "attributes": {
                                    "__type": "str"
                                },
                                "elements": [
                                    {
                                        "type": "text",
                                        "text": "X"
                                    }
                                ]
                            },
                            {
                                "type": "element",
                                "name": "acname",
                                "attributes": {
                                    "__type": "str"
                                },
                                "elements": [
                                    {
                                        "type": "text",
                                        "text": "X"
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    }
}

function getSV6PaseliConsumeData() {
    return {
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
                        "type": "element",
                        "name": "eacoin",
                        "attributes": {
                            "status": "0"
                        },
                        "elements": [
                            {
                                "type": "element",
                                "name": "autocharge",
                                "attributes": {
                                    "__type": "u8"
                                },
                                "elements": [
                                    {
                                        "type": "text",
                                        "text": "0"
                                    }
                                ]
                            },
                            {
                                "type": "element",
                                "name": "acstatus",
                                "attributes": {
                                    "__type": "u8"
                                },
                                "elements": [
                                    {
                                        "type": "text",
                                        "text": "0"
                                    }
                                ]
                            },
                            {
                                "type": "element",
                                "name": "balance",
                                "attributes": {
                                    "__type": "s32"
                                },
                                "elements": [
                                    {
                                        "type": "text",
                                        "text": "573"
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    }
}

function getSV6PaseliCheckoutData() {
    return {
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
                        "type": "element",
                        "name": "eacoin",
                        "attributes": {
                            "status": "0"
                        }
                    }
                ]
            }
        ]
    }
}

function getSV6ShopData() {
    return {
        "declaration": {
            "attributes": {
                "version": "1.0",
                "encoding": "UTF-8"
            }
        },
        "elements": [
            {
                "type": "element",
                "name": "response",
                "elements": [
                    {
                        "type": "element",
                        "name": "game",
                    }
                ]
            }
        ]
    }
}

async function SaveSV6SkillData(session, skillContents) {
    const user = await db.User.findOne({ where: { session, cardID: skillContents.refid._text } })
    if (!user) return false;
    const alreadyDone = await db.Skill.findOne({ where: { cardID: skillContents.refid._text, ssnid: skillContents.ssnid._text, crsid: skillContents.crsid._text } })
    let trackIDs = []
    for (track of skillContents.tr) {
        trackIDs.push(await SaveSV6SkillTrackData(skillContents.refid._text, track))
    }
    if (!alreadyDone) {
        await db.Skill.create({
            cardID: skillContents.refid._text,
            playID: 1337,
            ssnid: skillContents.ssnid._text,
            crsid: skillContents.crsid._text,
            sc: skillContents.sc._text,
            ex: skillContents.ex._text,
            ct: skillContents.ct._text,
            gr: skillContents.gr._text,
            jr: skillContents.jr._text,
            cr: skillContents.cr._text,
            nr: skillContents.nr._text,
            er: skillContents.er._text,
            cm: skillContents.cm._text,
            ar: skillContents.ar._text,
            cnt: "1",
            locid: 92,
            tr1: trackIDs[0],
            tr2: trackIDs[1],
            tr3: trackIDs[2]
        })
    }
    else if (typeof alreadyDone.sc !== "undefined" && parseInt(skillContents.sc._text) > alreadyDone.sc) {
        await alreadyDone.update({
            sc: skillContents.sc._text,
            ex: skillContents.ex._text,
            ct: skillContents.ct._text,
            gr: skillContents.gr._text,
            jr: skillContents.jr._text,
            cr: skillContents.cr._text,
            nr: skillContents.nr._text,
            er: skillContents.er._text,
            cm: skillContents.cm._text,
            ar: skillContents.ar._text,
            cnt: parseInt(alreadyDone.cnt) + 1,
            locid: 92,
            tr1: trackIDs[0],
            tr2: trackIDs[1],
            tr3: trackIDs[2]
        })
    }
    else if (typeof alreadyDone.sc !== "undefined") {
        await alreadyDone.update({
            cnt: parseInt(alreadyDone.cnt) + 1,
        })
    }
    return {
        "declaration": {
            "attributes": {
                "version": "1.0",
                "encoding": "UTF-8"
            }
        },
        "elements": [
            {
                "type": "element",
                "name": "response",
                "elements": [
                    {
                        "type": "element",
                        "name": "game",
                        "attributes": {
                            "status": "0"
                        }
                    }
                ]
            }
        ]
    }
}

async function SaveSV6SkillTrackData(cardID, track) {
    const result = await db.SkillTrack.create({
        cardID,
        st: track.st._text,
        sc: track.sc._text,
        ex: track.ex._text,
        ct: track.ct._text,
        gr: track.gr._text,
        jr: track.jr._text,
        cr: track.cr._text,
        nr: track.nr._text,
        er: track.er._text,
        pr: track.pr._text
    })
    return result.id
}


async function getSkillAnalyzerCourses(cardID) {
    const final = []
    const courses = await db.Skill.findAll({ where: { cardID } });
    if (!courses) return [];
    for (course of courses) {
        final.push(
            {
                "type": "element",
                "name": "course",
                "elements": [
                    {
                        "type": "element",
                        "name": "ssnid",
                        "attributes": {
                            "__type": "s16"
                        },
                        "elements": [
                            {
                                "type": "text",
                                "text": course.ssnid.toString()
                            }
                        ]
                    },
                    {
                        "type": "element",
                        "name": "crsid",
                        "attributes": {
                            "__type": "s16"
                        },
                        "elements": [
                            {
                                "type": "text",
                                "text": course.crsid.toString()
                            }
                        ]
                    },
                    {
                        "type": "element",
                        "name": "sc",
                        "attributes": {
                            "__type": "s32"
                        },
                        "elements": [
                            {
                                "type": "text",
                                "text": course.sc.toString()
                            }
                        ]
                    },
                    {
                        "type": "element",
                        "name": "ex",
                        "attributes": {
                            "__type": "s32"
                        },
                        "elements": [
                            {
                                "type": "text",
                                "text": course.ex.toString()
                            }
                        ]
                    },
                    {
                        "type": "element",
                        "name": "ct",
                        "attributes": {
                            "__type": "s16"
                        },
                        "elements": [
                            {
                                "type": "text",
                                "text": course.ct.toString()
                            }
                        ]
                    },
                    {
                        "type": "element",
                        "name": "gr",
                        "attributes": {
                            "__type": "s16"
                        },
                        "elements": [
                            {
                                "type": "text",
                                "text": course.gr.toString()
                            }
                        ]
                    },
                    {
                        "type": "element",
                        "name": "ar",
                        "attributes": {
                            "__type": "s16"
                        },
                        "elements": [
                            {
                                "type": "text",
                                "text": course.ar.toString()
                            }
                        ]
                    },
                    {
                        "type": "element",
                        "name": "cnt",
                        "attributes": {
                            "__type": "s16"
                        },
                        "elements": [
                            {
                                "type": "text",
                                "text": course.cnt.toString()
                            }
                        ]
                    }
                ]
            })
    }
    return final
}

function getSV6ExceptionData(){
    return {
        "declaration": {
            "attributes": {
                "version": "1.0",
                "encoding": "UTF-8"
            }
        },
        "elements": [
            {
                "type": "element",
                "name": "response",
                "elements": [
                    {
                        "type": "element",
                        "name": "game",
                    }
                ]
            }
        ]
    }
}

const types = {
    'get': function (prop) {
        return Object.prototype.toString.call(prop);
    },
    'null': '[object Null]',
    'object': '[object Object]',
    'array': '[object Array]',
    'string': '[object String]',
    'boolean': '[object Boolean]',
    'number': '[object Number]',
    'date': '[object Date]',
}

const functions = { getSV6CommonData, getSV6InquireData, getSV6AuthpassData, createSV6PlayerAccount, completeSV6PlayerAccount, loadSV6PlayerAccount, getSV6RivalData, getSV6LoadMData, getSV6FrozenData, saveSV6Score, saveSV6, getSV6PlaySData, getSV6LoungeData, getSV6SaveEData, getSV6PaseliCheckinData, getSV6PaseliConsumeData, getSV6PaseliCheckoutData, getSV6ShopData, SaveSV6SkillData, getSV6HiScoreData, getSV6EntrySData, getSV6ExceptionData}
module.exports = functions
