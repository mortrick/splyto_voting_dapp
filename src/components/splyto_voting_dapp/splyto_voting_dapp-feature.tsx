import { useWallet } from '@solana/wallet-adapter-react'
import { ExplorerLink } from '../cluster/cluster-ui'
import { WalletButton } from '../solana/solana-provider'
import { AppHero, ellipsify } from '../ui/ui-layout'
import { useSplytoVotingDappProgram } from './splyto_voting_dapp-data-access'
import { SplytoVotingDapp, SplytoVotingDappCard } from './splyto_voting_dapp-ui'
import { useState } from 'react'
import { PublicKey } from '@solana/web3.js'

export default function SplytoVotingDappFeature() {
  const { publicKey } = useWallet()
  const { programId } = useSplytoVotingDappProgram()
  const [splTokenToVote, setSplTokenToVote] = useState<PublicKey | undefined>();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    try {
      setSplTokenToVote(value ? new PublicKey(value) : undefined);
    } catch (error) {
      console.error("Invalid public key input:", error);
      setSplTokenToVote(undefined);
    }
  };

  return publicKey ? (
    <div>
      <AppHero
        title="Splyto Voting Dapp"
        subtitle="Cast your vote for a token by entering its SPL token address. All votes are recorded on-chain."
      >
        <label className="block mb-2">
          Token Address:
          <input
            type="text"
            onChange={handleInputChange}
            placeholder="Enter SPL Token Address"
            className="block w-full p-2 border rounded"
          />
        </label>
        <p className="mb-6">
          <ExplorerLink path={`account/${programId}`} label={ellipsify(programId.toString())} />
        </p>
        <SplytoVotingDapp mint={splTokenToVote} />
      </AppHero>
      {/* <SplytoVotingDappCard /> */}
    </div>
  ) : (
    <div className="max-w-4xl mx-auto">
      <div className="hero py-[64px]">
        <div className="hero-content text-center">
          <WalletButton />
        </div>
      </div>
    </div>
  );
}
