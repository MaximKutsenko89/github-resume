import { GITHUB_API_TOKEN } from "@/constants";
import { countLanguages } from "@/utils";
import { Octokit } from "@octokit/rest";

export const octokitClient = new Octokit({
  auth: GITHUB_API_TOKEN,
});

export async function searchUser(username: string) {
  try {
    const response = await octokitClient.request("GET /users/{username}", {
      username: username,
    });
    const { data: reposData } = await octokitClient.repos.listForUser({
      username,
    });
    const userData = response.data;
    const languages = reposData.map((repo) => {
      if (repo.language === null) {
        return "Other";
      }
      return repo.language;
    });
    return {
      repos: [...reposData],
      userData,
      usedProgrammingLanguagesAmount: countLanguages(languages as string[]),
    };
  } catch (error) {
    console.error("Error searching for user:", error);
    throw error;
  }
}

export async function fetchTopUsers() {
  const response = await octokitClient.request("GET /search/users", {
    q: "followers:>0",
    sort: "followers",
    order: "desc",
    per_page: 3,
  });

  const users = response.data.items.map((item) => ({
    login: item.login,
    followers: item.followers,
  }));

  return users;
}
