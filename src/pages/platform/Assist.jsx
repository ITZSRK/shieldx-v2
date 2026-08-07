import CapabilityPage from "../../components/CapabilityPage";
import AssistToggle from "../../components/assist/AssistToggle";

export default function Assist() {
  return (
    <CapabilityPage
      id="assist"
      name="Assist"
      tag="THE HUMAN CHANNEL'S ADAPTER"
      color="#4ade80"
      line="Briefs the agent before the call. Guides them live during it."
      body="Assist Context is how a governed decision reaches a human — a pre-call briefing built from the treatment instruction. Assist Live extends decisioning into the conversation itself, in real time. If audio fails, Assist degrades to Context — never to blank."
      visualLabel="TRY THE TOGGLE"
      visual={<AssistToggle />}
      crossLink={{ to: "/deploy", title: "See where Assist fits", desc: "Pattern B keeps voice a governed pool — Assist supports every agent in it, not just ShieldX's own" }}
    />
  );
}
