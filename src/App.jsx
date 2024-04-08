import './index.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import HomePage from './components/home';
import SearchResultsPage from './components/searchResults';
import PlayerCard from './components/playerCard';
import AddPlayer from './components/addPlayer';
import AddStat from './components/addStat';
import AddScoutingReport from './components/addScoutingReport';
import DraftBoard from './components/draftBoard';
import DraftBoardViewer from './components/boardViewer';
import AddBoard from './components/addBoard';

function App() {
  return (
    <BrowserRouter> 
      <div>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/searchResults" element={<SearchResultsPage  />} />
          <Route path="/playerCard" element={<PlayerCard />} />
          <Route path="/addPlayer" element={<AddPlayer />} />
          <Route path="/addStat" element={<AddStat />} />
          <Route path="/addScoutingReport" element={<AddScoutingReport />} />
          <Route path="/draftBoard" element={<DraftBoard />} />
          <Route path="/boardViewer" element={<DraftBoardViewer />} />
          <Route path="/addBoard" element={<AddBoard />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
