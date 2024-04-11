import Footer from "@/components/footer";
import LanguageLoader from "@/components/language-loader";
import { searchUser } from "@/libs/octokit";
import { dateFormatter } from "@/utils";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import "./index.scss";
export default function ResumePage() {
  const { username } = useParams();
  const {
    data: user,
    isLoading,
    error,
  } = useSWR("singleUser", () => searchUser(username as string));

  console.log(user?.usedProgrammingLanguagesAmount);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!username && error) {
    return <div>Missing username</div>;
  }

  return (
    <div className="container">
      <header className="header">
        <h1 className="title">
          {user?.userData.name
            ? user?.userData.name?.toUpperCase()
            : user?.userData.email}
        </h1>
        <h2 className="subtitle">PASSIONATE GITHUB USER</h2>
      </header>
      <main className="user-profile">
        <div className="user-profile__item">
          <div className="user-profile__title">Public repositories:</div>
          <div className="user-profile__data">
            {user?.userData.public_repos}
          </div>
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
      </main>
      <Footer />
    </div>
  );
}
