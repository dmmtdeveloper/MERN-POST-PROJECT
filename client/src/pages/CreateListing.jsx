export default function CreateListing() {
  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        Create a listing
      </h1>

      <form className="flex flex-col sm:flex-row gap-4 p-3">
        <div className="flex flex-col gap-4 flex-1">
          <input
            className="p-3 rounded-lg border "
            type="text"
            maxLength="62"
            minLength="10"
            id="name"
            placeholder="Name"
            required
          />

          <textarea
            className="p-3 rounded-lg border"
            type="text"
            id="description"
            placeholder="Description"
            required
          />

          <input
            className="p-3 rounded-lg border "
            id="address"
            type="text"
            placeholder="address"
            required
          />

          {/* ------ Checkbox ----- */}

          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-2 ">
              <input className="w-4" type="checkbox" id="hotel" />
              <span>Hotel</span>
            </div>
            <div className="flex gap-2">
              <input className="w-4" type="checkbox" id="restaurant" />
              <span>Restaurant</span>
            </div>
            <div className="flex gap-2">
              <input className="w-4" type="checkbox" id="touristSpot" />
              <span>Touris Spot</span>
            </div>
          </div>

          {/* ------ Input Text ----- */}

          <div>
            <div className="flex items-center gap-2">
              <input
                className="p-3 border  rounded-lg"
                type="number"
                id="price"
                required
              />
              <div className="flex items-center gap-1">
                <p>Regular price</p>
                <span className="text-xs">($ USD)</span>
              </div>
            </div>
          </div>
        </div>

        <div className=" flex flex-col flex-1 gap-4">
          <p className="font-semibold">
            Images:
            <span className=" ml-2 text-gray-400 font-normal">
              La primera imagen sera la portada (max 6)
            </span>
          </p>
          <div className="flex gap-4">
            <input
              className="p-3 border border-gray-300 rounded w-full"
              type="file"
              id="images"
              accept="image/*"
              multiple
            />
            <button className="p-3 text-green-700 border border-green-700 rounded uppercase ">
              Upload
            </button>
          </div>
          <button 
            className="p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
            Create Listing
          </button>
        </div>
      </form>
    </main>
  );
}
