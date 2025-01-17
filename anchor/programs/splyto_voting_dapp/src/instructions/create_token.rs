use anchor_lang::prelude::*;
use anchor_lang::solana_program::pubkey::Pubkey;
use anchor_spl::token::{self, Token, MintTo};
use anchor_spl::{associated_token::AssociatedToken, token::{Mint, TokenAccount}};



    pub fn _mint_account_and_tokens(ctx: Context<MintAccountAndTokens>, decimals: u8,amount: u64) -> Result<()> {

        let moderator = &mut ctx.accounts.mint_authority;
        let moderator_ata = &mut ctx.accounts.moderator_ata;

      //Initialize the accounts require for the mint 
      let cpi_accounts = token::InitializeMint {
          mint: ctx.accounts.mint.to_account_info(),
          rent: ctx.accounts.rent.to_account_info(),
      };
      // init the token program as ctx
      let cpi_program = ctx.accounts.token_program.to_account_info();
      // Prepare it context for the initial mint funciton.
      let cpi_context = CpiContext::new(cpi_program, cpi_accounts);

      msg!("The created Mint Adress is {}", ctx.accounts.mint.key());
      // Use the Anchor SPL helper function to initialize the mint
      token::initialize_mint(cpi_context, decimals, &moderator.key(), None)?;

      // Mint tokens to account
      
    //   let cpi_accounts = MintTo {
    //     mint: ctx.accounts.mint.to_account_info(),
    //     to: moderator_ata.to_account_info(),
    //     authority: ctx.accounts.mint_authority.to_account_info(),
    // };
    // let cpi_program = ctx.accounts.token_program.to_account_info();
    // let cpi_context = CpiContext::new(cpi_program, cpi_accounts);

    // // Call the SPL Token program's mint_to function
    // token::mint_to(cpi_context, amount)?;

    println!("Successfully drop to moderator {}", amount);

      Ok(())
  }






#[derive(Accounts)]
pub struct MintAccountAndTokens<'info> {
    /// The mint account to initialize
    #[account(
        init,
        payer = mint_authority,
        space = 82, // Space required for a mint account
        // space = 500,
        seeds = [new_mint_adderss.key().as_ref()],
        bump,
        owner = anchor_spl::token::ID)]
    pub mint: AccountInfo<'info>,

    /// The authority allowed to mint new tokens
    #[account(mut)]
    pub mint_authority: Signer<'info>,
    // Moderator ATA
    #[account(
        init_if_needed,
        payer = mint_authority,
        associated_token::mint = mint,
        associated_token::authority = mint_authority
    )]
    pub moderator_ata: Account<'info, TokenAccount>,

    pub new_mint_adderss: AccountInfo<'info>,
 
    /// System program to create the account
    pub system_program: Program<'info, System>,

    /// Rent sysvar required for initialization
    pub rent: Sysvar<'info, Rent>,

    /// SPL Token program to handle token logic
    pub token_program: Program<'info, Token>,
    pub associated_token_program: Program<'info, AssociatedToken>,
}
