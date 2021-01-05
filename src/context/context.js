import React, { useState, useEffect } from 'react';
import mockUser from './mockData.js/mockUser';
import mockRepos from './mockData.js/mockRepos';
import mockFollowers from './mockData.js/mockFollowers';
import axios from 'axios';

const rootUrl = 'https://api.github.com';

// context
const GithubContext = React.createContext();

// Provider, Consumer - GithubContext.Provider or GithubContext.Consumer


// wrapping the whole application in githubprovider.
// whatever is passed through value is accessible throughout the application.
const GithubProvider = ({ children }) => {
    return <GithubContext.Provider value={"hello"}>{children}</GithubContext.Provider>
};

export { GithubContext, GithubProvider };