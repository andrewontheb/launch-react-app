import React, { useCallback, useState } from "react";

const LsSetImages = (images: Image[]) => {
    localStorage.setItem('images', JSON.stringify(images));
};

const LsGetImages = (): Image[] => {
    const json = localStorage.getItem('images') || '[]';
    try {
        return JSON.parse(json);
    } catch (e) {
        return [];
    }
};

export interface Image {
    src: string;
    liked: boolean;
}

export const ImageFinder: React.FC = () => {
    const [images, setImages] = useState<Image[]>(LsGetImages());
    const [searchUrl, setSearchUrl] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = useCallback((imgUrl: string) => {
        if(!imgUrl.length) {
            setErrorMessage( 'Type something, please');
            return;
        }

        if (!imgUrl.endsWith('.jpeg') && !imgUrl.endsWith('.jpg') && !imgUrl.endsWith('.png')) {
            setErrorMessage('Provided url is not valid image url.');
            return;
        }

        (async () => {
            const response = await fetch(imgUrl);
            if (response.ok) {
                const contentType = response.headers.get('content-type') || '';
                if (contentType.includes('jpeg') || contentType.includes('jpg') || contentType.includes('.png')) {
                    setImages([...images, {src: imgUrl, liked: false}]);
                    LsSetImages([...images, {src :imgUrl, liked: false}]);
                    setErrorMessage('');
                }
            } else {
                setErrorMessage('Provided url is not valid image url.');
                return;
            }
        })();

    }, [images]);

    const handleDelete = useCallback( (index: number) => {
        const newImages = [
            ...images.slice(0,index),
            ...images.slice(index + 1),
        ];
        setImages(newImages);
        LsSetImages(newImages);
    }, [images]);

    const handleLike = useCallback( (event, likedIndex: number) => {

        const newImages  = images.map((image, index) => {
           if (likedIndex === index) {
                image = {src: images[likedIndex].src, liked: !images[likedIndex].liked};
           }
           return image;
        });
        setImages(newImages);
        LsSetImages(newImages);
        setErrorMessage('');
        event.currentTarget.classList.toggle('is-checked');
    }, [images]);

    return (
        <main>
            <p>Let's find some images !</p>
            <div>
                <div className="form-group">
                    <form onSubmit={(event) => {
                        event.preventDefault();
                        handleSubmit(searchUrl);
                    }}>
                        <input type="text" placeholder="Paste your url here" value={searchUrl} onChange={(event) => setSearchUrl(event.currentTarget.value)} />
                        <button className="btn btn--lime" type="submit">Go!</button>
                    </form>
                </div>
                {
                    errorMessage.length ? <h1>{ errorMessage } <p className="unicode_symbol">&#9785;</p></h1> : ''
                }
                <div className="gallery">
                    {
                        images.map((image, index) => <div className="gallery__item" key={index} >
                            <div className="spreader"></div>
                            <img src={`${image.src}`} alt=""/>
                            <button className="btn btn--close"  onClick={() => {handleDelete(index)}}>X</button>
                            <span className="placeholder">placeholder</span>
                            <div onClick={(e) => handleLike(e, index)} className={image.liked ? 'is-checked': ''}>
                                <svg height="35" width="50"  viewBox="0 0 32 32" className="icon is-outlined is-hoverable is-transit is-activeable">
                                    <path id="heart-icon" d="M16,28.261c0,0-14-7.926-14-17.046c0-9.356,13.159-10.399,14-0.454c1.011-9.938,14-8.903,14,0.454 C30,20.335,16,28.261,16,28.261z"/>
                                </svg>
                            </div>
                        </div>)
                    }
                </div>
            </div>
        </main>
    )
};
