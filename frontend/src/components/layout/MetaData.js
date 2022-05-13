// This reusable React component will manage all of your changes to the document head.
// Helmet takes plain HTML tags and outputs plain HTML tags. It's dead simple, and React beginner friendly.

import React from 'react';
import {Helmet} from 'react-helmet'
const MetaData = ({title}) => {
  return(
  <Helmet>
      <title>{`${title} - generation-jewelry`}</title>
  </Helmet>
  );
};

export default MetaData;
