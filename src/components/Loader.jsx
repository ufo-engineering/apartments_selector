import React, { Component } from 'react'
import LoaderImg from '../img/Loader.svg'

import '../css/loader.css';
 
function Loader(){
  return (
    <div className="loader-wrp">
      <img src={LoaderImg} />
    </div>
  )
}
export default Loader;
