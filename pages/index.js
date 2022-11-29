import { MongoClient } from 'mongodb'
import Head from 'next/head'
import MeetupList from "../components/meetups/MeetupList";
import { Fragment } from 'react'


// const DUMMY_MEETUPS = [
//   {
//     id: "m1",
//     title: "First meetup",
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Rouenrivedroite.JPG/1280px-Rouenrivedroite.JPG",
//     address: "Some street 5, 12345 Some city",
//     description: "This is the first meetup!",
//   },
//   {
//     id: "m2",
//     title: "Second meetup",
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Rouenrivedroite.JPG/1280px-Rouenrivedroite.JPG",
//     address: "Some street 18, 90345 Some city",
//     description: "This is the second meetup!",
//   },
//   {
//     id: "m3",
//     title: "Third meetup",
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Rouenrivedroite.JPG/1280px-Rouenrivedroite.JPG",
//     address: "Some street 22, 17765 Some city",
//     description: "This is the third meetup!",
//   },
// ];

function Home(props) {
  return (
      <Fragment>
          <Head>
            <title>React Meetips</title>
            <meta name='description'
                  content='Browse a huge list of highly active React meetups'/>
          </Head>
          <MeetupList meetups={props.meetups} />
      </Fragment>
      
  );
}

// export async function getServerSideProps(context){
//   const req = context.req
//   const res = context.res
//   //runs on server
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS
//     }
//   }
// }

export async function getStaticProps() {
  //fetch data from api or db
  const client = await MongoClient.connect('mongodb+srv://taskapp:selin28082013@cluster0.wmy7i.mongodb.net/nextjs?retryWrites=true&w=majority')
  const db = client.db()
  const meetupscollection = db.collection('meetups')
  const meetups = await meetupscollection.find().toArray()
  client.close()
  return {
    props: {
      meetups: meetups.map(meetup => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString()
      }))
    },
    revalidate: 10
  }
}


export default Home;
