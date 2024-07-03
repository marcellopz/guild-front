import HomeContent from "./HomeContent";
import HomeHeader from "./HomeHeader";

function HomeApp() {
  return (
    <div className="flex flex-col gap-4">
      <HomeHeader />
      <HomeContent />
    </div>
  );
}

export default HomeApp;
