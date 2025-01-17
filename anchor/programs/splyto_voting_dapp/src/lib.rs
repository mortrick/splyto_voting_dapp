#![allow(clippy::result_large_err)]

use anchor_lang::prelude::*;
pub mod instructions;
pub use instructions::*;

pub mod state;
pub use state::*;

use state::vote::SplytoVotingDapp;



declare_id!("6K3472KcyJ65ZnK2bYF1Mgo3KJzGS6eqcWa9kEPd7y6E");

#[program]
pub mod splyto_voting_dapp {
    use super::*;

  pub fn close(_ctx: Context<CloseSplytoVotingDapp>) -> Result<()> {
    Ok(())
  }

  
  pub fn increment(ctx: Context<Update>) -> Result<()> {
    ctx.accounts.splyto_voting_dapp.count = ctx.accounts.splyto_voting_dapp.count.checked_add(1).unwrap();
    Ok(())
  }

  pub fn init_spl_vote(ctx: Context<InitializeSplVote>,token_name: String) -> Result<()> {
    _init_spl_vote(ctx,token_name)
    
  }

  
}


