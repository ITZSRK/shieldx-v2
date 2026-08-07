import CapabilityPage from "../../components/CapabilityPage";
import ChannelSwitchboard from "../../components/engage/ChannelSwitchboard";

export default function Engage() {
  return (
    <CapabilityPage
      id="engage"
      name="Engage"
      tag="REFERENCE EXECUTION CHANNEL"
      color="#fbbf24"
      line="If you have pipes, we route through them. If you don't, we bring ours."
      body="SMS, WhatsApp, email, agency work-lists, and Diya — ShieldX's own multi-language voice AI — one channel among several, never the default. We never force a channel you already own."
      visualLabel="PICK A CHANNEL"
      visual={<ChannelSwitchboard />}
    />
  );
}
