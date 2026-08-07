import CapabilityPage from "../../components/CapabilityPage";
import TranscriptAnnotator from "../../components/intelligence/TranscriptAnnotator";

export default function Intelligence() {
  return (
    <CapabilityPage
      id="intelligence"
      name="Intelligence"
      tag="THE SENSORY SYSTEM"
      color="#a78bfa"
      line="Post-call, not in-call — Assist covers the call itself."
      body="Batch analysis of recorded calls — compliance conduct flags, agent scorecards, and decision features (objection type, hardship, promise strength) that flow back into the next decision. Also the governance face: versioned models with a published hash, tracked performance and drift, and retraining history."
      visualLabel="WATCH A CALL GET ANALYSED"
      visual={<TranscriptAnnotator />}
      video="q_gNUAERgOI"
      videoLabel="VOICE INTELLIGENCE"
      videoTitle="ShieldX Intelligence — Voice Analytics"
      crossLink={{ to: "/governance", title: "Intelligence powers governance", desc: "Compliance conduct flags and model evidence — versions, hashes, drift, retraining history — feed the model governance view" }}
    />
  );
}
