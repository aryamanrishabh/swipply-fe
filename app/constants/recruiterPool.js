import { CognitoUserPool } from "amazon-cognito-identity-js";

const recruiterPoolData = {
  UserPoolId: "us-east-1_xipLq3d6o",
  ClientId: "4358t5j04j0jmr9k8n7tt7qbal",
};

const recruiterPool = new CognitoUserPool(recruiterPoolData);

export default recruiterPool;
