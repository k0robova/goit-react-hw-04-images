import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Searchbar } from './Searchbar/Searchbar';
import { fetchImagesBySearch } from 'api';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { Loader } from './Loader/Loader';

export function App() {
  const [images, setImages] = useState([]);
  const [imageNameTwoQuery, setImageNameTwoQuery] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');

  const handleSearchFormSubmit = imageName => {
    if (imageNameTwoQuery === imageName) {
      // alert ?
      return;
    }
    setImageNameTwoQuery(imageName);
    setPage(1);
    setImages([]);
    setLoadMore(false);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!imageNameTwoQuery) return;

      setLoading(true);

      try {
        const imagesData = await fetchImagesBySearch(imageNameTwoQuery, page);

        if (imagesData.hits.length !== 0) {
          setImages(prevImages => [...prevImages, ...imagesData.hits]);
          setLoadMore(page < Math.ceil(imagesData.totalHits / 12));
        } else {
          toast.error('No images found! Please try a different search.');
        }
      } catch (error) {
        setError(true);
        setImages([]);
        toast.error(
          'Oops! Something went wrong! Please try reloading this page!'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [imageNameTwoQuery, page]);

  const handleImageClick = image => {
    setIsShowModal(true);
    setLargeImageURL(image.largeImageURL);
  };

  const handleModalClose = () => {
    setIsShowModal(false);
    setLargeImageURL('');
  };

  return (
    <div>
      <Searchbar onHandleSearchFormSubmit={handleSearchFormSubmit} />

      {!imageNameTwoQuery && <h2>You can try to find something!</h2>}

      {loading && <Loader />}

      <ImageGallery
        items={images}
        loading={loading}
        onImageClick={handleImageClick}
      />

      {images.length > 0 && loadMore && <Button onClick={handleLoadMore} />}

      {isShowModal && (
        <Modal largeImageURL={largeImageURL} onClose={handleModalClose} />
      )}

      <ToastContainer autoClose={3000} />
    </div>
  );
}
