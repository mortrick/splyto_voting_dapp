import { useWallet } from '@solana/wallet-adapter-react'
import { WalletButton } from '../solana/solana-provider'
import { AppHero } from '../ui/ui-layout'
import { useSplytoVotingDappProgram } from './splyto_voting_dapp-data-access'
import { SplytoVotingDappList } from './splyto_voting_dapp-ui'
import { useState } from 'react'
import { PublicKey } from '@solana/web3.js'

export default function SplytoVotingDappFeature() {
  const { publicKey } = useWallet()
  const { vote_for_token } = useSplytoVotingDappProgram()

  // State for inputs
  const [tokenName, setTokenName] = useState("")
  const [tokenMint, setTokenMint] = useState<string>("")

  const handleVote = async () => {
    if (!tokenName.trim()) {
      alert("Please enter a valid token name")
      return
    }

    let mintPubkey: PublicKey
    try {
      mintPubkey = new PublicKey(tokenMint)
    } catch (error) {
      alert("Invalid token mint address")
      return
    }

    try {
      await vote_for_token.mutateAsync({
        token_name: tokenName,
        token_mint: mintPubkey
      })
      setTokenName("")
      setTokenMint("")
    } catch (error) {
      console.error("Voting failed:", error)
    }
  }

  return publicKey ? (
    <div>
      <AppHero title="Splyto Voting Dapp" subtitle="Add your SPL Token for voting">
        <div className="space-y-4">
          {/* Token Name Input */}
          <input
            type="text"
            placeholder="Enter Token Name"
            className="input input-bordered w-full max-w-xs"
            value={tokenName}
            onChange={(e) => setTokenName(e.target.value)}
          />

          {/* Token Mint Input */}
          <input
            type="text"
            placeholder="Enter Token Mint Address"
            className="input input-bordered w-full max-w-xs"
            value={tokenMint}
            onChange={(e) => setTokenMint(e.target.value)}
          />

          {/* Vote Button */}
          <button className="btn btn-primary" onClick={handleVote} disabled={vote_for_token.isPending}>
            {vote_for_token.isPending ? "Voting..." : "Vote"}
          </button>
        </div>
      </AppHero>

      {/* Display List of Voted Tokens */}
      <SplytoVotingDappList />
    </div>
  ) : (
    <div className="max-w-4xl mx-auto">
      <div className="hero py-[64px]">
        <div className="hero-content text-center">
          <WalletButton />
        </div>
      </div>
    </div>
  )
}
