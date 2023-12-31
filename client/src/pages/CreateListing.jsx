import { useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
export default function CreateListing() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [imageUploadError, setImageUploadError] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    address: "",
    price: "",
    hotel: true,
    restaurant: true,
    touristSpot: true,
    imageUrls: [],
  });

  const { name, description, address, price, hotel, restaurant, touristSpot } =
    formData;

  /*
  Verifica si hay archivos para cargar y 
  si la cantidad total de imágenes no excede 6.
  */
  const handleImageSubmit = () => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      setUploading(true);
      /* Remover el error anterior */
      setImageUploadError(false);
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storageImage(files[i]));
      }

      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });

          setImageUploadError(false);
          setUploading(false);
        })
        .catch((error) => {
          setImageUploadError(
            `Image upload failed (2mb max per image) ${error}`
          );
          setUploading(false);
        });
    } else {
      setImageUploadError("You can upload 6 images per listing");
      setUploading(false);
    }
  };

  /*Esta función asincrónica 'storageImage' 
  se encarga de cargar una imagen al Firebase Storage.
  */
  const storageImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}%done`);
        },

        (error) => {
          reject(error);
        },

        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  /*Eliminar la imagen*/
  const handleDeleleImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.imageUrls.length < 1)
        return setError("You must upload at least one image");
      setLoading(true);
      setError(false);
      const res = await fetch("/api/listing/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        /* aca nos traemos el id del usuario que esta creano el post */
        body: JSON.stringify({
          ...formData,
          userRef: currentUser._id,
        }),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        setError(data.message);
      }
      navigate(`/listing/${data._id}`);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        Create a listing
      </h1>

      <form
        onSubmit={handleSubmit}
        className="flex justify-between flex-col sm:flex-row gap-4 p-3"
      >
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            placeholder="Name"
            className="p-3 rounded-lg border "
            id="name"
            maxLength="62"
            minLength="3"
            required
            onChange={handleChange}
            value={name}
            autoComplete="name"
          />

          <textarea
            className="p-3 rounded-lg border"
            type="text"
            id="description"
            placeholder="Description"
            required
            value={description}
            onChange={handleChange}
            autoComplete="description"
          />

          <input
            className="p-3 rounded-lg border "
            type="text"
            id="address"
            placeholder="address"
            required
            value={address}
            onChange={handleChange}
            autoComplete="address"
          />

          {/* ------ Checkbox ----- */}

          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-2 ">
              <input
                type="checkbox"
                id="hotel"
                className="w-4"
                value={hotel}
                onChange={handleChange}
                checked={formData.hotel}
              />
              <span>Hotel</span>
            </div>

            <div className="flex gap-2">
              <input
                className="w-4"
                type="checkbox"
                id="restaurant"
                value={restaurant}
                onChange={handleChange}
                checked={formData.restaurant}
              />
              <span>Restaurant</span>
            </div>

            <div className="flex gap-2">
              <input
                className="w-4"
                type="checkbox"
                id="touristSpot"
                value={touristSpot}
                onChange={handleChange}
                checked={formData.touristSpot}
              />
              <span>Touris Spot</span>
            </div>
          <div>
            <div className="flex gap-2">
              <input
                className="w-4"
                value={price}
                type="checkbox"
                id="price"
                required
                onChange={handleChange}
              />
              <span>Precio</span>
            </div>
          </div>
          </div>

          {/* ------ Input Text ----- */}

        </div>

        {/* ------ Create Image ----- */}

        <div className=" flex flex-col flex-1 gap-4">
          <p className="font-semibold">
            Images:
            <span className=" ml-2 text-gray-400 font-normal">
              La primera imagen sera la portada (max 6)
            </span>
          </p>
          <div className="flex gap-4">
            {/* ------ Create Image ----- */}
            <input
              className="p-3 border border-gray-300 rounded w-full"
              type="file"
              id="images"
              accept="image/*"
              multiple
              onChange={(e) => setFiles(e.target.files)}
            />
            <button
              type="button"
              onClick={handleImageSubmit}
              className="p-3 text-green-700 border border-green-700 rounded uppercase "
            >
              {uploading ? "Uploading..." : "Upload"}
            </button>
          </div>

          {/*----- Error message ----- */}
          <p className="text-red-700 text-xs">
            {imageUploadError && imageUploadError}
          </p>

          {formData.imageUrls.length > 0 &&
            formData.imageUrls.map((url, index) => (
              <div
                key={url}
                className="flex justify-between p-3 border items-center"
              >
                <img
                  src={url}
                  alt="listing image"
                  className="w-20 h-20 object-contain rounded-lg"
                />
                <button
                  onClick={() => handleDeleleImage(index)}
                  className="p-3 text-red-700 rounded-lg uppercase hover:opacity-75"
                >
                  Delete
                </button>
              </div>
            ))}

          <button
            disabled={loading || uploading}
            className="p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
          >
            {loading ? "Creating..." : "Create listing"}
          </button>
          {error && <p className="text-red-700 text-sm">{error.message}</p>}
        </div>
      </form>
    </main>
  );
}
