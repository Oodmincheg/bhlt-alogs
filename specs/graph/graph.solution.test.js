// you work for a professional social network. in this social network, a professional
// can follow other people to see their updates (think Twitter for professionals.)
// write a function that finds the job `title` that shows up most frequently given
// a set of degree of separation from you. count the initial id's own job title in the total

/*
  parameters:
  myId                - number    - the id of the user who is the root node
  getUser             - function - a function that returns a user's object given an ID
  degreesOfSeparation - number   - how many degrees of separation away to look on the graph
*/

/*
  getUser  - function - a function that returns a user's object given an ID

  example

  {
    id: 308,
    name: "Beatrisa Lalor",
    company: "Youtags",
    title: "Office Assistant II",
    connections: [687, 997, 437]
  }
*/
const { getUser } = require("./jobs");

const findMostCommonTitleRecursive = (myId, degreesOfSeparation, seen = new Set(), jobs = {}) => {
  if (degreesOfSeparation === 0 || seen.has(myId)) {
    return;
  }

  const user = getUser(myId);
  seen.add(myId);

  for (let j = 0; j < user.connections.length; j++) {
    const connection = user.connections[j];
    if (!seen.has(connection)) {
      findMostCommonTitleRecursive(connection, degreesOfSeparation - 1, seen, jobs);
    }
  }

  jobs[user.title] = jobs[user.title] ? jobs[user.title] + 1 : 1;
};

const findMostCommonTitle = (myId, degreesOfSeparation) => {
  const jobs = {};
  findMostCommonTitleRecursive(myId, degreesOfSeparation, new Set(), jobs);

  // find key with the biggest number
  const jobKeys = Object.keys(jobs);

  let biggestNumber = jobs[jobKeys[0]];
  let jobName = jobKeys[0];
  for (let i = 1; i < jobKeys.length; i++) {
    const currentJob = jobKeys[i];
    if (jobs[currentJob] > biggestNumber) {
      jobName = currentJob;
      biggestNumber = jobs[currentJob];
    }
  }

  return jobName;
};


// unit tests
// do not modify the below code
describe("findMostCommonTitle", function () {
  // the getUser function and data comes from this CodePen: https://codepen.io/btholt/pen/NXJGwa?editors=0010
  test.skip("user 30 with 2 degrees of separation", () => {
    expect(findMostCommonTitle(30, 2)).toBe("Librarian");
  });

  test.skip("user 11 with 3 degrees of separation", () => {
    expect(findMostCommonTitle(11, 3)).toBe("Graphic Designer");
  });

  test.skip("user 307 with 4 degrees of separation", () => {
    // if you're failing here with "Clinical Specialist, you're probably not filtering users who
    // appear more than once in people's connections
    expect(findMostCommonTitle(306, 4)).toBe("Pharmacist");
  });
});

describe("extra credit", function () {
  test.skip("user 1 with 7 degrees of separation – this will traverse every user that's followed by someone else. five users are unfollowed", () => {
    expect(findMostCommonTitle(1, 7)).toBe("Geological Engineer");
  });
});
