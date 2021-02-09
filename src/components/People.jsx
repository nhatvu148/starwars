import React, { useEffect } from "react";
import { useQuery } from "react-query";
import Axios from "axios";
import Person from "./Person";

const fetchPeople = async () => {
  const res = await Axios.get("http://swapi.dev/api/people/");
  return res;
};

const People = () => {
  const { data, status } = useQuery("people", fetchPeople);
  console.log(data);
  //   useEffect(() => {
  //     (async () => {
  //       const res = await Axios.get("http://swapi.dev/api/planets/");
  //       console.log(res);
  //     })();
  //   }, []);

  return (
    <div>
      <h2>People</h2>
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
