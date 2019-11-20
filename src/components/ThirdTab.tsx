import React, { useState, useCallback } from "react";
import { useLaunchProfileQuery } from '../generated/graphql';
import ClipLoader from 'react-spinners/ClipLoader';

const LaunchDetails: React.FC<{id: string}> = ({ id = '15'}: {id: string}) => {
    const { data, error, loading } = useLaunchProfileQuery({ variables: { id } });

    if (loading) {
        return <ClipLoader
            sizeUnit={"px"}
            size={250}
            color={'#09d3ac'}
            loading={true}/>;
    }

    if (error) {
        return <div>
            <h1>{error.message}</h1>
            <h1>Try to select launch from 1 to 100</h1>
        </div>;
    }

    if (!data) {
        return <div>Select a flight from the panel</div>;
    }

    let responseData = JSON.stringify(data.launch);
    let launch = JSON.parse(responseData);

    return   <div className="launch">
        <div className="launch__id">{`Flight ${launch.flight_number} (${launch.launch_year}):`} <b className={launch.launch_success ? 'success' : 'failure'}>{launch.launch_success ? 'Success' : 'Failure'}</b></div>
        <div className="launch__model-info">{`${launch.mission_name} (${launch.rocket.rocket_name} ${launch.rocket.rocket_type})`}</div>
        <div className="launch__descript"><p>{launch.details}</p></div>
        {launch.links.flickr_images.length ? (<div className="launch__img" style={{backgroundImage: `url(${launch.links.flickr_images[0]})`}}>
            <img src={`${launch.links.flickr_images[0]}`} alt=""/></div>) : ('Unfortunately there is no photos from this launch')}
        </div>
};


export const ThirdTab: React.FC = () => {
    const [launchId, setLaunchId] = useState<string>('15');
    const [inputValue, setInputValue] = useState<string>('15');
    const handleSubmit = useCallback((e: React.FormEvent) => {
        if (!inputValue.length) {
            return;
        }
        e.preventDefault();
        setLaunchId(inputValue);
    }, [inputValue]);

    return (
        <main>
            <p>Type a launch id. From 1 to 100.</p>
            <div className="form-group second-tab">
                <form onSubmit={handleSubmit}>
                    <input type="number" min="1" placeholder="Type number of launch here" value={inputValue}
                           onChange={(event) => setInputValue(event.currentTarget.value)}/>
                    <button className="btn btn--peach" type="submit">Go!</button>
                </form>
                <LaunchDetails id={launchId}></LaunchDetails>
            </div>
        </main>
    )
};

