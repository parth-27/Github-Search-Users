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
    // mockUser is the default value stored in githubUser. and setGithubUser to change that value.
    const [githubUser, setGithubUser] = useState(mockUser);
    const [repos, setRepos] = useState(mockRepos);
    const [followers, setFollowers] = useState(mockFollowers);

    // check request rate
    const checkRequests = () => {
        // axios returns promise so we include then function
        axios(`${rootUrl}/rate_limit`)
            .then(({ data }) => {
                // getting remaining from the rate from the data.
                let { rate: { remaining } } = data;

                setRequests(remaining);
                if (!remaining)
                {
                    toggleError(true, "Sorry, You have exceeded your hourly request rate!!");
                }
            })
            .catch((err) => console.error(err));
    }

    // request loading
    const [requests, setRequests] = useState(0); // initially 0
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState({ show: false,msg:"" });

    // search user
    const searchGithubUser = async (user) => {

        toggleError();  // setting to the default.
        setIsLoading(true);

        const response = await axios(`${rootUrl}/users/${user}`).catch((err)=> console.error(err));
        
        console.log(response);

        if (response)
        {
            setGithubUser(response.data);
            const { repos_url, followers_url } = response.data;

            // when all is settled then it will display on the web page.
            await Promise.allSettled([
                axios(`${repos_url}?per_page=100`),
                axios(`${followers_url}?per_page=100`)
            ]).then((results => {
                // first array in results represents the repos and second array represents followers.
                const [repos, followers] = results;
                const status = "fulfilled";

                if (repos.status == status)
                    setRepos(repos.value.data);

                if (followers.status == status)
                    setFollowers(followers.value.data);
            })).catch(err=>console.error(err));

        }
        else
        {
            toggleError(true, "There is no user with that username");
        }
        checkRequests();
        setIsLoading(false);
    }

    // Error
    function toggleError(show=false, msg="")
    {
        setError({ show, msg });
    }


    // this function will be called as the app renders
    useEffect(checkRequests,[])

    return (
        <GithubContext.Provider
            value=
            {{
                githubUser: githubUser,
                repos: repos,
                followers: followers,
                requests,
                error,
                searchGithubUser,
                isLoading,
            }}
        >
            {children}
        </GithubContext.Provider>
    );
};

export { GithubContext, GithubProvider };