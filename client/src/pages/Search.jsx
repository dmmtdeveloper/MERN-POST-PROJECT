export default function Search() {
  return (
    <div className="flex flex-col md:flex-row">
      <div className="border-b-2 p-7 md:min-h-screen md:border-r-2">
        <form className="flex-col flex gap-8">
          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap font-semibold">Search Term:</label>
            <input
              className="w-full rounded-xl border p-3"
              id="seacrh"
              placeholder="Seacrh"
              type="search"
            />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <label className="font-semibold">Type</label>
            <div className="flex gap-2">
              <input className="w-4" type="checkbox" id="all" />
              <span></span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <label className="font-semibold">Sort:</label>
            <select className="border rounded-lg p-3" id="sord_order">
                <option >Lastest</option>
                <option >Oldest</option>
            </select>
          </div>
          <button className="bg-slate-700 text-white p-3 rounded-xl uppercase hover:opacity-95 ">Search</button>
        </form>
      </div>
      <div className="text-3xl font-semibold p-3 text-slate-700">
        <h1>Listing results:</h1>
      </div>
    </div>
  );
}
