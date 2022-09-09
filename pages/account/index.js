import React from 'react'
import MainLayout from './../../layout/MainLayout'

import { getSession } from 'next-auth/react'

const Account = () => {
  return <MainLayout>Account</MainLayout>
}

export const getServerSideProps = async (context) => {
  const session = await getSession({ req: context.req })

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }

  return {
    props: { session },
  }
}

export default Account
