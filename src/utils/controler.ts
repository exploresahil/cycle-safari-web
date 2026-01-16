import { getToken } from "./getUser";

export async function changeUserRole(userId: string, role: string) {
  const token = await getToken();
  const myHeaders = new Headers();
  myHeaders.append("content-type", "application/json");
  myHeaders.append("Authorization", `Bearer ${token}`);

  const raw = JSON.stringify({
    roles: [role],
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow" as RequestRedirect,
  };

  try {
    const response = await fetch(
      `${process.env.AUTH0_AUDIENCE}/users/${userId}/roles`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));

    console.log("response:", response);

    return response;
  } catch (error) {
    console.error("Error changing user role:", error);
    throw error;
  }
}
