import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserAttribute,
  CognitoUserSession,
} from "amazon-cognito-identity-js";
import { jwtDecode } from "jwt-decode";
import { COGNITO_ERRORS } from "../../constants";
import { LoginCredentials, User } from "../../types/types";
import { userPool } from "./cognitoConfig";

class SessionManager {
  private static _instance: SessionManager;
  private userSession: CognitoUserSession | null = null;

  private constructor() {
    console.log("Initializing SessionManager...");
    this.loadFromStorage();
  }

  static getInstance(): SessionManager {
    if (!SessionManager._instance) {
      SessionManager._instance = new SessionManager();
    }
    return SessionManager._instance;
  }

  public login(
    loginCredentials: LoginCredentials,
    callBack: { onSuccess: () => void; onFailure: () => void },
  ) {
    this.fetchUserSession(loginCredentials)
      .then((session: CognitoUserSession) => {
        console.log("Login successful", session);
        this.userSession = session;
        callBack.onSuccess();
      })
      .catch((error: Error) => {
        if (error.name === COGNITO_ERRORS.USER_NOT_CONFIRMED) {
          callBack.onFailure();
        }

        // TODO: Handle other error cases
        /**
         * NotAuthorizedException: The username or password is incorrect.
         * UserNotFoundException: The specified username does not exist.
         * UserPasswordResetRequiredException: The user is required to reset their password.
         * TooManyRequestsException: Too many requests have been made to the service.
         * TooManyFailedAttemptsException: Too many failed attempts to log in.
         * InvalidParameterException: The input parameters for the request are invalid.
         * ResourceNotFoundException: The specified resource does not exist.
         */

        console.error("Login failed", error);
      });
  }

  public logout(callback?: () => void) {
    if (this.userSession) {
      this.userSession = null;
      userPool.getCurrentUser()?.signOut();
    }
    if (callback) {
      callback();
    }
  }

  public signUp(
    loginCredentials: LoginCredentials,
    callback: { onSuccess: () => void; onFailure: () => void },
  ) {
    const { username: email, password } = loginCredentials;
    const attributeList = [];
    const emailAttribute = new CognitoUserAttribute({
      Name: "email",
      Value: email,
    });

    attributeList.push(emailAttribute);

    userPool.signUp(
      email,
      password,
      attributeList,
      [],
      (err: Error | null | undefined) => {
        if (err) {
          console.error("Sign up failed", err);
          callback.onFailure();
          return;
        }

        callback.onSuccess();
      },
    );
  }

  public isValidToken(): boolean {
    console.log("Checking token validity...", this.userSession);
    return !this.isTokenExpired(this.accessToken || "");
  }

  public getUserSession(): CognitoUserSession | null {
    this.refreshTokenIfNeeded();
    return this.userSession;
  }

  public getLoggedInUser(): User | null {
    return this.userSession
      ? {
          email: this.userSession.getIdToken().payload.email,
          role: this.userSession.getIdToken().payload["cognito:groups"]
            ? this.userSession.getIdToken().payload["cognito:groups"][0]
            : "LEARNER",
        }
      : null;
  }

  public get accessToken(): string | null {
    this.refreshTokenIfNeeded();
    return this.userSession
      ? this.userSession.getAccessToken().getJwtToken()
      : null;
  }

  public get idToken(): string | null {
    this.refreshTokenIfNeeded();
    return this.userSession
      ? this.userSession.getIdToken().getJwtToken()
      : null;
  }

  private refreshTokenIfNeeded() {
    const accessToken = userPool
      .getCurrentUser()
      ?.getSignInUserSession()
      ?.getAccessToken()
      .getJwtToken();

    if (!accessToken || !this.isTokenExpired(accessToken)) {
      console.log(
        "Skipping token refresh, No access token or valid access token available.",
      );
      return;
    }

    this.refreshSession();
  }

  private refreshSession() {
    const user = userPool.getCurrentUser();

    if (!user || !this.userSession) {
      console.log("No user or session available for token refresh.");
      return;
    }

    user.refreshSession(this.userSession.getRefreshToken(), (err, session) => {
      if (err) {
        console.error("Session refresh failed", err);
        this.logout();
        return;
      }
      console.log("Session refreshed successfully", session);
      this.userSession = session;
    });
  }

  private isTokenExpired(token: string): boolean {
    try {
      const decoded: { exp: number } = jwtDecode(token);
      const now = Math.floor(Date.now() / 1000);
      return decoded.exp < now;
    } catch {
      return true; // if decode fails, treat as expired
    }
  }

  private loadFromStorage() {
    const user = userPool.getCurrentUser();

    if (!user) {
      console.log("No user found in storage.");
      return;
    }

    user.getSession((err: Error | null, session: CognitoUserSession) => {
      if (err) {
        console.log("No valid session found in storage.");
        return;
      }

      this.userSession = session;

      if (this.isTokenExpired(session.getAccessToken().getJwtToken())) {
        console.log("Stored session is invalid or expired.");
        this.refreshSession();
        return;
      }

      console.log("Loaded session from storage:", session);
    });
  }

  private async fetchUserSession(
    loginCredentials: LoginCredentials,
  ): Promise<CognitoUserSession> {
    const { username: email, password } = loginCredentials;
    return new Promise((resolve, reject) => {
      const user = new CognitoUser({
        Username: email,
        Pool: userPool,
      });

      const authDetails = new AuthenticationDetails({
        Username: email,
        Password: password,
      });

      user.authenticateUser(authDetails, {
        onSuccess: (result: CognitoUserSession) => {
          resolve(result);
        },
        onFailure: (err: Error) => {
          reject(err);
        },
      });
    });
  }
}

export default SessionManager.getInstance();
