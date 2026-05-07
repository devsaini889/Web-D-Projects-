
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <Routes>
          {/* Add your routes here */}
          <Route path="/" element={<div className="flex items-center justify-center min-h-screen text-white text-3xl">Welcome to AI Cold Mail Generator</div>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
