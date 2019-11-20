import React, { useCallback, useState } from "react";

const LsSetImages = (images: string[]) => {
    localStorage.setItem('images', JSON.stringify(images));
};

const LsGetImages = (): string[] => {
    const json = localStorage.getItem('images') || '[]';
    try {
        return JSON.parse(json);
    } catch (e) {
        return [];
    }
};

export const FirstTab: React.FC = () => {
    const [images, setImages] = useState<string[]>(LsGetImages());
    const [searchUrl, setSearchUrl] = useState('');
    const [isError, setIsError] = useState(false);
    const handleSubmit = useCallback((imgUrl: string) => {
        if(!imgUrl.length) {
            return;
        }
        if (!imgUrl.endsWith('.jpeg') && !imgUrl.endsWith('.jpg') && !imgUrl.endsWith('.png')) {
            setIsError(true);
            return;
        }
        setImages([...images, imgUrl]);
        LsSetImages([...images, imgUrl]);
        setIsError(false);
    }, [images]);
    const handleDelete = useCallback( (index: number) => {
        const newImages = [
            ...images.slice(0,index),
            ...images.slice(index + 1),
        ];
        setImages(newImages);
        LsSetImages(newImages);
    }, [images])
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
                    isError ? <h1>There are no such results <p className="unicode_symbol">&#9785;</p></h1> : ''
                }
                <div className="gallery">
                    {
                        images.map((image, index) => <div className="gallery__item" key={index}>
                            <div className="wrapp"></div>
                            <img src={`${image}`} alt=""/>
                            <button className="btn btn--close"  onClick={() => {handleDelete(index)}}>X</button>
                            <span className="placeholder">placeholder</span>
                        </div>)
                    }
                </div>
            </div>
        </main>
    )
};
