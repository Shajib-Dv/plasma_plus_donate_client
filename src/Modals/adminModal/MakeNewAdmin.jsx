/** @format */
import { useState } from "react";
import { FaTimes } from "react-icons/fa";
const MakeNewAdmin = ({ open, close }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState("admin");
  const [err, setErr] = useState("");

  const handleModerate = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);

    const sendRole = { role };

    const res = await fetch(`http://localhost:3000/users/${email}`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(sendRole),
    })
      .then((res) => res.json())
      .catch((err) => {
        setLoading(false);
        setErr(err.message);
      });

    if (res.message) {
      setErr(res.message);
      setLoading(false);
    } else {
      setLoading(false);
      e.target.reset();
      setRole("admin");
      close();
    }
  };
  return (
    <div
      className={`fixed ${
        open ? "top-0 right-0" : "-top-[9999px]"
      } z-50 backdrop-blur-[2px] h-max w-full transition-all duration-500 ease-in-out pt-4`}
    >
      <div className="lg:w-3/12 rounded-md shadow-sm h-max base-bg mx-auto p-2 relative">
        <form onSubmit={handleModerate}>
          <div className="flex gap-2 items-center">
            <div className="text-white">
              <label className="label font-bold">
                <span>Moderator email</span>
              </label>
              <input
                type="email"
                className="input-file text-black"
                placeholder="example@gmail.com"
                required={true}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="w-1/2">
              <label className="label font-bold text-white">
                <span>Moderator email</span>
              </label>
              <select
                onChange={(e) => setRole(e.target.value)}
                className="
          input-file bg-base-100 text-black"
              >
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
            </div>
          </div>

          <div className="text-center mt-2">
            <button
              disabled={loading}
              type="submit"
              className="btn btn-warning w-40 capitalize"
            >
              {loading ? (
                <span className="loading loading-dots loading-sm text-white"></span>
              ) : (
                "Approve"
              )}
            </button>
            <div className="h-4">
              {err && <span className="text-xs text-white">{err}</span>}
            </div>
          </div>
        </form>
        <div
          onClick={close}
          className="absolute -top-2 -right-2 btn btn-ghost btn-circle"
        >
          <FaTimes className="text-2xl text-white" />
        </div>
      </div>
    </div>
  );
};

export default MakeNewAdmin;
