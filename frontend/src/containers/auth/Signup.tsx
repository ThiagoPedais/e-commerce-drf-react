import { useState, useEffect } from "react";
import Layout from "../../hocs/Layout";
import { User } from "../../types/User";
import { signup } from "../../redux/actions/auth";
import { connect } from "react-redux";

function Singup({ signup }: any) {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const [accountCreated, setAccountCreated] = useState(false)
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        re_password: '',
    });

    const { 
        first_name,
        last_name,
        email,
        password,
        re_password
      } = formData;

    // Takes all that you write
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // console.log(formData);
        signup(first_name, last_name, email, password, re_password);
        setAccountCreated(true)
        window.scrollTo(0,0)

    }


    return (
        <Layout>
            <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <img
                        className="mx-auto h-12 w-auto"
                        src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                        alt="Workflow"
                    />
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Register</h2>                    
                </div>

                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                        <form className="space-y-6" onSubmit={e => onSubmit(e)}>
                            <div>
                                <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
                                    First Name
                                </label>
                                <div className="mt-1">
                                    <input
                                        name="first_name"
                                        value={first_name}
                                        onChange={e => onChange(e)}
                                        type="text"
                                        autoComplete="email"
                                        required
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">
                                    Last Name
                                </label>
                                <div className="mt-1">
                                    <input
                                        name="last_name"
                                        value={last_name}
                                        onChange={e => onChange(e)}
                                        type="text"
                                        autoComplete="email"
                                        required
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Email address
                                </label>
                                <div className="mt-1">
                                    <input
                                        name="email"
                                        value={email}
                                        onChange={e => onChange(e)}
                                        type="email"
                                        autoComplete="email"
                                        required
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    Password
                                </label>
                                <div className="mt-1">
                                    <input
                                        name="password"
                                        value={password}
                                        onChange={e => onChange(e)}
                                        type="password"
                                        required
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    Repeat Password
                                </label>
                                <div className="mt-1">
                                    <input
                                        name="re_password"
                                        value={re_password}
                                        onChange={e => onChange(e)}
                                        type="password"
                                        required
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>
                            </div>                            

                            <div>
                                <button
                                    type="submit"
                                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Register
                                </button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </Layout>
    )
}

const mapStateToProp = (state:any) => ({

})

export default connect(mapStateToProp, {
    signup
}) (Singup)