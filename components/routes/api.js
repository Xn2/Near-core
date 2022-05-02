const router = require("express").Router();
const db = require('../sequelize')
const passport = require('../passport.js')
const musicDB = require('../../data/music_db.json').mdb.music;
const customSA = require('../../data/custom_SA.json')

router.get("/", async(req, res) => { res.redirect('/web/login') })

router.post('/api/register', passport.authenticate('register', {
    successRedirect: '/api/nok',
    failureRedirect: '/api/nok'
}))

router.post('/api/login', passport.authenticate('login', {
    successRedirect: '/api/ok',
    failureRedirect: '/api/nok'
}))

router.get('/api/logout', (req, res) => {
    req.logOut();
    res.redirect('/');
})

router.get('/api/getAllPlayers', async(req, res) => {
    if (!req.user) { res.sendStatus(403); return; }
    const users = await db.User.findAll({ where: { isComplete: true } })
    let obj = []
    for (user of users) {
        obj.push({
            name: user.ign,
            friendCode: user.gameConfig.code,
            skillLV: user.skillLV
        })
    }
    res.send(obj)
})

router.get('/api/getRecentScores', async(req, res) => {
    if (!req.user) { res.sendStatus(403); return; }
    const scores = await db.Score.findAll({
        limit: 20,
        order: [
            ['updatedAt', 'DESC']
        ]
    })
    let obj = []
    for (score of scores) {
        const player = await db.User.findOne({ where: { cardID: score.cardID } })
        obj.push({
            name: player.ign,
            title: "",
            diff: "",
            level: "",
            musicID: score.musicID,
            musicType: score.musicType,
            score: score.score,
            clearType: score.clearType,
            percentage: score.effectiveRate / 100 + " %",
            date: (new Date(score.updatedAt)).getTime(),
        })
    }
    res.send(obj)
})

router.get('/api/getCustomSACourses', async(req, res) => {
    if (!req.user) { res.sendStatus(403); return; }
    let final = []
    for (course of customSA) {
        final.push({id : course.id, name : course.name, tracks : course.tracks}) 
    }
    res.send(final)
})

router.get('/api/getCustomSAScores/:id', async(req, res) => {
    if (!req.user) { res.sendStatus(403); return; }
    const result = await db.Skill.findAll({where : {ssnid : 6, crsid : req.params.id}, order: [
        ['sc', 'DESC'],
    ],})
    const final = []
    for (score of result){
        const player = await db.User.findOne({where : {cardID : score.cardID}})
        final.push({player : player.ign, score : score.sc, clearType : score.ct, date : score.updatedAt})
    }
    res.send(final)
})

router.get('/api/getChartLB/:song/:diff', async(req, res) => {
    if (!req.user) { res.sendStatus(403); return; }
    const scores = await db.BestScore.findAll({where : {musicID : req.params.song, musicType : req.params.diff}, order: [
        ['score', 'DESC'],
    ],})
    let obj = []
    for (score of scores) {
        const player = await db.User.findOne({ where: { cardID: score.cardID } })
        obj.push({
            name: player.ign,
            title: "",
            diff: "",
            level: "",
            musicID: score.musicID,
            musicType: score.musicType,
            score: score.score,
            clearType: score.clearType,
            percentage: score.effectiveRate / 100 + " %",
            date: (new Date(score.updatedAt)).getTime(),
        })
    }
    res.send(obj)
})

router.post('/api/me/addRival', async(req, res) => {
    if (!req.user) { res.sendStatus(403); return; }
    const user = await db.User.findOne({ where: { cardID: req.user.cardID } });
    if (typeof user.rivals !== "undefined") {
        if (user.rivals.length >= 3) { res.send("Rival limit reached."); return; }
        const rival = await db.User.findOne({ where: { friendCode: req.body.friendCode } })
        if (!rival) { res.send("Invalid friend code."); return; }
        let rivals = user.rivals
        rivals.push({
            name: rival.ign,
            friendCode: rival.friendCode,
            cardID: rival.cardID
        })
        db.User.update({ rivals }, { where: { cardID: req.user.cardID } })
        res.sendStatus(200)
    } else {
        const rival = await db.User.findOne({ where: { friendCode: req.body.friendCode } })
        if (!rival) { res.send("Invalid friend code."); return; }
        let rivals = []
        rivals.push({
            name: rival.ign,
            friendCode: rival.friendCode,
            cardID: rival.cardID
        })
        db.User.update({ rivals }, { where: { cardID: req.user.cardID } })
        res.sendStatus(200)
    }
})

router.post('/api/me/removeRival', async(req, res) => {
    if (!req.user) { res.sendStatus(403); return; }
    const rival = await db.User.findOne({ where: { friendCode: req.body.friendCode } })
    if (!rival) { res.send("Invalid friend code."); return; }
    const user = await db.User.findOne({ where: { cardID: req.user.cardID } });
    let rivals = user.rivals
    for (i in rivals) {
        const rival = rivals[i];
        if (rival.friendCode === req.body.friendCode) {
            rivals.splice(i, 1)
        }
    }
    db.User.update({ rivals }, { where: { cardID: req.user.cardID } })
    res.send(`Removed ${rival.ign} as a rival.`)
})

router.get('/api/me/getRivals', async(req, res) => {
    if (!req.user) { res.sendStatus(403); return; }
    const user = await db.User.findOne({ where: { cardID: req.user.cardID } });
    let rivals = user.rivals
    let sanitized = []
    for (rival of rivals) {
        sanitized.push({ name: rival.name, friendCode: rival.friendCode })
    }
    res.send(sanitized)
})

router.get('/api/me/scores', async(req, res) => {
    if (!req.user) { res.sendStatus(403); return; }
    const scores = await db.Score.findAll({ where: { cardID: req.user.cardID } })
    res.send(scores)
})

router.post('/api/me/tachiExport', async(req, res) => {
    if (!req.user) { res.sendStatus(403); return; }
    const scores = await db.Score.findAll({ where: { cardID: req.user.cardID } })
    const obj = {
        "meta": {
            "game": "sdvx",
            "playtype": "Single",
            "service": "Near-core"
        },
        "scores": []
    }
    for (score of scores) {
        for (song of musicDB) {
            if (score.musicID == song['@id']) {
                const scoreObj = await getTachiScore(score, song)
                obj.scores.push(scoreObj)
            }
        }
    }
    res.setHeader('Content-Disposition', 'attachment')
    res.send(obj)
})

router.get('/api/me/getSV6Settings', async(req, res) => {
    if (!req.user) { res.sendStatus(403); return; }
    const param = await db.Param.findOne({ where: { cardID: req.user.cardID, type: 2, paramID: 2 } })
    const akaParam = await db.Param.findOne({ where: { cardID: req.user.cardID, type: 6, paramID: 0 } })
    if ((!param || param.param == "0") && (!akaParam || akaParam.param == "0")) {
        res.send({})
    } else {
        const paramArr = param.param.split(' ')
        res.send({
            akaname: akaParam.param,
            bgm: paramArr[0],
            subbg: paramArr[1],
            nemsys: paramArr[2],
            stampA: paramArr[3],
            stampB: paramArr[4],
            stampC: paramArr[5],
            stampD: paramArr[6],
        })
    }
})

router.post('/api/me/setSV6Settings', async(req, res) => {
    if (!req.user) { res.sendStatus(403); return; }
    const param = await db.Param.findOne({ where: { cardID: req.user.cardID, type: 2, paramID: 2 } })
    const akaParam = await db.Param.findOne({ where: { cardID: req.user.cardID, type: 6, paramID: 0 } })
    const paramStr = `${req.body.bgm} ${req.body.subbg} ${req.body.nemsys} ${req.body.stampA} ${req.body.stampB} ${req.body.stampC} ${req.body.stampD}`
    if (!param) {
        await db.Param.bulkCreate([
            { cardID: req.user.cardID, type: 2, paramID: 2, param: paramStr },
            { cardID: req.user.cardID, type: 6, paramID: 0, param: req.body.akaname },
            { cardID: req.user.cardID, type: 6, paramID: 1, param: req.body.akaname },
            { cardID: req.user.cardID, type: 6, paramID: 2, param: req.body.akaname },
        ])
    } else {
        await param.update({ param: paramStr })
        await db.Param.update({ param: req.body.akaname }, { where: { cardID: req.user.cardID, type: 6, paramID: [0, 1, 2] } })
    }
    res.sendStatus("200")
})

router.get('/api/me/profile', async(req, res) => {
    if (!req.user) { res.sendStatus(403); return; }
    const user = await db.User.findOne({ where: { cardID: req.user.cardID }, attributes: { exclude: ['passCode', 'session', 'rivals'] } })
    res.send(user)
})

router.get('/api/scores/:username', async(req, res) => {
    if (!req.user) { res.sendStatus(403); return; }
    const user = await db.User.findOne({ where: { ign: req.params.username.toUpperCase() } })
    if (!user) { res.sendStatus(404); return; }
    const scores = await db.Score.findAll({where : {cardID : user.cardID}, 
        order: [
            ['updatedAt', 'DESC']
        ]
    })
    let obj = []
    for (score of scores) {
        obj.push({
            title: "",
            diff: "",
            level: "",
            musicID: score.musicID,
            musicType: score.musicType,
            score: score.score,
            clearType: score.clearType,
            percentage: score.effectiveRate / 100 + " %",
            date: (new Date(score.updatedAt)).getTime(),
        })
    }
    res.send(obj)
})

router.get('/api/profile/:username', async(req, res) => {
    if (!req.user) { res.sendStatus(403); return; }
    const profile = await db.User.findOne({
        where: { ign: req.params.username.toUpperCase() },
        attributes: { exclude: ['passCode', 'session', 'rivals', 'gameConfig', 'cardID', "isComplete", "isClaimed"] }
    });
    if (!profile) { res.sendStatus(404); return; }
    res.send(profile);
})

router.post('/api/me/changePasscode', async(req, res) => {
    if (!req.user) { res.sendStatus(403); return; }
    const user = await db.User.findOne({ where: { cardID: req.user.cardID } })
    if (req.body.passCode !== user.passCode && req.body.previousPassCode === user.passCode) {
        await user.update({ passCode: req.body.passCode });
        res.sendStatus('200')
        return;
    }
    res.sendStatus('403')
})

router.post('/api/me/changePlayerName', async(req, res) => {
    if (!req.user) { res.sendStatus(403); return; }
    if (!req.body.newName.length) { res.sendStatus(400); return; }
    const user = await db.User.findOne({ where: { cardID: req.user.cardID } })
    const alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!?#$&*-."
    let good = true
    for (i in req.body.newName.toUpperCase()){
        if (alpha.indexOf(req.body.newName[i]) === -1){
            good = false
            res.sendStatus('400')
            return;
        }
    }
    if (req.body.newName.length <= 8) {
        await user.update({ ign: req.body.newName.toUpperCase() });
        res.sendStatus('200')
        return;
    }
    res.sendStatus('400')
})

router.get('/api/me', (req, res) => {
    if (!req.user) { res.sendStatus(403); return; }
    res.send({
        username: req.user.username,
        cardID: req.user.cardID,
        isAdmin: req.user.isAdmin
    })
})

router.get('/api/ok', (req, res) => {
    res.sendStatus(200)
})

router.get('/api/nok', (req, res) => {
    res.sendStatus(403)
})

async function getTachiScore(score, song) {
    const lamps = ['FAILED', 'FAILED', 'CLEAR', 'EXCESSIVE CLEAR', 'ULTIMATE CHAIN', 'PERFECT ULTIMATE CHAIN']
    let judgements
    let hitMeta
    if (score.critical !== 0 && score.critical !== null) {
        judgements = {
            critical: score.critical,
            near: score.near,
            miss: score.error
        }
    }
    if (score.maxChain !== 0 && score.maxChain !== null) {
        hitMeta = {
            gauge: score.gaugeType,
            maxCombo: score.maxChain
        }
    }
    return {
        score: score.score,
        lamp: lamps[score.clearType],
        matchType: "inGameID",
        identifier: score.musicID.toString(),
        difficulty: await formatDiffName(Object.keys(song.difficulty)[score.musicType], song),
        timeAchieved: (new Date(score.updatedAt)).getTime(),
        judgements,
        hitMeta,
    }
}

async function formatDiffName(diff, song) {
    const infDiffs = ["MXM", "INF", "GRV", "HVN", "VVD"]
    switch (diff) {
        case "novice":
        case "advanced":
        case "exhaust":
            return diff.slice(0, 3).toUpperCase()
        case "maximum":
            return "MXM"
            break;
        case "infinite":
            return infDiffs[song.info.inf_ver["#text"] - 1]
            break;
    }
}

module.exports = router