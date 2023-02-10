import { connect } from "react-redux";
import { Route, Navigate, useLocation } from "react-router-dom";

type ProtectedRouteProps = {
    outlet: JSX.Element;
    auth: {
        isAuthenticated: boolean;
        loading: boolean;
    };    
};

const PrivateRoute = ({
    outlet,
    auth: { isAuthenticated, loading }
}: ProtectedRouteProps) => {

    const location = useLocation();
    const auth = isAuthenticated;

    if (auth === undefined) {
        return null; // or loading spinner, etc...
    }

    return !auth && loading
        ?
        (
            <Navigate to={"/login"} state={{ from: location }} replace  />
        )
        :
        (
            outlet
        )

}

// const PrivateRoute = ({
//     component: Component,
//     auth: { isAuthenticated, loading }
// }) => {
//     <Route
//         {...rest}
//         render={props => !isAuthenticated && loading
//             ?
//             (
//                 <Navigate to='/login' />
//             )
//             :
//             (
//                 <Component {...props} />
//             )

//         }
//     />
// }

const mapStateToProps = (state: any) => ({
    auth: state.Auth
})

export default connect(mapStateToProps, {})(PrivateRoute)