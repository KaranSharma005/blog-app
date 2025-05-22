import router from './routes/index'
import { RouterProvider } from 'react-router-dom'
import ReactDOM from "react-dom/client";

const App = () => {
    return (
        <RouterProvider router={router} />
    )
}

export default App
