import { Keypair, PublicKey,Cluster, VOTE_PROGRAM_ID } from '@solana/web3.js'
import { useMemo, useState } from 'react'
import { ExplorerLink } from '../cluster/cluster-ui'
import { ellipsify } from '../ui/ui-layout'
import { useSplytoVotingDappProgram, useSplytoVotingDappProgramAccount } from './splyto_voting_dapp-data-access'
import { useConnection , useWallet} from '@solana/wallet-adapter-react';
import React from 'react';
import {Pole} from "./utils"
import { useCluster } from '../cluster/cluster-data-access'
import {getSplytoVotingDappProgramId} from "../../../anchor/src/splyto_voting_dapp-exports"


export const MemoizedVote = React.memo(function VoteButton({
  token_name, 
  token_mint
}: {
  token_name: string;
  token_mint: PublicKey;
}) {
  const user_wallet = useWallet();
  const { VoteForToken, getPoleAccount } = useSplytoVotingDappProgram();
  const { cluster } = useCluster();

  const [pole, setPole] = useState<Pole | null>(null);
  const [isVoting, setIsVoting] = useState(false);
  const programId = useMemo(
    () => getSplytoVotingDappProgramId(cluster.network as Cluster),
    [cluster.network]
  );

  const fetchPoleData = async (accountPublicKey: PublicKey) => {
    try {
      const pole_data = await getPoleAccount.mutateAsync(accountPublicKey);
      setPole({
        counter: pole_data.count,
        token_name: pole_data.tokenName
      });
    } catch (error) {
      console.error("Error fetching table data or token not exists:", error);
    }
  };

  const handleVote = async () => {
    if (isVoting) return;

    try {
      if (!user_wallet.connected || !user_wallet.publicKey) {
        alert("Please connect your wallet first");
        return;
      }

      setIsVoting(true);
const cmint = new PublicKey("4pqgB8YY8u8LnFA9AcsWUKFNbeo2SmZK89A62gWNZCFN")
      const sig = await VoteForToken.mutateAsync({
        token_name: "ddd",
        token_mint: cmint
      });
      console.log("Signature: ", sig);

      // const [token_vote_acc_add, bump] = PublicKey.findProgramAddressSync(
      //   [token_mint.toBuffer()],
      //   programId
      // );

      // await fetchPoleData(token_vote_acc_add);
    } catch (error) {
      console.error("Error Voting:", error);
    } finally {
      setIsVoting(false);
    }
  };

  return (
    <div className="flex justify-center mt-4">
      <button
        onClick={handleVote}
        disabled={isVoting}
        className={`px-6 py-2 font-semibold rounded-lg transition duration-200 ease-in-out 
          ${isVoting ? "bg-gray-400 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-700 text-white"}`}
      >
        {isVoting ? "Voting..." : `Vote for ${token_name}`}
      </button>
    </div>
  );
});



export function SplytoVotingDappList() {
  const { accounts, getProgramAccount } = useSplytoVotingDappProgram()

  if (getProgramAccount.isLoading) {
    return <span className="loading loading-spinner loading-lg"></span>
  }
  if (!getProgramAccount.data?.value) {
    return (
      <div className="alert alert-info flex justify-center">
        <span>Program account not found. Make sure you have deployed the program and are on the correct cluster.</span>
      </div>
    )
  }
  return (
    <div className={'space-y-6'}>
      {accounts.isLoading ? (
        <span className="loading loading-spinner loading-lg"></span>
      ) : accounts.data?.length ? (
        <div className="grid md:grid-cols-2 gap-4">
          {accounts.data?.map((account) => (
            <SplytoVotingDappCard key={account.publicKey.toString()} account={account.publicKey} />
          ))}
        </div>
      ) : (
        <div className="text-center">
          <h2 className={'text-2xl'}>No accounts</h2>
          No accounts found. Create one above to get started.
        </div>
      )}
    </div>
  )
}

function SplytoVotingDappCard({ account }: { account: PublicKey }) {
  const { accountQuery, } = useSplytoVotingDappProgramAccount({
    account,
  })

  const count = useMemo(() => accountQuery.data?.count ?? 0, [accountQuery.data?.count])
  const name = useMemo(() => accountQuery.data?.tokenName ?? '', [accountQuery.data?.tokenName])

  return accountQuery.isLoading ? (
    <span className="loading loading-spinner loading-lg"></span>
  ) : (
    <div className="card card-bordered border-base-300 border-4 text-neutral-content">
      <div className="card-body items-center text-center">
        <div className="space-y-6">
          <h2 className="card-title justify-center text-3xl cursor-pointer" onClick={() => accountQuery.refetch()}>
            {count}
          </h2>
          <h2 className="card-title justify-center text-3xl cursor-pointer" onClick={() => accountQuery.refetch()}>
            {name}
          </h2>
          <div className="card-actions justify-around">
            {/* <button
              className="btn btn-xs lg:btn-md btn-outline"
              onClick={() => incrementMutation.mutateAsync()}
              disabled={incrementMutation.isPending}
            >
              Increment
            </button> */}
            <button
              className="btn btn-xs lg:btn-md btn-outline"
              onClick={() => {
                const value = window.prompt('Set value to:', count.toString() ?? '0')
                if (!value || parseInt(value) === count || isNaN(parseInt(value))) {
                  return
                }
                // return setMutation.mutateAsync(parseInt(value))
              }}
              // disabled={setMutation.isPending}
            >
              Vote
            </button>
            
          </div>
          <div className="text-center space-y-4">
            <p>
              <ExplorerLink path={`account/${account}`} label={ellipsify(account.toString())} />
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}



