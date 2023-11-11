/*
  Write a function that performs mergesort
  Name the function mergeSort
  It will take in a array of numbers and return a sorted array numbers

  You'll need to write more than just one function
*/

const mergeSort = (nums) => {
  // code goes here
  // [3, 2, 7, 1, 8]
  // [3, 2] - [7, 1, 8]
  // [3] [2] - [7, 1] [8]
  //           [7] [1] [8]
  // [2, 3]    [1, 7] [8]
  //           [1, 7, 8]
  // [1, 2, 3, 7, 8]
  if (nums.length < 2) return nums
  const middle = Math.floor(nums.length / 2)
  const left = nums.slice(0, middle)
  const right = nums.slice(middle)
  return merge(mergeSort(left), mergeSort(right))
};
const merge = (left, right) => {
  const result = []
  while(left.length && right.length) {
    if(left[0] < right[0]) {
      result.push(left.shift())
    } else {
      result.push(right.shift())
    }
  }
  return [...result, ...left, ...right]
}
// unit tests
// do not modify the below code
test("merge sort", function () {
  let nums = [10, 5, 3, 8, 2, 110, 6, 4, 7, 9, -3, 1];
  let ans = mergeSort(nums);
  expect(ans).toEqual([-3, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 110]);

  let emptyArray = [];
  let ansEmptyArray = mergeSort(emptyArray);
  expect(ansEmptyArray).toEqual([]);

  let singleElementArray = [42];
  let ansSingleElementArray = mergeSort(singleElementArray);
  expect(ansSingleElementArray).toEqual([42]);

  let reversedArray = [9, 8, 7, 6, 5, 4, 3, 2, 1];
  let ansReversedArray = mergeSort(reversedArray);
  expect(ansReversedArray).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);

  let duplicateElementsArray = [5, 3, 8, 2, 5, 6, 4, 7, 5, 9, 3, 1];
  let ansDuplicateElementsArray = mergeSort(duplicateElementsArray);
  expect(ansDuplicateElementsArray).toEqual([1, 2, 3, 3, 4, 5, 5, 5, 6, 7, 8, 9]);

  let mixedNumbersArray = [10, -5, 3, -8, 2, 0, 6, -4, 7, 9, -3, 1];
  let ansMixedNumbersArray = mergeSort(mixedNumbersArray);
  expect(ansMixedNumbersArray).toEqual([-8, -5, -4, -3, 0, 1, 2, 3, 6, 7, 9, 10]);


});
