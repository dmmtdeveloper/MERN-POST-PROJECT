import { useEffect, useState } from "react";
import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
export default function UpdateListing() {
    const { currentUser } = useSelector((state) => state.user);
    const navigate = useNavigate();
    const params = useParams();
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

    useEffect(() => {
        const fetchListing = async () => {
            const listingId = params.listingId;
            const res = await fetch(`/api/listing/get/${listingId}`);
            const data = await res.json();
            setFormData(data);
            if (data.success === false) {
                return;
            }
            setFormData(data);
        };
        fetchListing();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleImageSubmit = () => {
        if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
            setUploading(true);
            /* Remover el error anterior */
            setImageUploadError(false);
            const promises = [];

            for (let i = 0; i < files.length; i++) {
                promises.push(storageFirabaseImage(files[i]));
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

    const storageFirabaseImage = async (file) => {
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
                    getDownloadURL(uploadTask.snapshot.ref).then(
                        (downloadURL) => {
                            resolve(downloadURL);
                        }
                    );
                }
            );
        });
    };

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
                e.target.type === "checkbox"
                    ? e.target.checked
                    : e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (formData.imageUrls.length < 1)
                return setError("You must upload at least one image");
            setLoading(true);
            setError(false);
            const res = await fetch(`/api/listing/update/${params.listingId}`, {
                method: "PUT",
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
        <main className="mx-auto max-w-4xl p-3">
            <h1 className="my-7 text-center text-3xl font-semibold">
                Update a listing
            </h1>

            <form
                onSubmit={handleSubmit}
                className=" flex flex-col justify-between gap-4 p-3 sm:flex-row"
            >
                <div className="flex flex-1 flex-col gap-4">
                    <input
                        type="text"
                        placeholder="Name"
                        className="rounded-lg border p-3 "
                        id="name"
                        maxLength="80"
                        minLength="10"
                        required
                        onChange={handleChange}
                        value={formData.name}
                        autoComplete="name"
                    />

                    <textarea
                        className="rounded-lg border p-3"
                        type="text"
                        id="description"
                        placeholder="Description"
                        required
                        value={formData.description}
                        onChange={handleChange}
                        autoComplete="description"
                    />

                    <input
                        className="rounded-lg border p-3 "
                        type="text"
                        id="address"
                        placeholder="address"
                        required
                        value={formData.address}
                        onChange={handleChange}
                        autoComplete="address"
                    />

                    {/* ------ Checkbox ----- */}

                    <div>
                        <h1 className="pb-4 text-2xl">Best item</h1>
                        <div className="flex flex-wrap gap-6">
                            <div className="flex gap-2 ">
                                <input
                                    type="checkbox"
                                    id="hotel"
                                    className="w-4"
                                    value={formData.hotel}
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
                                    value={formData.restaurant}
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
                                    value={formData.touristSpot}
                                    onChange={handleChange}
                                    checked={formData.touristSpot}
                                />
                                <span>Touris Spot</span>
                            </div>
                            <div>
                                <div className="flex gap-2">
                                    <input
                                        className="w-4"
                                        value={formData.price}
                                        type="checkbox"
                                        id="price"
                                        onChange={handleChange}
                                    />
                                    <span>Precio</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ------ Input Text ----- */}

                {/* ------ Create Image ----- */}

                <div className=" flex flex-1 flex-col gap-4">
                    <p className="font-semibold">
                        Images:
                        <span className=" ml-2 font-normal text-gray-400">
                            La primera imagen sera la portada (max 6)
                        </span>
                    </p>
                    <div className="flex gap-4">
                        {/* ------ Create Image ----- */}
                        <input
                            className="w-full rounded border border-gray-300 p-3"
                            type="file"
                            id="images"
                            accept="image/*"
                            multiple
                            onChange={(e) => setFiles(e.target.files)}
                        />
                        <button
                            type="button"
                            onClick={handleImageSubmit}
                            className="rounded border border-green-700 p-3 uppercase text-green-700 "
                        >
                            {uploading ? "Uploading..." : "Upload"}
                        </button>
                    </div>

                    {/*----- Error message ----- */}
                    <p className="text-xs text-red-700">
                        {imageUploadError && imageUploadError}
                    </p>

                    {formData.imageUrls.length > 0 &&
                        formData.imageUrls.map((url, index) => (
                            <div
                                key={url}
                                className="flex items-center justify-between border p-3"
                            >
                                <img
                                    src={url}
                                    alt="listing image"
                                    className="h-20 w-20 rounded-lg object-contain"
                                />
                                <button
                                    onClick={() => handleDeleleImage(index)}
                                    className="rounded-lg p-3 uppercase text-red-700 hover:opacity-75"
                                >
                                    Delete
                                </button>
                            </div>
                        ))}

                    <button
                        disabled={loading || uploading}
                        className="rounded-lg bg-slate-700 p-3 uppercase text-white hover:opacity-95 disabled:opacity-80"
                    >
                        {loading ? "Update..." : "Update listing"}
                    </button>

                    {error && (
                        <p className="text-sm text-red-700">{error.message}</p>
                    )}
                </div>
            </form>
        </main>
    );
}
