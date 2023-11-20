/** @format */

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { FreeMode, Pagination } from "swiper/modules";
import { useState } from "react";
import EditArticleModal from "../../../Modals/ArticleModal/EditArticleModal";
import AddArticles from "./AddArticles";
import ArticleCard from "./ArticleCard";
import getArticles from "../../../utils/getArticles";
import useCurrentUser from "../../../hooks/useCurrentUser";
import BloodRequestMsg from "../../../Modals/adminModal/BloodRequestMsg";

const Articles = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isMessageOpen, setIsMessageOpen] = useState(false);
  const [editableArticle, setEditableArticle] = useState({});
  const { role } = useCurrentUser();
  const { articles, isLoading, refetch } = getArticles();
  const [messages, setMessages] = useState("");

  const handleEditArticle = (article) => {
    setIsEditModalOpen(true);
    setEditableArticle(article);
  };

  const closeModal = () => {
    setIsEditModalOpen(false);
    setEditableArticle({});
  };

  const openMessage = (msg) => {
    setMessages(msg);
    setIsMessageOpen(true);
  };

  const closeMessage = () => {
    setMessages("");
    setIsMessageOpen(false);
  };

  return (
    <>
      <div className="container mx-auto px-4 my-40">
        {isLoading && (
          <div className="text-center">
            <span className="loading loading-dots loading-lg base-txt"></span>
          </div>
        )}
        <div>
          {articles && Array.isArray(articles) && articles.length > 0 && (
            <Swiper
              slidesPerView={3}
              spaceBetween={30}
              freeMode={true}
              pagination={{
                clickable: true,
              }}
              breakpoints={{
                640: {
                  slidesPerView: 1,
                  spaceBetween: 20,
                },
                390: {
                  slidesPerView: 1,
                  spaceBetween: 30,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 30,
                },
              }}
              modules={[FreeMode, Pagination]}
              className="mySwiper"
            >
              {role === "admin" && (
                <SwiperSlide>
                  <AddArticles refetch={refetch} />
                </SwiperSlide>
              )}
              {articles.map((article) => (
                <SwiperSlide key={article._id}>
                  <ArticleCard
                    key={article._id}
                    article={article}
                    handleEditArticle={handleEditArticle}
                    refetch={refetch}
                    openMessage={openMessage}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
        <EditArticleModal
          open={isEditModalOpen}
          close={closeModal}
          article={editableArticle}
          refetch={refetch}
        />
      </div>
      <BloodRequestMsg
        close={closeMessage}
        message={messages}
        open={isMessageOpen}
      />
    </>
  );
};

export default Articles;
