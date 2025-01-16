
use anchor_lang::prelude::*;


use crate::state::SplytoVotingDapp;







#[derive(Accounts)]
pub struct CloseSplytoVotingDapp<'info> {
  #[account(mut)]
  pub payer: Signer<'info>,

  #[account(
  mut,
  close = payer, // close account and return lamports to payer
  )]
  pub splyto_voting_dapp: Account<'info, SplytoVotingDapp>,
}
