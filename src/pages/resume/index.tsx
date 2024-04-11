import Footer from "@/components/footer";
import LanguageLoader from "@/components/language-loader";
import { ROUTER } from "@/constants";
import { gethUser } from "@/libs/octokit";
import { dateFormatter } from "@/utils";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import "./index.scss";

export default function ResumePage() {
  const { username } = useParams();

  const {
    data: user,
    isLoading,
    isError,
  } = useQuery(["singleUser", username], () => gethUser(username as string), {
    enabled: true,
    retry: 0,
  });
  if (isLoading) {
    return (
      <div className="container ">
        <h1 className="main-title">Loading..</h1>
      </div>
    );
  }
  if (isError) {
    return (
      <div className="container error-container">
        <h1 className="main-title">No results for {username} </h1>
        <Link to={ROUTER.HOME} className="button">
          Back
        </Link>
      </div>
    );
  }

  return (
    <div className="container">
      <header className="header">
        <h1 className="main-title">
          {user?.userData.name
            ? user?.userData.name?.toUpperCase()
            : user?.userData.email}
        </h1>
        <h2 className="subtitle">PASSIONATE GITHUB USER</h2>
      </header>
      <main className="user-profile">
        <div className="user-profile__item">
          <div className="user-profile__title">
            {user?.userData.public_repos === 0
              ? "No public repositories"
              : "Public repositories:"}
          </div>
          {user?.userData.public_repos !== 0 && (
            <div className="user-profile__data">
              {user?.userData.public_repos}
            </div>
          )}
        </div>
        <div className="user-profile__item">
          <div className="user-profile__title">Member since:</div>
          <div className="user-profile__data">
            {dateFormatter(user?.userData.created_at as string)}
          </div>
        </div>
        <div className="user-profile__languages">
          {Object.entries(user?.usedProgrammingLanguagesAmount || {}).map(
            ([name, value], index) => (
              <LanguageLoader name={name} value={value} key={index} />
            )
          )}
        </div>
        <div className="user-profile__item">
          {user?.mostPopularLastEditedRepos.length !== 0 && (
            <>
              <div className="user-profile__title">Popular Repositories :</div>
              <ul>
                {user?.mostPopularLastEditedRepos.map((repo) => (
                  <li key={repo.id}>
                    <a href={repo.html_url} target="_black">
                      {repo.name}
                    </a>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
