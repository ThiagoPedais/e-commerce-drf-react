import { useState, useEffect } from 'react'

import { Navigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'

import { connect } from 'react-redux'
import { activate } from '../../redux/actions/auth'

import { InfinitySpin  } from 'react-loader-spinner'

import Layout from '../../hocs/Layout'

const Activate = ({ activate, loading }: any) => {

  const params = useParams()  
  const [activated, setActivated] = useState(false)

  const activate_account = () => {
    const uid = params.uid
    const token = params.token
    activate(uid, token)
    setActivated(true);
  }

  if (activated && !loading) {
    return <Navigate to="/" replace={true}  />   
  }

  return (
    <Layout>
      <div className="max-w-7x1 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3x1 mx-auto">
          {
            loading ?
              <button
                className="inline-flex mt-12 items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <InfinitySpin                                                   
                  color="#fff"
                  width='200'                
                />
              </button>
              :
              <button
                onClick={activate_account}
                className="inline-flex mt-12 items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Activate
              </button>
          }

        </div>
      </div>
    </Layout>
  )
}

const mapStateToProp = (state: any) => ({
  loading: state.Auth.loading
})

export default connect(mapStateToProp, {
  activate
})(Activate) 