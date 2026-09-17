import { Route, Routes } from "react-router"
import Login from "./pages/Login"
import NoPage from "./pages/NoPage"
import ProtectedPage from "./pages/ProtectedPage"

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login/>} />
      <Route path="/protected" element={<ProtectedPage/>}/>
      <Route path="*" element={<NoPage/>} />
    </Routes>
  )
}

export default App
