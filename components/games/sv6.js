const { EVENT6, COURSES6, SDVX_AUTOMATION_SONGS, EXTENDS6 } = require('../../data/sv6data.js')

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

const functions = {getSV6CommonData}
module.exports = functions