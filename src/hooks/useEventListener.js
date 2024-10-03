import { useEffect } from "react";
import useContract from "./useContract";
import { toast } from "react-toastify";

const useEventListeners = () => {
  const contract = useContract(true);

  useEffect(() => {
    if (!contract) return;

    // Listen for "ProposalCreated" event
    const onProposalCreated = (creator, proposalId) => {
      toast.info(`New proposal created by ${creator} with ID: ${proposalId}`);
    };

    // Listen for "Voted" event
    const onVoted = (voter, proposalId, vote) => {
      toast.info(`${voter} voted ${vote} on proposal ${proposalId}`);
    };

    contract.on("ProposalCreated", onProposalCreated);
    contract.on("Voted", onVoted);

    // Cleanup event listeners on component unmount
    return () => {
      contract.off("ProposalCreated", onProposalCreated);
      contract.off("Voted", onVoted);
    };
  }, [contract]);
};

export default useEventListeners;
