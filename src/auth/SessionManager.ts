import {
  AuthenticationDetails,
  CognitoAccessToken,
  CognitoIdToken,
  CognitoRefreshToken,
  CognitoUser,
  CognitoUserAttribute,
  CognitoUserSession,
} from "amazon-cognito-identity-js";
import { COGNITO_ERRORS, LOCAL_STORAGE_KEYS } from "../constants";
import { LoginCredentials, User } from "../types/types";
import { userPool } from "./cognitoConfig";

class SessionManager {
  private static _instance: SessionManager;
  private userSession: CognitoUserSession | null = null;

  private constructor() {
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
        this.updateLocalStorage();

        callBack.onSuccess;
      })
      .catch((error: Error) => {
        if (error.name === COGNITO_ERRORS.USER_NOT_CONFIRMED) {
          callBack.onFailure;
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
      localStorage.removeItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
      localStorage.removeItem(LOCAL_STORAGE_KEYS.ID_TOKEN);
      localStorage.removeItem(LOCAL_STORAGE_KEYS.REFRESH_TOKEN);
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
          callback.onFailure;
          return;
        }

        callback.onSuccess;
      },
    );
  }

  public isValidToken(): boolean {
    return this.userSession !== null && this.userSession.isValid();
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

  public get refreshToken(): string | null {
    this.refreshTokenIfNeeded();
    return this.userSession
      ? this.userSession.getRefreshToken().getToken()
      : null;
  }

  public get idToken(): string | null {
    this.refreshTokenIfNeeded();
    return this.userSession
      ? this.userSession.getIdToken().getJwtToken()
      : null;
  }

  private refreshTokenIfNeeded() {
    if (!this.isValidToken()) {
      const user = new CognitoUser({
        Username: localStorage.getItem("email") || "",
        Pool: userPool,
      });

      user.getSession(
        (err: Error | null, session: CognitoUserSession | null) => {
          if (!session) return;
          if (err || !session.isValid()) {
            // If session is expired, attempt to refresh it
            user.refreshSession(
              session.getRefreshToken(),
              (err, newSession) => {
                if (err) {
                  console.error("Refresh failed", err);
                } else {
                  this.userSession = newSession;
                }
              },
            );
          } else {
            // Session is valid, proceed normally
            this.userSession = session;
          }
        },
      );
    }
  }

  private loadFromStorage() {
    const accessToken = localStorage.getItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
    const idToken = localStorage.getItem(LOCAL_STORAGE_KEYS.ID_TOKEN);
    const refreshToken = localStorage.getItem(LOCAL_STORAGE_KEYS.REFRESH_TOKEN);

    if (accessToken && idToken && refreshToken) {
      this.userSession = new CognitoUserSession({
        IdToken: new CognitoIdToken({ IdToken: idToken }),
        AccessToken: new CognitoAccessToken({ AccessToken: accessToken }),
        RefreshToken: new CognitoRefreshToken({ RefreshToken: refreshToken }),
      });
    }
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

  private updateLocalStorage() {
    if (this.userSession) {
      localStorage.setItem(
        LOCAL_STORAGE_KEYS.ACCESS_TOKEN,
        this.userSession.getAccessToken().getJwtToken(),
      );
      localStorage.setItem(
        LOCAL_STORAGE_KEYS.ID_TOKEN,
        this.userSession.getIdToken().getJwtToken(),
      );
      localStorage.setItem(
        LOCAL_STORAGE_KEYS.REFRESH_TOKEN,
        this.userSession.getRefreshToken().getToken(),
      );
    }
  }
}

export default SessionManager.getInstance();
