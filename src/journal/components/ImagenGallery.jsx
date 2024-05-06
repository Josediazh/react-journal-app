import { ImageListItem, ImageList } from "@mui/material";

export const ImageGallery = ({images,title}) => {  

  return (
    <ImageList sx={{ width: '100%', height: 500 }} cols={4} rowHeight={200}>
      { images.map((img) => (
        <ImageListItem key={img}>
          <img
            src={img}
            srcSet={img}
            alt={title}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}