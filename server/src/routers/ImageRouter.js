const express = require("express")
const multer = require("multer")
const sharp = require("sharp")
const router = express.Router()

const ImageModel = require("../models/ImageModel")



const upload = multer({
    limits: {
        fileSize: 1_000_000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png|PNG|JPG|JPEG)$/))
            return cb(new Error("Please upload only images!"))
  
        return cb(undefined, true)
    }
})


router.get("/images", async (request, response) => {
    try {
        const images = await ImageModel.find({})
        return response.send(images)
    }
    catch(error) {
        return response.status(400).send()
    }
})
  

router.get("/images/:id", async (request, response) => {
    const _id = request.params.id
  
    try {
        const image = await ImageModel.findById(_id)
        return response.set("Content-Type", "image/png").send(image.image)
    }
    catch(error) {
        return response.status(400).send()
    }
})
  
  
router.post("/images", upload.single("image"), async (request, response) => {
    const title = request.body.title
    const image = await sharp(request.file.buffer).resize({ width: 400, height: 400 }).png().toBuffer()

    try {
        const newImage = new ImageModel({
            title,
            image
        })
  
        await newImage.save()
        return response.send(newImage)
    }
    catch(error) {
        return response.status(400).send({ error: error.message })
    }
  
}, (error, request, response, next) => {
    return response.status(400).send({ error: error.message })
})
  
  
router.delete("/images/:id", async (request, response) => {
    const _id = request.params.id
  
    try {
        const deletedImage = await ImageModel.findByIdAndDelete(_id)
        return response.send(deletedImage)
    }
    catch(error) {
        return response.status(400).send()
    }
})


module.exports = router