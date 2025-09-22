import {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails,
} from "amazon-cognito-identity-js";

const poolData = {
  UserPoolId: "us-east-1_dnqAtvtOV", // e.g. 'us-east-1_abcd1234'
  ClientId: "57tu7s1k156a91udathh5s2nuk", // e.g. '1a2b3c4d5e6f7g8h9i0j'
};

const userPool = new CognitoUserPool(poolData);
const cognitoUser = new CognitoUser({
  Username: localStorage.getItem("email") || "",
  Pool: userPool,
});

export { userPool, CognitoUser, AuthenticationDetails };
