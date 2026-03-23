import { useState } from "react";

const AddNoticeForm = ({ addNotice }) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    category: "Exam",
    pinned: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    addNotice({
      ...form,
      year: new Date(form.date).getFullYear(),
    });

    setForm({
      title: "",
      description: "",
      date: "",
      category: "Exam",
      pinned: false,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2 mb-4">
      <input
        placeholder="Title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        className="border p-2 w-full rounded"
      />

      <input
        placeholder="Description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        className="border p-2 w-full rounded"
      />

      <input
        type="date"
        value={form.date}
        onChange={(e) => setForm({ ...form, date: e.target.value })}
        className="border p-2 w-full rounded"
      />

      <select
        value={form.category}
        onChange={(e) => setForm({ ...form, category: e.target.value })}
        className="border p-2 w-full rounded"
      >
        <option>Exam</option>
        <option>Event</option>
        <option>Holiday</option>
      </select>

      <label className="flex gap-2">
        <input
          type="checkbox"
          checked={form.pinned}
          onChange={(e) => setForm({ ...form, pinned: e.target.checked })}
        />
        Pin this notice
      </label>

      <button className="bg-indigo-600 text-white px-4 py-2 rounded w-full">
        Add Notice
      </button>
    </form>
  );
};

export default AddNoticeForm;