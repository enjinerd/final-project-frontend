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
    <div className="px-4 py-8 space-y-3 lg:px-8">
      <p className="text-xl font-bold text-gray-800 font-primary">
        Berita Terbaru
      </p>
      {loading ? (
        <div className="text-center">
          <div className="flex items-center justify-center p-12">
            <div className="w-20 h-20 border-b-2 border-gray-900 rounded-full animate-spin"></div>
          </div>
        </div>
      ) : (
        <>
          <div className="space-y-2">
            {news.map((item) => (
              <div
                className="flex flex-col p-3 space-y-1 transition-colors duration-200 bg-white rounded-lg shadow-lg hover:bg-gray-200"
                key={item.id}
              >
                <div className="flex items-center">
                  <img
                    src={item.image.medium}
                    alt={item.title}
                    className="w-12 h-12 rounded-full"
                  />
                  <div className="ml-4">
                    <p className="text-sm font-bold text-gray-800 font-primary">
                      {item.title}
                    </p>
                    <p className="text-xs font-medium text-gray-600">
                      {new Date(item.isoDate).toLocaleDateString("id-ID", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-gray-600">{item.content}</p>
              </div>
            ))}
          </div>
          {!allNews && (
            <div>
              <Link to="/user/news">
                <p className="text-lg font-bold text-center text-gray-800 font-primary">
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
