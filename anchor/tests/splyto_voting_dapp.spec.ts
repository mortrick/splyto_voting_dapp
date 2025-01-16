import * as anchor from '@coral-xyz/anchor'
import {Program} from '@coral-xyz/anchor'
import {Keypair} from '@solana/web3.js'
import {SplytoVotingDapp} from '../target/types/splyto_voting_dapp'

describe('splyto_voting_dapp', () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env()
  anchor.setProvider(provider)
  const payer = provider.wallet as anchor.Wallet

  const program = anchor.workspace.SplytoVotingDapp as Program<SplytoVotingDapp>

  const splyto_voting_dappKeypair = Keypair.generate()

  it('Initialize SplytoVotingDapp', async () => {
    await program.methods
      .initialize()
      .accounts({
        splyto_voting_dapp: splyto_voting_dappKeypair.publicKey,
        payer: payer.publicKey,
      })
      .signers([splyto_voting_dappKeypair])
      .rpc()

    const currentCount = await program.account.splyto_voting_dapp.fetch(splyto_voting_dappKeypair.publicKey)

    expect(currentCount.count).toEqual(0)
  })

  it('Increment SplytoVotingDapp', async () => {
    await program.methods.increment().accounts({ splyto_voting_dapp: splyto_voting_dappKeypair.publicKey }).rpc()

    const currentCount = await program.account.splyto_voting_dapp.fetch(splyto_voting_dappKeypair.publicKey)

    expect(currentCount.count).toEqual(1)
  })

  it('Increment SplytoVotingDapp Again', async () => {
    await program.methods.increment().accounts({ splyto_voting_dapp: splyto_voting_dappKeypair.publicKey }).rpc()

    const currentCount = await program.account.splyto_voting_dapp.fetch(splyto_voting_dappKeypair.publicKey)

    expect(currentCount.count).toEqual(2)
  })

  it('Decrement SplytoVotingDapp', async () => {
    await program.methods.decrement().accounts({ splyto_voting_dapp: splyto_voting_dappKeypair.publicKey }).rpc()

    const currentCount = await program.account.splyto_voting_dapp.fetch(splyto_voting_dappKeypair.publicKey)

    expect(currentCount.count).toEqual(1)
  })

  it('Set splyto_voting_dapp value', async () => {
    await program.methods.set(42).accounts({ splyto_voting_dapp: splyto_voting_dappKeypair.publicKey }).rpc()

    const currentCount = await program.account.splyto_voting_dapp.fetch(splyto_voting_dappKeypair.publicKey)

    expect(currentCount.count).toEqual(42)
  })

  it('Set close the splyto_voting_dapp account', async () => {
    await program.methods
      .close()
      .accounts({
        payer: payer.publicKey,
        splyto_voting_dapp: splyto_voting_dappKeypair.publicKey,
      })
      .rpc()

    // The account should no longer exist, returning null.
    const userAccount = await program.account.splyto_voting_dapp.fetchNullable(splyto_voting_dappKeypair.publicKey)
    expect(userAccount).toBeNull()
  })
})
