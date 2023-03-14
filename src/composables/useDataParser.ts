import { faker } from "@faker-js/faker";
import { ChatsInterface } from "@/types/chats.interface";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const countries = new Intl.DisplayNames(["en"], { type: "region" });

export const useDataParser = () => {
  const setFakerData = ({
    locale,
    seed,
  }: {
    seed?: number;
    locale?: string;
  }) => {
    if (seed) {
      faker.seed(seed);
    }

    locale = locale ?? "EN";

    if (locale === "UK") {
      locale = "EN";
    }

    faker.locale = locale?.toLowerCase() ?? "UK";
  };

  const parseData = <T extends Record<string, any>>(
    data: T,
    seed: number,
    options: { name?: string; locale?: string }
  ) => {
    setFakerData({ seed, locale: options.locale });

    const newData: Partial<T> = {};

    for (const key in data) {
      newData[key] = getValue(key, data[key], options);
    }

    return newData as T;
  };

  const getValue = (
    key: string,
    value: any,
    options?: { name?: string; locale?: string }
  ): any => {
    if (Array.isArray(value)) {
      return value.map((item) => getValue(key, item));
    }

    if (value instanceof Object) {
      const newObject: Record<string, any> = {};

      for (const childKey in value) {
        newObject[childKey] = getValue(childKey, value[childKey], options);
      }

      return newObject;
    }

    if (value === "[NOW]") {
      value = new Date();
    }

    if (value === "[RANDOM]") {
      return getRandom(key, options ?? {});
    }

    if (/^\[RANDOM:.+:.+]$/.test(value)) {
      return getCustomRandom(value);
    }

    if (key === "createdAt") {
      return new Date(value);
    }

    return value;
  };

  const getCustomRandom = (value: string) => {
    const parsed = /^\[RANDOM:(?<category>.+):(?<function>.+)]$/.exec(value);

    if (!parsed) {
      throw new Error("Regex failed");
    }

    const fakerFunction: (() => unknown) | undefined =
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      faker[parsed.groups?.category]?.[parsed.groups?.function];

    if (!(fakerFunction instanceof Function)) {
      throw new Error(
        `Faker has no function named ${parsed.groups?.function} ${parsed.groups?.category}`
      );
    }

    return fakerFunction();
  };

  const generateRandomTags = () => {
    const tags: string[] = [];
    const random = Math.floor(Math.random() * 6);

    for (let i = 0; i < random; i++) {
      tags.push(faker.word.noun());
    }

    return tags;
  };

  const generateRandomMessages = () => {
    const messages: ChatsInterface["messages"] = [];
    const random = Math.floor(Math.random() * 20);

    let incoming = true;

    for (let i = 0; i < random; i++) {
      messages.push({
        direction: incoming ? "in" : "out",
        time: new Date(),
        status: "read",
        message: faker.lorem.lines(),
      });

      if (Math.floor(Math.random() * 3) < 2) {
        incoming = !incoming;
      }
    }

    return messages;
  };

  const getRandom = (
    key: string,
    options: { name?: string; locale?: string }
  ): any => {
    let firstName: string | undefined;
    let lastName: string | undefined;

    if (options.name) {
      const splitName = options.name.split(" ");
      firstName = splitName[0];
      lastName =
        splitName.length > 1 ? splitName[splitName.length - 1] : undefined;
    }

    switch (key) {
      case "email":
        return faker.internet.email(firstName, lastName);
      case "name":
        return faker.internet.userName(firstName, lastName);
      case "displayName":
        return faker.name.fullName();
      case "countryCode":
        return faker.helpers.arrayElement(["EN", "NL", "ES"]);
      case "status":
        return faker.helpers.arrayElement(["open", "closed"]);
      case "phone":
        return faker.phone.number("+31 6 ########");
      case "street":
        return faker.address.street();
      case "houseNumber":
        return faker.address.buildingNumber();
      case "zipCode":
        return faker.address.zipCode();
      case "city":
        return faker.address.city();
      case "province":
        return faker.address.state();
      case "country":
        return options.locale
          ? countries.of(options.locale.toUpperCase())
          : faker.address.county();
      case "reference":
        return faker.random.alphaNumeric(6);
      case "company":
        return faker.company.name();
      case "jobTitle":
        return faker.name.jobType();
      case "tags":
        return generateRandomTags();
      case "messages":
        return generateRandomMessages();
      default:
        throw new Error(`${key} cannot be randomized`);
    }
  };

  return {
    setFakerData,
    parseData,
    getValue,
  };
};
