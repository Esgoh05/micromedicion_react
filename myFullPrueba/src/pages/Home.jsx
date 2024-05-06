import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css"



const images = [
    {
      original: 'https://via.placeholder.com/400x150',
      thumbnail: 'https://via.placeholder.com/150',
      description: 'Image 1',
    },
    {
      original: 'https://via.placeholder.com/400x150',
      thumbnail: 'https://via.placeholder.com/150',
      description: 'Image 2',
    },
    {
      original: 'https://via.placeholder.com/400x150',
      thumbnail: 'https://via.placeholder.com/150',
      description: 'Image 3',
    },
  ];

const Home = () => {
  return (
    
        <>
            <div>
            <ImageGallery items={images} 
                showPlayButton={false}
                showFullscreenButton={false}
                showThumbnails={false}
                showBullets={true}
                slideDuration={1000}
                originalHeight='auto'
                originalWidth='100%'/>
            </div>
        </>
    
  )
}

export default Home