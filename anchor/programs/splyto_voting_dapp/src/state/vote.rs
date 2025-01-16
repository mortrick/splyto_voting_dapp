use anchor_lang::prelude::*;








#[account]
#[derive(InitSpace)]

pub struct SplytoVotingDapp {
#[max_len(15)]
pub token_name: String,
pub count: u8,

}
