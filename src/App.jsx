import { BrowserRouter, Routes, Route} from "react-router-dom"
import Body from "./Body"
import Login from "./pages/Login"
import { Provider } from "react-redux"
import appStore from "./utils/appStore.js"


function App() {
  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body/>}>
              <Route path="/login" element={<Login/>}/>
            
            </Route>
            
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  )
}

export default App
