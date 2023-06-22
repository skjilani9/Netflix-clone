import React from 'react'
import { useDispatch } from 'react-redux';
import {fetchDataByGenre} from '../store/store'
import './style.css'

const Selectgenre = ({genres,type}) => {
    const dispatch = useDispatch();
  return (
    <div>
      <select className='select-gen' onChange={(e) => {dispatch(fetchDataByGenre({ genres,genre: e.target.value,type,}))}}>
      {genres.map((genre) => {
        return (
          <option value={genre.id} key={genre.id}>
            {genre.name}
          </option>
        );
      })}
      </select>
    </div>
  )
}

export default Selectgenre
