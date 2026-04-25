import HollowVoid from "../components/experiments/hollow-void";
import HollowVoidSvg from "../components/experiments/hollow-void-svg";

export default function Experiments() {
  return (
    <div className="page-layout">
      <h2>Experiments</h2>
      <p>Pulsating void</p>
      <HollowVoid />
      <p>Pulsating void as an svg</p>
      <HollowVoidSvg />
    </div>
  );
}
