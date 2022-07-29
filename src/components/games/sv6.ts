import { EVENT6, COURSES6 } from '../../data/sv6data';
import { idk, obj as objBase, songNum } from './constants';
import musics from '../../data/music_db.json';
import BestScore, { IBestScore } from '../models/BestScore';
import User from '../models/User';
import Achievement from '../models/Achievement';
import Param from '../models/Param';
import Score, { IScore } from '../models/Score';
import Skill from '../models/Skill';
import SkillTrack from '../models/SkillTrack';

const musicdb = musics.mdb.music;
let obj = { ...objBase };
let rooms: any = [];

function getSV6CommonData() {
  for (let i = 1; i < songNum; ++i) {
    for (let j = 0; j < idk; ++j) {
      obj.elements[0].elements[0].elements[0].elements.push({
        type: 'element',
        name: 'info',
        elements: [
          {
            type: 'element',
            //@ts-ignore
            name: 'music_id',
            attributes: {
              __type: 's32',
            },
            elements: [{ type: 'text', text: i }],
          },
          {
            type: 'element',
            //@ts-ignore
            name: 'music_type',
            attributes: {
              __type: 'u8',
            },
            elements: [{ type: 'text', text: j }],
          },
          {
            type: 'element',
            //@ts-ignore
            name: 'limited',
            attributes: {
              __type: 'u8',
            },
            elements: [{ type: 'text', text: '3' }],
          },
        ],
      });
    }
  }

  for (const i of EVENT6) {
    obj.elements[0].elements[0].elements[1].elements.push({
      type: 'element',
      name: 'info',
      elements: [
        {
          type: 'element',
          //@ts-ignore
          name: 'event_id',
          attributes: {
            __type: 'str',
          },
          elements: [{ type: 'text', text: i }],
        },
      ],
    });
  }

  for (const season of COURSES6) {
    for (const course of season.courses) {
      const tracks = [];
      for (const track of course.tracks) {
        let tracksObj = {
          type: 'element',
          name: 'track',
          elements: [],
        };
        tracksObj.elements.push({
          //@ts-ignore
          type: 'element',
          //@ts-ignore
          name: 'track_no',
          attributes: {
            //@ts-ignore
            __type: 's16',
          },
          elements: [
            {
              //@ts-ignore
              type: 'text',
              //@ts-ignore
              text: track.no,
            },
          ],
        });
        tracksObj.elements.push({
          //@ts-ignore
          type: 'element',
          //@ts-ignore
          name: 'music_id',
          attributes: {
            //@ts-ignore
            __type: 's32',
          },
          elements: [
            {
              //@ts-ignore
              type: 'text',
              //@ts-ignore
              text: track.mid,
            },
          ],
        });
        tracksObj.elements.push({
          //@ts-ignore
          type: 'element',
          //@ts-ignore
          name: 'music_type',
          attributes: {
            //@ts-ignore
            __type: 's8',
          },
          elements: [
            {
              //@ts-ignore
              type: 'text',
              //@ts-ignore
              text: track.mty,
            },
          ],
        });
        tracks.push(tracksObj);
      }
      obj.elements[0].elements[0].elements[2].elements.push({
        type: 'element',
        name: 'info',
        elements: [
          {
            type: 'element',
            //@ts-ignore
            name: 'season_id',
            attributes: {
              __type: 's32',
            },
            elements: [{ type: 'text', text: season.id }],
          },
          {
            type: 'element',
            //@ts-ignore
            name: 'season_name',
            attributes: {
              __type: 'str',
            },
            elements: [{ type: 'text', text: season.name }],
          },
          {
            type: 'element',
            //@ts-ignore
            name: 'season_new_flg',
            attributes: {
              __type: 'bool',
            },
            elements: [{ type: 'text', text: season.isNew }],
          },
          {
            type: 'element',
            //@ts-ignore
            name: 'course_id',
            attributes: {
              __type: 's16',
            },
            elements: [{ type: 'text', text: course.id }],
          },
          {
            type: 'element',
            //@ts-ignore
            name: 'course_name',
            attributes: {
              __type: 'str',
            },
            elements: [{ type: 'text', text: course.name }],
          },
          {
            type: 'element',
            //@ts-ignore
            name: 'course_type',
            attributes: {
              __type: 's16',
            },
            elements: [{ type: 'text', text: '0' }],
          },
          {
            type: 'element',
            //@ts-ignore
            name: 'skill_level',
            attributes: {
              __type: 's16',
            },
            elements: [{ type: 'text', text: course.level }],
          },
          {
            type: 'element',
            //@ts-ignore
            name: 'skill_name_id',
            attributes: {
              __type: 's16',
            },
            elements: [{ type: 'text', text: course.nameID }],
          },
          {
            type: 'element',
            //@ts-ignore
            name: 'matching_assist',
            attributes: {
              __type: 'bool',
            },
            elements: [{ type: 'text', text: course.assist }],
          },
          {
            type: 'element',
            //@ts-ignore
            name: 'clear_rate',
            attributes: {
              __type: 's32',
            },
            elements: [{ type: 'text', text: '5000' }],
          },
          {
            type: 'element',
            //@ts-ignore
            name: 'avg_score',
            attributes: {
              __type: 'u32',
            },
            elements: [{ type: 'text', text: '15000000' }],
          },
          //@ts-ignore
          tracks[0],
          //@ts-ignore
          tracks[1],
          //@ts-ignore
          tracks[2],
        ],
      });
    }
  }
  return obj;
}

function scoreSort(a: any, b: any) {
  if (a.score < b.score) return 1;
  if (a.score > b.score) return -1;
  return 0;
}

async function getSV6HiScoreData() {
  const bestScores = [];
  for (let i = 0; i < musicdb.length; i++) {
    for (let j = 0; j < Object.keys(musicdb[i].difficulty).length; j++) {
      let scores = await BestScore.findAll({
        where: { musicID: parseInt(musicdb[i]['@id']), musicType: j + 1 },
      });
      if (scores.length) {
        scores.sort(scoreSort);
        bestScores.push(scores[0]);
      }
    }
  }
  const final = [];
  for (const score of bestScores) {
    const user = await User.findOne({ where: { cardID: score.cardID } });
    if (!user) continue;
    final.push({
      type: 'element',
      name: 'd',
      elements: [
        {
          type: 'element',
          name: 'id',
          attributes: {
            __type: 'u32',
          },
          elements: [
            {
              type: 'text',
              text: score.musicID,
            },
          ],
        },
        {
          type: 'element',
          name: 'ty',
          attributes: {
            __type: 'u32',
          },
          elements: [
            {
              type: 'text',
              text: score.musicType,
            },
          ],
        },
        {
          type: 'element',
          name: 'a_sq',
          attributes: {
            __type: 'str',
          },
          elements: [
            {
              type: 'text',
              text: user.friendCode,
            },
          ],
        },
        {
          type: 'element',
          name: 'a_nm',
          attributes: {
            __type: 'str',
          },
          elements: [
            {
              type: 'text',
              text: user.ign,
            },
          ],
        },
        {
          type: 'element',
          name: 'a_sc',
          attributes: {
            __type: 'u32',
          },
          elements: [
            {
              type: 'text',
              text: score.score,
            },
          ],
        },
        {
          type: 'element',
          name: 'l_sq',
          attributes: {
            __type: 'str',
          },
          elements: [
            {
              type: 'text',
              text: user.friendCode,
            },
          ],
        },
        {
          type: 'element',
          name: 'l_nm',
          attributes: {
            __type: 'str',
          },
          elements: [
            {
              type: 'text',
              text: user.ign,
            },
          ],
        },
        {
          type: 'element',
          name: 'l_sc',
          attributes: {
            __type: 'u32',
          },
          elements: [
            {
              type: 'text',
              text: score.score,
            },
          ],
        },
      ],
    });
  }
  const obj = {
    declaration: {
      attributes: {
        version: '1.0',
        encoding: 'UTF-8',
      },
    },
    elements: [
      {
        type: 'element',
        name: 'response',
        elements: [
          {
            type: 'element',
            name: 'game',
            attributes: {
              status: '0',
            },
            elements: [
              {
                type: 'element',
                name: 'sc',
                elements: final,
              },
            ],
          },
        ],
      },
    ],
  };
  return obj;
}

async function getSV6InquireData(cardID: string) {
  let results = await User.findOne({ where: { cardID } });
  if (!results) {
    return {
      declaration: {
        attributes: {
          version: '1.0',
          encoding: 'UTF-8',
        },
      },
      elements: [
        {
          type: 'element',
          name: 'response',
          elements: [
            {
              type: 'element',
              name: 'cardmng',
              attributes: {
                status: '112',
              },
            },
          ],
        },
      ],
    };
  }
  return {
    declaration: {
      attributes: {
        version: '1.0',
        encoding: 'UTF-8',
      },
    },
    elements: [
      {
        type: 'element',
        name: 'response',
        elements: [
          {
            type: 'element',
            name: 'cardmng',
            attributes: {
              binded: '1',
              dataid: cardID,
              ecflag: '1',
              expired: '0',
              newflag: '0',
              refid: cardID,
              status: '0',
            },
          },
        ],
      },
    ],
  };
}

async function getSV6AuthpassData(
  cardID: string,
  passCode: number,
  session: string
) {
  let status = '0';
  let result = await User.findOne({ where: { cardID, passCode } });
  if (!result) status = '116';
  if (result) await result.update({ session });
  return {
    declaration: {
      attributes: {
        version: '1.0',
        encoding: 'UTF-8',
      },
    },
    elements: [
      {
        type: 'element',
        name: 'response',
        elements: [
          {
            type: 'element',
            name: 'cardmng',
            attributes: {
              status: status,
            },
          },
        ],
      },
    ],
  };
}

async function createSV6PlayerAccount(cardID: string, passCode: number) {
  let result = await User.findOne({ where: { cardID } });
  if (result) return false;
  const gameConfig = genSV6DefaultGameConfigObject('');
  try {
    await User.create({
      cardID,
      passCode,
      isComplete: false,
      gameConfig,
      isClaimed: false,
      friendCode: gameConfig.code,
      rivals: [],
    });
  } catch (e) {
    console.log(e);
  }
  return {
    declaration: {
      attributes: {
        version: '1.0',
        encoding: 'ASCII',
      },
    },
    elements: [
      {
        type: 'element',
        name: 'response',
        elements: [
          {
            type: 'element',
            name: 'cardmng',
            attributes: {
              dataid: cardID,
              refid: cardID,
              status: '0',
            },
          },
        ],
      },
    ],
  };
}

function genSV6DefaultGameConfigObject(name: string) {
  const friendCode = genFriendCode();
  const obj = {
    name: name,
    code: friendCode,
    sdvx_id: friendCode,
    gamecoin_packet: '0',
    gamecoin_block: '0',
    appeal_id: '0',
    last_music_id: '0',
    last_music_type: '0',
    sort_type: '0',
    headphone: '0',
    blaster_energy: '0',
    blaster_count: '0',
    extrack_energy: '0',
    hispeed: '0',
    lanespeed: '0',
    gauge_option: '0',
    ars_option: '0',
    notes_option: '0',
    early_late_disp: '0',
    draw_adjust: '0',
    eff_c_left: '0',
    eff_c_right: '1',
    narrow_down: '0',
    kac_id: name,
    skill_level: '0',
    skill_base_id: '0',
    skill_name_id: '0',
    ea_shop: {
      packet_booster: '1',
      blaster_pass_enable: '1',
      blaster_pass_limit_date: '0',
    },
    eaappli: {
      relation: '1',
    },
    cloud: {
      relation: '1',
    },
    block_no: '0',
    skill: '0',
    play_count: '0',
  };
  return obj;
}

function genFriendCode() {
  let code = '';
  const alpha = '0123456789';
  for (let i = 0; i < 9; i++) {
    if (i == 4) {
      code += '-';
      continue;
    }
    code += alpha[Math.floor(Math.random() * alpha.length)];
  }
  return code;
}

function unlockNavigators(items: any) {
  for (let i = 0; i < 300; ++i)
    items.push({
      type: 'element',
      name: 'info',
      elements: [
        {
          type: 'element',
          name: 'type',
          attributes: {
            __type: 'u8',
          },
          elements: [
            {
              type: 'text',
              text: '11',
            },
          ],
        },
        {
          type: 'element',
          name: 'id',
          attributes: {
            __type: 'u32',
          },
          elements: [
            {
              type: 'text',
              text: i,
            },
          ],
        },
        {
          type: 'element',
          name: 'param',
          attributes: {
            __type: 'u32',
          },
          elements: [
            {
              type: 'text',
              text: '15',
            },
          ],
        },
      ],
    });
  return items;
}

function unlockAppealCards(items: any) {
  for (let i = 0; i < 6000; ++i)
    items.push({
      type: 'element',
      name: 'info',
      elements: [
        {
          type: 'element',
          name: 'type',
          attributes: {
            __type: 'u8',
          },
          elements: [
            {
              type: 'text',
              text: '1',
            },
          ],
        },
        {
          type: 'element',
          name: 'id',
          attributes: {
            __type: 'u32',
          },
          elements: [
            {
              type: 'text',
              text: i,
            },
          ],
        },
        {
          type: 'element',
          name: 'param',
          attributes: {
            __type: 'u32',
          },
          elements: [
            {
              type: 'text',
              text: '1',
            },
          ],
        },
      ],
    });
  return items;
}

async function completeSV6PlayerAccount(
  cardID: string,
  ign: string,
  session: string
) {
  let result = await User.findOne({ where: { cardID } });
  if (!result || !result.isComplete === false) return false;
  const gameConfig = genSV6DefaultGameConfigObject(ign);
  await result.update({
    ign,
    skillLV: 0,
    apecaID: 0,
    session,
    gameConfig,
    isComplete: true,
    friendCode: gameConfig.code,
  });
  return {
    declaration: {
      attributes: {
        version: '1.0',
        encoding: 'UTF-8',
      },
    },
    elements: [
      {
        type: 'element',
        name: 'response',
        elements: [
          {
            type: 'element',
            name: 'game',
            attributes: {
              status: '0',
            },
            elements: [
              {
                type: 'element',
                name: 'result',
                attributes: {
                  __type: 'u8',
                },
                elements: [
                  {
                    type: 'text',
                    text: '0',
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  };
}

async function getSV6FrozenData() {
  return {
    declaration: {
      attributes: {
        version: '1.0',
        encoding: 'UTF-8',
      },
    },
    elements: [
      {
        type: 'element',
        name: 'response',
        elements: [
          {
            type: 'element',
            name: 'game',
            attributes: {
              status: '0',
            },
          },
        ],
      },
    ],
  };
}

async function genID() {
  const alpha = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let ID = '';
  for (let i = 0; i > 16; i++) {
    ID += alpha[Math.floor(Math.random() * alpha.length)];
  }
  return ID;
}

async function getSV6EntrySData(session: string, contents: any) {
  let slotAvailable = false;
  let roomIndex = -1;
  if (rooms.length) {
    for (const i in rooms) {
      if (rooms[i].players.length != 4) {
        slotAvailable = true;
        roomIndex = Number.parseInt(i);
      }
    }
  }
  if (!slotAvailable) {
    const id = await genID();
    rooms.push({
      id: id,
      mid: parseInt(contents.mid._text) || 0,
      players: [
        {
          session,
          globalIP: contents.gip._text,
          localIP: contents.lip._text,
          port: contents.port._text,
        },
      ],
    });
    setTimeout(function () {
      const search = (element: any) => element.id == id;
      const index = rooms.findIndex(search);
      rooms.splice(index, 1);
    }, 10000);
    console.log(JSON.stringify(rooms));
    return {
      declaration: {
        attributes: {
          version: '1.0',
          encoding: 'UTF-8',
        },
      },
      elements: [
        {
          type: 'element',
          name: 'response',
          elements: [
            {
              type: 'element',
              name: 'game',
              elements: [
                {
                  type: 'element',
                  name: 'entry_id',
                  attributes: {
                    __type: 'u32',
                  },
                  elements: [
                    {
                      type: 'text',
                      text: '0',
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    };
  } else {
    let secondcall = false;
    const data = [
      {
        type: 'element',
        name: 'entry_id',
        attributes: {
          __type: 'u32',
        },
        elements: [
          {
            type: 'text',
            text: '0',
          },
        ],
      },
    ];
    for (const player of rooms[roomIndex].players) {
      if (player.globalIP === contents.gip._text) secondcall = true;
      data.push({
        type: 'element',
        name: 'entry',
        elements: [
          {
            type: 'element',
            //@ts-ignore
            name: 'port',
            attributes: {
              __type: 'u16',
            },
            elements: [
              {
                type: 'text',
                text: player.port,
              },
            ],
          },
          {
            type: 'element',
            //@ts-ignore
            name: 'gip',
            attributes: {
              __type: '4u8',
            },
            elements: [
              {
                type: 'text',
                text: player.globalIP,
              },
            ],
          },
          {
            type: 'element',
            //@ts-ignore
            name: 'lip',
            attributes: {
              __type: '4u8',
            },
            elements: [
              {
                type: 'text',
                text: player.localIP,
              },
            ],
          },
        ],
      });
    }
    if (!secondcall)
      rooms[roomIndex].players.push({
        session,
        globalIP: contents.gip._text,
        localIP: contents.lip._text,
        port: contents.port._text,
      });
    console.log(JSON.stringify(rooms));
    return {
      declaration: {
        attributes: {
          version: '1.0',
          encoding: 'UTF-8',
        },
      },
      elements: [
        {
          type: 'element',
          name: 'response',
          elements: [
            {
              type: 'element',
              name: 'game',
              elements: data,
            },
          ],
        },
      ],
    };
  }
}

async function getSV6LoadMData(cardID: string) {
  const user = await User.findOne({ where: { cardID } });
  if (!user) return false;
  const scores = await BestScore.findAll({ where: { cardID } });
  let preparedScores = [];
  for (const score of scores) {
    preparedScores.push({
      type: 'element',
      name: 'info',
      elements: [
        {
          type: 'element',
          name: 'param',
          attributes: {
            __type: 'u32',
            __count: '21',
          },
          elements: [
            {
              type: 'text',
              text: getScoreString(score),
            },
          ],
        },
      ],
    });
  }
  const obj = {
    declaration: {
      attributes: {
        version: '1.0',
        encoding: 'UTF-8',
      },
    },
    elements: [
      {
        type: 'element',
        name: 'response',
        elements: [
          {
            type: 'element',
            name: 'game',
            attributes: {
              status: '0',
            },
            elements: [
              {
                type: 'element',
                name: 'music',
                elements: preparedScores,
              },
            ],
          },
        ],
      },
    ],
  };
  return obj;
}

function getScoreString(score: any) {
  return `${score.musicID} ${score.musicType} ${score.score} ${score.exscore} ${score.clearType} ${score.scoreGrade} 0 0 ${score.btnRate} ${score.longRate} ${score.volRate} 0 0 0 0 0 0 0 0 0 0`;
}

async function getSV6RivalData(cardID: string) {
  const user = await User.findOne({ where: { cardID } });
  const rivals = [];
  if (!user) return false;
  if (user.rivals.length) {
    for (const i in user.rivals) {
      const rival = user.rivals[i];
      rivals.push({
        type: 'element',
        name: 'rival',
        elements: await getRivalData(rival, i),
      });
    }
  }
  return {
    declaration: {
      attributes: {
        version: '1.0',
        encoding: 'UTF-8',
      },
    },
    elements: [
      {
        type: 'element',
        name: 'response',
        elements: [
          {
            type: 'element',
            name: 'game',
            attributes: {
              status: '0',
            },
            elements: rivals,
          },
        ],
      },
    ],
  };
}

async function getRivalData(rival: any, num: any) {
  const scores = await BestScore.findAll({
    where: { cardID: rival.cardID },
  });
  if (!scores.length) return [];
  const final = [];
  final.push({
    type: 'element',
    name: 'no',
    attributes: {
      __type: 's16',
    },
    elements: [{ type: 'text', text: num }],
  });
  final.push({
    type: 'element',
    name: 'seq',
    attributes: {
      __type: 'str',
    },
    elements: { type: 'text', text: rival.friendCode },
  });
  final.push({
    type: 'element',
    name: 'name',
    attributes: {
      __type: 'str',
    },
    elements: [{ type: 'text', text: rival.name }],
  });
  for (const score of scores) {
    const scoreString = `${score.musicID} ${score.musicType} ${score.score} ${score.clearType} ${score.scoreGrade}`;
    final.push({
      type: 'element',
      name: 'music',
      elements: [
        {
          type: 'element',
          name: 'param',
          attributes: {
            __type: 'u32',
            __count: '5',
          },
          elements: [{ type: 'text', text: scoreString }],
        },
      ],
    });
  }
  return final;
}

async function getSV6PlaySData() {
  return {
    declaration: {
      attributes: {
        version: '1.0',
        encoding: 'UTF-8',
      },
    },
    elements: [
      {
        type: 'element',
        name: 'response',
        elements: [
          {
            type: 'element',
            name: 'game',
            attributes: {
              status: '0',
            },
          },
        ],
      },
    ],
  };
}

async function getSV6SaveEData() {
  return {
    declaration: {
      attributes: {
        version: '1.0',
        encoding: 'UTF-8',
      },
    },
    elements: [
      {
        type: 'element',
        name: 'response',
        elements: [
          {
            type: 'element',
            name: 'game',
            attributes: {
              status: '0',
            },
          },
        ],
      },
    ],
  };
}

async function getSV6LoungeData() {
  return {
    declaration: {
      attributes: {
        version: '1.0',
        encoding: 'UTF-8',
      },
    },
    elements: [
      {
        type: 'element',
        name: 'response',
        elements: [
          {
            type: 'element',
            name: 'game',
            attributes: {
              status: '0',
            },
            elements: [
              {
                type: 'element',
                name: 'interval',
                attributes: {
                  __type: 'u32',
                },
                elements: [
                  {
                    type: 'text',
                    text: '30',
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  };
}

async function loadSV6PlayerAccount(cardID: string, session: string) {
  let result = await User.findOne({ where: { cardID, session } });
  if (!result) return false;
  let items: any = [];
  let gameConfig = result.gameConfig;
  items = unlockNavigators(items);
  items = unlockAppealCards(items);
  items = await getAchievements(items, cardID);
  return {
    declaration: {
      attributes: {
        version: '1.0',
        encoding: 'UTF-8',
      },
    },
    elements: [
      {
        type: 'element',
        name: 'response',
        elements: [
          {
            type: 'element',
            name: 'game',
            attributes: {
              status: '0',
            },
            elements: [
              {
                type: 'element',
                name: 'result',
                attributes: {
                  __type: 'u8',
                },
                elements: [
                  {
                    type: 'text',
                    text: '0',
                  },
                ],
              },
              {
                type: 'element',
                name: 'name',
                attributes: {
                  __type: 'str',
                },
                elements: [
                  {
                    type: 'text',
                    text: gameConfig.name.toString(),
                  },
                ],
              },
              {
                type: 'element',
                name: 'code',
                attributes: {
                  __type: 'str',
                },
                elements: [
                  {
                    type: 'text',
                    text: gameConfig.code.toString(),
                  },
                ],
              },
              {
                type: 'element',
                name: 'sdvx_id',
                attributes: {
                  __type: 'str',
                },
                elements: [
                  {
                    type: 'text',
                    text: gameConfig.code.toString(),
                  },
                ],
              },
              {
                type: 'element',
                name: 'gamecoin_packet',
                attributes: {
                  __type: 'u32',
                },
                elements: [
                  {
                    type: 'text',
                    text: gameConfig.gamecoin_packet.toString(),
                  },
                ],
              },
              {
                type: 'element',
                name: 'gamecoin_block',
                attributes: {
                  __type: 'u32',
                },
                elements: [
                  {
                    type: 'text',
                    text: gameConfig.gamecoin_block.toString(),
                  },
                ],
              },
              {
                type: 'element',
                name: 'appeal_id',
                attributes: {
                  __type: 'u16',
                },
                elements: [
                  {
                    type: 'text',
                    text: gameConfig.appeal_id.toString(),
                  },
                ],
              },
              {
                type: 'element',
                name: 'last_music_id',
                attributes: {
                  __type: 's32',
                },
                elements: [
                  {
                    type: 'text',
                    text: gameConfig.last_music_id.toString(),
                  },
                ],
              },
              {
                type: 'element',
                name: 'last_music_type',
                attributes: {
                  __type: 'u8',
                },
                elements: [
                  {
                    type: 'text',
                    text: gameConfig.last_music_type.toString(),
                  },
                ],
              },
              {
                type: 'element',
                name: 'sort_type',
                attributes: {
                  __type: 'u8',
                },
                elements: [
                  {
                    type: 'text',
                    text: gameConfig.sort_type.toString(),
                  },
                ],
              },
              {
                type: 'element',
                name: 'headphone',
                attributes: {
                  __type: 'u8',
                },
                elements: [
                  {
                    type: 'text',
                    text: gameConfig.headphone.toString(),
                  },
                ],
              },
              {
                type: 'element',
                name: 'blaster_energy',
                attributes: {
                  __type: 'u32',
                },
                elements: [
                  {
                    type: 'text',
                    text: gameConfig.blaster_energy.toString(),
                  },
                ],
              },
              {
                type: 'element',
                name: 'blaster_count',
                attributes: {
                  __type: 'u32',
                },
                elements: [
                  {
                    type: 'text',
                    text: gameConfig.blaster_count.toString(),
                  },
                ],
              },
              {
                type: 'element',
                name: 'extrack_energy',
                attributes: {
                  __type: 'u16',
                },
                elements: [
                  {
                    type: 'text',
                    text: gameConfig.extrack_energy.toString(),
                  },
                ],
              },
              {
                type: 'element',
                name: 'hispeed',
                attributes: {
                  __type: 's32',
                },
                elements: [
                  {
                    type: 'text',
                    text: gameConfig.hispeed.toString(),
                  },
                ],
              },
              {
                type: 'element',
                name: 'lanespeed',
                attributes: {
                  __type: 'u32',
                },
                elements: [
                  {
                    type: 'text',
                    text: gameConfig.lanespeed.toString(),
                  },
                ],
              },
              {
                type: 'element',
                name: 'gauge_option',
                attributes: {
                  __type: 'u8',
                },
                elements: [
                  {
                    type: 'text',
                    text: gameConfig.gauge_option.toString(),
                  },
                ],
              },
              {
                type: 'element',
                name: 'ars_option',
                attributes: {
                  __type: 'u8',
                },
                elements: [
                  {
                    type: 'text',
                    text: gameConfig.ars_option.toString(),
                  },
                ],
              },
              {
                type: 'element',
                name: 'notes_option',
                attributes: {
                  __type: 'u8',
                },
                elements: [
                  {
                    type: 'text',
                    text: gameConfig.notes_option.toString(),
                  },
                ],
              },
              {
                type: 'element',
                name: 'early_late_disp',
                attributes: {
                  __type: 'u8',
                },
                elements: [
                  {
                    type: 'text',
                    text: gameConfig.early_late_disp.toString(),
                  },
                ],
              },
              {
                type: 'element',
                name: 'draw_adjust',
                attributes: {
                  __type: 's32',
                },
                elements: [
                  {
                    type: 'text',
                    text: gameConfig.draw_adjust.toString(),
                  },
                ],
              },
              {
                type: 'element',
                name: 'eff_c_left',
                attributes: {
                  __type: 'u8',
                },
                elements: [
                  {
                    type: 'text',
                    text: gameConfig.eff_c_left.toString(),
                  },
                ],
              },
              {
                type: 'element',
                name: 'eff_c_right',
                attributes: {
                  __type: 'u8',
                },
                elements: [
                  {
                    type: 'text',
                    text: gameConfig.eff_c_right.toString(),
                  },
                ],
              },
              {
                type: 'element',
                name: 'narrow_down',
                attributes: {
                  __type: 'u8',
                },
                elements: [
                  {
                    type: 'text',
                    text: gameConfig.narrow_down.toString(),
                  },
                ],
              },
              {
                type: 'element',
                name: 'kac_id',
                attributes: {
                  __type: 'str',
                },
                elements: [
                  {
                    type: 'text',
                    text: gameConfig.name.toString(),
                  },
                ],
              },
              {
                type: 'element',
                name: 'skill_level',
                attributes: {
                  __type: 's16',
                },
                elements: [
                  {
                    type: 'text',
                    text: gameConfig.skill_level.toString(),
                  },
                ],
              },
              {
                type: 'element',
                name: 'skill_base_id',
                attributes: {
                  __type: 's16',
                },
                elements: [
                  {
                    type: 'text',
                    text: gameConfig.skill_base_id.toString(),
                  },
                ],
              },
              {
                type: 'element',
                name: 'skill_name_id',
                attributes: {
                  __type: 's16',
                },
                elements: [
                  {
                    type: 'text',
                    text: gameConfig.skill_name_id.toString(),
                  },
                ],
              },
              {
                type: 'element',
                name: 'play_count',
                attributes: {
                  __type: 'u32',
                },
                elements: [
                  {
                    type: 'text',
                    text: gameConfig.play_count.toString(),
                  },
                ],
              },
              {
                type: 'element',
                name: 'ea_shop',
                elements: [
                  {
                    type: 'element',
                    name: 'packet_booster',
                    attributes: {
                      __type: 's32',
                    },
                    elements: [
                      {
                        type: 'text',
                        text: gameConfig.ea_shop.packet_booster,
                      },
                    ],
                  },
                  {
                    type: 'element',
                    name: 'blaster_pass_enable',
                    attributes: {
                      __type: 'bool',
                    },
                    elements: [
                      {
                        type: 'text',
                        text: gameConfig.ea_shop.blaster_pass_enable,
                      },
                    ],
                  },
                  {
                    type: 'element',
                    name: 'blaster_pass_limit_date',
                    attributes: {
                      __type: 'u64',
                    },
                    elements: [
                      {
                        type: 'text',
                        text: Math.floor(Date.now() / 1000 + 100000),
                      },
                    ],
                  },
                ],
              },
              {
                type: 'element',
                name: 'eaappli',
                elements: [
                  {
                    type: 'element',
                    name: 'relation',
                    attributes: {
                      __type: 's8',
                    },
                    elements: [
                      {
                        type: 'text',
                        text: gameConfig.eaappli.relation,
                      },
                    ],
                  },
                ],
              },
              {
                type: 'element',
                name: 'cloud',
                elements: [
                  {
                    type: 'element',
                    name: 'relation',
                    attributes: {
                      __type: 's8',
                    },
                    elements: [
                      {
                        type: 'text',
                        text: gameConfig.cloud.relation,
                      },
                    ],
                  },
                ],
              },
              {
                type: 'element',
                name: 'arena',
                elements: [
                  {
                    type: 'element',
                    name: 'rank_point',
                    attributes: {
                      __type: 's32',
                    },
                    elements: [
                      {
                        type: 'text',
                        text: '22000',
                      },
                    ],
                  },
                  {
                    type: 'element',
                    name: 'shop_point',
                    attributes: {
                      __type: 's32',
                    },
                    elements: [
                      {
                        type: 'text',
                        text: '20000',
                      },
                    ],
                  },
                  {
                    type: 'element',
                    name: 'ultimate_rate',
                    attributes: {
                      __type: 's32',
                    },
                    elements: [
                      {
                        type: 'text',
                        text: '1',
                      },
                    ],
                  },
                  {
                    type: 'element',
                    name: 'rank_play_cnt',
                    attributes: {
                      __type: 'u16',
                    },
                    elements: [
                      {
                        type: 'text',
                        text: '1',
                      },
                    ],
                  },
                  {
                    type: 'element',
                    name: 'ultimate_play_cnt',
                    attributes: {
                      __type: 'u16',
                    },
                    elements: [
                      {
                        type: 'text',
                        text: '1',
                      },
                    ],
                  },
                ],
              },
              {
                type: 'element',
                name: 'skill',
                elements: await getSkillAnalyzerCourses(cardID),
              },
              {
                type: 'element',
                name: 'item',
                elements: items,
              },
              {
                type: 'element',
                name: 'param',
                elements: await getParams(cardID),
              },
            ],
          },
        ],
      },
    ],
  };
}

async function getAchievements(items: any, cardID: string) {
  let achievements = await Achievement.findAll({ where: { cardID } });
  for (const entry of achievements) {
    items.push({
      type: 'element',
      name: 'info',
      elements: [
        {
          type: 'element',
          name: 'type',
          attributes: {
            __type: 'u8',
          },
          elements: [
            {
              type: 'text',
              text: entry.type,
            },
          ],
        },
        {
          type: 'element',
          name: 'id',
          attributes: {
            __type: 'u32',
          },
          elements: [
            {
              type: 'text',
              text: entry.paramID,
            },
          ],
        },
        {
          type: 'element',
          name: 'param',
          attributes: {
            __type: 'u32',
          },
          elements: [
            {
              type: 'text',
              text: entry.param,
            },
          ],
        },
      ],
    });
  }
  return items;
}

async function getParams(cardID: string) {
  let params = await Param.findAll({ where: { cardID } });
  if (!params) return [];
  let final = [];
  for (const entry of params) {
    final.push({
      type: 'element',
      name: 'info',
      elements: [
        {
          type: 'element',
          name: 'type',
          attributes: {
            __type: 's32',
          },
          elements: [
            {
              type: 'text',
              text: entry.type,
            },
          ],
        },
        {
          type: 'element',
          name: 'id',
          attributes: {
            __type: 's32',
          },
          elements: [
            {
              type: 'text',
              text: entry.paramID,
            },
          ],
        },
        {
          type: 'element',
          name: 'param',
          attributes: {
            __type: 's32',
            __count: entry.param.split(' ').length,
          },
          elements: [
            {
              type: 'text',
              text: entry.param,
            },
          ],
        },
      ],
    });
  }
  return final;
}

async function saveSV6Score(session: string, scoreContents: any) {
  const user = await User.findOne({
    where: { cardID: scoreContents.refid._text },
  });
  const track = scoreContents.track;
  const userBest = await BestScore.findOne({
    where: {
      cardID: scoreContents.refid._text,
      musicID: track.music_id._text,
      musicType: track.music_type._text,
    },
  });
  if (!user) return false;
  if (user.session !== session) return false;
  //missing dropCount ?
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
  };
  await Score.create(scoreObj as IScore);
  if (!userBest) BestScore.create(scoreObj as IBestScore);
  if (userBest) {
    if (parseInt(track.score._text) > userBest.score) {
      userBest.update({
        score: scoreObj.score,
        notesOption: scoreObj.notesOption,
        scoreGrade: scoreObj.scoreGrade,
        just: scoreObj.just,
        critical: scoreObj.critical,
        near: scoreObj.near,
        error: scoreObj.error,
        mode: scoreObj.mode,
        btnRate: scoreObj.btnRate,
        volRate: scoreObj.volRate,
        longRate: scoreObj.longRate,
      });
    }
    if (parseInt(track.exscore._text) > userBest.exscore) {
      userBest.update({
        exscore: scoreObj.exscore,
        notesOption: scoreObj.notesOption,
        just: scoreObj.just,
        critical: scoreObj.critical,
        near: scoreObj.near,
        error: scoreObj.error,
        mode: scoreObj.mode,
      });
    }
    if (parseInt(track.clear_type._text) > userBest.clearType) {
      userBest.update({
        clearType: scoreObj.clearType,
        notesOption: scoreObj.notesOption,
        mode: scoreObj.mode,
        effectiveRate: scoreObj.effectiveRate,
      });
    }
  }
  return {
    declaration: {
      attributes: {
        version: '1.0',
        encoding: 'UTF-8',
      },
    },
    elements: [
      {
        type: 'element',
        name: 'response',
        elements: [
          {
            type: 'element',
            name: 'game',
            attributes: {
              status: '0',
            },
          },
        ],
      },
    ],
  };
}

async function saveSV6(session: string, cardID: string, configContents: any) {
  const user = await User.findOne({ where: { cardID } });
  if (!user) return false;
  if (user.session !== session) return false;
  const newConfig = {
    name: user.ign,
    code: user.gameConfig.code,
    sdvx_id: user.gameConfig.code,
    appeal_id: configContents.appeal_id._text,
    gamecoin_packet:
      parseInt(user.gameConfig.gamecoin_packet) +
      parseInt(configContents.earned_gamecoin_packet._text),
    gamecoin_block:
      parseInt(user.gameConfig.gamecoin_block) +
      parseInt(configContents.earned_gamecoin_block._text),
    last_music_id: configContents.music_id._text,
    last_music_type: configContents.music_type._text,
    sort_type: configContents.sort_type._text,
    headphone: configContents.headphone._text,
    blaster_energy:
      parseInt(user.gameConfig.blaster_energy) +
      parseInt(configContents.earned_blaster_energy._text),
    blaster_count: '0',
    extrack_energy:
      parseInt(user.gameConfig.extrack_energy) +
      parseInt(configContents.earned_extrack_energy._text),
    hispeed: configContents.hispeed._text,
    lanespeed: configContents.lanespeed._text,
    gauge_option: configContents.gauge_option._text,
    ars_option: configContents.ars_option._text,
    notes_option: configContents.notes_option._text,
    early_late_disp: configContents.early_late_disp._text,
    draw_adjust: configContents.draw_adjust._text,
    eff_c_left: configContents.eff_c_left._text,
    eff_c_right: configContents.eff_c_right._text,
    narrow_down: configContents.narrow_down._text,
    kac_id: user.ign,
    skill_level: configContents.skill_level._text,
    skill_base_id: configContents.skill_base_id._text,
    skill_name_id: configContents.skill_name_id._text,
    ea_shop: {
      packet_booster: '1',
      blaster_pass_enable: '1',
      blaster_pass_limit_date: '0',
    },
    eaappli: {
      relation: '1',
    },
    cloud: {
      relation: '1',
    },
    block_no: '0',
    skill: '0',
    play_count: parseInt(user.gameConfig.play_count) + 1,
  };
  const params = await Param.findAll({ where: { cardID } });
  if (!params.length) {
    for (const entry of configContents.param.info) {
      Param.create({
        cardID,
        type: entry.type._text,
        paramID: entry.id._text,
        param: entry.param._text,
      });
    }
  }
  if (typeof configContents.course !== 'undefined') {
    const skillContents = configContents.course;
    skillContents.refid = { _text: cardID };
    await SaveSV6SkillData(session, skillContents);
  } else {
    for (const newParam of configContents.param.info) {
      let exists = false;
      for (const currentParam of params) {
        if (
          currentParam.type.toString() == newParam.type._text &&
          currentParam.paramID.toString() == newParam.id._text
        ) {
          exists = true;
          if (currentParam.param !== newParam.param._text) {
            await currentParam.update({ param: newParam.param._text });
          }
        }
      }
      if (!exists) {
        Param.create({
          cardID,
          type: newParam.type._text,
          paramID: newParam.id._text,
          param: newParam.param._text,
        });
      }
    }
  }
  const achievements = await Achievement.findAll({ where: { cardID } });
  if (!achievements.length) {
    for (const entry of configContents.item.info) {
      Achievement.create({
        cardID,
        type: entry.type._text,
        paramID: entry.id._text,
        param: entry.param._text,
      });
    }
  } else if (types.get(configContents.item.info) === types.array) {
    for (const newParam of configContents.item.info) {
      let exists = false;
      for (const currentParam of achievements) {
        if (
          currentParam.type.toString() == newParam.type._text &&
          currentParam.paramID.toString() == newParam.id._text
        ) {
          exists = true;
          if (currentParam.param !== newParam.param._text) {
            await currentParam.update({ param: newParam.param._text });
          }
        }
      }
      if (!exists) {
        Achievement.create({
          cardID,
          type: newParam.type._text,
          paramID: newParam.id._text,
          param: newParam.param._text,
        });
      }
    }
  } else if (types.get(configContents.item.info) === types.object) {
    let exists = false;
    for (const currentParam of achievements) {
      if (
        currentParam.type.toString() == configContents.item.info.type._text &&
        currentParam.paramID.toString() == configContents.item.info.id._text
      ) {
        exists = true;
        if (currentParam.param !== configContents.item.info.param._text) {
          await currentParam.update({
            param: configContents.item.info.param._text,
          });
        }
      }
    }
    if (!exists) {
      Achievement.create({
        cardID,
        type: configContents.item.info.type._text,
        paramID: configContents.item.info.id._text,
        param: configContents.item.info.param._text,
      });
    }
  }

  try {
    await user.update({
      gameConfig: newConfig,
      apecaID: configContents.appeal_id._text,
      skillLV: configContents.skill_level._text,
    });
    return {
      declaration: {
        attributes: {
          version: '1.0',
          encoding: 'UTF-8',
        },
      },
      elements: [
        {
          type: 'element',
          name: 'response',
          elements: [
            {
              type: 'element',
              name: 'game',
              attributes: {
                status: '0',
              },
            },
          ],
        },
      ],
    };
  } catch (e) {
    console.error(e);
    return false;
  }
}

async function getSV6PaseliCheckinData(cardID: string, passCode: number) {
  const user = await User.findOne({ where: { cardID, passCode } });
  if (!user) return false;
  return {
    declaration: {
      attributes: {
        version: '1.0',
        encoding: 'UTF-8',
      },
    },
    elements: [
      {
        type: 'element',
        name: 'response',
        elements: [
          {
            type: 'element',
            name: 'eacoin',
            elements: [
              {
                type: 'element',
                name: 'balance',
                attributes: {
                  __type: 's32',
                },
                elements: [
                  {
                    type: 'text',
                    text: '573',
                  },
                ],
              },
              {
                type: 'element',
                name: 'sessid',
                attributes: {
                  __type: 'str',
                },
                elements: [
                  {
                    type: 'text',
                    text: 'X',
                  },
                ],
              },
              {
                type: 'element',
                name: 'acstatus',
                attributes: {
                  __type: 'u8',
                },
                elements: [
                  {
                    type: 'text',
                    text: '1',
                  },
                ],
              },
              {
                type: 'element',
                name: 'sequence',
                attributes: {
                  __type: 's16',
                },
                elements: [
                  {
                    type: 'text',
                    text: '1',
                  },
                ],
              },
              {
                type: 'element',
                name: 'acid',
                attributes: {
                  __type: 'str',
                },
                elements: [
                  {
                    type: 'text',
                    text: 'X',
                  },
                ],
              },
              {
                type: 'element',
                name: 'acname',
                attributes: {
                  __type: 'str',
                },
                elements: [
                  {
                    type: 'text',
                    text: 'X',
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  };
}

function getSV6PaseliConsumeData() {
  return {
    declaration: {
      attributes: {
        version: '1.0',
        encoding: 'SHIFT_JIS',
      },
    },
    elements: [
      {
        type: 'element',
        name: 'response',
        elements: [
          {
            type: 'element',
            name: 'eacoin',
            attributes: {
              status: '0',
            },
            elements: [
              {
                type: 'element',
                name: 'autocharge',
                attributes: {
                  __type: 'u8',
                },
                elements: [
                  {
                    type: 'text',
                    text: '0',
                  },
                ],
              },
              {
                type: 'element',
                name: 'acstatus',
                attributes: {
                  __type: 'u8',
                },
                elements: [
                  {
                    type: 'text',
                    text: '0',
                  },
                ],
              },
              {
                type: 'element',
                name: 'balance',
                attributes: {
                  __type: 's32',
                },
                elements: [
                  {
                    type: 'text',
                    text: '573',
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  };
}

function getSV6PaseliCheckoutData() {
  return {
    declaration: {
      attributes: {
        version: '1.0',
        encoding: 'SHIFT_JIS',
      },
    },
    elements: [
      {
        type: 'element',
        name: 'response',
        elements: [
          {
            type: 'element',
            name: 'eacoin',
            attributes: {
              status: '0',
            },
          },
        ],
      },
    ],
  };
}

function getSV6ShopData() {
  return {
    declaration: {
      attributes: {
        version: '1.0',
        encoding: 'UTF-8',
      },
    },
    elements: [
      {
        type: 'element',
        name: 'response',
        elements: [
          {
            type: 'element',
            name: 'game',
          },
        ],
      },
    ],
  };
}

async function SaveSV6SkillData(session: string, skillContents: any) {
  const user = await User.findOne({
    where: { session, cardID: skillContents.refid._text },
  });
  if (!user) return false;
  const alreadyDone = await Skill.findOne({
    where: {
      cardID: skillContents.refid._text,
      ssnid: skillContents.ssnid._text,
      crsid: skillContents.crsid._text,
    },
  });
  let trackIDs = [];
  for (const track of skillContents.tr) {
    trackIDs.push(
      await SaveSV6SkillTrackData(skillContents.refid._text, track)
    );
  }
  if (!alreadyDone) {
    await Skill.create({
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
      cnt: 1,
      locid: 92,
      tr1: trackIDs[0],
      tr2: trackIDs[1],
      tr3: trackIDs[2],
    });
  } else if (
    typeof alreadyDone.sc !== 'undefined' &&
    parseInt(skillContents.sc._text) > alreadyDone.sc
  ) {
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
      cnt: alreadyDone.cnt + 1,
      locid: 92,
      tr1: trackIDs[0],
      tr2: trackIDs[1],
      tr3: trackIDs[2],
    });
  } else if (typeof alreadyDone.sc !== 'undefined') {
    await alreadyDone.update({
      cnt: alreadyDone.cnt + 1,
    });
  }
  return {
    declaration: {
      attributes: {
        version: '1.0',
        encoding: 'UTF-8',
      },
    },
    elements: [
      {
        type: 'element',
        name: 'response',
        elements: [
          {
            type: 'element',
            name: 'game',
            attributes: {
              status: '0',
            },
          },
        ],
      },
    ],
  };
}

async function SaveSV6SkillTrackData(cardID: string, track: any) {
  const result = await SkillTrack.create({
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
    pr: track.pr._text,
  });
  return result.id;
}

async function getSkillAnalyzerCourses(cardID: string) {
  const final = [];
  const courses = await Skill.findAll({ where: { cardID } });
  if (!courses) return [];
  for (const course of courses) {
    final.push({
      type: 'element',
      name: 'course',
      elements: [
        {
          type: 'element',
          name: 'ssnid',
          attributes: {
            __type: 's16',
          },
          elements: [
            {
              type: 'text',
              text: course.ssnid.toString(),
            },
          ],
        },
        {
          type: 'element',
          name: 'crsid',
          attributes: {
            __type: 's16',
          },
          elements: [
            {
              type: 'text',
              text: course.crsid.toString(),
            },
          ],
        },
        {
          type: 'element',
          name: 'sc',
          attributes: {
            __type: 's32',
          },
          elements: [
            {
              type: 'text',
              text: course.sc.toString(),
            },
          ],
        },
        {
          type: 'element',
          name: 'ex',
          attributes: {
            __type: 's32',
          },
          elements: [
            {
              type: 'text',
              text: course.ex.toString(),
            },
          ],
        },
        {
          type: 'element',
          name: 'ct',
          attributes: {
            __type: 's16',
          },
          elements: [
            {
              type: 'text',
              text: course.ct.toString(),
            },
          ],
        },
        {
          type: 'element',
          name: 'gr',
          attributes: {
            __type: 's16',
          },
          elements: [
            {
              type: 'text',
              text: course.gr.toString(),
            },
          ],
        },
        {
          type: 'element',
          name: 'ar',
          attributes: {
            __type: 's16',
          },
          elements: [
            {
              type: 'text',
              text: course.ar.toString(),
            },
          ],
        },
        {
          type: 'element',
          name: 'cnt',
          attributes: {
            __type: 's16',
          },
          elements: [
            {
              type: 'text',
              text: course.cnt.toString(),
            },
          ],
        },
      ],
    });
  }
  return final;
}

const types = {
  get: function (prop: any) {
    return Object.prototype.toString.call(prop);
  },
  null: '[object Null]',
  object: '[object Object]',
  array: '[object Array]',
  string: '[object String]',
  boolean: '[object Boolean]',
  number: '[object Number]',
  date: '[object Date]',
};

export default {
  getSV6CommonData,
  getSV6InquireData,
  getSV6AuthpassData,
  createSV6PlayerAccount,
  completeSV6PlayerAccount,
  loadSV6PlayerAccount,
  getSV6RivalData,
  getSV6LoadMData,
  getSV6FrozenData,
  saveSV6Score,
  saveSV6,
  getSV6PlaySData,
  getSV6LoungeData,
  getSV6SaveEData,
  getSV6PaseliCheckinData,
  getSV6PaseliConsumeData,
  getSV6PaseliCheckoutData,
  getSV6ShopData,
  SaveSV6SkillData,
  getSV6HiScoreData,
  getSV6EntrySData,
};
