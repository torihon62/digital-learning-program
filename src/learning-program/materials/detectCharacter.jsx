import { LearningTemplate } from "../../components/LearningTemplate";
import { sketch } from "../../sketches/detectCharacter";

export default function Page() {
  return <LearningTemplate sketch={sketch} title="もじを　かいて　ください" />;
}
