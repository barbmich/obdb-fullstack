import Head from "next/head";
import styles from "../styles/Home.module.scss";
import { gql } from "@apollo/client";
import { client } from "../apollo-client";
import { GetServerSideProps } from "next";
import { useState } from "react";
import SearchBox from "../components/SearchBox";
import List from "../components/List";
import PageButtons from "../components/PageButtons";

export default function Home({ data }) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  // const [urlToFetch, setUrlToFetch] = useState('');

  // the preventDefaults stops the browser from refreshing. after, we update the state of the url to fetch.
  function handleSearch(event) {
    console.log(event.target.value);
  }

  // clears the search bar and sets data back to all breweries.
  function handleClear() {
    setSearch("");
  }

  return (
    <div className={styles.main}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SearchBox
        search={search}
        handleSearch={handleSearch}
        setSearch={setSearch}
        handleClear={handleClear}
      />
      <List breweries={data} />
      <PageButtons data={data} page={page} setPage={setPage} />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await client.query({
    query: gql`
      query {
        getAllBreweries {
          id
          name
          slug
          breweryType
          address {
            street
            city
            state
            postalCode
            country
          }
          coordinates {
            longitude
            latitude
          }
          contacts {
            phone
            website
          }
          likes
        }
      }
    `,
  });

  return {
    props: {
      data: data.getAllBreweries,
    },
  };
};
