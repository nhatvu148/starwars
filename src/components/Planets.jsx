import React, { useEffect } from "react";
import { useQuery } from "react-query";
import Axios from "axios";
import Planet from "./Planet";

const fetchPlanets = async () => {
  const res = await Axios.get("http://swapi.dev/api/planets/");
  return res;
};

const Planets = () => {
  const { data, status } = useQuery("planets", fetchPlanets);
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
