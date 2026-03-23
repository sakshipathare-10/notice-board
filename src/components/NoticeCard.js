import { motion } from "framer-motion";

const isNew = (date) => {
  const today = new Date();
  const noticeDate = new Date(date);
  return (today - noticeDate) / (1000 * 60 * 60 * 24) < 3;
};

const NoticeCard = ({ notice, index, deleteNotice, isAdmin }) => {
  return (
    <motion.div
      initial={{ opacity: 0, rotate: -2, y: 40 }}
      animate={{ opacity: 1, rotate: 0, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.03, rotate: 1 }}
      className={`p-5 rounded-lg shadow-lg relative ${
        notice.pinned
          ? "bg-yellow-200 border-l-4 border-yellow-600"
          : "bg-yellow-100"
      }`}
    >
      <div className="absolute -top-2 left-1/2 -translate-x-1/2 text-xl">
        📌
      </div>

      <h2 className="font-bold text-lg">{notice.title}</h2>
      <p className="text-gray-700 mt-2">{notice.description}</p>

      <div className="flex justify-between text-sm mt-3 text-gray-600">
        <span>{notice.category}</span>
        <span>{notice.date}</span>
      </div>

      <div className="flex gap-2 mt-2">
        {notice.pinned && (
          <span className="bg-yellow-600 text-white px-2 rounded text-xs">
            PINNED
          </span>
        )}
        {isNew(notice.date) && (
          <span className="bg-blue-600 text-white px-2 rounded text-xs">
            NEW
          </span>
        )}
      </div>

      {isAdmin && (
        <button
          onClick={() => deleteNotice(notice.id)}
          className="text-red-600 text-sm mt-3"
        >
          🗑 Delete
        </button>
      )}
    </motion.div>
  );
};

export default NoticeCard;