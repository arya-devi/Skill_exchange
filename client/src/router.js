import { createBrowserRouter } from "react-router-dom";
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Skills from './pages/Skills';
// import SkillDetail from './pages/SkillDetail';
import Chat from './pages/Chat';
import AllSkills from "./pages/AllSkills";
import ViewAnotherProfile from "./pages/ViewAnotherProfile";
import MessageRequest from "./pages/MessageRequest";
import ChatingWindow from "./pages/ChatingWindow";
import Success from "./pages/Success";
import MessageBox from "./pages/MessageBox";
import About from "./pages/About";
const router = createBrowserRouter([
    { path: '/', element: <Signup/> },
    { path: '/about', element: <About/> },
    { path: '/login', element: <Login/> },
    { path: '/login/:notLoggedIn', element: <Login/> },
    { path: '/profile', element: <Profile/> },
    { path: '/skills', element: <Skills/> },
    // { path: '/skills/:id', element: <SkillDetail/> },
    { path: '/chat', element: <Chat/> },
    { path: '/home', element: <Home/> },
    { path: '/allskills', element: <AllSkills/> },
    { path: '/viewAnotherProfile/:userId', element: <ViewAnotherProfile/> },
    { path: '/messageRequest', element: <MessageRequest/> },
    { path: "/user/:userId", element: <ViewAnotherProfile /> },
    { path: "/chat/:chatId", element: <ChatingWindow /> },
    { path:"/success", element:<Success />},
    { path:"/messagebox", element:<MessageBox />}
]);

export default router;
