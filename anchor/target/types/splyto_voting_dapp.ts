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
      "name": "createMint",
      "discriminator": [
        69,
        44,
        215,
        132,
        253,
        214,
        41,
        45
      ],
      "accounts": [
        {
          "name": "mint",
          "docs": [
            "The mint account to initialize"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  105,
                  110,
                  116
                ]
              }
            ]
          }
        },
        {
          "name": "mintAuthority",
          "docs": [
            "The authority allowed to mint new tokens"
          ],
          "signer": true
        },
        {
          "name": "payer",
          "docs": [
            "The payer of the transaction"
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "docs": [
            "System program to create the account"
          ],
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "rent",
          "docs": [
            "Rent sysvar required for initialization"
          ],
          "address": "SysvarRent111111111111111111111111111111111"
        },
        {
          "name": "tokenProgram",
          "docs": [
            "SPL Token program to handle token logic"
          ],
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        }
      ],
      "args": [
        {
          "name": "decimals",
          "type": "u8"
        }
      ]
    },
    {
      "name": "voteForToken",
      "discriminator": [
        195,
        16,
        25,
        71,
        94,
        187,
        242,
        5
      ],
      "accounts": [
        {
          "name": "voter",
          "writable": true,
          "signer": true
        },
        {
          "name": "userCheck",
          "writable": true
        },
        {
          "name": "voterAta",
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
          "name": "tokenVoteAccount",
          "writable": true
        },
        {
          "name": "mint"
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
    },
    {
      "name": "userCheck",
      "discriminator": [
        24,
        124,
        204,
        149,
        24,
        255,
        147,
        246
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "noTokenFound",
      "msg": "User must own the token he vote fore"
    },
    {
      "code": 6001,
      "name": "userAlreadyVote",
      "msg": "User already voted"
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
    },
    {
      "name": "userCheck",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "alreadyVoted",
            "type": "bool"
          }
        ]
      }
    }
  ]
};
