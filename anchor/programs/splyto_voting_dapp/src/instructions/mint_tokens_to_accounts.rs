

use anchor_lang::prelude::*;
use anchor_spl::token::{self, Token, TokenAccount, Mint,MintTo};




pub fn _mint_to_account(ctx: Context<MintToAccount>, amount: u64) -> Result<()> {
    let cpi_accounts = MintTo {
        mint: ctx.accounts.mint.to_account_info(),
        to: ctx.accounts.token_account.to_account_info(),
        authority: ctx.accounts.mint_authority.to_account_info(),
    };
    let cpi_program = ctx.accounts.token_program.to_account_info();
    let cpi_context = CpiContext::new(cpi_program, cpi_accounts);

    // Call the SPL Token program's mint_to function
    token::mint_to(cpi_context, amount)?;
    Ok(())
}



#[derive(Accounts)]
pub struct MintToAccount<'info> {
    /// The mint account to mint tokens from
    #[account(mut)]
    pub mint: AccountInfo<'info>,

    /// The token account to receive the minted tokens
    
    #[account(
        
        associated_token::mint = mint, // Mint of the token
        associated_token::authority = mint_authority, // PDA is the authority/owner
    )]
    pub token_account: Account<'info, TokenAccount>,
    /// The mint authority (must sign the transaction)

    pub mint_authority: Signer<'info>,

    /// The SPL Token program
    pub token_program: Program<'info, Token>,
}