"use server";

import { auth0 } from "@/lib/auth0";

export async function getToken() {
  try {
    const response = await fetch(`${process.env.AUTH0_DOMAIN}/oauth/token`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        client_id: process.env.AUTH0_CLIENT_ID,
        client_secret: process.env.AUTH0_CLIENT_SECRET,
        audience: process.env.AUTH0_AUDIENCE,
        grant_type: "client_credentials",
      }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error("Error fetching token:", error);
  }
}

export async function getAllUsers() {
  const myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");
  myHeaders.append("Authorization", `Bearer ${await getToken()}`);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow" as RequestRedirect,
  };

  try {
    const response = await fetch(
      `${process.env.AUTH0_AUDIENCE}users`,
      requestOptions
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
}

// Function to log full session details
export async function logFullSession() {
  const session = await auth0.getSession();
  if (!session) {
    console.log("No session found");
    return null;
  }
  // console.log("Full session:", JSON.stringify(session, null, 2));
  return session;
}

// Function to get and log user roles
export async function logUserRoles(
  userId: string
): Promise<"Admin" | "Rider" | "Volunteer" | null> {
  const myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");
  myHeaders.append("Authorization", `Bearer ${await getToken()}`);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow" as RequestRedirect,
  };

  try {
    const rolesResponse = await fetch(
      `${process.env.AUTH0_DOMAIN}/api/v2/users/${userId}/roles`,
      requestOptions
    );

    if (!rolesResponse.ok) {
      throw new Error(`HTTP error! status: ${rolesResponse.status}`);
    }

    const roles = await rolesResponse.json();
    //console.log("User's assigned roles:", roles);

    const roleDetails = await Promise.all(
      roles.map(async (role: { id: string }) => {
        const roleResponse = await fetch(
          `https://dev-6vspgmouiknip3q7.us.auth0.com/api/v2/roles/${role.id}`,
          requestOptions
        );
        if (!roleResponse.ok) {
          throw new Error(`HTTP error! status: ${roleResponse.status}`);
        }
        return roleResponse.json();
      })
    );

    return roleDetails[0].name;
  } catch (error) {
    console.error("Error fetching user roles:", error);
    throw error;
  }
}

// Function to get and log all available roles
export async function logAllRoles() {
  const myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");
  myHeaders.append("Authorization", `Bearer ${await getToken()}`);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow" as RequestRedirect,
  };

  try {
    const response = await fetch(
      "https://dev-6vspgmouiknip3q7.us.auth0.com/api/v2/roles",
      requestOptions
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();
    //console.log("All available roles:", result);
    return result;
  } catch (error) {
    console.error("Error fetching roles:", error);
    throw error;
  }
}

export async function getCurrentUserId() {
  const session = await logFullSession();
  if (!session) return null;
  return session.user.sub;
}

export default async function getUser() {
  const session = await logFullSession();
  if (!session) return null;

  const userRoles = await logUserRoles(session.user.sub);

  return {
    ...session,
    roles: userRoles,
  };
}

export const fetchRoles = logAllRoles;
