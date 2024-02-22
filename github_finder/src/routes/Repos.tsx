import { ReposPros } from "../types/repo";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import BackBtn from "../components/BackBtn";
import Loader from "../components/Loader";
import Repo from "../components/Repo";

import classes from './Repos.module.css';

const Repos = () => {
    const {username} = useParams();

    const [repos, setRepos] = useState<ReposPros[] | [] | null>(null);

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
     

      const loadRepos = async function (username:string) {
        setIsLoading(true);

        const res = await fetch(`https://api.github.com/users/${username}/repos`);  
        
        const data = await res.json();

        setIsLoading(false);

        let orederedRepos = data.sort(
          (a: ReposPros, b: ReposPros) => b.stargazers_count -a.stargazers_count);

          orederedRepos = orederedRepos.slice(0, 5);

        setRepos(orederedRepos);
      };
      if (username) {
        loadRepos(username);
      };
    }, []);

    if (!repos && isLoading) return <Loader />;

  return (
    <div className={classes.repos}>
        <BackBtn />
        <h2>Explore os repositórios do usuário: {username}</h2>
        {repos && repos.length === 0 && <p>Não há repositórios.</p>}
        {repos && repos.length > 0 && (
          <div className={classes.repos_container}>
            {repos.map((repo: ReposPros) => (
              <Repo key={repo.name} {...repo} />
            ))}
          </div>
        )}
    </div>
  )
}

export default Repos