
import AppLayout from "./components/layout/AppLayout.jsx";
import { CryptoContextProvider } from "./context/crypto-context.jsx";

function App() {
  return (
    <CryptoContextProvider>
      <AppLayout />
    </CryptoContextProvider>
  );
}

export default App;
