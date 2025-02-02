// Here we export some useful types and functions for interacting with the Anchor program.
import { AnchorProvider, Program } from '@coral-xyz/anchor'
import { Cluster, PublicKey } from '@solana/web3.js'
import SplytoVotingDappIDL from '../target/idl/splyto_voting_dapp.json'
import type { SplytoVotingDapp } from '../target/types/splyto_voting_dapp'

// Re-export the generated IDL and type
export { SplytoVotingDapp, SplytoVotingDappIDL }

// The programId is imported from the program IDL.
export const SPLYTO_VOTING_DAPP_PROGRAM_ID = new PublicKey(SplytoVotingDappIDL.address)

// This is a helper function to get the SplytoVotingDapp Anchor program.
export function getSplytoVotingDappProgram(provider: AnchorProvider, address?: PublicKey) {
  return new Program({ ...SplytoVotingDappIDL, address: address ? address.toBase58() : SplytoVotingDappIDL.address } as SplytoVotingDapp, provider)
}

// This is a helper function to get the program ID for the SplytoVotingDapp program depending on the cluster.
export function getSplytoVotingDappProgramId(cluster: Cluster) {
  switch (cluster) {
    case 'devnet':
    case 'testnet':
      // This is the program ID for the SplytoVotingDapp program on devnet and testnet.
      return new PublicKey('6K3472KcyJ65ZnK2bYF1Mgo3KJzGS6eqcWa9kEPd7y6E')
    case 'mainnet-beta':
    default:
      return SPLYTO_VOTING_DAPP_PROGRAM_ID
  }
}
