import Head from 'next/head'
import Link from 'next/link'
import MainLayout from '../layout/MainLayout'

import Box from './../components/Box'

const getData = async () => {
  // const request = await fetch('http://localhost:3000/api/products/fetchData')
  const request = await fetch('/api/products/fetchData')
  const response = await request.json()
  console.log(response)
}

export default function Home() {
  // console.log(props.data)
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
      <button onClick={() => getData()}>Call</button>
    </div>
  )
}

// export const getStaticProps = async () => {
//   // ovo ce da ide u helpers, ovde samo isprobavam

//   const getThreeAlaro = async () => {
//     // Problem kao i pre. Resi to.
//     const request = await fetch('http://localhost:3000/api/products/fetchData')
//     const response = await request.json()
//     return response
//   }

//   const data = await getThreeAlaro()

//   return {
//     props: {
//       data: data,
//     },
//   }
// }
