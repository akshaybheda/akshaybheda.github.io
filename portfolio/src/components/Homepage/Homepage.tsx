import MyTimeLine from "../Timeline/MyTimeLine";
import MyInfo from "../MyInfo/MyInfo";
import Techstack from "../Techstack/Techstack";

function Homepage() {
  return (
    <>
  <div id="home">
        <MyInfo />
      </div>
  <div id="timeline">
        <MyTimeLine />
      </div>
  <div id="tech-stack">
        <Techstack />
      </div>
    </>
  );
}

export default Homepage;
