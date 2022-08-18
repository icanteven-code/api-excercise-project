#### 11 Tags - Filtering products by tags
**Description**
After we have added tags to our products now we want to use them and filter our list of items. Your `GET /products` should handle a new query parameter called `tags`, which query can send **mutliple** values - example `/products?tags=summer,hot,sale` or `/products?tags=sale`. There are multiple ways of supporting multiple values in a query parameter ( [How to pass an array within a query string?](https://stackoverflow.com/questions/6243051/how-to-pass-an-array-within-a-query-string) ) - in our case the multiple values are separated by a comma `,`. This query parameter should work with the rest of our supported queries - `category` & `sort`

**Acceptance Criteria**
- `GET /products` should accept a new query parameter `tags`
  - has to work with a single or multiple values
  - has to work with the other queries `category` & `sort`