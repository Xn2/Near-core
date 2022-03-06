const router = require("express").Router();
const db = require('../sequelize')
const passport = require('../passport.js')
const musicDB = require('../../data/music_db.json').mdb.music;

router.get('/web', (req, res) => {
    res.send("OK")
})

router.post('/api/signup', passport.authenticate('signup', {
    successRedirect: '/dashboard',
    failureRedirect: '/nok'
}))

router.post('/api/login', passport.authenticate('login', {
    successRedirect: '/dashboard',
    failureRedirect: '/nok'
}))

router.get('/api/logout', (req, res) => {
    if (!req.user) { res.sendStatus(403); return; }
    req.logOut();
    res.redirect('/web');
})

router.get('/api/getAllPlayers', async (req, res) => {
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

router.post('/api/me/addRival', async (req, res) => {
    if (!req.user) { res.sendStatus(403); return; }
    const user = await db.User.findOne({where : {cardID : req.user.cardID}});
    if (typeof user.rivals !== "undefined") {
        if (user.rivals.length >= 3) { res.send("Rival limit reached."); return; }
        const rival = await db.User.findOne({ where: { friendCode: req.body.friendCode } })
        if (!rival) { res.statusCode(400); res.send("Invalid friend code."); return; }
        let rivals = user.rivals
        rivals.push({
            name: rival.ign,
            friendCode: rival.friendCode,
            cardID: rival.cardID
        })
        db.User.update({ rivals }, {where : {cardID : req.user.cardID}})
        res.send(`Added ${rival.ign} as a rival.`)
    }
    else {
        const rival = await db.User.findOne({ where: { friendCode: req.body.friendCode } })
        if (!rival) { res.statusCode(400); res.send("Invalid friend code."); return; }
        let rivals = []
        rivals.push({
            name: rival.ign,
            friendCode: rival.friendCode,
            cardID: rival.cardID
        })
        db.User.update({ rivals }, {where : {cardID : req.user.cardID}})
        res.send(`Added ${rival.ign} as a rival.`)
    }
})

router.post('/api/me/removeRival', async (req, res) => {
    if (!req.user) { res.sendStatus(403); return; }
    const rival = await db.User.findOne({ where: { friendCode: req.body.friendCode } })
    if (!rival) { res.statusCode(400); res.send("Invalid friend code."); return; }
    const user = await db.User.findOne({where : {cardID : req.user.cardID}});
    let rivals = user.rivals
    for (i in rivals){
        const rival = rivals[i];
        if (rival.friendCode === req.body.friendCode){
            rivals.splice(i, 1)
        }
    }
    db.User.update({ rivals }, {where : {cardID : req.user.cardID}})
    res.send(`Removed ${rival.ign} as a rival.`)
})

router.get('/api/me/scores', async (req, res) => {
    if (!req.user) { res.sendStatus(403); return; }
    const scores = await db.Score.findAll({ where: { cardID: req.user.cardID } })
    res.send(scores)
})

router.post('/api/me/tachiExport', async (req, res) => {
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
            if (score.musicID == song['@id'] && !(song.info.version["#text"] > req.body.maxVersion)) {
                const scoreObj = await getTachiScore(score, song)
                obj.scores.push(scoreObj)
            }
        }
    }
    res.send(obj)
})

router.get('/api/me/profile', async (req, res) => {
    if (!req.user) { res.sendStatus(403); return; }
    const user = await db.User.findOne({ where: { cardID: req.user.cardID }, attributes: { exclude: ['passCode', 'session'] } })
    res.send(user)
})

router.post('/api/me/changePasscode', async (req, res) => {
    if (!req.user) { res.sendStatus(403); return; }
    const user = await db.User.findOne({ where: { cardID: req.user.cardID } })
    if (req.body.passCode !== user.passCode && req.body.previousPassCode === user.passCode) {
        await user.update({ passCode: req.body.passCode });
        res.sendStatus('200')
        return;
    }
    res.sendStatus('403')
})

router.get('/api/me', (req, res) => {
    if (!req.user) { res.sendStatus(403); return; }
    res.send({
        username: req.user.username,
        cardID: req.user.cardID,
        isAdmin: req.user.isAdmin
    })
})

router.get('/dashboard', (req, res) => {
    if (!req.user) { res.sendStatus(403); return; }
    res.send("OK dashboard")
})

router.get('/nok', (req, res) => {
    res.send("NOK")
})

async function getTachiScore(score, song) {
    const lamps = ['FAILED', 'FAILED', 'CLEAR', 'EXCESSIVE CLEAR', 'ULTIMATE CHAIN', 'PERFECT ULTIMATE CHAIN']
    let jugements
    let hitMeta
    if (score.just !== 0 && score.just !== null) score.critical += score.just
    if (score.critical !== 0 && score.critical !== null) {
        jugements = {
            critical: score.critical,
            near: score.near,
            error: score.error
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
        jugements,
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