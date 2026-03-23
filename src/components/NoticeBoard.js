import { useState, useEffect } from "react";
import NoticeCard from "./NoticeCard";
import Filters from "./Filters";
import AddNoticeForm from "./AddNoticeForm";
import Login from "./Login";
import noticesData from "../data/notices";

const NoticeBoard = () => {
  const [notices, setNotices] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [year, setYear] = useState(new Date().getFullYear());


  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("notices"));
    const admin = localStorage.getItem("admin");

    if (saved && saved.length > 0) {
      setNotices(saved);
    } else {
      setNotices(noticesData);
    }

    if (admin === "true") setIsAdmin(true);
  }, []);


  useEffect(() => {
    localStorage.setItem("notices", JSON.stringify(notices));
  }, [notices]);

  useEffect(() => {
    if (notices.length > 0) {
      const uniqueYears = [
        ...new Set(notices.map((n) => Number(n.year))),
      ].sort((a, b) => b - a);

      setYear(uniqueYears[0]);
    }
  }, [notices]);


  const years = notices.length
    ? [...new Set(notices.map((n) => Number(n.year)))]
        .filter(Boolean)
        .sort((a, b) => b - a)
    : [new Date().getFullYear()];

  const categories = [
    "All",
    ...new Set(notices.map((n) => n.category).filter(Boolean)),
  ];

  const addNotice = (notice) => {
    setNotices([{ ...notice, id: Date.now() }, ...notices]);
  };

  const deleteNotice = (id) => {
    setNotices(notices.filter((n) => n.id !== id));
  };


  const logout = () => {
    setIsAdmin(false);
    localStorage.removeItem("admin");
  };


  const filtered = notices
    .filter((n) => Number(n.year) === Number(year))
    .filter((n) =>
      n.title.toLowerCase().includes(search.toLowerCase())
    )
    .filter((n) =>
      category === "All" ? true : n.category === category
    )
    .sort((a, b) => b.pinned - a.pinned);

  return (
    <div className="min-h-screen bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')] p-6">
      <div className="max-w-4xl mx-auto bg-white/70 backdrop-blur-lg p-6 rounded-2xl shadow-2xl">


        <div className="flex justify-between items-center mb-4">
          <h1 className="text-4xl font-extrabold text-indigo-700">
            📌 College Notice Board
          </h1>

          {isAdmin && (
            <button
              onClick={logout}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Logout
            </button>
          )}
        </div>

       
        {isAdmin ? (
          <p className="text-green-600 mb-2">Admin Mode 🔐</p>
        ) : (
          <p className="text-gray-500 mb-2">Viewer Mode 👀</p>
        )}

        {!isAdmin && (
          <button
            onClick={() => setShowLogin(true)}
            className="bg-indigo-600 text-white px-4 py-2 rounded mb-4"
          >
            Admin Login
          </button>
        )}

        {showLogin && !isAdmin && (
          <div className="mb-4">
            <Login setIsAdmin={setIsAdmin} />
            <button
              onClick={() => setShowLogin(false)}
              className="text-red-500 text-sm mt-2"
            >
              Cancel
            </button>
          </div>
        )}

      
        <Filters
          search={search}
          setSearch={setSearch}
          category={category}
          setCategory={setCategory}
          year={year}
          setYear={setYear}
          years={years}
          categories={categories}
        />

        {isAdmin && <AddNoticeForm addNotice={addNotice} />}

        <div className="space-y-4 mt-4">
          {filtered.length > 0 ? (
            filtered.map((notice, i) => (
              <NoticeCard
                key={notice.id}
                notice={notice}
                index={i}
                deleteNotice={deleteNotice}
                isAdmin={isAdmin}
              />
            ))
          ) : (
            <p className="text-center text-gray-500">
              No notices found 😕
            </p>
          )}
        </div>

      </div>
    </div>
  );
};

export default NoticeBoard;