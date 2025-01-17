import * as anchor from '@coral-xyz/anchor'
import {Program} from '@coral-xyz/anchor'
import {Keypair, PublicKey} from '@solana/web3.js'
import {SplytoVotingDapp} from '../target/types/splyto_voting_dapp'

import { PL1, PL2,PL3, PL4,PL5, PL6,PL7,PL8,PL9,P11,P12, FEE, MOD} from './program'

const mint = new PublicKey('9kXBvCNrXoVRU1M1z1AfxVoAeLCdCHicTwjYymVTDH6v');

let is_new_token  = 0






describe('splyto_voting_dapp', () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env()
  anchor.setProvider(provider)
  const payer = provider.wallet as anchor.Wallet

  const program = anchor.workspace.SplytoVotingDapp as Program<SplytoVotingDapp>

  const splyto_voting_dappKeypair = Keypair.generate()

  it('Initialize SplytoVotingDapp', async () => {
    await program.methods
      .initSplVote('Token X')
      .accounts({
        splVoteAccount: splyto_voting_dappKeypair.publicKey,
        voter: payer.publicKey,
        mint: mint
      })
      .signers([splyto_voting_dappKeypair])
      .rpc()

    const currentCount = await program.account.splytoVotingDapp.fetch(splyto_voting_dappKeypair.publicKey)

    expect(currentCount.count).toEqual(0)
  })

  it('Increment SplytoVotingDapp', async () => {
    await program.methods.increment().accounts({ splytoVotingDapp: splyto_voting_dappKeypair.publicKey }).rpc()

    const currentCount = await program.account.splytoVotingDapp.fetch(splyto_voting_dappKeypair.publicKey)

    expect(currentCount.count).toEqual(1)
  })


  it('Set close the splyto_voting_dapp account', async () => {
    await program.methods
      .close()
      .accounts({
        payer: payer.publicKey,
        splytoVotingDapp: splyto_voting_dappKeypair.publicKey,
      })
      .rpc()

    // The account should no longer exist, returning null.
    const userAccount = await program.account.splytoVotingDapp.fetchNullable(splyto_voting_dappKeypair.publicKey)
    expect(userAccount).toBeNull()
  })
})
