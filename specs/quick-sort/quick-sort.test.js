/*

  Quick Sort!

  Name your function quickSort.

  Quick sort should grab a pivot from the end and then separate the list (not including the pivot)
  into two lists, smaller than the pivot and larger than the pivot. Call quickSort on both of those
  lists independently. Once those two lists come back sorted, concatenate the "left" (or smaller numbers)
  list, the pivot, and the "right" (or larger numbers) list and return that. The base case is when quickSort
  is called on a list with length less-than-or-equal-to 1. In the base case, just return the array given.

*/

function quickSort(nums) {
  // code goes here
  if(nums < 2) return nums

  const pivot = nums[nums.length - 1]
  const left = []
  const right = []

  for(let i= 0; i < nums.length - 1; i++) {
    if(nums[i] <= pivot) left.push(nums[i])
    else right.push(nums[i])
  }

  return [...quickSort(left), pivot, ...quickSort(right)]
}

// unit tests
// do not modify the below code
test("quickSort", function () {
  const input = [10, 8, 2, 1, 6, 3, 9, 4, 7, 5];
  const answer = quickSort(input);

  expect(answer).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

  let emptyArray = [];
  let ansEmptyArray = quickSort(emptyArray);
  expect(ansEmptyArray).toEqual([]);

  let singleElementArray = [42];
  let ansSingleElementArray = quickSort(singleElementArray);
  expect(ansSingleElementArray).toEqual([42]);

  let reversedArray = [9, 8, 7, 6, 5, 4, 3, 2, 1];
  let ansReversedArray = quickSort(reversedArray);
  expect(ansReversedArray).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);

  let duplicateElementsArray = [5, 3, 8, 2, 5, 6, 4, 7, 5, 9, 3, 1];
  let ansDuplicateElementsArray = quickSort(duplicateElementsArray);
  expect(ansDuplicateElementsArray).toEqual([1, 2, 3, 3, 4, 5, 5, 5, 6, 7, 8, 9]);

  let mixedNumbersArray = [10, -5, 3, -8, 2, 0, 6, -4, 7, 9, -3, 1];
  let ansMixedNumbersArray = quickSort(mixedNumbersArray);
  expect(ansMixedNumbersArray).toEqual([-8, -5, -4, -3, 0, 1, 2, 3, 6, 7, 9, 10]);

});
