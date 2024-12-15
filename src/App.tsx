import { WeatherCard } from "./components/WeatherCard";

const App = () => {
  return (
    <div className="bg-cover bg-center bg-repeat min-h-screen bg-blue-500 "
    style={{
      backgroundImage: `url('/weather-background-blue3.png')`,
      backgroundSize: "450px 450px",
    }}
    >
      <WeatherCard />
    </div>
  );
};

export default App;
  

