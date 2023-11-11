/*

  Implement a radix sort in a function called radixSort.

  You'll probably need several functions

  You can implement it using a binary or decimal based bucketing but I'd recommend the decimal based buckets because
  it ends up being a lot more simple to implement.

*/
const createEmptyBuckets = () => {
  let arrayOfArrays = [];

// Populate the array with ten empty arrays
  for (let i = 0; i < 10; i++) {
    arrayOfArrays.push([]);
  }
  return arrayOfArrays
}

const concatBuckets = (buckets) => {
  return buckets.reduce((acc, x) => [...acc, ...x])
}

const getDigitByOrder = (num, order) => {
  const reminder = num % (Math.pow(10, order));


  const result =  Math.floor(reminder / Math.pow(10, order - 1));

  return result;
}
function radixSort(array) {
  // code goes here
  let order = 1
  let wasNumberOfOrder = true
  const length = array.length
  while (wasNumberOfOrder) {
    const buckets = createEmptyBuckets()
    wasNumberOfOrder = false
    for(let i = 0; i < length; i++){
      if(array[i] > (Math.pow(10, order))) {
        wasNumberOfOrder = true
      }
      const bucketIdx = getDigitByOrder(array[i], order) || 0
      buckets[bucketIdx].push(array[i])
    }
    array = concatBuckets(buckets)
    order++
  }
  return array

}
// const arr = [458145, 80330]
// console.log(radixSort(arr))
describe("radix sort", function () {
  it("should sort correctly", () => {
    const nums = [
      20,
      51,
      3,
      801,
      415,
      62,
      4,
      17,
      19,
      11,
      1,
      100,
      1244,
      104,
      944,
      854,
      34,
      3000,
      3001,
      1200,
      633
    ];
    const ans = radixSort(nums);
    expect(ans).toEqual([
      1,
      3,
      4,
      11,
      17,
      19,
      20,
      34,
      51,
      62,
      100,
      104,
      415,
      633,
      801,
      854,
      944,
      1200,
      1244,
      3000,
      3001
    ]);
  });
  // it("should sort 99 random numbers correctly", () => {
  //
  //   const nums =    [458145,      80330         ]
  //
  //   const ans = radixSort(nums);
  //   const ex = nums.sort()
  //   expect(ans).toEqual(nums.sort());
  // });
});
