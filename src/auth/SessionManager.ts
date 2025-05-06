import { CognitoUserSession, CognitoUser, AuthenticationDetails, CognitoIdToken, CognitoAccessToken, CognitoRefreshToken, CognitoUserAttribute } from "amazon-cognito-identity-js";
import { LoginCredentials } from "../types/types";
import { userPool } from "./cognitoConfig";
import axios from "axios";
import { UserDTO } from "../types/dtos";
import { Location } from "react-router-dom";
  
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

    async refreshTokenIfNeeded(): Promise<void> {
        if (this.userSession && !this.userSession.isValid()) {
            return new Promise((resolve, reject) => {
                this.userSession?.refreshSession(this.userSession.getRefreshToken(), (err: Error, session: CognitoUserSession) => {
                    if (err) {
                        reject(err);
                    } else {
                        this.userSession = session;
                        localStorage.setItem("accessToken", session.getAccessToken().getJwtToken());
                        localStorage.setItem("idToken", session.getIdToken().getJwtToken());
                        localStorage.setItem("refreshToken", session.getRefreshToken().getToken());
                        resolve();
                    }
                });
            });
        }
        return Promise.resolve();   
    }

    public login(loginCredentials: LoginCredentials, location: Location<any>, navigate?: (locationString: string) => void) {
        this.fetchUserSession(loginCredentials)
        .then((session: CognitoUserSession) => {
            console.log("Login successful", session);
            this.userSession = session;
            this.updateLocalStorage();
            const accessToken = session.getAccessToken().getJwtToken();
            const idToken = session.getIdToken().getJwtToken();
            console.log("IdToken", idToken);

            const userDTO: UserDTO = {
                email: session.getIdToken().payload.email,
                username: session.getIdToken().payload.email,
                role: session.getIdToken().payload["cognito:groups"] ? session.getIdToken().payload["cognito:groups"][0] : "LEARNER",
            }

            console.log("UserDTO", userDTO);

            axios.post("http://localhost:8080/login", userDTO, {
                headers: {
                    Authorization: `Bearer ${idToken}`,
                },
            })

            if (accessToken) {
                axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
            }

            navigate && navigate(location.state?.from?.pathname || "/");
        })
        .catch((error: Error) => {
            if(error.name === "UserNotConfirmedException") {
                navigate && navigate("/account-verify");
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
            localStorage.removeItem("accessToken");
            localStorage.removeItem("idToken");
            localStorage.removeItem("refreshToken");
            userPool.getCurrentUser()?.signOut();
        }
        delete axios.defaults.headers.common["Authorization"]
        if (callback) {
            callback();
        }
    }

    public signUp(loginCredentials: LoginCredentials, callback?: () => void) {
        const { username: email, password } = loginCredentials;
        const attributeList = [];
        const emailAttribute = new CognitoUserAttribute({
            Name: "email",
            Value: email,
        });

        attributeList.push(emailAttribute);

        userPool.signUp(email, password, attributeList, [], (err: Error | null | undefined) => {
            if (err) {
                console.error("Sign up failed", err);
                return;
            }
            if (callback) {
                callback();
            }
        });
    }

    public isValidToken(): boolean {
        return this.userSession !== null && this.userSession.isValid();
    }

    public getUserSession(): CognitoUserSession | null {
        return this.userSession;
    }

    public get accessToken(): string | null {
        return this.userSession ? this.userSession.getAccessToken().getJwtToken() : null;
    }

    public get refreshToken(): string | null {
        return this.userSession ? this.userSession.getRefreshToken().getToken() : null;
    }

    public get idToken(): string | null {
        return this.userSession ? this.userSession.getIdToken().getJwtToken() : null;
    }

    private loadFromStorage() {
        const accessToken = localStorage.getItem("accessToken");
        const idToken = localStorage.getItem("idToken");
        const refreshToken = localStorage.getItem("refreshToken");

        if (accessToken && idToken && refreshToken) {
            this.userSession = new CognitoUserSession({
            IdToken: new CognitoIdToken({ IdToken: idToken }),
            AccessToken: new CognitoAccessToken({ AccessToken: accessToken }),
            RefreshToken: new CognitoRefreshToken({ RefreshToken: refreshToken }),
            });
        }
    };

    private async fetchUserSession(
        loginCredentials: LoginCredentials
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
    };

    private updateLocalStorage() {  
        if (this.userSession) {
            localStorage.setItem("accessToken", this.userSession.getAccessToken().getJwtToken());
            localStorage.setItem("idToken", this.userSession.getIdToken().getJwtToken());
            localStorage.setItem("refreshToken", this.userSession.getRefreshToken().getToken());
        }
    }
}

export default SessionManager.getInstance();
  