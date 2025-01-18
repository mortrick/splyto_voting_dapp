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

  pub fn create_mint(ctx:Context<CreateTokenMint>, mint_address: Pubkey, decimals: u8) ->Result<()>{
    let res = _create_mint(ctx,mint_address, decimals);
    res
  }


  pub fn mint_to_account(ctx: Context<MintToAccount>, amount: u64) -> Result<()> {
    let res = _mint_to_account(ctx, amount);
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


  

  