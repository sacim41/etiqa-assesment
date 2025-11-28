import "./RepoCard.css";
 interface props{
  repo:any
}

const RepoCard:React.FC<props> = ({ repo }) =>{
  return (
    <div className="repo-card" key={repo?.id}>
      <h2 className="repo-title">{repo?.name}</h2>

      <p className="repo-description">
        {repo?.description || "No description available"}
      </p>

      <div className="repo-footer">
        <div className="owner-info">
          <img src={repo.owner?.avatar_url} className="avatar" alt="avatar" />
          <span className="username">{repo?.owner.login}</span>
        </div>

        <div className="stars">
          <span className="star-icon">★</span>
          {(repo?.stargazers_count / 1000).toFixed(1)}k
        </div>
      </div>
    </div>
  );
}
export default RepoCard 
