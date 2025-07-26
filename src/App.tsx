import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import SpendOverview from "./pages/SpendOverview";
import LicenseUtilization from "./pages/LicenseUtilization";
import Renewals from "./pages/Renewals";
import Redundancy from "./pages/Redundancy";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<SpendOverview />} />
          <Route path="/utilization" element={<LicenseUtilization />} />
          <Route path="/renewals" element={<Renewals />} />
          <Route path="/redundancy" element={<Redundancy />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
