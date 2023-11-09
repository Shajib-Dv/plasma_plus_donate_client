/** @format */
import EmptyData from "../../Components/EmptyData";
import Loader from "../../Components/Loader";
import RequestedBloodTable from "../../Components/admin/RequestedBloodTable";
import getCurrentBloodRequest from "../../utils/getCurrentBloodRequest";

const BloodRequest = () => {
  const { requestedBloods, isLoading, refetch } = getCurrentBloodRequest();

  return (
    <>
      <div className="my-10">
        <h2 className="text-3xl text-black font-bold text-center">
          Recent Blood Requests
        </h2>
      </div>
      <div className="overflow-y-auto container mx-auto mb-40">
        {isLoading && <Loader />}
        {requestedBloods &&
        Array.isArray(requestedBloods) &&
        requestedBloods.length > 0 ? (
          <table className="space-y-6 table lg:w-full w-max">
            <thead>
              <tr>
                <th>Name</th>
                <th>blood group</th>
                <th>Location</th>
                <th>Date</th>
                <th>Phone</th>
                <th>Message</th>
                <th colSpan={2} className="text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {requestedBloods.map((blood) => (
                <RequestedBloodTable
                  key={blood._id}
                  blood={blood}
                  refetch={refetch}
                />
              ))}
            </tbody>
          </table>
        ) : (
          !isLoading && (
            <EmptyData
              go={"/"}
              message={"go back to home"}
              reason={"No blood request found !"}
              to={"/"}
            />
          )
        )}
      </div>
    </>
  );
};

export default BloodRequest;
