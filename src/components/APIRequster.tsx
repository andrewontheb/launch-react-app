import React, { useState, useCallback } from "react";
import axios from 'axios';


export const APIRequester: React.FC = () => {
    const [data, setData] = useState<string[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const handleSubmit = useCallback((param: string) => {
        (async () => {
            let response: any;
            try {
                if(!param.length) {
                    return;
                }
                response = await axios(`https://api.github.com/users/${param}`);
            } catch (err) {
                alert(err);
                return;
            }

            let dataResponse: any = response.data;
            let arr = [];

            for (let obj in dataResponse) {
                arr.push(`${obj} : ${dataResponse[obj]}`);
            }
            setData(arr);
        })();

    }, []);

    return (
        <main>
            <p>Let's find some info!</p>
            <div className="form-group second-tab">
                <form onSubmit={(event) => {
                    event.preventDefault();
                    handleSubmit(searchQuery);
                }}>
                    <input type="text" placeholder="Paste your query here" value={searchQuery}
                           onChange={(event) => setSearchQuery(event.currentTarget.value)}/>
                    <button className="btn btn--peach" type="submit">Go!</button>
                </form>
            </div>
            {
                data.length > 0 ?
                        (<div className="response-view">
                            {
                                data.map((row: any, index) => <p key={index}>{`${row}`}</p>)
                            }
                        </div>) : ''
            }
        </main>
    )
};
