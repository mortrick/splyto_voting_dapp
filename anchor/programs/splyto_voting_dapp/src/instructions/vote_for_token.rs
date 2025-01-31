
use anchor_lang::prelude::*;
use anchor_spl::{associated_token::AssociatedToken, token::{Mint, Token, TokenAccount}};
use anchor_lang::system_program;
use crate::state::SplytoVotingDapp;


pub fn _vote_for_token(ctx: Context<VoteForToken>,token_name: String) -> Result<()>{

    // let voter = &mut ctx.accounts.voter;
    let voter_ata = &mut ctx.accounts.voter_ata;
    let user_check = &mut ctx.accounts.user_check;
    let token_vote_account = &mut ctx.accounts.token_vote_account;
    // let mint = &mut ctx.accounts.mint;

    

    require!(voter_ata.amount > 0, ErrorCode::NoTokenFound);
    require!(user_check.already_voted == false, ErrorCode::UserAlreadyVote);

    msg!("The generated voting address is {}", token_vote_account.key());
    msg!("The generated voting address is {}", user_check.key());
    user_check.already_voted = true;
    token_vote_account.count +=1;
    Ok(())

    // if user_check.to_account_info().data_is_empty(){
    //     let rent = Rent::get()?;
    //     let lamports = rent.minimum_balance(UserCheck::INIT_SPACE);
    //     let cpi_accounts = system_program::CreateAccount{
    //         from: voter.to_account_info(),
    //         to: user_check.to_account_info()
    //     };
    //     let cpi_context = CpiContext::new(ctx.accounts.system_program.to_account_info(),cpi_accounts);
    
    
    //     system_program::create_account(
    //         cpi_context,
    //         lamports,
    //         UserCheck::INIT_SPACE as u64,
    //         ctx.program_id,
    //     )?;

    //     let user_account_data: UserCheck = UserCheck{already_voted: false,};
    //     user_account_data.serialize(&mut &mut user_check.to_account_info().data.borrow_mut()[..])?;
    //     println!("Account successfully created for user {}", voter.key())

    // }
    // Create Token Vote account
    // if token_vote_account.to_account_info().data_is_empty(){
    //     let token_account_rent = Rent::get()?;
    //     let token_account_lamports = token_account_rent.minimum_balance(SplytoVotingDapp::INIT_SPACE);
        
    //     let cpi_accounts = system_program::CreateAccount{
    //         from: voter.to_account_info(),
    //         to: token_vote_account.to_account_info(),
    //     };

    //     let cpi_context = CpiContext::new(ctx.accounts.system_program.to_account_info(),cpi_accounts);

    //     system_program::create_account(
    //         cpi_context,
    //         token_account_lamports,
    //         SplytoVotingDapp::INIT_SPACE as u64,
    //         ctx.program_id,
    //     )?;
    
    //     let voting_account_data: SplytoVotingDapp = SplytoVotingDapp{token_name: token_name,count: 0};
    //     voting_account_data.serialize(&mut &mut token_vote_account.to_account_info().data.borrow_mut()[..])?;
    //     println!("Account Suucessfully created for token {}", token_vote_account.token_name)
    // }

    // Check if user already voted 
    // Check if there is an account and open if not
    


}




#[derive(Accounts)]
pub struct VoteForToken<'info> {
  #[account(mut)]
  pub voter: Signer<'info>,
#[account(
    init_if_needed,
    space = 8 + UserCheck::INIT_SPACE,
    payer = voter,
    seeds = [voter.key().as_ref(),mint.key().as_ref()],
    bump
)]
pub user_check: Account<'info, UserCheck>,
#[account(
    associated_token::mint = mint,
    associated_token::authority = voter
)]
pub voter_ata: Account<'info, TokenAccount>,
#[account(
    init_if_needed,
    space = 8 + SplytoVotingDapp::INIT_SPACE,
    payer = voter,
    seeds = [mint.key().as_ref()],
    bump
    )]
    pub token_vote_account: Account<'info, SplytoVotingDapp>,
pub mint: Account<'info, Mint>,
pub system_program: Program<'info, System>
}





#[account]
#[derive(InitSpace)]
pub struct UserCheck{
    pub already_voted: bool
}


#[error_code]
pub enum ErrorCode {
    #[msg("User must own the token he vote fore")]
    NoTokenFound,
    #[msg("User already voted")]
    UserAlreadyVote,
}