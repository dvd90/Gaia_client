import React from "react";
import ReactMapboxGl from "react-mapbox-gl";

const Mapbox = () => {
  const mapStyle = "mapbox://styles/dvd90/ck6dgjim00pgp1isan89qwfig";
  const Map = ReactMapboxGl({
    accessToken:
      "pk.eyJ1IjoiZHZkOTAiLCJhIjoiY2s1NzhnMTYwMGF2ZDNncGFiam1vaG96bCJ9.ihLfpKCfY6EwLtAt9AoEnw"
  });

  return (
    <Map
      style={mapStyle}
      containerStyle={{
        height: "100vh",
        width: "100vw"
      }}
      className="gaia-map"
    />
  );
};

export default Mapbox;
