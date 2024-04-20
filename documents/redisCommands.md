### Task 2
To keep track of the most frequently visited players for each user, I will use a sorted set.

- Key: “frequentlyVisited:userId"
- Value1: The json object for the player
- Value2: The number of times that the player has been searched

***

### Task 3:
These are the commands I will use to accomplish the following tasks in the Redis database:
1. Initialize
    - FLUSHALL
    - Clear all previous data
2. Create
    - ZADD frequentlyVisited:userID 1 "{name: John Doe, age: 19, ...}"
3. Read
    - ZRANGE frequentlyVisited:userId 0 -1 REV
4. Update
    - ZINCRBY frequentlyVisited:userId 1 "{name: John Doe, age: 19, ...}"
    - Increase the score of the player by 1 every time the user visits their page
5. Delete
    - 