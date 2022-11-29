import { SignUpUseCase } from "data/usecases/signup-usecase";
import { Controller } from "presentation/controllers/controller";
import { SignUpController } from "presentation/controllers/signup/signup";

export const makeSignupController = (): Controller => {
  const signupRepository = new signupRepository();
  const signupUseCase = new SignUpUseCase();
  const signupController = new SignUpController(
    makeSignupUseCase(),
    makeSignupPresenter() // http response - cli - graph
  );
  return signupController;
};

/**
presenter => controller => useCase => entity => services => repositories
repository => entity => services => useCase => controller => presenter

createUserPresenter => createUserController => createUserUseCase => createUserEntity => 
createUserAdditionalDataGateway => createUserCache => => createUserRepository {persistence[db] / files[s3]}

on"CREATED USER" => emit event [AWS SQS/NAT/RabbitMQ/Kafka] => subscribe to event => send email [nodemailer]=> send push notification [AWS SNS] =>
Micro services subscribe to event => make unique operations

services => gateways, encryption, validation, hashers, external storages
*/
