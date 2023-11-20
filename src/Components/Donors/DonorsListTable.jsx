/** @format */

import { useEffect, useState } from "react";
import useCurrentUser from "../../hooks/useCurrentUser";
import DonorListTableRow from "./DonorListTableRow";
import getDonors from "../../utils/getDonors";
import Loader from "../Loader";
import EmptyData from "../EmptyData";
import DonorLogModal from "../../Modals/DonerLog/DonorLogModal";

const DonorsListTable = () => {
  const { role } = useCurrentUser();
  const [searchItem, setSearchItem] = useState("name");
  const [status, setStatus] = useState(null);
  const [searchValue, setSearchValue] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [donorInfo, setDonorInfo] = useState({});

  let url = "https://plasma-plus-server.vercel.app/donors/search";

  if (searchValue) {
    url += `?${searchItem}=${encodeURIComponent(searchValue)}&isAbleToDonate=${
      status || ""
    }`;
  }

  const { donors, isLoading, refetch } = getDonors(url);

  useEffect(() => {
    refetch();
  }, [searchValue, status]);

  const openModal = (donor) => {
    setDonorInfo(donor);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setDonorInfo({});
    setIsModalOpen(false);
  };

  return (
    <>
      <h2 className="text-3xl text-center font-bold pt-10">
        Find a <span className="base-txt">donor</span> to connect
      </h2>
      <p className="text-center py-2 base-txt">
        {Array.isArray(donors) && donors.length} Donors Found
      </p>
      <div className="lg:w-4/5 mx-auto my-10 p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="w-full">
            <select
              onChange={(e) => setSearchItem(e.target.value)}
              className="input-file bg-transparent"
            >
              <option value="name">Name</option>
              <option value="city">City</option>
              <option value="bloodGroup">Blood-Group</option>
              <option value="phone">Phone</option>
            </select>
          </div>
          <input
            type="search"
            className="input-file"
            placeholder="Search donor by name, location, phone...."
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <div className="w-max flex items-center gap-1">
            <span className="font-bold base-txt">Status:</span>
            <div className="w-max">
              <select
                onChange={(e) => setStatus(e.target.value)}
                className="input-file bg-transparent"
              >
                <option value="">All</option>
                <option value="true">Available</option>
                <option value="false">Unavailable</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className="overflow-y-auto container mx-auto mb-40 p-4 min-h-[500px]">
        {isLoading && <Loader />}
        {donors && Array.isArray(donors) && donors.length > 0 ? (
          <table className="table w-max lg:w-full">
            <thead>
              <tr>
                <th>Name</th>
                <th>Blood group</th>
                <th>Location</th>
                <th>Phone</th>
                <th>Status</th>
                <th>Last donation</th>
                {role === "admin" && <th colSpan={2}>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {donors.map((donor) => (
                <DonorListTableRow
                  key={donor._id}
                  donor={donor}
                  refetch={refetch}
                  openModal={openModal}
                />
              ))}
            </tbody>
          </table>
        ) : (
          !isLoading && (
            <EmptyData
              go={"Search again"}
              message={"Please search again with different parameters"}
              reason={"No donor found"}
            />
          )
        )}
        {!donors && !isLoading && (
          <EmptyData
            go={"Add donor"}
            message={"Please add some donor"}
            reason={"No donor found"}
          />
        )}
      </div>

      <DonorLogModal
        close={closeModal}
        donor={donorInfo}
        open={isModalOpen}
        refetch={refetch}
      />
    </>
  );
};

export default DonorsListTable;
