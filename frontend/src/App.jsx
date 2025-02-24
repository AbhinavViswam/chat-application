import './App.css'
import AppRoute from '../route/AppRoute'
import UserProvider from '../context/userContext'

function App() {
  return(
    <UserProvider>
      <AppRoute/>
    </UserProvider>
  )
}

export default App