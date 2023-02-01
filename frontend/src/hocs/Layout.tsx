import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

import { check_authenticated, load_user, /*refresh*/ } from "../redux/actions/auth";

import Footer from "../components/navigation/Footer";
import Navbar from "../components/navigation/Navbar";
import { connect } from "react-redux";
import { useEffect } from "react";


interface LayoutProps {    
    children: React.ReactNode
    check_authenticated: () => void;
    load_user: () => void;
    // refresh: () => void;
}

const Layout:React.FC<LayoutProps> = (props) => {

    useEffect(() => {        
        props.check_authenticated()
        // props.refresh()
        props.load_user()
    }, [])

    return(
        <div>
            <Navbar />
            <ToastContainer autoClose={5000} />
            {props.children}
            <Footer />
        </div>
    )
}
const mapDispatchToProps = {
    check_authenticated,
    load_user,
    // refresh,
  };

export default connect(null, mapDispatchToProps) (Layout)