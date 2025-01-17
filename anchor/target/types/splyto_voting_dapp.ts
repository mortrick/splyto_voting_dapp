/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/splyto_voting_dapp.json`.
 */
export type SplytoVotingDapp = {
  "address": "6K3472KcyJ65ZnK2bYF1Mgo3KJzGS6eqcWa9kEPd7y6E",
  "metadata": {
    "name": "splytoVotingDapp",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "close",
      "discriminator": [
        98,
        165,
        201,
        177,
        108,
        65,
        206,
        96
      ],
      "accounts": [
        {
          "name": "payer",
          "writable": true,
          "signer": true
        },
        {
          "name": "splytoVotingDapp",
          "writable": true
        }
      ],
      "args": []
    },
    {
      "name": "increment",
      "discriminator": [
        11,
        18,
        104,
        9,
        104,
        174,
        59,
        33
      ],
      "accounts": [
        {
          "name": "splytoVotingDapp",
          "writable": true
        }
      ],
      "args": []
    },
    {
      "name": "initSplVote",
      "discriminator": [
        48,
        34,
        57,
        42,
        202,
        73,
        198,
        152
      ],
      "accounts": [
        {
          "name": "voter",
          "writable": true,
          "signer": true
        },
        {
          "name": "splVoteAccount",
          "writable": true,
          "signer": true
        },
        {
          "name": "mint"
        },
        {
          "name": "voterAta",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "voter"
              },
              {
                "kind": "const",
                "value": [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169
                ]
              },
              {
                "kind": "account",
                "path": "mint"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "tokenName",
          "type": "string"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "splytoVotingDapp",
      "discriminator": [
        90,
        34,
        58,
        57,
        169,
        31,
        88,
        124
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "noTokenFound",
      "msg": "User must own the token he vote fore"
    }
  ],
  "types": [
    {
      "name": "splytoVotingDapp",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "tokenName",
            "type": "string"
          },
          {
            "name": "count",
            "type": "u8"
          }
        ]
      }
    }
  ]
};
