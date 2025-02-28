import MyTimeLine from "../Timeline/MyTimeLine";
import MyInfo from "../MyInfo/MyInfo";
import Techstack from "../Techstack/Techstack";

function Homepage() {
  return (
    <>
      <div id="Home">
        <MyInfo />
      </div>
      <div id="Timeline">
        <MyTimeLine />
      </div>
      <div id="Tech Stack">
        <Techstack />
      </div>
    </>
  );
}

export default Homepage;
