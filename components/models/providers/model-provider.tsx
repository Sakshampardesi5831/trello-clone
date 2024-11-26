'use client'

import React, { Fragment, useEffect, useState } from 'react'
import CardModel from '../card-model'
import ProModel from '../pro-modal';
const ModelProvider = () => {
  const [isMounted,setIsMounted]=useState(false);

  useEffect(()=>{
    setIsMounted(true);
  },[])

  if(!isMounted){
      return null;
  }
  return (
    <Fragment>
        <CardModel/>
        <ProModel/>
    </Fragment>
  )
}

export default ModelProvider