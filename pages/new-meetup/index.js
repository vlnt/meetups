import React from "react";
import NewMeetupForm from "../../components/meetups/NewMeetupForm";
import Head from 'next/head'
import { Fragment } from "react";

function NewMeetupPage() {
  async function addMeetupHandler(enteredMeetupData) {
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(enteredMeetupData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = response.json();
    console.log(data);
  }

  return (
    <Fragment>
      <Head>
        <title>Add a new meetup</title>
        <meta
          name="description"
          content="Add your own meetup andcreate amazingnetworking opportunities"
        />
      </Head>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </Fragment>
  );
}

export default NewMeetupPage;
