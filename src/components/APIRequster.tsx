import React, { useState, useCallback } from "react";

export const APIRequester: React.FC = () => {
    const [data, setData] = useState<string[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const handleSubmit = useCallback((param: string) => {
        (async () => {
            if(!param.length) {
                setErrorMessage( 'Type something, please');
                return;
            }

            const response = await fetch(`https://api.github.com/users/${param}`);
            if (!response.ok && response.status === 404) {
                setErrorMessage( 'User Not Found');
            } else {
                const dataResponse: any = await response.json();
                let arr = [];

                for (let obj in dataResponse) {
                    arr.push(`${obj} : ${dataResponse[obj]}`);
                }
                setData(arr);
                setErrorMessage('');
            }

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
                errorMessage.length > 0 ?
                    (<h1>{ errorMessage } <p className="unicode_symbol">&#9785;</p></h1>) :
                        ( data.length > 0 ?
                        (<div className="response-view">
                            {
                                data.map((row: any, index) => <p key={index}>{`${row}`}</p>)
                            }
                        </div>) : ''
                        )
            }
        </main>
    )
};
