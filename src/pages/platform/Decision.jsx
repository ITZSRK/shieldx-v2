import CapabilityPage from "../../components/CapabilityPage";
import ProfileBuilder from "../../components/decision/ProfileBuilder";

export default function Decision() {
  return (
    <CapabilityPage
      id="decision"
      name="Decision"
      tag="THE BRAIN"
      color="#60a5fa"
      line="Builds the footprint. Scores it. Orchestrates the response — live."
      body="Every account gets a footprint before it gets a treatment, scored on contactability and collectability, and tagged into a cohort. Then Decision orchestrates the response in real time — channel-agnostic, vendor-agnostic — across whatever pipes are available."
      visualLabel="WATCH A PROFILE ASSEMBLE"
      visual={<ProfileBuilder />}
    />
  );
}
