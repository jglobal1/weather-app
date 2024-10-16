import React, { useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Img1 from '/src/assets/cloud.png'
import Img2 from '/src/assets/cloudy.png'
import Img3 from '/src/assets/humidity.1024x838.png'
import Img4 from '/src/assets/wind-icon.png'


const Weather = () => {


  const [weather, setWeatherData] = useState (false);

  const inputRef = useRef()
  const search = async (city) =>{
    if(city=== ""){
      alert('Enter city name');
      return;
    }
    
    try {
       const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=e4ec3ba8fe35ecfb18bfa8d3f01da149`;

    
        const response = await fetch(url);
        const data = await response.json()
        console.log(data)

        if(!response.ok){
          alert('city not found');
          return;
        }

         // Construct the icon URL dynamically from API data
        const iconCode = data.weather[0].icon;
        const iconUrl = ` https://openweathermap.org/img/wn/${iconCode}@2x.png`;
        
        setWeatherData({
          humidity : data.main.humidity,
          windSpeed: data.wind.speed,
          temperature: Math.floor(data.main.temp),
          location: data.name,
          iconUrl: iconUrl, 
        })
    
    } catch (error) {
      console.log(error)
    }
  }


  useEffect(()=>{
      search("london")
 
  }, [])


  
  return (
    <div className='self-center flex flex-col items-center p-10 rounded-lg w-[500px] mx-auto bg-gradient-to-br from-[#2f4980] to-[#500e4b]'>
        <h1 className='text-white pb-3'>Weather Blog</h1>
       <div className="searchbar">
            <input ref={inputRef} className='h-[50px] border-none outline-none  rounded-full pl-[25px] text-[#ec9898] bg-[#ebfffc] text-[18px] ' 
            
            type="text" 
            placeholder='Search' 
            />
            
            <FontAwesomeIcon
                icon={faSearch}
                className="text-red-500 h-5 w-[50px]  ml-6 rounded-full cursor-pointer  bg-[#ebfffc] p-2" // Adjust size and margin as needed
                onClick={()=>search(inputRef.current.value)}
            />
       </div>

       <img src={weather.iconUrl} alt="" 
       className='w-[180px] mt-4' 
       />
      
      <p className='text-white font-bold text-[40px]'>{weather.temperature}°C</p>
      <p className='text-white font-bold text-[20px]'>{weather.location}</p>

      <div className='w-full mt-10 text-white flex justify-between'>
          <div className="flex gap-5">
              <img src={Img3} alt="" 
                className='w-[40px]'
              />  

              <div>
                <p>{weather.humidity}%</p>
                <span>Humidity</span>
              </div>


          <div className="flex gap-5">
              <img src={Img4} alt="" 
                className='w-[40px]'
              />  

              <div>
                <p>{weather.windSpeed} km/h</p>
                <span>Wind Speed</span>
              </div>
          </div>

      </div>
      
      </div>

      <footer>
        <p className='text-[10px] text-red-100 pt-10' >&copy; {new Date().getFullYear()} Jglobal. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default Weather
