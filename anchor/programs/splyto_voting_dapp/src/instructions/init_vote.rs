
use anchor_lang::prelude::*;
use anchor_spl::{associated_token::AssociatedToken, token::{Mint, Token, TokenAccount}};
use crate::state::SplytoVotingDapp;




pub fn _init_spl_vote(ctx: Context<InitializeSplVote>,token_name: String) ->Result<()>{

    let voter = &mut ctx.accounts.voter;
    let voter_ata = &mut ctx.accounts.voter_ata;
    let mint = &mut ctx.accounts.mint;
    let spl_vote_account = &mut ctx.accounts.spl_vote_account;

    let voter_token_amount = voter_ata.amount;
    require!(voter_token_amount > 0,ErrorCode::NoTokenFound);

    spl_vote_account.token_name = token_name;
    spl_vote_account.count +=1;

    Ok(())
}



#[derive(Accounts)]
pub struct InitializeSplVote<'info> {
  #[account(mut)]
  pub voter: Signer<'info>,
  #[account(
  init,
  space = 8 + SplytoVotingDapp::INIT_SPACE,
  payer = voter
  )]
  pub spl_vote_account: Account<'info, SplytoVotingDapp>,
  pub mint: Account<'info, Mint>,
  #[account(mut,
    associated_token::mint = mint,
    associated_token::authority = voter
)]
pub voter_ata: Account<'info, TokenAccount>,
  
  pub system_program: Program<'info, System>,
}


#[error_code]
pub enum ErrorCode {
    #[msg("User must own the token he vote fore")]
    NoTokenFound
}