import { useState, useEffect } from "react";
import "./index.css";
import "@arcgis/map-components/dist/components/arcgis-map";
import "@arcgis/map-components/components/arcgis-map";
import "@arcgis/map-components/components/arcgis-zoom";
import "@arcgis/map-components/components/arcgis-legend";
import "@esri/calcite-components/dist/components/calcite-shell";
import MapDisplay from "./components/MapDisplay";
import ActionPanel from "./components/ActionPanel";
import Header from "./components/Header";
import MainChart from "./components/MainChart";
import { MyContext } from "./contexts/MyContext";
import { authenticate } from "./autho";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { cpackages } from "./uniqueValues";

const queryClient = new QueryClient();

export function App(): React.JSX.Element {
  const [loggedInState, setLoggedInState] = useState<boolean>(false);
  useEffect(() => {
    authenticate(setLoggedInState, "Wl9NmZcURHfdBmju");
  }, []);

  const [cpackage, setCpackage] = useState<any>(cpackages[0]);
  const updateCpackage = (newContractpackage: any) => {
    setCpackage(newContractpackage);
  };

  return (
    <>
      {loggedInState === true && (
        <calcite-shell
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: "#888 #555",
            "--calcite-color-background": "#2b2b2b",
          }}
        >
          <MyContext value={{ cpackage, updateCpackage }}>
            <QueryClientProvider client={queryClient}>
              <ActionPanel />
              <MapDisplay />
              <MainChart />
              <Header />
            </QueryClientProvider>
          </MyContext>
        </calcite-shell>
      )}
    </>
  );
}

export default App;
