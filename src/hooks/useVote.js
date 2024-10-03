import { useCallback } from "react";
import { toast } from "react-toastify";
import useContract from "./useContract";
import { useAppKitAccount } from "@reown/appkit/react";
import { useAppKitNetwork } from "@reown/appkit/react";
import { liskSepoliaNetwork } from "../connection";

const useVote = () => {
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

export default useVote;
