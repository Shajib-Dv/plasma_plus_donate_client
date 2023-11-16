/** @format */

const BloodRequestMsg = ({ open, message, close }) => {
  return (
    <>
      <dialog open={open} className="modal">
        <div className="modal-box base-bg border">
          <h3 className="font-bold text-lg text-black">Message</h3>
          <p className="py-4 text-white">{message}</p>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button onClick={() => close()}>close</button>
        </form>
      </dialog>
    </>
  );
};

export default BloodRequestMsg;
