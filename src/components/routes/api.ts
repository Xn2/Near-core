import passport from '../passport';
import { Request, Response, Router } from 'express';
import musics from '../../data/music_db.json';
import customSA from '../../data/custom_SA.json';
import User, { IUser } from '../models/User';
import Score from '../models/Score';
import Skill from '../models/Skill';
import BestScore from '../models/BestScore';
import Param from '../models/Param';

const router = Router();
const musicDB = musics.mdb.music;

router.get('/', async (_req: Request, res: Response) => {
  res.redirect('/web/login');
});

router.post(
  '/api/register',
  passport.authenticate('register', {
    successRedirect: '/api/ok',
    failureRedirect: '/api/nok',
  })
);

router.post(
  '/api/login',
  passport.authenticate('login', {
    successRedirect: '/api/ok',
    failureRedirect: '/api/nok',
  })
);

router.get('/api/logout', (req: Request, res: Response) => {
  req.logOut({}, () => {
    console.log('Logged out');
  });
  res.redirect('/');
});

router.get('/api/getAllPlayers', async (req: Request, res: Response) => {
  if (!req.user) {
    res.sendStatus(403);
    return;
  }

  const users = await User.findAll({ where: { isComplete: true } });
  let obj = [];
  for (const user of users) {
    obj.push({
      name: user.ign,
      friendCode: user.gameConfig.code,
      skillLV: user.skillLV,
    });
  }
  res.send(obj);
});

router.get('/api/getRecentScores', async (req: Request, res: Response) => {
  if (!req.user) {
    res.sendStatus(403);
    return;
  }

  const scores = await Score.findAll({
    limit: 20,
    order: [['updatedAt', 'DESC']],
  });
  let obj = [];
  for (const score of scores) {
    const player = await User.findOne({ where: { cardID: score.cardID } });
    if (!player) continue;
    obj.push({
      name: player.ign,
      title: '',
      diff: '',
      level: '',
      musicID: score.musicID,
      musicType: score.musicType,
      score: score.score,
      clearType: score.clearType,
      percentage: score.effectiveRate / 100 + ' %',
      date: new Date(score.updatedAt).getTime(),
    });
  }
  res.send(obj);
});

router.get('/api/getCustomSACourses', async (req: Request, res: Response) => {
  if (!req.user) {
    res.sendStatus(403);
    return;
  }
  let final = [];
  for (const course of customSA) {
    final.push({ id: course.id, name: course.name, tracks: course.tracks });
  }
  res.send(final);
});

router.get(
  '/api/getCustomSAScores/:id',
  async (req: Request, res: Response) => {
    if (!req.user) {
      res.sendStatus(403);
      return;
    }

    const result = await Skill.findAll({
      where: { ssnid: 6, crsid: req.params.id },
      order: [['sc', 'DESC']],
    });
    const final = [];
    for (const score of result) {
      const player = await User.findOne({ where: { cardID: score.cardID } });
      if (!player) continue;
      final.push({
        player: player.ign,
        score: score.sc,
        clearType: score.ct,
        date: score.updatedAt,
      });
    }
    res.send(final);
  }
);

router.get('/api/serverStats', async (req: Request, res: Response) => {
  if (!req.user) {
    res.sendStatus(403);
    return;
  }

  const scores = await Score.findAll();
  const bestScores = await BestScore.findAll();
  const users = await User.findAll();

  const stats: any = {};
  let countedScores = 0;
  let countedTotal = 0;
  let countedSkill = 0;

  //Total number of native scores & imported scores
  stats.totalScores = scores.length;
  stats.totalNativeScores = 0;
  stats.totalImportedScores = 0;
  //Total number of S
  stats.totalS = 0;
  //Total number of UC
  stats.totalUC = 0;
  //Total number of PUC
  stats.totalPUC = 0;
  //Total added scores
  stats.totalAddedScores = 0;
  for (const score of scores) {
    if (score.maxChain) stats.totalNativeScores++;
    else stats.totalImportedScores++;
    if (score.score >= 9900000) stats.totalS++;
    if (score.clearType === 4) stats.totalUC++;
    if (score.clearType === 5) stats.totalPUC++;
    if (score.score >= 8000000) {
      countedTotal += score.score;
      countedScores++;
    }
    stats.totalAddedScores += score.score;
  }
  //Total number of users
  stats.totalUsers = users.length;
  //Total credits played
  stats.totalPlaycount = 0;
  //Average Skill LV
  stats.averageSkillLV = 0;
  for (const user of users) {
    stats.totalPlaycount += parseInt(user.gameConfig.play_count);
    stats.averageSkillLV += user.skillLV;
    if (user.skillLV > 0) {
      countedSkill++;
    }
  }
  stats.averageSkillLV = parseInt(
    (stats.averageSkillLV / countedSkill).toFixed(2)
  );
  //Average score
  stats.averageScore = parseInt((countedTotal / countedScores).toFixed(0));
  //Days since launch
  const launchDate = new Date('03/09/2022').getTime();
  const today = new Date().getTime();
  const milliDiff = today - launchDate;
  const dayDiff = parseInt((milliDiff / (1000 * 3600 * 24)).toFixed(0));
  stats.daysSinceLaunch = dayDiff;
  //Average scores per day since launch
  stats.averageScoresPerDay = parseInt(
    (stats.totalNativeScores / dayDiff).toFixed(2)
  );
  //Scores today
  const startOfDay = new Date();
  startOfDay.setUTCHours(0, 0, 0, 0);
  stats.scoresToday = 0;
  for (const score of scores) {
    //@ts-ignore
    // Need rework
    if (new Date(score.createdAt).getTime >= startOfDay.getTime())
      stats.scoresToday++;
  }
  //Uptime
  stats.uptime = process.uptime(
    //@ts-ignore
    // Need rework
    (stats.totalAddedScores / scores.length).toFixed(0)
  );
  //Current commit
  stats.currentCommit = require('child_process')
    .execSync('git rev-parse HEAD')
    .toString()
    .trim()
    .slice(0, 7);
  //Database size
  const fs = require('fs');
  const stat = fs.statSync('./db/db.sqlite');
  const fileSizeInBytes = stat.size;
  const fileSizeInMegabytes = `${
    //@ts-ignore
    (fileSizeInBytes / (1024 * 1024).toFixed(2)) as any
  } MB`;
  stats.databaseSize = fileSizeInMegabytes;
  res.send(stats);
});

router.get(
  '/api/getChartLB/:song/:diff',
  async (req: Request, res: Response) => {
    if (!req.user) {
      res.sendStatus(403);
      return;
    }

    const scores = await BestScore.findAll({
      where: { musicID: req.params.song, musicType: req.params.diff },
      order: [['score', 'DESC']],
    });
    let obj = [];
    for (const score of scores) {
      const player = await User.findOne({ where: { cardID: score.cardID } });
      if (!player) continue;
      obj.push({
        name: player.ign,
        score: score.score,
        exscore: score.exscore,
        maxChain: score.maxChain || '∅',
        clearType: score.clearType,
        critical: score.critical || '∅',
        near: score.near || '∅',
        error: score.error || '∅',
        percentage: score.effectiveRate / 100 + ' %',
        date: new Date(score.updatedAt).getTime(),
      });
    }
    res.send(obj);
  }
);

router.post('/api/me/addRival', async (req: Request, res: Response) => {
  if (!req.user) {
    res.sendStatus(403);
    return;
  }
  //@ts-ignore
  const user = await User.findOne({ where: { cardID: req.user.cardID } });
  if (!user) return;
  if (typeof user.rivals !== 'undefined') {
    if (user.rivals.length >= 3) {
      res.send('Rival limit reached.');
      return;
    }

    const rival = await User.findOne({
      where: { friendCode: req.body.friendCode },
    });
    if (!rival) {
      res.send('Invalid friend code.');
      return;
    }
    if (rival.friendCode === user.friendCode) {
      res.send('Cannot add self as rival.');
      return;
    }
    let rivals = user.rivals;
    for (const i in rivals) {
      const check_rival = rivals[i];
      if (check_rival.friendCode === req.body.friendCode) {
        res.send('User is already your rival.');
        return;
      }
    }
    rivals.push({
      name: rival.ign,
      friendCode: rival.friendCode,
      cardID: rival.cardID,
    });
    //@ts-ignore
    User.update({ rivals }, { where: { cardID: req.user.cardID } });
    res.sendStatus(200);
  } else {
    const rival = await User.findOne({
      where: { friendCode: req.body.friendCode },
    });
    if (!rival) {
      res.send('Invalid friend code.');
      return;
    }
    if (rival.friendCode === user.friendCode) {
      res.send('Cannot add self as rival.');
      return;
    }
    let rivals = [];
    rivals.push({
      name: rival.ign,
      friendCode: rival.friendCode,
      cardID: rival.cardID,
    });
    //@ts-ignore
    User.update({ rivals }, { where: { cardID: req.user.cardID } });
    res.sendStatus(200);
  }
});

router.post('/api/me/removeRival', async (req: Request, res: Response) => {
  if (!req.user) {
    res.sendStatus(403);
    return;
  }

  const rival = await User.findOne({
    where: { friendCode: req.body.friendCode },
  });
  if (!rival) {
    res.send('Invalid friend code.');
    return;
  }
  //@ts-ignore
  const user = await User.findOne({ where: { cardID: req.user.cardID } });
  if (!user) return;
  let rivals = user.rivals;
  for (const i in rivals) {
    const rival = rivals[i];
    if (rival.friendCode === req.body.friendCode) {
      rivals.splice(i, 1);
    }
  }
  //@ts-ignore
  User.update({ rivals }, { where: { cardID: req.user.cardID } });
  res.send(`Removed ${rival.ign} as a rival.`);
});

router.get('/api/me/getRivals', async (req: Request, res: Response) => {
  if (!req.user) {
    res.sendStatus(403);
    return;
  }
  //@ts-ignore
  const user = await User.findOne({ where: { cardID: req.user.cardID } });
  if (!user) return;
  let rivals = user.rivals;
  let sanitized = [];
  for (const rival of rivals) {
    sanitized.push({ name: rival.name, friendCode: rival.friendCode });
  }
  res.send(sanitized);
});

router.get('/api/me/scores', async (req: Request, res: Response) => {
  if (!req.user) {
    res.sendStatus(403);
    return;
  }
  //@ts-ignore
  const scores = await Score.findAll({ where: { cardID: req.user.cardID } });
  res.send(scores);
});

router.post('/api/me/tachiExport', async (req: Request, res: Response) => {
  if (!req.user) {
    res.sendStatus(403);
    return;
  }
  //@ts-ignore
  const scores = await Score.findAll({ where: { cardID: req.user.cardID } });
  const obj = {
    meta: {
      game: 'sdvx',
      playtype: 'Single',
      service: 'Near-core',
    },
    scores: [],
  };
  for (const score of scores) {
    for (const song of musicDB) {
      if (score.musicID == song['@id']) {
        const scoreObj = await getTachiScore(score, song);
        //@ts-ignore
        obj.scores.push(scoreObj);
      }
    }
  }
  res.setHeader('Content-Disposition', 'attachment');
  res.send(obj);
});

router.get('/api/me/getSV6Settings', async (req: Request, res: Response) => {
  if (!req.user) {
    res.sendStatus(403);
    return;
  }

  const param = await Param.findOne({
    //@ts-ignore
    where: { cardID: req.user.cardID, type: 2, paramID: 2 },
  });
  if (!param) return;
  const akaParam = await Param.findOne({
    //@ts-ignore
    where: { cardID: req.user.cardID, type: 6, paramID: 0 },
  });
  if (!akaParam) return;
  if ((!param || param.param == '0') && (!akaParam || akaParam.param == '0')) {
    res.send({});
  } else {
    const paramArr = param.param.split(' ');
    res.send({
      akaname: akaParam.param,
      bgm: paramArr[0],
      subbg: paramArr[1],
      nemsys: paramArr[2],
      stampA: paramArr[3],
      stampB: paramArr[4],
      stampC: paramArr[5],
      stampD: paramArr[6],
    });
  }
});

router.post('/api/me/setSV6Settings', async (req: Request, res: Response) => {
  if (!req.user) {
    res.sendStatus(403);
    return;
  }

  const param = await Param.findOne({
    //@ts-ignore
    where: { cardID: req.user.cardID, type: 2, paramID: 2 },
  });

  const akaParam = await Param.findOne({
    //@ts-ignore
    where: { cardID: req.user.cardID, type: 6, paramID: 0 },
  });
  const paramStr = `${req.body.bgm} ${req.body.subbg} ${req.body.nemsys} ${req.body.stampA} ${req.body.stampB} ${req.body.stampC} ${req.body.stampD}`;
  if (!param) {
    await Param.bulkCreate([
      //@ts-ignore
      { cardID: req.user.cardID, type: 2, paramID: 2, param: paramStr },
      //@ts-ignore
      { cardID: req.user.cardID, type: 6, paramID: 0, param: req.body.akaname },
      //@ts-ignore
      { cardID: req.user.cardID, type: 6, paramID: 1, param: req.body.akaname },
      //@ts-ignore
      { cardID: req.user.cardID, type: 6, paramID: 2, param: req.body.akaname },
    ]);
  } else {
    await param.update({ param: paramStr });

    await Param.update(
      { param: req.body.akaname },
      //@ts-ignore
      { where: { cardID: req.user.cardID, type: 6, paramID: [0, 1, 2] } }
    );
  }
  res.sendStatus(200);
});

router.get('/api/me/profile', async (req: Request, res: Response) => {
  if (!req.user) {
    res.sendStatus(403);
    return;
  }

  const user = await User.findOne({
    //@ts-ignore
    where: { cardID: req.user.cardID },
    attributes: { exclude: ['passCode', 'session', 'rivals'] },
  });
  res.send(user);
});

router.get('/api/scores/:username', async (req: Request, res: Response) => {
  if (!req.user) {
    res.sendStatus(403);
    return;
  }

  const user = await User.findOne({
    where: { ign: req.params.username.toUpperCase() },
  });
  if (!user) {
    res.sendStatus(404);
    return;
  }

  const scores = await Score.findAll({
    where: { cardID: user.cardID },
    order: [['updatedAt', 'DESC']],
  });
  let obj = [];
  for (const score of scores) {
    obj.push({
      title: '',
      diff: '',
      level: '',
      musicID: score.musicID,
      musicType: score.musicType,
      score: score.score,
      clearType: score.clearType,
      percentage: score.effectiveRate / 100 + ' %',
      date: new Date(score.updatedAt).getTime(),
    });
  }
  res.send(obj);
});

router.get('/api/profile/:username', async (req: Request, res: Response) => {
  if (!req.user) {
    res.sendStatus(403);
    return;
  }

  const profile = await User.findOne({
    where: { ign: req.params.username.toUpperCase() },
    attributes: {
      exclude: [
        'passCode',
        'session',
        'rivals',
        'gameConfig',
        'cardID',
        'isComplete',
        'isClaimed',
      ],
    },
  });
  if (!profile) {
    res.sendStatus(404);
    return;
  }
  res.send(profile);
});

router.post('/api/me/changePasscode', async (req: Request, res: Response) => {
  if (!req.user) {
    res.sendStatus(403);
    return;
  }
  //@ts-ignore
  const user = await db.User.findOne({ where: { cardID: req.user.cardID } });
  if (
    req.body.passCode !== user.passCode &&
    req.body.previousPassCode === user.passCode
  ) {
    await user.update({ passCode: req.body.passCode });
    res.sendStatus(200);
    return;
  }
  res.sendStatus(403);
});

router.post('/api/me/changePlayerName', async (req: Request, res: Response) => {
  if (!req.user) {
    res.sendStatus(403);
    return;
  }
  if (!req.body.newName.length) {
    res.sendStatus(400);
    return;
  }
  //@ts-ignore
  const user = await User.findOne({ where: { cardID: req.user.cardID } });
  if (!user) return;
  const alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!?#$&*-.';
  let good = true;
  for (const i in req.body.newName) {
    if (alpha.indexOf(req.body.newName.toUpperCase()[i]) === -1) {
      good = false;
      res.sendStatus(400);
      return;
    }
  }
  if (req.body.newName.length <= 8) {
    const gameConfig = { ...user.gameConfig };
    gameConfig.name = req.body.newName.toUpperCase();
    await user.update({ ign: req.body.newName.toUpperCase() });
    await user.update({ gameConfig });
    res.sendStatus(200);
    return;
  }
  res.sendStatus(400);
});

router.get('/api/me', (req: Request, res: Response) => {
  if (!req.user) {
    res.sendStatus(403);
    return;
  }
  res.send({
    //@ts-ignore
    username: req.user.username,
    //@ts-ignore
    cardID: req.user.cardID,
    //@ts-ignore
    isAdmin: req.user.isAdmin,
  });
});

router.get('/api/ok', (req: Request, res: Response) => {
  res.sendStatus(200);
});

router.get('/api/nok', (req: Request, res: Response) => {
  res.sendStatus(403);
});

async function getTachiScore(score: any, song: any) {
  const lamps = [
    'FAILED',
    'FAILED',
    'CLEAR',
    'EXCESSIVE CLEAR',
    'ULTIMATE CHAIN',
    'PERFECT ULTIMATE CHAIN',
  ];
  let judgements;
  let hitMeta;
  if (score.critical !== 0 && score.critical !== null) {
    judgements = {
      critical: score.critical,
      near: score.near,
      miss: score.error,
    };
  }
  if (score.maxChain !== 0 && score.maxChain !== null) {
    hitMeta = {
      gauge: score.gaugeType,
      maxCombo: score.maxChain,
    };
  }
  return {
    score: score.score,
    lamp: lamps[score.clearType],
    matchType: 'inGameID',
    identifier: score.musicID.toString(),
    difficulty: await formatDiffName(
      Object.keys(song.difficulty)[score.musicType],
      song
    ),
    timeAchieved: new Date(score.updatedAt).getTime(),
    judgements,
    hitMeta,
  };
}

async function formatDiffName(diff: any, song: any) {
  const infDiffs = ['MXM', 'INF', 'GRV', 'HVN', 'VVD'];
  switch (diff) {
    case 'novice':
    case 'advanced':
    case 'exhaust':
      return diff.slice(0, 3).toUpperCase();
    case 'maximum':
      return 'MXM';
      break;
    case 'infinite':
      return infDiffs[song.info.inf_ver['#text'] - 1];
      break;
  }
}
export default router;
