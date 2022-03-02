const req = require('express/lib/request');
const { EVENT5, COURSES5, SDVX_AUTOMATION_SONGS, EXTENDS5 } = require('../../data/sv5data.js')
const db = require('../sequelize.js')
function getSV5CommonData() {
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

    for (i of EVENT5) {
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

    for (season of COURSES5) {
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
};

async function getSV5InquireData(cardID) {
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

async function getSV5AuthpassData(cardID, passCode, session) {
    let status = "0"
    let result = await db.User.findOne({ where: { cardID, passCode } })
    if (!result) status = "116";
    await result.update({session})
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

async function createSV5PlayerAccount(cardID, passCode){
    let result = await db.User.findOne({ where: { cardID } })
    if (result) return false;
    await db.User.create({cardID, passCode, isComplete : false})
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

async function completeSV5PlayerAccount(cardID, name, session){
    let result = await db.User.findOne({ where: { cardID } })
    if (!result || result.isComplete === false) return false;
    await result.update({ name, passCode, skillLV : 0, apecaID : 0, session, gameProfile:{}, isComplete : true})
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

async function loadSV5PlayerAccount(cardID, name, session){
    let result = await db.User.findOne({ where: { cardID, session } })
    if (!result || result.isComplete === false) return false;
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
                                        "text": result.name
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
                                        "text": "4491-1822"
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
                                        "text": "4491-1822"
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
                                        "text": "0"
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
                                        "text": "0"
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
                                        "text": "0"
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
                                        "text": "0"
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
                                        "text": "0"
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
                                        "text": "0"
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
                                        "text": "0"
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
                                        "text": "0"
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
                                        "text": "0"
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
                                        "text": "0"
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
                                        "text": "0"
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
                                        "text": "0"
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
                                        "text": "0"
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
                                        "text": "0"
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
                                        "text": "0"
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
                                        "text": "0"
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
                                        "text": "0"
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
                                        "text": "0"
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
                                        "text": "1"
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
                                        "text": "0"
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
                                        "text": "ABCD"
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
                                        "text": "0"
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
                                        "text": "0"
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
                                        "text": "0"
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
                                                "text": "1"
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
                                                "text": "1"
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
                                                "text": "1646276738090"
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
                                                "text": "1"
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
                                                "text": "1"
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "type": "element",
                                "name": "block_no",
                                "attributes": {
                                    "__type": "s32"
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
                                "name": "skill"
                            }
                        ]
                    }
                ]
            }
        ]
    }
}

async function genSV5GameProfileObject(name){
    const friendCode = genFriendCode();
    return {
        result : 0,
        name,
        code : friendCode,
        sdvx_id : friendCode,
        gamecoin_packet : 0,
        gamecoin_block : 0,
        appeal_id : 0,
        last_music_id : 0,
        last_music_type : 0,
        sort_type : 0,
        headphone,
        blaster_energy,
        blaster_count,
        extrack_energy,
        hispeed,
        lanespeed,
        gauge_option,
        ars_option,
        notes_option,
        early_late_disp,
        draw_adjust,
        eff_c_left,
        eff_c_right,
        narrow_down,
        kac_id : name,
        skill_level,
        skill_base_id,
        skill_name_id,
        ea_shop : {
            packet_booster : 1,
            blaster_pass_enable : 1,
            blaster_pass_limit_date : 0
        }
    }
}

function genFriendCode(){
    let code = ""
    const alpha = "0123456789"
    for (i in alpha){
        code += alpha[Math.floor(Math.random()*alpha.length)]
    }
    return code
}

const functions = { getSV5CommonData, getSV5InquireData, getSV5AuthpassData, createSV5PlayerAccount, completeSV5PlayerAccount, loadSV5PlayerAccount }
module.exports = functions
