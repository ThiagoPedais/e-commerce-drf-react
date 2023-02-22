import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

import { check_authenticated, load_user, /*refresh*/ } from "../redux/actions/auth";
import {
    remove_item,
    update_item,
    get_item,
    get_total,
    get_item_total
} from '../redux/actions/cart'
import { get_user_profile } from "../redux/actions/profile";

import Footer from "../components/navigation/Footer";
import Navbar from "../components/navigation/Navbar";
import { connect } from "react-redux";
import { useEffect } from "react";



interface LayoutProps {    
    children: React.ReactNode
    check_authenticated: () => void;
    load_user: () => void;
    get_item: () => void;
    get_total: () => void;
    get_item_total: () => void;
    get_user_profile: () => void;
    // refresh: () => void;
}

const Layout:React.FC<LayoutProps> = (props) => {

    useEffect(() => {        
        props.check_authenticated()
        // props.refresh()
        props.load_user()
        props.get_item()
        props.get_total()
        props.get_item_total()
        props.get_user_profile()
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
    get_item,
    get_total,
    get_item_total,
    get_user_profile
    // refresh,
  };

export default connect(null, mapDispatchToProps) (Layout)