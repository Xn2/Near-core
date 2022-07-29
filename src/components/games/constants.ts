export const songNum = 2000;
export const idk = 5;

export const obj = {
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
              name: 'music_limited',
              elements: [],
            },
            {
              type: 'element',
              name: 'event',
              elements: [],
            },
            {
              type: 'element',
              name: 'skill_course',
              elements: [],
            },
            {
              type: 'element',
              name: 'arena',
              elements: [
                {
                  type: 'element',
                  name: 'season',
                  attributes: {
                    __type: 'u16',
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
                  name: 'time_start',
                  attributes: {
                    __type: 'time',
                  },
                  elements: [
                    {
                      type: 'text',
                      text: '1651704980',
                    },
                  ],
                },
                {
                  type: 'element',
                  name: 'time_end',
                  attributes: {
                    __type: 'time',
                  },
                  elements: [
                    {
                      type: 'text',
                      text: '1652704980',
                    },
                  ],
                },
                {
                  type: 'element',
                  name: 'shop_start',
                  attributes: {
                    __type: 'time',
                  },
                  elements: [
                    {
                      type: 'text',
                      text: '1651704980',
                    },
                  ],
                },
                {
                  type: 'element',
                  name: 'shop_end',
                  attributes: {
                    __type: 'time',
                  },
                  elements: [
                    {
                      type: 'text',
                      text: '1652704980',
                    },
                  ],
                },
                {
                  type: 'element',
                  name: 'is_open',
                  attributes: {
                    __type: 'bool',
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
                  name: 'is_shop',
                  attributes: {
                    __type: 'bool',
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
          ],
        },
      ],
    },
  ],
};
