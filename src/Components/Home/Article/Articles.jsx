/** @format */

import { useState } from "react";
import EditArticleModal from "../../../Modals/ArticleModal/EditArticleModal";
import AddArticles from "./AddArticles";
import ArticleCard from "./ArticleCard";

const Articles = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editableArticle, setEditableArticle] = useState({});
  const handleEditArticle = (article) => {
    setIsEditModalOpen(true);
    setEditableArticle(article);
  };

  const closeModal = () => {
    setIsEditModalOpen(false);
    setEditableArticle({});
  };

  return (
    <div className="container mx-auto px-4 my-40">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <ArticleCard handleEditArticle={handleEditArticle} />
        {/* Only admin can see and add article */}
        <AddArticles />
      </div>
      <EditArticleModal
        open={isEditModalOpen}
        close={closeModal}
        article={editableArticle}
      />
    </div>
  );
};

export default Articles;
