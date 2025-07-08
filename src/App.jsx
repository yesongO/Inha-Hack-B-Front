import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TitlePage from './pages/TitlePage';
import SignupPage from './pages/SignupPage';
import CreateProfile from './pages/CreateProfile';
import MainPage from './pages/MainPage';
import ProfilePage from './pages/ProfilePage';
import CategoryPage from './pages/CategoryPage';
import WritePage from './pages/WritePage';
import ViewPage_Q from "./pages/ViewPage_Q";
import InCategory from './pages/InCategory';
import AnswerPage from './pages/AnswerPage';
import ViewPage_A from "./pages/ViewPage_A";

import './index.css';
import { NotificationProvider } from './components/Notification';


function App() {

  return (
    <NotificationProvider>
    <Router>
      <Routes>
        <Route path="/" element={<TitlePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/create-profile" element={<CreateProfile />} />
        <Route path="/mainp" element={<MainPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/category" element={<CategoryPage />} />
        <Route path="/write" element={<WritePage />} />
        <Route path="/viewpage-q/:questionId" element={<ViewPage_Q />} />
        <Route path="/category/:slug" element={<InCategory />} />
        <Route path="/answer/:questionId" element={<AnswerPage />} />
        <Route path="/viewpage-a/:questionId" element={<ViewPage_A />} />
       
      </Routes>
    </Router>
    </NotificationProvider>
  )
}

export default App
