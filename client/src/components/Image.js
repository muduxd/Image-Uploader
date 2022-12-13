import axios from "axios"
import "../styles/Image.css"


export const Image = ({ title, id, images, setImages, setError }) => {

  const deleteImage = async () => {
    try {
      await axios.delete(`http://localhost:8080/images/${id}`)
      setImages(images.filter(image => image._id !== id))
      setError("")
    }
    catch(e) {
      setError("Error deleting the image!")
    }
  }

  return (
    <div className="Image">
      <span>{title}</span>
      <img src={`http://localhost:8080/images/${id}`} alt="User" />
      <button onClick={deleteImage}>Delete</button>
    </div>
  )
}
