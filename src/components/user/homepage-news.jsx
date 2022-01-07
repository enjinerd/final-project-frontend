import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
export function HomepageNews({ allNews }) {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://berita-indo-api.vercel.app/v1/okezone-news?title=vaksin")
      .then((res) => {
        if (allNews) {
          setNews(res.data.data);
        } else {
          setNews(res.data.data?.slice(0, 3));
        }
        setLoading(false);
      });
  }, []);
  return (
    <div className="py-8 space-y-3 lg:px-8">
      <p className="font-bold font-primary text-base text-left md:text-lg">
        Berita Terbaru
      </p>
      {loading ? (
        <div className="text-center">
          <div className="flex items-center justify-center p-12">
            <div className="animate-spin border-b-2 border-gray-900 h-20 rounded-full w-20"></div>
          </div>
        </div>
      ) : (
        <>
          <div className="space-y-2">
            {news.map((item) => (
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={item.link}
                className="bg-white duration-200 flex flex-col p-3 rounded-lg shadow-lg space-y-1 transition-colors hover:bg-gray-200"
                key={item.id}
              >
                <div className="flex items-center">
                  <img
                    src={item.image.medium}
                    alt={item.title}
                    className="h-12 rounded-full w-12"
                  />
                  <div className="ml-4">
                    <p className="font-bold font-primary text-gray-800 text-xs md:text-sm">
                      {item.title}
                    </p>
                    <p className="font-medium text-gray-600 text-xs">
                      {new Date(item.isoDate).toLocaleDateString("id-ID", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>
                <p className="text-gray-600 text-xs md:text-sm">
                  {item.content}
                </p>
              </a>
            ))}
          </div>
          {!allNews && (
            <div>
              <Link to="/user/news">
                <p className="font-bold font-primary text-base text-center md:text-lg">
                  Lihat Berita Lainnya...
                </p>
              </Link>
            </div>
          )}
        </>
      )}
    </div>
  );
}
