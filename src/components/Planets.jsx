import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import Axios from "axios";
import Planet from "./Planet";

const fetchPlanets = async (greeting, page) => {
  console.log(greeting);
  const res = await Axios.get(`http://swapi.dev/api/planets/?page=${page}`);
  return res;
};

const Planets = () => {
  const [page, setPage] = useState(1);
  const greeting = "hello, Nhat Vu";
  const { data, status } = useQuery(
    ["planets", greeting, page],
    () => fetchPlanets(greeting, page),
    {
      staleTime: 0,
      // cacheTime: 10,
      onSuccess: () => console.log("data fetched with no problem"),
      onError: () => console.log("error occurred when fetching data"),
    }
  );
  console.log(data);
  //   useEffect(() => {
  //     (async () => {
  //       const res = await Axios.get("http://swapi.dev/api/planets/");
  //       console.log(res);
  //     })();
  //   }, []);

  return (
    <div>
      <h2>Planets</h2>
      <button onClick={() => setPage(1)}>Page 1</button>
      <button onClick={() => setPage(2)}>Page 2</button>
      <button onClick={() => setPage(3)}>Page 3</button>
      {status === "loading" && <div>Loading data ...</div>}
      {status === "error" && <div>Error fetching data</div>}
      {status === "success" && (
        <div>
          {data.data.results.map((planet) => (
            <Planet key={planet.name} planet={planet} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Planets;
