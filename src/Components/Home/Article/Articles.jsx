/** @format */

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {articles &&
            Array.isArray(articles) &&
            articles.length > 0 &&
            articles.map((article) => (
              <ArticleCard
                key={article._id}
                article={article}
                handleEditArticle={handleEditArticle}
                refetch={refetch}
                openMessage={openMessage}
              />
            ))}

          {role === "admin" && <AddArticles refetch={refetch} />}
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
