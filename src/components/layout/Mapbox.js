import React from "react";
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

const Mapbox = ({ events }) => {
  const history = useHistory();
  const mapStyle = { link: "mapbox://styles/dvd90/ck6dgjim00pgp1isan89qwfig" };
  const Map = ReactMapboxGl({
    accessToken: process.env.REACT_APP_MAP_BOX_KEY
  });

  const createMarkers = eventsList => {
    return eventsList.map(event => (
      <Layer
        type="symbol"
        layout={{ "icon-image": "globe-15", "icon-size": 2 }}
        onClick={e => onClickMarker(event, e)}
        key={event._id}
      >
        <Feature coordinates={event.coords.coordinates} />
      </Layer>
    ));
  };

  const onClickMarker = (event, e) => {
    history.push(`/events/${event._id}`);
  };

  return (
    <Map
      style={mapStyle.link}
      containerStyle={{
        height: "100vh",
        width: "100vw"
      }}
      className="gaia-map"
      center={[34.80287, 32.090252]}
    >
      {createMarkers(events)}
    </Map>
  );
};

Mapbox.propTypes = {
  events: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  events: state.event.events
});

export default connect(mapStateToProps, {})(Mapbox);
