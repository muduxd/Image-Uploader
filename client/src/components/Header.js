import axios from "axios"
import "../styles/Header.css"


export const Header = ({ setImages, error, setError }) => {

  const uploadFile = async (event) => {
    event.preventDefault()

    const formData = new FormData()
    formData.append("title", event.target.title.value)
    formData.append("image", event.target.file.files[0])

    try {
      await axios.post("http://localhost:8080/images", formData)
      const { data } = await axios.get("http://localhost:8080/images")
  
      setImages(data.map(image => { return {title: image.title, _id: image._id}  }))
      setError("")
    }
    catch(e) {
      setError("Error adding the image!")
    }
  }


  return (
    <header className="Header">
      <h1 id="title">Image Uploader</h1>
      <form onSubmit={uploadFile}>
        <input type="text" name="title" placeholder="Title" required />
        <input type="file" name="file" accept="image/*" required />

        <span className="error">{error}</span>

        <button type="submit">Upload</button>
      </form>
    </header>
  )
}