import { Result } from "domain/errors/result";

export type Option<T> = Some<T> | None;

export class Some<T> {
  constructor(public readonly value: T) {}
}

export class None {
  constructor() {}
}

const response = () => Result.success("1");
const upper = (value: string) => value.toUpperCase();
const lower = (value: string) => value.toLowerCase();
const convertToNumber = (value: string) => Number(value);

response().bind(upper).bind(upper).bind(convertToNumber); // Result.value = 1
response().bind(upper).bind(lower).bind(convertToNumber); // Result.value = 1

Result.from("1").bind(upper).bind(lower).bind(convertToNumber);

// FROM THIS
function usingConditionals() {
  const numberInString = "10";
  if (!numberInString) {
    return;
  }
  const transformedValueToUppercase = upper(numberInString);
  if (transformedValueToUppercase) {
    return;
  }
  const transformedValueToLowercase = lower(transformedValueToUppercase);
  if (transformedValueToLowercase) {
    return;
  }
  const transformedValueToNumber = convertToNumber(transformedValueToUppercase);
  if (transformedValueToNumber) {
    return; //erro
  }
  return transformedValueToNumber;
}

// TO THIS
function usingMonads() {
  return Result.from("10").bind(upper).bind(lower).bind(convertToNumber);
}

function comparingMethods() {
  const withConditionals = usingConditionals();
  if (withConditionals) {
    console.log("SUCCESS");
  }

  const withMonads = usingMonads();
  if (withMonads.isSuccess) {
    console.log("SUCCESS");
  }
}

const number = 0;
if (!number) {
  return Error("invalid number");
}
const division = 20 / number;

const result = Result.from(10)
  .bind((number) => 20 / number)
  .bind((number) => number * 50)
  .mapWith({
    success: "",
    failure: "",
  });

result.value; // 1000
