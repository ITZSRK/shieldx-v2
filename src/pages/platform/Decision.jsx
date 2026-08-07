import CapabilityPage from "../../components/CapabilityPage";
import ProfileBuilder from "../../components/decision/ProfileBuilder";

export default function Decision() {
  return (
    <CapabilityPage
      id="decision"
      name="Decision"
      tag="THE BRAIN"
      color="#60a5fa"
      line="Ingests the signal. Scores it. Orchestrates the response — live."
      body="Every account is scored on contactability and collectability, tagged into a cohort, and matched to a treatment. Then Decision orchestrates the response in real time — channel-agnostic, vendor-agnostic — across whatever pipes are available."
      visualLabel="WATCH A PROFILE ASSEMBLE"
      visual={<ProfileBuilder />}
    />
  );
}
