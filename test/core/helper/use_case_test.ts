import { getFake } from "./get_fake";
import { testEqualObject } from "./test_equal_object";

export const useCaseTest = async (
  testName: string,
  fakePath: string,
  useCase: any,
  equal: object
) => {
  it(testName, async () => {
    let result;
    (await useCase.call(await getFake(fakePath))).map((value) => {
      result = value;
    });
    // console.log(result);
    testEqualObject(result, equal);
  });
};
