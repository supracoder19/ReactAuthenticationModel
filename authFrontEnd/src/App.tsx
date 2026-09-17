import { Route, Routes } from "react-router"
import Login from "./pages/Login"
import NoPage from "./pages/NoPage"
import ProtectedPage from "./pages/ProtectedPage"
import { UserContextProvider } from "./utility/UserContext"

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login/>} />
      <Route path="/protected" element={<UserContextProvider><ProtectedPage/></UserContextProvider>}/>
      <Route path="*" element={<NoPage/>} />
    </Routes>
  )
}

export default App
