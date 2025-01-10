import ImageCard from "../ImageCard/ImageCard";
import s from "./ImageGallery.module.css";

const ImageGallery = ({ picture, onImageClick }) => {
  return (
    <ul className={s.list}>
      {picture.map(({ id, urls: { small, regular }, alt_description }) => (
        <li
          key={id}
          className={s.item}
        >
          <ImageCard
            small={small}
            regular={regular}
            alt_description={alt_description}
            onImageClick={() =>
              onImageClick({ modalPict: regular, altDescr: alt_description })
            }
          />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;