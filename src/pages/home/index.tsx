import Footer from "@/components/footer";
import { ROUTER } from "@/constants";
import { getTopUsers, octokitClient } from "@/libs/octokit";
import { useState } from "react";
import { useQuery } from "react-query";
import { Link, useNavigate } from "react-router-dom";

export default function HomePage() {
  const [searchValue, setSearchValue] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const navigate = useNavigate();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await octokitClient.request("GET /users/{username}", {
        username: searchValue,
      });

      if (response.status === 200) {
        setSubmitting(false);
        navigate(ROUTER.RESUME(response.data.login!));
      }
    } catch (error) {
      console.error("Error searching for user:", error);
      navigate(`${ROUTER.USER_NOT_FOUND}?name=${searchValue}`);
      setSubmitting(false);
    }
  }
  const { data: popularUsers, isLoading } = useQuery(
    "popularUsers",
    getTopUsers
  );

  return (
    <div className="container">
      <header className="header">
        <h1 className="main-title">MY GITHUB RÉSUMÉ</h1>
      </header>
      <main>
        <p className="text">
          As a software startup owner I really enjoy when people send us their
          résumés and they include their github account so we can see tangible
          work they have done.
        </p>
        <form className="search-form" onSubmit={onSubmit}>
          <input
            type="text"
            className="input"
            placeholder="Enter your GitHub username and click on generate"
            id="username"
            name="username"
            required
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <button className="button" disabled={submitting}>
            {submitting ? "Submitting..." : "Generate"}
          </button>
        </form>
        {isLoading ? (
          <div className="text">Loading...</div>
        ) : (
          <div className="text">
            See some popular users :{" "}
            <ul>
              {popularUsers?.map((user) => (
                <li key={user.login}>
                  <Link to={ROUTER.RESUME(user.login)}>{user.login}</Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
