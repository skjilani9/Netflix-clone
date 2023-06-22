import React, { memo, useRef, useState } from 'react'
import Card from './Card'
import {AiOutlineRight,AiOutlineLeft} from 'react-icons/ai'
import './style.css'


const Cardslide = ({ data, title }) => {
    const listRef = useRef();
    const [sliderPosition, setSliderPosition] = useState(0);
    const [showControls, setShowControls] = useState(false);

    const handleDirection = (direction) => {
        let distance = listRef.current.getBoundingClientRect().x - 70;
        if (direction === "card-left" && sliderPosition > 0) {
            listRef.current.style.transform = `translateX(${230 + distance}px)`;
            setSliderPosition(sliderPosition - 1);
        }
        if (direction === "card-right" && sliderPosition < 4) {
            listRef.current.style.transform = `translateX(${-230 + distance}px)`;
            setSliderPosition(sliderPosition + 1);
        }
    };

    return (
        <div className="cardslide" showControls={showControls} onMouseEnter={() => setShowControls(true)}onMouseLeave={() => setShowControls(false)} >
            <h1>{title}</h1>
            <div className='cardslide-cont'>
                <div
                    className={`slider-action card-left ${!showControls ? "none" : ""
                        }`}
                >
                    <AiOutlineLeft onClick={() => handleDirection("card-left")} />
                </div>
                <div className="slider" ref={listRef}>
                    {data.map((movie, index) => {
                        return <Card moviedata={movie} index={index} key={movie.id} />;
                    })}
                </div>
                <div
                    className={`slider-action card-right ${!showControls ? "none" : ""
                        } `}
                >
                    <AiOutlineRight onClick={() => handleDirection("card-right")} />
                </div>
            </div>
        </div>
    )
}

export default memo(Cardslide)
