import axios from "axios"
import { useState, useEffect } from "react"
import { Header } from "./Header"
import { Image } from "./Image"
import "../styles/App.css"


export const App = () => {
  const [images, setImages] = useState([])
  const [error, setError] = useState("")


  useEffect(() => {
    axios.get("http://localhost:8080/images")
      .then(({ data }) => setImages(data.map(image => ({ title: image.title, _id: image._id }))))
      .catch(e => { setError("Error fetching the images!") })
  }, [])


  return (
    <div className="App">
      <Header setImages={setImages} error={error} setError={setError} />
      <div className="Images">
        {
          images.map((image, index) => (
            <Image key={index} title={image.title} id={image._id} images={images} setImages={setImages} setError={setError} />
          ))
        }
      </div>
    </div>
  )
}
