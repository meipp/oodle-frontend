import Index from "./components/Index";
import { HelmetProvider } from 'react-helmet-async';

function App() {
  return (
    <HelmetProvider>
      <Index />
    </HelmetProvider>
  );
}

export default App;
