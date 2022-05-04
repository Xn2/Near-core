const config = require('../../config.json');

function getInitResponseObject() {
    let services = ["apsmanager","cardmng","download","eacoin","exactly","facility","message","package","package2","pcbevent","pcbtracker","renewcert","posevent","pkglist","dlstatus","netlog","services","stuck","weblog","sidmgr","slocal","uploader","lobby","local","local2","player2","pcb2","shop2","info2"];
    let items = [];
    items.push({
        type: "element", name: "item", attributes: {
            name: "keepalive",
            url: "ping://127.0.0.1/core/keepalive?pa=127.0.0.1&amp;ia=127.0.0.1&amp;ga=127.0.0.1&amp;ma=127.0.0.1&amp;t1=2&amp;t2=15&amp;rt=2"
        }
    })
    items.push({
        type: "element", name: "item", attributes: {
            name: "ntp",
            url: "ntp://pool.ntp.org"
        }
    })
    for (i in services) {
        const service = services[i];
        items.push({
            type: "element", name: "item", attributes: {
                name: service,
                url: config.baseURL
            }
        })
    }
    const obj = getBaseObject();
    const elements = [{
        type: "element",
        name: "services",
        attributes: {
            expire: "10800",
            mode: "operation",
            product_domain : "1",
            status: "0"
        },
        elements: items
    }]
    obj.elements[0].elements = elements;
    return obj
}

function getKeepAliveResponseObject() {
    const obj = getBaseObject()
    const elements = [{
        type: "element",
        name: "pcbtracker",
        attributes: {
            ecenable: "1",
            eclimit: "0",
            expire: "3600",
            limit: "0",
            status: "0",
            time: Math.floor(Date.now() / 1000).toString(),
        }
    }]
    obj.elements[0].elements = elements;
    return obj
}

function getPackageListObject() {
    const obj = getBaseObject()
    const elements = [{
        type: "element",
        name: "package",
        attributes: {
            status: "0",
        }
    }]
    obj.elements[0].elements = elements;
    return obj
}

function getMessageObject() {
    const obj = getBaseObject()
    const elements = [{
        type: "element",
        name: "message",
        attributes: {
            expire: "1440",
        }
    }]
    obj.elements[0].elements = elements;
    return obj
}

function getPcbEventObject(){
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
                        "name": "pcbevent"
                    }
                ]
            }
        ]
    }
}

function getEventLogObject(){
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
                        "name": "eventlog",
                        "elements": [
                            {
                                "type": "element",
                                "name": "gamesession",
                                "attributes": {
                                    "__type": "s64"
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
                                "name": "logsendflg",
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
                                "name": "logerrlevel",
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
                                "name": "evtidnosendflg",
                                "attributes": {
                                    "__type": "s32"
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

async function getFacilityObject(ip) {
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
                        "name": "facility",
                        "elements": [
                            {
                                "type": "element",
                                "name": "location",
                                "elements": [
                                    {
                                        "type": "element",
                                        "name": "id",
                                        "attributes": {
                                            "__type": "str"
                                        },
                                        "elements": [
                                            {
                                                "type": "text",
                                                "text": "192"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "element",
                                        "name": "country",
                                        "attributes": {
                                            "__type": "str"
                                        },
                                        "elements": [
                                            {
                                                "type": "text",
                                                "text": "EU"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "element",
                                        "name": "region",
                                        "attributes": {
                                            "__type": "str"
                                        },
                                        "elements": [
                                            {
                                                "type": "text",
                                                "text": "."
                                            }
                                        ]
                                    },
                                    {
                                        "type": "element",
                                        "name": "customercode",
                                        "attributes": {
                                            "__type": "str"
                                        },
                                        "elements": [
                                            {
                                                "type": "text",
                                                "text": "."
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
                                                "text": config.arcadeName
                                            }
                                        ]
                                    },
                                    {
                                        "type": "element",
                                        "name": "type",
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
                                        "name": "countryname",
                                        "attributes": {
                                            "__type": "str"
                                        },
                                        "elements": [
                                            {
                                                "type": "text",
                                                "text": "Near"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "element",
                                        "name": "countryjname",
                                        "attributes": {
                                            "__type": "str"
                                        },
                                        "elements": [
                                            {
                                                "type": "text",
                                                "text": "Near"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "element",
                                        "name": "regionname",
                                        "attributes": {
                                            "__type": "str"
                                        },
                                        "elements": [
                                            {
                                                "type": "text",
                                                "text": "Near"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "element",
                                        "name": "regionjname",
                                        "attributes": {
                                            "__type": "str"
                                        },
                                        "elements": [
                                            {
                                                "type": "text",
                                                "text": "Near"
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "type": "element",
                                "name": "line",
                                "elements": [
                                    {
                                        "type": "element",
                                        "name": "id",
                                        "attributes": {
                                            "__type": "str"
                                        },
                                        "elements": [
                                            {
                                                "type": "text",
                                                "text": "12"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "element",
                                        "name": "class",
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
                            },
                            {
                                "type": "element",
                                "name": "portfw",
                                "elements": [
                                    {
                                        "type": "element",
                                        "name": "globalip",
                                        "attributes": {
                                            "__type": "ip4"
                                        },
                                        "elements": [
                                            {
                                                "type": "text",
                                                "text": ip
                                            }
                                        ]
                                    },
                                    {
                                        "type": "element",
                                        "name": "globalport",
                                        "attributes": {
                                            "__type": "u16"
                                        },
                                        "elements": [
                                            {
                                                "type": "text",
                                                "text": "5700"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "element",
                                        "name": "privateport",
                                        "attributes": {
                                            "__type": "u16"
                                        },
                                        "elements": [
                                            {
                                                "type": "text",
                                                "text": "5700"
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "type": "element",
                                "name": "public",
                                "elements": [
                                    {
                                        "type": "element",
                                        "name": "flag",
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
                                        "name": "name",
                                        "attributes": {
                                            "__type": "str"
                                        },
                                        "elements": [
                                            {
                                                "type": "text",
                                                "text": config.arcadeName
                                            }
                                        ]
                                    },
                                    {
                                        "type": "element",
                                        "name": "latitude",
                                        "attributes": {
                                            "__type": "str"
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
                                        "name": "longitude",
                                        "attributes": {
                                            "__type": "str"
                                        },
                                        "elements": [
                                            {
                                                "type": "text",
                                                "text": "0"
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "type": "element",
                                "name": "share",
                                "elements": [
                                    {
                                        "type": "element",
                                        "name": "eacoin",
                                        "elements": [
                                            {
                                                "type": "element",
                                                "name": "notchamount",
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
                                                "name": "notchcount",
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
                                                "name": "supplylimit",
                                                "attributes": {
                                                    "__type": "s32"
                                                },
                                                "elements": [
                                                    {
                                                        "type": "text",
                                                        "text": "1000000"
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        "type": "element",
                                        "name": "url",
                                        "elements": [
                                            {
                                                "type": "element",
                                                "name": "eapass",
                                                "attributes": {
                                                    "__type": "str"
                                                },
                                                "elements": [
                                                    {
                                                        "type": "text",
                                                        "text": config.arcadeName
                                                    }
                                                ]
                                            },
                                            {
                                                "type": "element",
                                                "name": "arcadefan",
                                                "attributes": {
                                                    "__type": "str"
                                                },
                                                "elements": [
                                                    {
                                                        "type": "text",
                                                        "text": config.arcadeName
                                                    }
                                                ]
                                            },
                                            {
                                                "type": "element",
                                                "name": "konaminetdx",
                                                "attributes": {
                                                    "__type": "str"
                                                },
                                                "elements": [
                                                    {
                                                        "type": "text",
                                                        "text": config.arcadeName
                                                    }
                                                ]
                                            },
                                            {
                                                "type": "element",
                                                "name": "konamiid",
                                                "attributes": {
                                                    "__type": "str"
                                                },
                                                "elements": [
                                                    {
                                                        "type": "text",
                                                        "text": config.arcadeName
                                                    }
                                                ]
                                            },
                                            {
                                                "type": "element",
                                                "name": "eagate",
                                                "attributes": {
                                                    "__type": "str"
                                                },
                                                "elements": [
                                                    {
                                                        "type": "text",
                                                        "text": config.arcadeName
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "type": "element",
                                "name": "eapass",
                                "elements": [
                                    {
                                        "type": "element",
                                        "name": "valid",
                                        "attributes": {
                                            "__type": "u16"
                                        },
                                        "elements": [
                                            {
                                                "type": "text",
                                                "text": "365"
                                            }
                                        ]
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

function getBaseObject() {
    return {
        declaration: {
            attributes: {
                version: "1.0",
                encoding: "SHIFT_JIS"
            }
        },
        elements:
            [
                {
                    type: "element",
                    name: "response",
                    elements: [

                    ]
                }
            ]
    }
}

async function getPublicIP() {
    const axios = require('axios');
    const res = await axios.get("https://api4.my-ip.io/ip.json")
    return res.data.ip
}



const initObjects = { getFacilityObject, getMessageObject, getPackageListObject, getKeepAliveResponseObject, getInitResponseObject, getPcbEventObject, getEventLogObject }
module.exports = initObjects