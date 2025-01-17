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

  pub fn mint_account_and_tokens(ctx:Context<MintAccountAndTokens>, decimals: u8, amount: u64) ->Result<()>{
    let res = _mint_account_and_tokens(ctx, decimals, amount);
    res
  }


  pub fn close(_ctx: Context<CloseSplytoVotingDapp>) -> Result<()> {
    Ok(())
  }

  
  pub fn vote_for_token(ctx: Context<VoteForToken>, token_name: String) -> Result<()> {
    // ctx.accounts.splyto_voting_dapp.count = ctx.accounts.splyto_voting_dapp.count.checked_add(1).unwrap();
    let res = _vote_for_token(ctx, token_name);
    res
  }




  }


  

  