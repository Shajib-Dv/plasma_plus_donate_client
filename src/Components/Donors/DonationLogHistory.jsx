/** @format */
import { Collapse } from "react-collapse";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
const DonationLogHistory = ({ toggle, open, data }) => {
  const { _id, donorId, ...dataKey } = data;

  const allDataKeys = Object.keys(dataKey);

  return (
    <div>
      <div
        className="flex items-center justify-between text-2xl font-bold mb-3"
        onClick={toggle}
      >
        <p>Receiver: {data?.receiverName}</p>
        <div className="base-txt">
          {open ? <AiOutlineMinusCircle /> : <AiOutlinePlusCircle />}
        </div>
      </div>
      <Collapse isOpened={open}>
        <div>
          {allDataKeys.map((key) => (
            <div
              key={key}
              className="flex items-center justify-between border-y border-opacity-20 p-1"
            >
              <div className="flex-1">
                <p className="capitalize">{key}:</p>
              </div>
              <div className="flex-1">
                <p className="text-left ">{dataKey[key]}</p>
              </div>
            </div>
          ))}
        </div>
      </Collapse>
    </div>
  );
};

export default DonationLogHistory;
