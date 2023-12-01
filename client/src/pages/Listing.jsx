import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import {
  FaBath,
  FaBed,
  FaCar,
  FaChair,
  FaDollarSign,
  FaHamburger,
  FaHotel,
  FaMapMarkedAlt,
  FaMapMarkerAlt,
  FaParking,
  FaShare,
} from "react-icons/fa";

export default function Listing() {
  SwiperCore.use([Navigation]);
  const [copied, setCopied] = useState();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const params = useParams();

  useEffect(() => {
    try {
      const fetchListing = async () => {
        setLoading(true);
        const res = await fetch(`/api/listing/get/${params.listingId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        setLoading(false);
        setError(false);
      };
      fetchListing();
    } catch (error) {
      setError(true);
      setLoading(false);
    }
  }, [params.listingId]);

  return (
    <main className="">
      {loading && <p className="text-center text-2xl ">Loadin...</p>}
      {error && <p className="text-center text-2xl ">Something went wrong!</p>}
      {listing && !loading && !error && (
        <div className="">
          <Swiper navigation>
            {listing.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className=" sm: h-[300px] md:h-[600px] lg:h-[400px]"
                  style={{
                    background: `url(${url}) center  no-repeat`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundAttachment: "fixed",
                    objectFit: "cover",
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer">
            <FaShare
              className="text-slate-500"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 2000);
              }}
            />
          </div>
          {copied && (
            <p className="fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2">
              Link copied!
            </p>
          )}

          <div className="flex flex-col max-w-4xl mx-auto p-3  gap-2">
            <p className="text-3xl font-semibold pb-4">{listing.name}</p>
            <p className="flex items-center mt-6 gap-2 text-slate-600  text-sm">
              <FaMapMarkerAlt className="text-green-700" />
              {listing.address}
            </p>

            <div>
              <p className="text-slate-800">
                <span className="font-semibold text-black">
                  Description - {``}
                </span>
                {listing.description}
              </p>

              <div className="flex gap-5 pt-4 text-green-700 flex-wrap">
                <a>
                  <FaHotel className="text-lg flex items-center mx-auto" />
                  {listing.hotel ? "recommended" : "not recommended"}
                </a>
                <a>
                  <FaHamburger className="text-lg flex items-center mx-auto" />
                  {listing.restaurant ? "Well" : "not very good"}
                </a>
                <a>
                  <FaDollarSign className="text-lg flex items-center mx-auto" />
                  {listing.price ? "not very expensive" : "expensive"}
                </a>
                <a>
                  <FaCar className="text-lg flex items-center mx-auto" />
                  {listing.touristSpot ? "god trasportation" : "expensive"}
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
