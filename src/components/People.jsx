import React, { useState } from "react";
import { useQuery } from "react-query";
import Axios from "axios";
import Person from "./Person";

const fetchPeople = async (page) => {
  const res = await Axios.get(`http://swapi.dev/api/people/?page=${page}`);
  return res;
};

const People = () => {
  const [page, setPage] = useState(2);
  const { data, status } = useQuery(["people", page], () => fetchPeople(page), {
    keepPreviousData: true,
  });

  return (
    <div>
      <h2>People</h2>
      <button
        onClick={() => setPage((old) => Math.max(old - 1, 1))}
        disabled={page === 1}
      >
        Previous page
      </button>
      <span>{page}</span>
      <button
        onClick={() => setPage((old) => old + 1)}
        disabled={data && !data.data.next}
      >
        Next page
      </button>
      {status === "loading" && <div>Loading data ...</div>}
      {status === "error" && <div>Error fetching data</div>}
      {status === "success" && (
        <div>
          {data.data.results.map((person) => (
            <Person key={person.name} person={person} />
          ))}
        </div>
      )}
    </div>
  );
};

export default People;
