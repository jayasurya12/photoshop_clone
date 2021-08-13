import React,{useState} from 'react'
import SideNavBar from './components/sideNavBar';
import './App.css'
import Slider from './components/slider';
import * as htmlToImage from 'html-to-image'
import * as download from 'downloadjs'

const DEFAULT_OPTION=[
  {
    name:"Brightness",
    property:"brightness",
    value:100,
    range:{
      min:0,
      max:200
    },
    unit:"%"
  },
  {
    name:"Contrast",
    property:"contrast",
    value:100,
    range:{
      min:0,
      max:200
    },
    unit:"%"
  },
  {
    name:"Saturation",
    property:"saturate",
    value:100,
    range:{
      min:0,
      max:200
    },
    unit:"%"
  },
  {
    name:"Grayscale",
    property:"grayscale",
    value:0,
    range:{
      min:0,
      max:100
    },
    unit:"%"
  },
  {
    name:"Sepia",
    property:"sepia",
    value:0,
    range:{
      min:0,
      max:100
    },
    unit:"%"
  },
  {
    name:"Hue Rotate",
    property:"hue-rotate",
    value:0,
    range:{
      min:0,
      max:360
    },
    unit:"deg"
  },
  {
    name:"Blur",
    property:"blur",
    value:0,
    range:{
      min:0,
      max:20
    },
    unit:"px"
  },
]
const App = () => {
  const [image, setImage]=useState(null)
  const [options, setOption]= useState(DEFAULT_OPTION)
  const [selectedIndex, setSelecetedInedx]= useState(0)
  const selectedOption=options[selectedIndex]
  console.log(selectedOption);

//////////////////////-----------------------image event-------------///////////////////////
  const handleChange=(event)=>{
    console.log(event.target.files[0]);
    console.log(event.target);
    const objectUrl =URL.createObjectURL(event.target.files[0])
    setImage(objectUrl)
  }

  ////////////------------image filters-----------/////////////////
  const applayFilters=()=>{
    const filters=options.map((option)=>{
      return `${option.property}(${option.value}${option.unit})`
    })
    return{
      filter:filters.join(" "),
      backgroundImage:`url(${image})`
    }
  }
/////////////////////------------------slideChange=---------------------////////////////////
  const sliderChange=({target})=>{
    setOption((preOption)=>{
      return preOption.map((option,index)=>{
        if(index !== selectedIndex) return option
        return {...option, value:target.value};
      })
    })
  }
  /////////////////////////----------------------image----downloader-------------------/////////////////
  const downloadImage=()=>{
    if(image !==null){
    htmlToImage.toPng(document.getElementById("image")).then((dataUrl)=>{
      download(dataUrl,`${Date.now()}.png`)
    } )
  }
  return
  }

  return (
    <div className="container">
     {image ?(
       <div className="main-image" id="image" style={applayFilters()}>
       </div>
     ):(
       <div className="upload-image">
         <h1>Photo Clone</h1>
       <input type='file' accept="image/*"  onChange={handleChange}/>
       </div>
     )}
     <div className="sidebar">
     { 
     options.map((option,index)=>{
       return(
        <SideNavBar key={index} 
        name={option.name} active={index === selectedIndex} 
        handleClick={()=> setSelecetedInedx(index)}/>
       )
     })}
     <button className='download' onClick={downloadImage}>Dowload</button>
      </div>
      <Slider min={selectedOption.range.min} 
      max={selectedOption.range.max} value={selectedOption.value}
      handleChange={sliderChange}/>
    </div>
  )
}

export default App
