import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

import Footer from "../components/navigation/Footer";
import Navbar from "../components/navigation/Navbar";


interface LayoutProps {
    children: React.ReactNode
}

const Layout:React.FC<LayoutProps> = (props) => {
    return(
        <div>
            <Navbar />
            <ToastContainer autoClose={5000} />
            {props.children}
            <Footer />
        </div>
    )
}

export default Layout