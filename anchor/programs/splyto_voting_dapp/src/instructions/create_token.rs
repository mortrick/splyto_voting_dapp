use anchor_lang::{prelude::*, solana_program::address_lookup_table::instruction};
use anchor_lang::solana_program::pubkey::Pubkey;
use anchor_spl::token::{self, Token};




    pub fn _create_mint(ctx: Context<CreateTokenMint>, mint_address: Pubkey, decimals: u8) -> Result<()> {
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
      token::initialize_mint(cpi_context, decimals, &ctx.accounts.mint_authority.key(), None)?;


        //  Mint tokens to the associated token account of the moderator
    // let cpi_accounts = MintTo {
    //     mint: ctx.accounts.mint.to_account_info(),
    //     to: moderator_ata.to_account_info(),
    //     authority: moderator.to_account_info(),
    // };
    // let cpi_context = CpiContext::new(ctx.accounts.token_program.to_account_info(), cpi_accounts);

    // // Call the SPL Token program's mint_to function
    // token::mint_to(cpi_context, amount)?;

    // msg!(
    //     "Successfully minted {} tokens to the moderator's ATA: {}",
    //     amount,
    //     moderator_ata.key()
    // );
      

      Ok(())
  }








#[derive(Accounts)]
#[instruction(mint_address: Pubkey)]
pub struct CreateTokenMint<'info> {
    /// The mint account to initialize
    #[account(
        init,
        payer = payer,
        space = 82, // Space required for a mint account
        // space = 500,
        seeds = [mint_address.as_ref()],
        bump,
        owner = anchor_spl::token::ID)]
    pub mint: AccountInfo<'info>,

    /// The authority allowed to mint new tokens
    pub mint_authority: Signer<'info>,

    /// The payer of the transaction
    #[account(mut)]
    pub payer: Signer<'info>,

    /// System program to create the account
    pub system_program: Program<'info, System>,

    /// Rent sysvar required for initialization
    pub rent: Sysvar<'info, Rent>,

    /// SPL Token program to handle token logic
    pub token_program: Program<'info, Token>,
}
