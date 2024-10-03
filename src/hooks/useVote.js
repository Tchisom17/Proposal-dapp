// import { useCallback } from "react";
// import { toast } from "react-toastify";
// import useContract from "./useContract";
// import { useAppKitAccount } from "@reown/appkit/react";
// import { useAppKitNetwork } from "@reown/appkit/react";
// import { liskSepoliaNetwork } from "../connection";

// const useVote = () => {
//   const contract = useContract(true);
//   const { address } = useAppKitAccount();
//   const { chainId } = useAppKitNetwork();

//   return useCallback(
//     async (proposalId, voteValue) => {
//       if (!proposalId || !voteValue) {
//         toast.error("Missing field(s)");
//         return;
//       }
//       if (!address) {
//         toast.error("Connect your wallet!");
//         return;
//       }
//       if (Number(chainId) !== liskSepoliaNetwork.chainId) {
//         toast.error("You are not connected to the right network");
//         return;
//       }
//       if (!contract) {
//         toast.error("Cannot get contract!");
//         return;
//       }

//       try {
//         const estimatedGas = await contract.vote.estimateGas(
//           proposalId,
//           voteValue
//         );

//         const tx = await contract.vote(proposalId, voteValue, {
//           gasLimit: (estimatedGas * BigInt(120)) / BigInt(100),
//         });

//         const receipt = await tx.wait();

//         if (receipt.status === 1) {
//           toast.success("Vote successful");
//           return;
//         }
//         toast.error("Vote failed");
//       } catch (error) {
//         console.error("error while voting: ", error);
//         toast.error("Voting errored");
//       }
//     },
//     [address, chainId, contract]
//   );
// };

// export default useVote;

// hooks/useVote.js
// import { useCallback } from "react";
// import { toast } from "react-toastify";
// import useContract from "./useContract";
// import { useAppKitAccount } from "@reown/appkit/react";
// import { useAppKitNetwork } from "@reown/appkit/react";
// import { liskSepoliaNetwork } from "../connection";

// const useVote = () => {
//     const contract = useContract(true);
//     const { address } = useAppKitAccount();
//     const { chainId } = useAppKitNetwork();

//     return useCallback(
//         async (proposalId, voteValue) => {
//             if (!proposalId || voteValue === undefined) {
//                 toast.error("Missing proposal ID or vote value");
//                 return;
//             }

//             if (!address) {
//                 toast.error("Connect your wallet!");
//                 return;
//             }

//             if (Number(chainId) !== liskSepoliaNetwork.chainId) {
//                 toast.error("You are not connected to the right network");
//                 return;
//             }

//             if (!contract) {
//                 toast.error("Cannot get contract!");
//                 return;
//             }

//             try {
//                 const tx = await contract.vote(proposalId, voteValue);
//                 const receipt = await tx.wait();

//                 if (receipt.status === 1) {
//                     toast.success("Vote successful");
//                     return;
//                 }
//                 toast.error("Vote failed");
//             } catch (error) {
//                 console.error("Error while voting: ", error);
//                 toast.error("Error during vote");
//             }
//         },
//         [address, chainId, contract]
//     );
// };

// export default useVote;

import { useCallback } from "react";
import { toast } from "react-toastify";
import useContract from "./useContract";
import { useAppKitAccount } from "@reown/appkit/react";
import { useAppKitNetwork } from "@reown/appkit/react";
import { liskSepoliaNetwork } from "../connection";

const useVoteProposal = () => {
  const contract = useContract(true);
  const { address } = useAppKitAccount();
  const { chainId } = useAppKitNetwork();

  return useCallback(
    async (proposalId) => {
      if (!address) {
        toast.error("Connect your wallet!");
        return;
      }

      if (Number(chainId) !== liskSepoliaNetwork.chainId) {
                 toast.error("You are not connected to the right network");
                 return;
             }

      if (!contract) {
        toast.error("Cannot get contract!");
        return;
      }

      try {
        const tx = await contract.vote(proposalId);
        const receipt = await tx.wait();

        if (receipt.status === 1) {
          toast.success("Vote cast successfully");
          return;
        }
        toast.error("Vote casting failed");
      } catch (error) {
        console.error("Error while voting: ", error);
        toast.error("Vote casting errored");
      }
    },
    [address, chainId, contract]
  );
};

export default useVoteProposal;
