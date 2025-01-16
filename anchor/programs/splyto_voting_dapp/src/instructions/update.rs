
use anchor_lang::prelude::*;


use crate::state::SplytoVotingDapp;






#[derive(Accounts)]
pub struct Update<'info> {
  #[account(mut)]
  pub splyto_voting_dapp: Account<'info, SplytoVotingDapp>,
}
