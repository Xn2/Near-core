const { param } = require('express/lib/request');
const { EVENT6, COURSES6, SDVX_AUTOMATION_SONGS, EXTENDS6 } = require('../../data/sv6data.js');
const User = require('../models/User.js');
const db = require('../sequelize.js');

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
        await db.User.create({ cardID, passCode, isComplete: false, gameConfig })
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
        "play_count" : "0"
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
    console.log("Unlocking Navigators");
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
    console.log("Unlocking Appeal Cards");
    return items;
}

async function completeSV6PlayerAccount(cardID, ign, session) {
    let result = await db.User.findOne({ where: { cardID } })
    if (!result || !result.isComplete === false) return false;
    await result.update({ ign, skillLV: 0, apecaID: 0, session, gameConfig: genSV6DefaultGameConfigObject(ign), isComplete: true })
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

async function getSV6LoadMData(cardID) {
    const user = await db.User.findOne({ where: { cardID } })
    if (!user) return false;
    const scores = await db.Score.findAll({ where: { cardID } })
    let preparedScores = []
    for (score of scores) {
        preparedScores.push({
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
        })
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
                                "elements": [
                                    {
                                        "type": "element",
                                        "name": "info",
                                        "elements": preparedScores
                                    }
                                ]
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

async function getSV6RivalData() {
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
    console.log(items)
    console.log(JSON.stringify(await getParams(cardID)))
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
                                        "text": gameConfig.name
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
                                        "text": gameConfig.code
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
                                        "text": gameConfig.code
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
                                        "text": gameConfig.gamecoin_packet
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
                                        "text": gameConfig.gamecoin_block
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
                                        "text": gameConfig.appeal_id
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
                                        "text": gameConfig.last_music_id
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
                                        "text": gameConfig.last_music_type
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
                                        "text": gameConfig.sort_type
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
                                        "text": gameConfig.headphone
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
                                        "text": gameConfig.blaster_energy
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
                                        "text": gameConfig.blaster_count
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
                                        "text": gameConfig.extrack_energy
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
                                        "text": gameConfig.hispeed
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
                                        "text": gameConfig.lanespeed
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
                                        "text": gameConfig.gauge_option
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
                                        "text": gameConfig.ars_option
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
                                        "text": gameConfig.notes_option
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
                                        "text": gameConfig.early_late_disp
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
                                        "text": gameConfig.draw_adjust
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
                                        "text": gameConfig.eff_c_left
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
                                        "text": gameConfig.eff_c_right
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
                                        "text": gameConfig.narrow_down
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
                                        "text": gameConfig.name
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
                                        "text": gameConfig.skill_level
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
                                        "text": gameConfig.skill_base_id
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
                                        "text": gameConfig.skill_name_id
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
                                        "text": gameConfig.play_count
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
    const user = await db.User.findOne({ where: { cardID: scoreContents.refid._text } })
    const track = scoreContents.track
    if (!user) return false;
    if (user.session !== session) return false;
    await db.Score.create({
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
    })
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
    console.log(session, cardID, configContents)
    const user = await db.User.findOne({ where: { cardID } })
    if (!user) return false;
    if (user.session !== session) return false;
    const newConfig = {
        "name": user.ign,
        "code": user.gameConfig.friendCode,
        "sdvx_id": user.gameConfig.friendCode,
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
        "play_count" : parseInt(user.gameConfig.play_count) + 1
    } 
    const params = db.Param.findAll({ where: { cardID } })
    if (!params.length) {
        console.log("params empty")
        for (entry of configContents.param.info) {
            console.log(entry)
            db.Param.create({ cardID, type: entry.type._text, paramID: entry.id._text, param: entry.param._text })
        }
    }
    else {
        for (const [key, value] of Object.entries(configContents.param)) {
            let exists = false
            for (currentParam of params) {
                console.log(currentParam)
                if (currentParam.type.toString() == value.info.type._text && currentParam.paramID.toString() == value.info.id._text) {
                    exists = true
                    if (currentParam.param !== value.info.param._text) {
                        await currentParam.update({ param: value.info.param._text })
                    }
                }
            }
            if (!exists) {
                db.Param.create({ type: value.info.type._text, paramID: value.info.id._text, param: value.info.param._text })
            }
        }
    }
    try {
        await user.update({ gameConfig: newConfig, apecaID: configContents.appeal_id._text, skillLV: configContents.skill_level._text, session: null })
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

const functions = { getSV6CommonData, getSV6InquireData, getSV6AuthpassData, createSV6PlayerAccount, completeSV6PlayerAccount, loadSV6PlayerAccount, getSV6RivalData, getSV6LoadMData, getSV6FrozenData, saveSV6Score, saveSV6, getSV6PlaySData, getSV6LoungeData, getSV6SaveEData }
module.exports = functions