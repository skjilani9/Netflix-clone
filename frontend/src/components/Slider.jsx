import React from 'react'
import Cardslide from './Cardslide'

const Slider = ({movies}) => {
    const movierange = (from ,to)=>{
        return movies.slice(from,to)
    }
  return (
    <div>
      <Cardslide data={movierange(0,10)} title="Trending Now" />
      <Cardslide data={movierange(10,20)} title="New Releases" />
      <Cardslide data={movierange(20,30)} title="Blockbuster Movies" />
      <Cardslide data={movierange(30,40)} title="Popular on Netflix" />
      <Cardslide data={movierange(40,50)} title="Action Movies" />
      <Cardslide data={movierange(50,60)} title="Epics" />
    </div>
  )
}

export default Slider
