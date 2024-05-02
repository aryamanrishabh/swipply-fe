import { CognitoUserPool } from "amazon-cognito-identity-js";

const candidatePoolData = {
  UserPoolId: "us-east-1_YGHRMvySm",
  ClientId: "me2akg5jvlpg69loh8v5ccu5q",
};

const candidatePool = new CognitoUserPool(candidatePoolData);

export default candidatePool;
