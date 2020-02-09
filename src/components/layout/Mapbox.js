import React from "react";
import ReactMapboxGl from "react-mapbox-gl";

const Mapbox = () => {
  const mapStyle = { link: "mapbox://styles/dvd90/ck6dgjim00pgp1isan89qwfig" };
  const Map = ReactMapboxGl({
    accessToken: process.env.REACT_APP_MAP_BOX_KEY
  });

  return (
    <Map
      style={mapStyle.link}
      containerStyle={{
        height: "100vh",
        width: "100vw"
      }}
      className="gaia-map"
    />
  );
};

export default Mapbox;
