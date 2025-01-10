import { useEffect, useState } from "react";
import { fetchArticles } from "./api";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import SearchBar from "./components/SearchBar/SearchBar";
import Loader from "./components/Loader/Loader";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import toast from "react-hot-toast";
import ImageModal from "./components/ImageModal/ImageModal";

// const YOUR_ACCESS_KEY = "2-bJ2fciUFoCkOFNWuFZoQUdJiHGeGnjrlmSTEDM5pM";

const App = () => {
  const [picture, setPicture] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [selectedPict, setSelectedPic] = useState({});

  useEffect(() => {
    if (!query) {
      return;
    }

    const findThePicture = async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        const data = await fetchArticles(query, page);
        setPicture((prev) => [...prev, ...data]);
        setIsLoading(false);
      } catch (error) {
        setIsError(true);
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    findThePicture();
  }, [query, page]);

  const handleChangePage = () => {
    setPage((prev) => prev + 1);
  };

  const handleChangeQuery = (newQuery) => {
    if (newQuery === query) {
      toast.error("Enter new text to search for images!");
      return;
    }
    setQuery(newQuery);
    setPicture([]);
    setPage(1);
  };

  const openModal = (picture) => {
    setIsOpen(true);
    setSelectedPic(picture);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedPic(null);
  };

  return (
    <div>
      <SearchBar onHandleChangeQuery={handleChangeQuery} />
      {isLoading && <Loader />}
      {isError && <h2>Something went wrong! Try again...</h2>}
      <ImageGallery
        picture={picture}
        onImageClick={openModal}
      />
      <ImageModal
        isOpen={modalIsOpen}
        onClose={closeModal}
        picture={selectedPict}
      />
      {picture.length > 0 && (
        <LoadMoreBtn onHandleChangePage={handleChangePage} />
      )}
    </div>
  );
};

export default App;