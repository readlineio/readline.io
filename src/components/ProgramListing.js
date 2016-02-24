/*
 * @providesModule ProgramListing
 */

'use strict';

import React from 'react';
import {PageChannel} from '../helpers/Channel';
import Header from '../components/Header';
import Base from '../blocks/Base';
import blockRegistry from '../blocks/blockRegistry';
import {BaseStyles} from '../constants/Constants';

const timeToTimeAgo = (time) => {
  let currentTime = (new Date()).getTime()
  // TODO: make all time values consistent as second or millisecond
  let timeDiff = (currentTime/1000) - time;
  if (timeDiff > (24 * 3600)) {
    return Math.floor(timeDiff / (24 * 3600)) + ' days ago';
  } else if (timeDiff > 3600) {
    return Math.floor(timeDiff / 3600) + ' hours ago';
  } else if (timeDiff > 60) {
    return Math.floor(timeDiff / 60) + ' minutes ago';
  } else {
    return 'a few seconds ago';
  }
  time.toString();
};

const ProgramListingItem = (props) => (
  <section>
    <section style={BaseStyles.mediumText}>
      <a href={"/" + props.program.channel}>{props.program.title}</a>
    </section>
    <section style={BaseStyles.smallText}>
      {"Last updated: " + timeToTimeAgo(props.program.last_update_time)}
    </section>
  </section>
);


const ProgramListing = (props) => (
  <ul>
    {props.programs.map((program) => (
      <li key={program.channel}>
        <ProgramListingItem program={program}/>
      </li>
    ))}
  </ul>
);

export default ProgramListing;