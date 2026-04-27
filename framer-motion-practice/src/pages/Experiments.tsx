import HollowVoid from "../components/experiments/hollow-void";
import HollowVoidSvg from "../components/experiments/hollow-void-svg";
import HollowVoidSvgMovingBg from "../components/experiments/hollow-void-svg-moving-bg";
import HollowVoidSvgStaticBg from "../components/experiments/hollow-void-svg-static-bg";

export default function Experiments() {
  return (
    <div className="page-layout">
      <h2>Experiments</h2>
      <p>Pulsating text</p>
      <HollowVoid />
      <p>Pulsating svg</p>
      <HollowVoidSvg />
      <p className="pt-4">Pulsating svg + static bg</p>
      <HollowVoidSvgStaticBg />
      <p className="pt-4">Pulsating svg + moving bg</p>
      <HollowVoidSvgMovingBg />
    </div>
  );
}
