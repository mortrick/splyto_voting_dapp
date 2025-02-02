import { useWallet } from "@solana/wallet-adapter-react";
import { WalletButton } from "../solana/solana-provider";
import { AppHero } from "../ui/ui-layout";
import { useSplytoVotingDappProgram } from "./splyto_voting_dapp-data-access";
import { MemoizedVote, SplytoVotingDappList } from "./splyto_voting_dapp-ui";
import { useState } from "react";
import { PublicKey } from "@solana/web3.js";

export default function SplytoVotingDappFeature() {
  const { publicKey } = useWallet();
  const { VoteForToken } = useSplytoVotingDappProgram();

  // State for token name and mint
  const [tokenName, setTokenName] = useState("");
  const [tokenMint, setTokenMint] = useState<PublicKey | null>(null);

  // Function to handle updating tokenMint from input
  const handleMintChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const mintPubkey = new PublicKey(e.target.value); // Convert input string to PublicKey
      setTokenMint(mintPubkey);
    } catch (error) {
      console.error("Invalid PublicKey:", error);
      setTokenMint(null); // Reset state if input is invalid
    }
  };

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
            onChange={handleMintChange} // Using the new handler
          />
        </div>

        {/* Vote Button (only renders if tokenMint is valid) */}
        {tokenMint && (
          <MemoizedVote token_name={tokenName} token_mint={tokenMint} />
        )}
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
  );
}
