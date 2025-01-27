import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { MainPage } from './pages/MainPage';

export function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
        </Routes>
      </Router>
    </>
  );
}
