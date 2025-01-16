#![allow(clippy::result_large_err)]

use anchor_lang::prelude::*;

declare_id!("6K3472KcyJ65ZnK2bYF1Mgo3KJzGS6eqcWa9kEPd7y6E");

#[program]
pub mod splyto_voting_dapp {
    use super::*;

  pub fn close(_ctx: Context<CloseSplytoVotingDapp>) -> Result<()> {
    Ok(())
  }

  pub fn decrement(ctx: Context<Update>) -> Result<()> {
    ctx.accounts.splyto_voting_dapp.count = ctx.accounts.splyto_voting_dapp.count.checked_sub(1).unwrap();
    Ok(())
  }

  pub fn increment(ctx: Context<Update>) -> Result<()> {
    ctx.accounts.splyto_voting_dapp.count = ctx.accounts.splyto_voting_dapp.count.checked_add(1).unwrap();
    Ok(())
  }

  pub fn initialize(_ctx: Context<InitializeSplytoVotingDapp>) -> Result<()> {
    Ok(())
  }

  pub fn set(ctx: Context<Update>, value: u8) -> Result<()> {
    ctx.accounts.splyto_voting_dapp.count = value.clone();
    Ok(())
  }
}

#[derive(Accounts)]
pub struct InitializeSplytoVotingDapp<'info> {
  #[account(mut)]
  pub payer: Signer<'info>,

  #[account(
  init,
  space = 8 + SplytoVotingDapp::INIT_SPACE,
  payer = payer
  )]
  pub splyto_voting_dapp: Account<'info, SplytoVotingDapp>,
  pub system_program: Program<'info, System>,
}
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

#[derive(Accounts)]
pub struct Update<'info> {
  #[account(mut)]
  pub splyto_voting_dapp: Account<'info, SplytoVotingDapp>,
}

#[account]
#[derive(InitSpace)]
pub struct SplytoVotingDapp {
  count: u8,
}
