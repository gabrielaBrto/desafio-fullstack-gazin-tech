import React from 'react';
import Header from '@Components/Header/Header';

const Body = ({children}) => {

    return (
        <>
        <Header />
        <div className="container-fluid">
            <div className="row justify-content-center">    
                <div className="col-md-11 mt-5">
                    <div className="card shadow">
                        <div className="card-body">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};

export default Body;
