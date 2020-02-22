import React, { useState } from "react";
import ReactMapboxGl, { Layer, Feature, Marker } from "react-mapbox-gl";

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
      center={[34.80287, 32.090252]}
    ></Map>
  );
};

export default Mapbox;
