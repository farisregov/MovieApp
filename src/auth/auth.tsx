import { apiKey } from "../constants/constant";

// todo - error handling for network APIs

export const getSessionToken = async () => {
  const res = await fetch(`https://api.themoviedb.org/3/authentication/token/new?api_key=${apiKey}`, {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmOGQ5MmMyNjUyMjQwN2UyZWJkZDFkM2YzZWIyYWFjNCIsInN1YiI6IjY1MTJkNTE1MjZkYWMxMDEyZDVjZDk2MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.PL6TXXJWfTQ4Dy7LjoezIQ2cW3HdzmSbYQXObtbTOMY",
    },
  });
  const res2 = await res.json();
  const req_token = await res2.request_token;

  console.log("requested token", req_token);
  return req_token;
};
//LAST SAMPAI SINI PROGRESSS MASALAH CREATE SESSION ID. REFER BACK TO GOOGLE.
export const validateLogin = async (token: string, username: string, password: string) => {
  try {
    const loginResponse = await fetch(`https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=${apiKey}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmOGQ5MmMyNjUyMjQwN2UyZWJkZDFkM2YzZWIyYWFjNCIsInN1YiI6IjY1MTJkNTE1MjZkYWMxMDEyZDVjZDk2MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.PL6TXXJWfTQ4Dy7LjoezIQ2cW3HdzmSbYQXObtbTOMY`, // Use the passed token for authorization
      },
      body: JSON.stringify({
        username,
        password,
        request_token: token,
      }),
    });

    const loginSuccess = await loginResponse.json();
    console.log("Validated Login", loginSuccess);

    if (loginSuccess.success === "true") {
      return loginSuccess.request_token; // Assuming responseData contains the request_token upon successful login
    } else {
      return {
        error: {
          errorMessage: "Validation unsuccessful!",
        },
      };
    }
  } catch (error) {
    console.error("Error:", error);
    return {
      error: {
        errorMessage: "An error occurred during validation.",
      },
    };
  }
};

export const createSessionId = async (request_token: string) => {
  try {
    const sessionId = await fetch(`https://api.themoviedb.org/3/authentication/session/new?api_key=${apiKey}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmOGQ5MmMyNjUyMjQwN2UyZWJkZDFkM2YzZWIyYWFjNCIsInN1YiI6IjY1MTJkNTE1MjZkYWMxMDEyZDVjZDk2MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.PL6TXXJWfTQ4Dy7LjoezIQ2cW3HdzmSbYQXObtbTOMY`, // Use the passed request_token for authorization
      },
      body: JSON.stringify({
        request_token: request_token,
      }),
    });

    const sessionData = await sessionId.json();
    console.log("session created", sessionData);

    if (sessionData.success) {
      return sessionData.session_id; // Assuming responseData contains the session_id upon successful creation
    } else {
      return {
        error: {
          errorMessage: "Failed in creating session token",
        },
      };
    }
  } catch (error) {
    console.error("Error:", error);
    return {
      error: {
        errorMessage: "An error occurred during session creation.",
      },
    };
  }
};

export const getAccountId = async (sessionId?: string) => {
  try {
    const getAccountId = await fetch(`https://api.themoviedb.org/3/account?api_key=${apiKey}&session_id=${sessionId}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    const responseData = await getAccountId.json();
    const accountId = responseData.id; // Assuming the account ID is in responseData.id
    console.log("got account id", accountId);

    if (getAccountId.ok) {
      return accountId;
    } else {
      return {
        error: {
          errorMessage: "Failed to fetch account ID",
        },
      };
    }
  } catch (error) {
    console.error("Error:", error);
    return {
      error: {
        errorMessage: "An error occurred while fetching account ID.",
      },
    };
  }
};
