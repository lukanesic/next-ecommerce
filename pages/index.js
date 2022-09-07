import Head from 'next/head'
import Link from 'next/link'
import MainLayout from '../layout/MainLayout'

import Box from './../components/Box'

export default function Home() {
  return (
    <div>
      <Head>
        <title>E-commerce</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <MainLayout>
        <div className='home'>
          <div className='home-intro-section'>
            <h5>Introducing</h5>
            <Link href='/alaro'>
              <h1>Alaro</h1>
            </Link>
            <h5>The 2022 Collection</h5>
          </div>

          <div className='home-box-container'>
            <Box
              link={'alaro/alaro-sofa'}
              name={'Alaro Sofa'}
              price={2445}
              // image={alarosofa}
            />
            <Box
              link={'alaro/alaro-lounge-chair'}
              price={1695}
              name={'Alaro Chair'}
            />
            <Box
              link={'alaro/alaro-ottoman'}
              name={'Alaro Ottoman'}
              price={795}
            />
          </div>
        </div>
      </MainLayout>
    </div>
  )
}
