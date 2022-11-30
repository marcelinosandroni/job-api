import { Company } from "./company";

const a = new Company({
  name: "Company Name",
  sector: "any",
});

type anyprops = { name: string };
function abc(properties: anyprops): void {}

const b = new Company({ name: "Company Name", sector: "any" });
