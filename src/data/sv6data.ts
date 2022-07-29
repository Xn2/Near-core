import customCourses from './custom_SA.json';

const EVENT6 = [
  //'ICON_POLICY_BREAK',
  //'ICON_FLOOR_INFECTION',
  'DEMOGAME_PLAY',
  'MATCHING_MODE',
  'MATCHING_MODE_FREE_IP',
  'LEVEL_LIMIT_EASING',
  //'EVENT_IDS_SERIALCODE_TOHO_02',
  'ACHIEVEMENT_ENABLE',
  'APICAGACHADRAW\t30',
  'VOLFORCE_ENABLE',
  'AKANAME_ENABLE',
  //'FACTORY\t10',
  'PAUSE_ONLINEUPDATE',
  'CONTINUATION',
  'TENKAICHI_MODE',
  'QC_MODE',
  'KAC_MODE',
  'APPEAL_CARD_GEN_PRICE\t100',
  'APPEAL_CARD_GEN_NEW_PRICE\t200',
  'APPEAL_CARD_UNLOCK\t0,20170914,0,20171014,0,20171116,0,20180201,0,20180607,0,20181206,0,20200326,0,20200611,4,10140732,6,10150431',
  'FAVORITE_APPEALCARD_MAX\t200',
  'FAVORITE_MUSIC_MAX\t200',
  'EVENTDATE_APRILFOOL',
  'KONAMI_50TH_LOGO',
  'OMEGA_ARS_ENABLE',
  'DISABLE_MONITOR_ID_CHECK',
  'SKILL_ANALYZER_ABLE',
  'BLASTER_ABLE',
  'STANDARD_UNLOCK_ENABLE',
  'PLAYERJUDGEADJ_ENABLE',
  'MIXID_INPUT_ENABLE',
  //'SERIALCODE_JAPAN',
  'EVENTDATE_ONIGO',
  'EVENTDATE_GOTT',
  'GENERATOR_ABLE',
  'CREW_SELECT_ABLE',
  'PREMIUM_TIME_ENABLE',
  'OMEGA_ENABLE\t1,2,3,4,5,6,7,8,9',
  'HEXA_ENABLE\t1,2,3',
  'MEGAMIX_ENABLE',
  'VALGENE_ENABLE',
  'ARENA_ENABLE',
  'DISP_PASELI_BANNER',
];

const COURSES6 = [
  {
    id: 1,
    name: 'SKILL ANALYZER 第1回 Aコース',
    isNew: 1,
    courses: [
      {
        id: 1,
        type: 0,
        name: 'SKILL ANALYZER Level.01',
        level: 1,
        nameID: 1,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 1383,
            mty: 0,
          },
          {
            no: 1,
            mid: 334,
            mty: 1,
          },
          {
            no: 2,
            mid: 774,
            mty: 1,
          },
        ],
      },
      {
        id: 2,
        type: 0,
        name: 'SKILL ANALYZER Level.02',
        level: 2,
        nameID: 2,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 74,
            mty: 0,
          },
          {
            no: 1,
            mid: 771,
            mty: 1,
          },
          {
            no: 2,
            mid: 1125,
            mty: 1,
          },
        ],
      },
      {
        id: 3,
        type: 0,
        name: 'SKILL ANALYZER Level.03',
        level: 3,
        nameID: 3,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 784,
            mty: 1,
          },
          {
            no: 1,
            mid: 1126,
            mty: 1,
          },
          {
            no: 2,
            mid: 1075,
            mty: 1,
          },
        ],
      },
      {
        id: 4,
        type: 0,
        name: 'SKILL ANALYZER Level.04',
        level: 4,
        nameID: 4,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 505,
            mty: 1,
          },
          {
            no: 1,
            mid: 1403,
            mty: 1,
          },
          {
            no: 2,
            mid: 609,
            mty: 1,
          },
        ],
      },
      {
        id: 5,
        type: 0,
        name: 'SKILL ANALYZER Level.05',
        level: 5,
        nameID: 5,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 630,
            mty: 1,
          },
          {
            no: 1,
            mid: 1598,
            mty: 1,
          },
          {
            no: 2,
            mid: 1475,
            mty: 1,
          },
        ],
      },
      {
        id: 6,
        type: 0,
        name: 'SKILL ANALYZER Level.06',
        level: 6,
        nameID: 6,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 1154,
            mty: 2,
          },
          {
            no: 1,
            mid: 1238,
            mty: 2,
          },
          {
            no: 2,
            mid: 590,
            mty: 2,
          },
        ],
      },
      {
        id: 7,
        type: 0,
        name: 'SKILL ANALYZER Level.07',
        level: 7,
        nameID: 7,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 1606,
            mty: 2,
          },
          {
            no: 1,
            mid: 834,
            mty: 2,
          },
          {
            no: 2,
            mid: 820,
            mty: 4,
          },
        ],
      },
      {
        id: 8,
        type: 0,
        name: 'SKILL ANALYZER Level.08',
        level: 8,
        nameID: 8,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 183,
            mty: 2,
          },
          {
            no: 1,
            mid: 1602,
            mty: 2,
          },
          {
            no: 2,
            mid: 173,
            mty: 2,
          },
        ],
      },
      {
        id: 9,
        type: 0,
        name: 'SKILL ANALYZER Level.09',
        level: 9,
        nameID: 9,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 1418,
            mty: 4,
          },
          {
            no: 1,
            mid: 469,
            mty: 2,
          },
          {
            no: 2,
            mid: 1413,
            mty: 4,
          },
        ],
      },
      {
        id: 10,
        type: 0,
        name: 'SKILL ANALYZER Level.10',
        level: 10,
        nameID: 10,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 1596,
            mty: 4,
          },
          {
            no: 1,
            mid: 1649,
            mty: 4,
          },
          {
            no: 2,
            mid: 229,
            mty: 2,
          },
        ],
      },
      {
        id: 11,
        type: 0,
        name: 'SKILL ANALYZER Level.11',
        level: 11,
        nameID: 11,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 1651,
            mty: 4,
          },
          {
            no: 1,
            mid: 1105,
            mty: 4,
          },
          {
            no: 2,
            mid: 1152,
            mty: 4,
          },
        ],
      },
      {
        id: 12,
        type: 0,
        name: 'SKILL ANALYZER Level.∞',
        level: 12,
        nameID: 12,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 1664,
            mty: 4,
          },
          {
            no: 1,
            mid: 1528,
            mty: 4,
          },
          {
            no: 2,
            mid: 1185,
            mty: 4,
          },
        ],
      },
    ],
  },
  {
    id: 2,
    name: 'SKILL ANALYZER 第1回 Bコース',
    isNew: 1,
    courses: [
      {
        id: 1,
        type: 0,
        name: 'SKILL ANALYZER Level.01',
        level: 1,
        nameID: 1,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 1066,
            mty: 0,
          },
          {
            no: 1,
            mid: 1054,
            mty: 1,
          },
          {
            no: 2,
            mid: 1055,
            mty: 0,
          },
        ],
      },
      {
        id: 2,
        type: 0,
        name: 'SKILL ANALYZER Level.02',
        level: 2,
        nameID: 2,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 768,
            mty: 1,
          },
          {
            no: 1,
            mid: 948,
            mty: 1,
          },
          {
            no: 2,
            mid: 755,
            mty: 1,
          },
        ],
      },
      {
        id: 3,
        type: 0,
        name: 'SKILL ANALYZER Level.03',
        level: 3,
        nameID: 3,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 401,
            mty: 1,
          },
          {
            no: 1,
            mid: 1320,
            mty: 1,
          },
          {
            no: 2,
            mid: 485,
            mty: 1,
          },
        ],
      },
      {
        id: 4,
        type: 0,
        name: 'SKILL ANALYZER Level.04',
        level: 4,
        nameID: 4,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 295,
            mty: 1,
          },
          {
            no: 1,
            mid: 255,
            mty: 1,
          },
          {
            no: 2,
            mid: 1029,
            mty: 1,
          },
        ],
      },
      {
        id: 5,
        type: 0,
        name: 'SKILL ANALYZER Level.05',
        level: 5,
        nameID: 5,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 1420,
            mty: 1,
          },
          {
            no: 1,
            mid: 1001,
            mty: 2,
          },
          {
            no: 2,
            mid: 1611,
            mty: 1,
          },
        ],
      },
      {
        id: 6,
        type: 0,
        name: 'SKILL ANALYZER Level.06',
        level: 6,
        nameID: 6,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 1338,
            mty: 2,
          },
          {
            no: 1,
            mid: 79,
            mty: 2,
          },
          {
            no: 2,
            mid: 1151,
            mty: 2,
          },
        ],
      },
      {
        id: 7,
        type: 0,
        name: 'SKILL ANALYZER Level.07',
        level: 7,
        nameID: 7,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 1047,
            mty: 2,
          },
          {
            no: 1,
            mid: 982,
            mty: 2,
          },
          {
            no: 2,
            mid: 1042,
            mty: 2,
          },
        ],
      },
      {
        id: 8,
        type: 0,
        name: 'SKILL ANALYZER Level.08',
        level: 8,
        nameID: 8,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 664,
            mty: 2,
          },
          {
            no: 1,
            mid: 1370,
            mty: 2,
          },
          {
            no: 2,
            mid: 838,
            mty: 2,
          },
        ],
      },
      {
        id: 9,
        type: 0,
        name: 'SKILL ANALYZER Level.09',
        level: 9,
        nameID: 9,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 624,
            mty: 2,
          },
          {
            no: 1,
            mid: 1113,
            mty: 4,
          },
          {
            no: 2,
            mid: 1629,
            mty: 4,
          },
        ],
      },
      {
        id: 10,
        type: 0,
        name: 'SKILL ANALYZER Level.10',
        level: 10,
        nameID: 10,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 1595,
            mty: 4,
          },
          {
            no: 1,
            mid: 1657,
            mty: 4,
          },
          {
            no: 2,
            mid: 658,
            mty: 2,
          },
        ],
      },
      {
        id: 11,
        type: 0,
        name: 'SKILL ANALYZER Level.11',
        level: 11,
        nameID: 11,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 1647,
            mty: 4,
          },
          {
            no: 1,
            mid: 1587,
            mty: 4,
          },
          {
            no: 2,
            mid: 333,
            mty: 3,
          },
        ],
      },
      {
        id: 12,
        type: 0,
        name: 'SKILL ANALYZER Level.∞',
        level: 12,
        nameID: 12,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 1363,
            mty: 4,
          },
          {
            no: 1,
            mid: 692,
            mty: 3,
          },
          {
            no: 2,
            mid: 1270,
            mty: 4,
          },
        ],
      },
    ],
  },
  {
    id: 3,
    name: 'SKILL ANALYZER 第1回 Cコース',
    isNew: 1,
    courses: [
      {
        id: 1,
        type: 0,
        name: 'SKILL ANALYZER Level.01',
        level: 1,
        nameID: 1,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 1376,
            mty: 0,
          },
          {
            no: 1,
            mid: 564,
            mty: 1,
          },
          {
            no: 2,
            mid: 87,
            mty: 1,
          },
        ],
      },
      {
        id: 2,
        type: 0,
        name: 'SKILL ANALYZER Level.02',
        level: 2,
        nameID: 2,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 34,
            mty: 1,
          },
          {
            no: 1,
            mid: 932,
            mty: 1,
          },
          {
            no: 2,
            mid: 945,
            mty: 1,
          },
        ],
      },
      {
        id: 3,
        type: 0,
        name: 'SKILL ANALYZER Level.03',
        level: 3,
        nameID: 3,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 1132,
            mty: 1,
          },
          {
            no: 1,
            mid: 1549,
            mty: 1,
          },
          {
            no: 2,
            mid: 380,
            mty: 1,
          },
        ],
      },
      {
        id: 4,
        type: 0,
        name: 'SKILL ANALYZER Level.04',
        level: 4,
        nameID: 4,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 130,
            mty: 1,
          },
          {
            no: 1,
            mid: 1204,
            mty: 1,
          },
          {
            no: 2,
            mid: 1424,
            mty: 1,
          },
        ],
      },
      {
        id: 5,
        type: 0,
        name: 'SKILL ANALYZER Level.05',
        level: 5,
        nameID: 5,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 48,
            mty: 2,
          },
          {
            no: 1,
            mid: 565,
            mty: 2,
          },
          {
            no: 2,
            mid: 1109,
            mty: 2,
          },
        ],
      },
      {
        id: 6,
        type: 0,
        name: 'SKILL ANALYZER Level.06',
        level: 6,
        nameID: 6,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 1534,
            mty: 2,
          },
          {
            no: 1,
            mid: 1398,
            mty: 2,
          },
          {
            no: 2,
            mid: 1312,
            mty: 2,
          },
        ],
      },
      {
        id: 7,
        type: 0,
        name: 'SKILL ANALYZER Level.07',
        level: 7,
        nameID: 7,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 962,
            mty: 2,
          },
          {
            no: 1,
            mid: 1560,
            mty: 2,
          },
          {
            no: 2,
            mid: 357,
            mty: 2,
          },
        ],
      },
      {
        id: 8,
        type: 0,
        name: 'SKILL ANALYZER Level.08',
        level: 8,
        nameID: 8,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 965,
            mty: 2,
          },
          {
            no: 1,
            mid: 906,
            mty: 2,
          },
          {
            no: 2,
            mid: 579,
            mty: 2,
          },
        ],
      },
      {
        id: 9,
        type: 0,
        name: 'SKILL ANALYZER Level.09',
        level: 9,
        nameID: 9,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 332,
            mty: 2,
          },
          {
            no: 1,
            mid: 36,
            mty: 2,
          },
          {
            no: 2,
            mid: 1476,
            mty: 4,
          },
        ],
      },
      {
        id: 10,
        type: 0,
        name: 'SKILL ANALYZER Level.10',
        level: 10,
        nameID: 10,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 1533,
            mty: 4,
          },
          {
            no: 1,
            mid: 1597,
            mty: 4,
          },
          {
            no: 2,
            mid: 1541,
            mty: 4,
          },
        ],
      },
    ],
  },
  {
    id: 4,
    name: 'BEMANI MASTER KOREA 2021',
    isNew: 1,
    courses: [
      {
        id: 1,
        type: 0,
        name: 'BEMANI MASTER KOREA 2021 ENJOY COURSE',
        level: 0,
        nameID: 13,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 1641,
            mty: 1,
          },
          {
            no: 1,
            mid: 1646,
            mty: 1,
          },
          {
            no: 2,
            mid: 1642,
            mty: 1,
          },
        ],
      },
      {
        id: 2,
        type: 0,
        name: 'BEMANI MASTER KOREA 2021 ENTRY COURSE',
        level: 0,
        nameID: 13,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 1641,
            mty: 4,
          },
          {
            no: 1,
            mid: 1646,
            mty: 4,
          },
          {
            no: 2,
            mid: 1642,
            mty: 4,
          },
        ],
      },
    ],
  },
  {
    id: 5,
    name: 'SKILL ANALYZER 第2回',
    isNew: 1,
    courses: [
      {
        id: 1,
        type: 0,
        name: 'SKILL ANALYZER Level.01',
        level: 1,
        nameID: 1,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 1374,
            mty: 0,
          },
          {
            no: 1,
            mid: 936,
            mty: 1,
          },
          {
            no: 2,
            mid: 314,
            mty: 1,
          },
        ],
      },
      {
        id: 2,
        type: 0,
        name: 'SKILL ANALYZER Level.02',
        level: 2,
        nameID: 2,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 1221,
            mty: 0,
          },
          {
            no: 1,
            mid: 169,
            mty: 1,
          },
          {
            no: 2,
            mid: 254,
            mty: 1,
          },
        ],
      },
      {
        id: 3,
        type: 0,
        name: 'SKILL ANALYZER Level.03',
        level: 3,
        nameID: 3,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 1429,
            mty: 1,
          },
          {
            no: 1,
            mid: 462,
            mty: 1,
          },
          {
            no: 2,
            mid: 237,
            mty: 1,
          },
        ],
      },
      {
        id: 4,
        type: 0,
        name: 'SKILL ANALYZER Level.04',
        level: 4,
        nameID: 4,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 449,
            mty: 1,
          },
          {
            no: 1,
            mid: 329,
            mty: 1,
          },
          {
            no: 2,
            mid: 1293,
            mty: 1,
          },
        ],
      },
      {
        id: 5,
        type: 0,
        name: 'SKILL ANALYZER Level.05',
        level: 5,
        nameID: 5,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 486,
            mty: 2,
          },
          {
            no: 1,
            mid: 920,
            mty: 2,
          },
          {
            no: 2,
            mid: 1318,
            mty: 2,
          },
        ],
      },
      {
        id: 6,
        type: 0,
        name: 'SKILL ANALYZER Level.06',
        level: 6,
        nameID: 6,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 1288,
            mty: 2,
          },
          {
            no: 1,
            mid: 256,
            mty: 2,
          },
          {
            no: 2,
            mid: 1445,
            mty: 2,
          },
        ],
      },
      {
        id: 7,
        type: 0,
        name: 'SKILL ANALYZER Level.07',
        level: 7,
        nameID: 7,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 1129,
            mty: 2,
          },
          {
            no: 1,
            mid: 1349,
            mty: 2,
          },
          {
            no: 2,
            mid: 1608,
            mty: 2,
          },
        ],
      },
      {
        id: 8,
        type: 0,
        name: 'SKILL ANALYZER Level.08',
        level: 8,
        nameID: 8,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 492,
            mty: 2,
          },
          {
            no: 1,
            mid: 930,
            mty: 4,
          },
          {
            no: 2,
            mid: 651,
            mty: 2,
          },
        ],
      },
      {
        id: 9,
        type: 0,
        name: 'SKILL ANALYZER Level.09',
        level: 9,
        nameID: 9,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 1607,
            mty: 2,
          },
          {
            no: 1,
            mid: 1240,
            mty: 2,
          },
          {
            no: 2,
            mid: 510,
            mty: 2,
          },
        ],
      },
      {
        id: 10,
        type: 0,
        name: 'SKILL ANALYZER Level.10',
        level: 10,
        nameID: 10,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 1251,
            mty: 4,
          },
          {
            no: 1,
            mid: 1540,
            mty: 4,
          },
          {
            no: 2,
            mid: 1712,
            mty: 4,
          },
        ],
      },
      {
        id: 11,
        type: 0,
        name: 'SKILL ANALYZER Level.11',
        level: 11,
        nameID: 11,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 1143,
            mty: 4,
          },
          {
            no: 1,
            mid: 1298,
            mty: 4,
          },
          {
            no: 2,
            mid: 1619,
            mty: 4,
          },
        ],
      },
      {
        id: 12,
        type: 0,
        name: 'SKILL ANALYZER Level.∞',
        level: 12,
        nameID: 12,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 1639,
            mty: 4,
          },
          {
            no: 1,
            mid: 1496,
            mty: 4,
          },
          {
            no: 2,
            mid: 1766,
            mty: 4,
          },
        ],
      },
    ],
  },
  {
    id: 6,
    name: 'Custom Skill Analyzer courses',
    isNew: 1,
    courses: customCourses,
  },
  {
    id: 7,
    name: 'SKILL ANALYZER 第3回',
    isNew: 1,
    courses: [
      {
        id: 1,
        type: 0,
        name: 'SKILL ANALYZER Level.01',
        level: 1,
        nameID: 1,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 1718,
            mty: 0,
          },
          {
            no: 1,
            mid: 144,
            mty: 1,
          },
          {
            no: 2,
            mid: 568,
            mty: 1,
          },
        ],
      },
      {
        id: 2,
        type: 0,
        name: 'SKILL ANALYZER Level.02',
        level: 2,
        nameID: 2,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 1659,
            mty: 0,
          },
          {
            no: 1,
            mid: 739,
            mty: 1,
          },
          {
            no: 2,
            mid: 561,
            mty: 1,
          },
        ],
      },
      {
        id: 3,
        type: 0,
        name: 'SKILL ANALYZER Level.03',
        level: 3,
        nameID: 3,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 1110,
            mty: 1,
          },
          {
            no: 1,
            mid: 1513,
            mty: 1,
          },
          {
            no: 2,
            mid: 732,
            mty: 1,
          },
        ],
      },
      {
        id: 4,
        type: 0,
        name: 'SKILL ANALYZER Level.04',
        level: 4,
        nameID: 4,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 174,
            mty: 1,
          },
          {
            no: 1,
            mid: 1217,
            mty: 1,
          },
          {
            no: 2,
            mid: 617,
            mty: 1,
          },
        ],
      },
      {
        id: 5,
        type: 0,
        name: 'SKILL ANALYZER Level.05',
        level: 5,
        nameID: 5,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 1564,
            mty: 2,
          },
          {
            no: 1,
            mid: 1679,
            mty: 2,
          },
          {
            no: 2,
            mid: 285,
            mty: 2,
          },
        ],
      },
      {
        id: 6,
        type: 0,
        name: 'SKILL ANALYZER Level.06',
        level: 6,
        nameID: 6,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 545,
            mty: 2,
          },
          {
            no: 1,
            mid: 1563,
            mty: 2,
          },
          {
            no: 2,
            mid: 916,
            mty: 2,
          },
        ],
      },
      {
        id: 7,
        type: 0,
        name: 'SKILL ANALYZER Level.07',
        level: 7,
        nameID: 7,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 866,
            mty: 2,
          },
          {
            no: 1,
            mid: 330,
            mty: 2,
          },
          {
            no: 2,
            mid: 669,
            mty: 2,
          },
        ],
      },
      {
        id: 8,
        type: 0,
        name: 'SKILL ANALYZER Level.08',
        level: 8,
        nameID: 8,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 399,
            mty: 2,
          },
          {
            no: 1,
            mid: 1166,
            mty: 4,
          },
          {
            no: 2,
            mid: 1305,
            mty: 2,
          },
        ],
      },
      {
        id: 9,
        type: 0,
        name: 'SKILL ANALYZER Level.09',
        level: 9,
        nameID: 9,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 882,
            mty: 4,
          },
          {
            no: 1,
            mid: 1759,
            mty: 4,
          },
          {
            no: 2,
            mid: 993,
            mty: 4,
          },
        ],
      },
      {
        id: 10,
        type: 0,
        name: 'SKILL ANALYZER Level.10',
        level: 10,
        nameID: 10,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 1644,
            mty: 4,
          },
          {
            no: 1,
            mid: 1331,
            mty: 4,
          },
          {
            no: 2,
            mid: 1625,
            mty: 4,
          },
        ],
      },
      {
        id: 11,
        type: 0,
        name: 'SKILL ANALYZER Level.11',
        level: 11,
        nameID: 11,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 1550,
            mty: 3,
          },
          {
            no: 1,
            mid: 1366,
            mty: 4,
          },
          {
            no: 2,
            mid: 1722,
            mty: 4,
          },
        ],
      },
      {
        id: 12,
        type: 0,
        name: 'SKILL ANALYZER Level.∞',
        level: 12,
        nameID: 12,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 495,
            mty: 3,
          },
          {
            no: 1,
            mid: 1464,
            mty: 4,
          },
          {
            no: 2,
            mid: 1767,
            mty: 4,
          },
        ],
      },
    ],
  },
  {
    id: 8,
    name: 'SKILL ANALYZER 第4回 Aコース',
    isNew: 1,
    courses: [
      {
        id: 1,
        type: 0,
        name: 'SKILL ANALYZER Level.01',
        level: 1,
        nameID: 1,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 271,
            mty: 0,
          },
          {
            no: 1,
            mid: 209,
            mty: 1,
          },
          {
            no: 2,
            mid: 1083,
            mty: 1,
          },
        ],
      },
      {
        id: 2,
        type: 0,
        name: 'SKILL ANALYZER Level.02',
        level: 2,
        nameID: 2,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 1088,
            mty: 1,
          },
          {
            no: 1,
            mid: 973,
            mty: 1,
          },
          {
            no: 2,
            mid: 22,
            mty: 1,
          },
        ],
      },
      {
        id: 3,
        type: 0,
        name: 'SKILL ANALYZER Level.03',
        level: 3,
        nameID: 3,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 157,
            mty: 1,
          },
          {
            no: 1,
            mid: 1039,
            mty: 1,
          },
          {
            no: 2,
            mid: 972,
            mty: 1,
          },
        ],
      },
      {
        id: 4,
        type: 0,
        name: 'SKILL ANALYZER Level.04',
        level: 4,
        nameID: 4,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 1395,
            mty: 1,
          },
          {
            no: 1,
            mid: 238,
            mty: 2,
          },
          {
            no: 2,
            mid: 1342,
            mty: 1,
          },
        ],
      },
      {
        id: 5,
        type: 0,
        name: 'SKILL ANALYZER Level.05',
        level: 5,
        nameID: 5,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 283,
            mty: 2,
          },
          {
            no: 1,
            mid: 1551,
            mty: 1,
          },
          {
            no: 2,
            mid: 573,
            mty: 2,
          },
        ],
      },
      {
        id: 6,
        type: 0,
        name: 'SKILL ANALYZER Level.06',
        level: 6,
        nameID: 6,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 1565,
            mty: 2,
          },
          {
            no: 1,
            mid: 1409,
            mty: 2,
          },
          {
            no: 2,
            mid: 202,
            mty: 2,
          },
        ],
      },
      {
        id: 7,
        type: 0,
        name: 'SKILL ANALYZER Level.07',
        level: 7,
        nameID: 7,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 1250,
            mty: 2,
          },
          {
            no: 1,
            mid: 434,
            mty: 2,
          },
          {
            no: 2,
            mid: 690,
            mty: 2,
          },
        ],
      },
      {
        id: 8,
        type: 0,
        name: 'SKILL ANALYZER Level.08',
        level: 8,
        nameID: 8,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 460,
            mty: 2,
          },
          {
            no: 1,
            mid: 772,
            mty: 2,
          },
          {
            no: 2,
            mid: 891,
            mty: 4,
          },
        ],
      },
      {
        id: 9,
        type: 0,
        name: 'SKILL ANALYZER Level.09',
        level: 9,
        nameID: 9,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 234,
            mty: 2,
          },
          {
            no: 1,
            mid: 886,
            mty: 4,
          },
          {
            no: 2,
            mid: 1716,
            mty: 4,
          },
        ],
      },
      {
        id: 10,
        type: 0,
        name: 'SKILL ANALYZER Level.10',
        level: 10,
        nameID: 10,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 1760,
            mty: 4,
          },
          {
            no: 1,
            mid: 730,
            mty: 2,
          },
          {
            no: 2,
            mid: 1405,
            mty: 4,
          },
        ],
      },
      {
        id: 11,
        type: 0,
        name: 'SKILL ANALYZER Level.11',
        level: 11,
        nameID: 11,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 1776,
            mty: 4,
          },
          {
            no: 1,
            mid: 1365,
            mty: 4,
          },
          {
            no: 2,
            mid: 911,
            mty: 3,
          },
        ],
      },
      {
        id: 12,
        type: 0,
        name: 'SKILL ANALYZER Level.∞',
        level: 12,
        nameID: 12,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 1364,
            mty: 4,
          },
          {
            no: 1,
            mid: 1661,
            mty: 4,
          },
          {
            no: 2,
            mid: 1099,
            mty: 4,
          },
        ],
      },
    ],
  },
  {
    id: 9,
    name: 'SKILL ANALYZER 第4回 Bコース',
    isNew: 1,
    courses: [
      {
        id: 1,
        type: 0,
        name: 'SKILL ANALYZER Level.01',
        level: 1,
        nameID: 1,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 1526,
            mty: 0,
          },
          {
            no: 1,
            mid: 84,
            mty: 1,
          },
          {
            no: 2,
            mid: 76,
            mty: 1,
          },
        ],
      },
      {
        id: 2,
        type: 0,
        name: 'SKILL ANALYZER Level.02',
        level: 2,
        nameID: 2,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 171,
            mty: 1,
          },
          {
            no: 1,
            mid: 474,
            mty: 1,
          },
          {
            no: 2,
            mid: 18,
            mty: 1,
          },
        ],
      },
      {
        id: 3,
        type: 0,
        name: 'SKILL ANALYZER Level.03',
        level: 3,
        nameID: 3,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 281,
            mty: 1,
          },
          {
            no: 1,
            mid: 1254,
            mty: 1,
          },
          {
            no: 2,
            mid: 997,
            mty: 1,
          },
        ],
      },
      {
        id: 4,
        type: 0,
        name: 'SKILL ANALYZER Level.04',
        level: 4,
        nameID: 4,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 417,
            mty: 1,
          },
          {
            no: 1,
            mid: 1572,
            mty: 1,
          },
          {
            no: 2,
            mid: 539,
            mty: 1,
          },
        ],
      },
      {
        id: 5,
        type: 0,
        name: 'SKILL ANALYZER Level.05',
        level: 5,
        nameID: 5,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 1701,
            mty: 1,
          },
          {
            no: 1,
            mid: 523,
            mty: 2,
          },
          {
            no: 2,
            mid: 477,
            mty: 2,
          },
        ],
      },
      {
        id: 6,
        type: 0,
        name: 'SKILL ANALYZER Level.06',
        level: 6,
        nameID: 6,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 1412,
            mty: 2,
          },
          {
            no: 1,
            mid: 1417,
            mty: 2,
          },
          {
            no: 2,
            mid: 1081,
            mty: 2,
          },
        ],
      },
      {
        id: 7,
        type: 0,
        name: 'SKILL ANALYZER Level.07',
        level: 7,
        nameID: 7,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 315,
            mty: 2,
          },
          {
            no: 1,
            mid: 861,
            mty: 4,
          },
          {
            no: 2,
            mid: 1303,
            mty: 2,
          },
        ],
      },
      {
        id: 8,
        type: 0,
        name: 'SKILL ANALYZER Level.08',
        level: 8,
        nameID: 8,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 484,
            mty: 2,
          },
          {
            no: 1,
            mid: 905,
            mty: 2,
          },
          {
            no: 2,
            mid: 1539,
            mty: 4,
          },
        ],
      },
      {
        id: 9,
        type: 0,
        name: 'SKILL ANALYZER Level.09',
        level: 9,
        nameID: 9,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 1019,
            mty: 4,
          },
          {
            no: 1,
            mid: 943,
            mty: 4,
          },
          {
            no: 2,
            mid: 1208,
            mty: 4,
          },
        ],
      },
      {
        id: 10,
        type: 0,
        name: 'SKILL ANALYZER Level.10',
        level: 10,
        nameID: 10,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 786,
            mty: 2,
          },
          {
            no: 1,
            mid: 837,
            mty: 2,
          },
          {
            no: 2,
            mid: 1814,
            mty: 4,
          },
        ],
      },
      {
        id: 11,
        type: 0,
        name: 'SKILL ANALYZER Level.11',
        level: 11,
        nameID: 11,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 979,
            mty: 3,
          },
          {
            no: 1,
            mid: 1459,
            mty: 4,
          },
          {
            no: 2,
            mid: 1774,
            mty: 4,
          },
        ],
      },
      {
        id: 12,
        type: 0,
        name: 'SKILL ANALYZER Level.∞',
        level: 12,
        nameID: 12,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 914,
            mty: 3,
          },
          {
            no: 1,
            mid: 376,
            mty: 3,
          },
          {
            no: 2,
            mid: 1362,
            mty: 4,
          },
        ],
      },
    ],
  },
];

const SDVX_AUTOMATION_SONGS = [
  1, 2, 6, 7, 8, 19, 24, 25, 31, 39, 42, 44, 47, 54, 55, 59, 60, 63, 64, 69, 75,
  86, 87, 88, 94, 96, 97, 98, 101, 103, 109, 115, 117, 120, 125, 126, 127, 128,
  134, 135, 180, 182, 192, 212, 216, 224, 225, 230, 241, 245, 246, 251, 252,
  253, 255, 256, 257, 258, 259, 267, 268, 269, 271, 272, 286, 290, 291, 295,
  296, 297, 298, 299, 304, 307, 311, 312, 313, 316, 324, 330, 337, 344, 349,
  359, 364, 365, 369, 374, 381, 416, 420, 422, 437, 471, 479, 499, 500, 517,
  518, 519, 533, 538, 539, 540, 541, 542, 543, 546, 551, 552, 553, 581, 597,
  606, 607, 611, 616, 623, 626, 633, 634, 669, 671, 673, 678, 684, 698, 699,
  704, 708, 717, 718, 741, 743, 788, 816, 823, 831, 842, 855, 866, 903, 907,
  939, 978, 1072, 1225, 1231, 1250, 1252, 1260, 1261, 1297, 1331, 1333, 1422,
  1423, 1490, 1491,
];

const EXTENDS6: any = [
  //  {
  //   id: 91,
  //    type: 17,
  //    params: [
  //      0,
  //      1,
  //      0,
  //      0,
  //      1,
  //      SDVX_AUTOMATION_SONGS.join(','),
  //      '0',
  //      '0',
  //      '0',
  //      '0',
  //    ],
  //  },
];

export { EVENT6, COURSES6, SDVX_AUTOMATION_SONGS, EXTENDS6 };
