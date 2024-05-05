import allureReporter from "@wdio/allure-reporter";
import { Status as AllureStatus} from "allure-js-commons";
import  yargs from "yargs";
import  fs from "fs";
import  fse from "fs-extra";
import path from "path";
//import { Status } from "@cucumber/cucumber";
//import { Status } from "@cucumber/cucumber";
//import { Status } from "@cucumber/cucumber";
//import yargs from "yargs";

export const addAllureStep = (stepDescription: string): void => {
  allureReporter.addStep(stepDescription);
};
// enum Status {
//   Passed = "passed",
//   Failed = "failed"
// }
export const testStep = async (
  stepDescription: string,
  stepMethod
): Promise<void> => {
  allureReporter.startStep(stepDescription);
  let status:AllureStatus  = AllureStatus.PASSED;
  try {
    await stepMethod();
  } catch (error) {
    status = AllureStatus.FAILED;
    throw new Error(error.message);
  } finally {
    allureReporter.endStep(status);
  }
};

export const addAllureAttachment = (
  name: string,
  content: string | Buffer,
  type?: string | undefined,
): void => {
  allureReporter.addAttachment(name, content, type);
};

export const addAllureIssue = (issueName: string): void => {
  allureReporter.addIssue(issueName);
};

export const addAllureFeature = (featureName: string): void => {
  allureReporter.addFeature(featureName);
};

export const addAllureStory = (storyName: string): void => {
  allureReporter.addStory(storyName);
};

export const addAllureTestId = (id: string): void => {
  allureReporter.addTestId(id);
};

export const addAllureDescription = (
  description: string,
  type: string = "text",
): void => {
  allureReporter.addDescription(description, type);
};

export const addAllureLabel = (name: string, value: string): void => {
  allureReporter.addLabel(name, value);
};

export const addAllureEnvironment = async (): Promise<string> => {
  const args = await yargs.argv;
  if (typeof args === 'object' && args.env && typeof args.env === 'string') {
  switch (args.env.toUpperCase()) {
    case "QA":
      return "QA";
    case "TRN":
      return "TRAINING";
    case "STG" || "Stage":
      return "STAGE";
    default:
      return "Unknown environment";
  }
} 
else {
  return "Unknown environment";
}
}

export const clearAllureResultFolder = (): void => {
  if (fs.existsSync("./results/allure-results")) {
    fse.remove("./results/allure-results");
  }
};

export const createAllureCategoriesInfo = (): void => {
  fse.copy(
    path.join(__dirname, "categories.json"),
    path.join(
      __dirname,
      "..",
      "..",
      "results",
      "allure-results",
      "categories.json",
    ),
  );
};

export const checkPrerequisitesStatus = (test, status): void => {
  if (status == false) {
    test.skip();
  }
}
