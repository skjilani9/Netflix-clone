import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { BsArrowLeft } from 'react-icons/bs'
import { URL } from '../utlis/Config'
import Card from '../components/Card'
import './page.css'
import { useNavigate } from 'react-router-dom'

const Search = () => {
    const navigate = useNavigate();
    const [movies, setMovies] = useState([])
    const [search, setSearch] = useState("")
    const [page, setPage] = useState(1)
    const [pagelen, setPagelen] = useState()
    const [gener, setGener] = useState("movie")


    const changepage = (page) => {
        setPage(page)
    }

    useEffect(() => {
        const fetchdata = async () => {
            const option = {
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4OGFmYmQ2YzMxMzdjYjUyMmYyM2E5Zjg3ODAzZDAzMCIsInN1YiI6IjY0OTFlMjI0YzNjODkxMDBjYWRjMGJjMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.I72Dh2w5Szpur1p56K02V0TXTyJtQHk2JgusDhrpU-4'
                }
            }
            const { data } = await axios.get(`${URL}/search/${gener}?query=${search}&page=${page}`, option)
            const output = data.results
            setPagelen(new Array(data.total_pages).fill(1))
            let array = []
            output.forEach((element) => {
                if (element.backdrop_path) {
                    array.push({
                        id: element.id,
                        name: element?.original_name ? element.original_name : element.original_title,
                        image: element.backdrop_path,
                    })
                }
            })
            setMovies(array)
        }
        fetchdata()

    }, [search, page, gener])


    return (
        <div className='search-cont'>
            <div className='search-box'>
                <div className="search-int">
                <BsArrowLeft onClick={() => navigate(-1)} />
                    <select onChange={(e) => setGener(e.target.value)}>
                        <option value="movie">Movie</option>
                        <option value="tv">Tv Show</option>
                    </select>
                    <input type="text" value={search} placeholder='search' onChange={(e) => setSearch(e.target.value)} />
                </div>
            </div>
            <div className="search_movies">
                {movies ? (movies.map((moviedata) => {
                    return (
                        <Card moviedata={moviedata} key={moviedata.id} />
                    )
                })) : <h1>No Movies</h1>}
            </div>
            <div className='search-btn'>
                {pagelen == undefined ? null : (
                    pagelen.map((item, index) => (
                        <button key={index} onClick={() => changepage(index + 1)}>{index + 1}</button>
                    ))
                )}
            </div>
        </div>
    )
}

export default Search
