/** @format */

const BloodRequestMsg = ({ open, message, close }) => {
  return (
    <>
      <dialog open={open} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg base-txt">Message</h3>
          <p className="py-4">{message}</p>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button onClick={() => close()}>close</button>
        </form>
      </dialog>
    </>
  );
};

export default BloodRequestMsg;
