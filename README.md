# API Exercise Project (AEP)

This is created as a project idea for you to start working on a "real" Restful API - it's a "classical basic e-commerce" and you will get your tasks structured as good as possible and in a way that they can come to you from your employer/team. Some of the things here maybe will not make the most sense from a "feature" stand point, but are aimed to make you think and find solutions for your tasks. This is made completely and only for learning purposes.

The best way for going through this project is with a mentor or a friend, who can overview your progress, provide feedback and check your code via Pull/Merge-requests (as described in the next topic - Workflow). But if you don't have such support - don't worry, the provided Frontend application (Coming soon) has a mocking mode, where you can see how the app works and even can try to reverse engineer the desired outcome.

It's up to you what kind of language or framework to use. You will see your tasks described in a universal way, so that they're applicable to any setup you decide to use.

As you will be developing a REST API a very helpful read would be this article [Best practices for REST API design](https://stackoverflow.blog/2020/03/02/best-practices-for-rest-api-design/#h-allow-filtering-sorting-and-pagination) and anything else to help you on your learning path. The tasks here are simply that - tasks to be done and completed, the rest of your searching and learning you should do completely on your own!

## Workflow / Git
To keep this "real" you need to create your own repository in Github and work with the "Feature branch workflow". This step "requires" you to have a buddy or mentor to review your code - When you're ready with a task/feature/fix you can create e Pull-request/Merge-request from your feature branch and wait for review and approval for merging. More on this workflow
- [Git Feature Branch Workflow](https://www.atlassian.com/git/tutorials/comparing-workflows/feature-branch-workflow)
- [Intro to git feature branch workflow](https://www.youtube.com/watch?v=Lj_jAFwofLs)
- [git feature branch example](https://www.youtube.com/watch?v=IfD3PwpOz7U)

<br/>

## Data storage
You need to save your data to a Database (DB) - working with local files or temporary data will not work. You can select any DB service, although PostgreSQL would be the optimal choice. You can even deploy your Postgres DB for FREE in Heroku [How to set up a free PostgreSQL database on Heroku](https://dev.to/prisma/how-to-setup-a-free-postgresql-database-on-heroku-1dc1) and even your whole project when it's ready. Another resource for PostgreSQL/DB you can use - [Learn PostgreSQL Tutorial - Full Course for Beginners](https://www.youtube.com/watch?v=qw--VYLpxG4).

<br/>

## Data mocking / Dummy data
As you will create multiple objects and entries, probably it will be a good idea to try and make your data to look as close to a real item as possible. You can use libraries like [py Faker](https://faker.readthedocs.io/en/master/) or [Faker.js](https://fakerjs.dev/) for generating texts and values, and [unsplash](https://unsplash.com/) for images, which also have a free API you can directly call.

<br/>

## Project overview
You will be creating the REST API for a e-commerce platform with any products (you can choose your topic - tech, clothes, etc. or just random products). We will be listing products, sorting them, using pagination, having details views, internal (authenticated) routes, etc. 

[Coming soon] - You will have also a premade Frontend app, that can be connected with your project and directly see your changes.

You will work mainly with a `Product` object with all of these potential properties, you can think of this as a hint for the incoming tasks. Note - this is the object that our Frontend app will use, your server can have them differently called, but you need to send them as outlined. Think carefully when and what you are going to send to your frontend from your API, probably we don't need all of the data all the time.

```
id  { INTEGER }
imageURL    { STRING }
name    { STRING }
slug    { STRING }
description { TEXT | LONG STRING }
createdDate { STRING }
price   { FLOAT }
promoPrice { FLOAT }
promoPercentage { INT }
purchases    { INTEGER }
category    { STRING }
tags    { STRING ARRAY }
```

-----------

## Tasks

### Home page    🛍️
In this "epic" we will be working on the initial state of our catalog page - listing our products with all the basic information for our app.

#### 00 Products - Creating a product item
**Description**
As a user to see product I firstly need to create them. We need a `POST` call to a new endpoint `/products`, which can accept a json body/payload with field `name`, `description` and `price` (for now).

```
{
    name: "Example product name",
    description: "Example description lorem ipsuim"
    price: 15
}
```

After receiving the call you will need to add to your object couple of dynamic fields
- `slug` - The `slug` ( [What is a "slug"](https://stackoverflow.com/questions/427102/what-is-a-slug-in-django) ) field should be **automatically** created based on the `name` field and has to be kebabCase (lowercase) like this:
```
name: Some example name
slug: some-example-name
```
- `createdDate` - date of creating the element. This can be a simple date element, no Date-Time needed.

**Acceptance Criteria**
- Create a `POST` request for `/products`
- Can accept a json body
- Creates `slug` and `createdDate` fields

<br/>
<br/>

#### 01 Products - Get the initial products information
**Description**
As a user I want to see a basic information for our products listed on the home page. Our application awaits a `GET` response from `/products` route. We want to see multiple products, which contains the fields for `name`, `slug`, `price` and `createdDate` (this is what your endpoint should return). 

The `createdDate` should be formated on the server in format `DD.MM.YYYY` and returned as a string (exmp. `"24.12.2020"`).

**Acceptance Criteria**
- We have a dedicated `GET` endpoint for `/products`
  - Returns an array/list of products
  - Every product object should have `name`, `slug`, `price` and `createdDate`
- `createdDate` is formated as `DD.MM.YYYY`

<br/>
<br/>

#### 02 Product - add image url
**Description**
After we have our basic product information on our page, we want to also see the product image and know what we actually are looking at. You need to provide a new field `imageURL` to the existing `GET /products` for each item you return. This field returns a url to an image. You should connect to Unsplash's API and fetch a image ul for each product - it can be completely random every time or a specific image.

**Acceptance Criteria**
- Every product returned by `GET /products` should contain the new field `imageURL`
- Connect successfully to unsplash API
- Receive an image url from unsplash API

<br/>
<br/>

#### 03 Product - add price and promotion
**Description**
Often, we would like to give a promotional price for a specific product, that's when we're using the `promoPrice` and `promoPercentage` fields - you need to add this both to your model in the server and to the response to our app. `promoPrice` should always be smaller than the normal `price` and you need you calculate `promoPercentage` based on the `promoPrice` vs. `price` and always return it as a Int, not a Flota - think about possible rounding of the number.

**Acceptance Criteria**
- At least 3 products have a promotional price set
- Every product returned by `GET /products` should contain the new fields `promoPrice` and `promoPercentage`
- `promoPercentage` is calculated on the server and always an Integer

<br/>
<br/>
<br/>
<br/>

### Sorting  🔽
After we have provided our products to the page, now we want to be able to work with them a little bit easier - sorting their order by their name, release, price, etc.

#### 04 Sorting - name ASC/DESC
**Description**
We want to be able to receive the list of products by `GET /products` in a specific order - sorted by the `name` field either ASC or DESC. Your API endpoint will receive a [query parameter](https://rapidapi.com/blog/api-glossary/parameters/query/#:~:text=What%20are%20API%20Query%20Parameters,on%20the%20data%20being%20delivered.) called `sort`. This query parameter will be constructed like `sort=name:ASC` or `sort=name:DESC` (exmp. `GET /products?sort=name:ASC`). 

This query parameter is not required, so if it's not sent, then return the products as you did until now.

**Acceptance Criteria**
- `GET /products` can accept a query parameter `sort`
- The endpoint can work with `sort=name:ASC` or `sort=name:DESC`
- When provided with one of the two query options, the endpoint should return the orders sorted in a specific way.

<br/>
<br/>

#### 05 Sorting - name createdDate ASC/DESC
**Description**
Now we want to expand the sorting experience we have and add a new sorting option `createdDate`. This query parameter will be constructed like `sort=createdDate:ASC` or `sort=createdDate:DESC` (example `GET /products?sort=createdDate:ASC`).

**Acceptance Criteria**
- The endpoint can work with `sort=createdDate:ASC` or `sort=createdDate:DESC`
- When provided with one of the two query options, the endpoint should return the orders sorted in a specific way.

<br/>
<br/>

#### 06 Sorting - purchases ASC/DESC
**Description**
Now we want to expand the sorting experience we have and add a new sorting option `purchases`. This query parameter will be constructed like `sort=purchases:ASC` or `sort=purchases:DESC` (exmp. `GET /products?sort=purchases:ASC`).

This is a new field `purchases` (Integer) for our product object - it's a required to be created for every existing and future product. The default value of the field should be a `0`. You don't need to send it to the frontend app, as it's not using this value. Add a `purchases` with a value bigger than 0 for at least 3 of the existing products.

**Acceptance Criteria**
- All products returned by `GET /products` should contain the new field `purchases`
- The endpoint can work with sorting - `sort=createdDate:ASC` or `sort=createdDate:DESC`
- When provided with one of the two query options, the endpoint should return the orders sorted in a specific way.

<br/>
<br/>

#### 07 Sorting - price ASC/DESC
**Description**
Now we want to expand the sorting experience we have and add a new sorting option `price`. This query parameter will be constructed like `sort=price:ASC` or `sort=price:DESC` (exmp. `GET /products?sort=price:ASC`).

As we support 2 types of prices `price` & `promoPrice` when you're sorting, if a product has a `promoPrice` you should sort it by this field and not `price`! Having a `promoPrice`, means that the "normal" `price` is not taken into consideration and we're working always with the promotion.

**Acceptance Criteria**
- The endpoint can work with `sort=price:ASC` or `sort=price:DESC`
- Sorts correctly products with or without a `promoPrice`
- When provided with one of the two query options, the endpoint should return the orders sorted in a specific way.

<br/>
<br/>
<br/>
<br/>

### Categories   🏷️
Usually in shops we can gather products and this is done via a category - we will be using this later on for filtering, grouping, etc. To be able to work with the categories in the best way possible we'll create a new object and endpoint for them, after which we will connect them with our products.

#### 08 Categories - Create a category
**Description**
We want to start with creating a new category. The category object should contain these fields:
```
id
name
slug
```

When creating a new category (`POST /categories`) you should receive a json body with the `name` field and create the `slug` automatically like for the `POST /products` endpoint. 

**Acceptance Criteria**
- Create a new endpoint `POST /categories`
  - It should accept a `name` field as a json payload - `{ name: 'Example category' }`
- Create automatically `slug` field
- Create at least 3 categories

#### 9 Categories - Listing the categories
**Description**
We want to be able to list our categories as options in our application. To do so we need a new endpoint `GET /categories`, which returns all existing categories - the needed fields are `name` and `slug`.

**Acceptance Criteria**
- Create a new `GET /categories` endpoint
  - Should return an array of all categories
  - Each category should have fields `name` & `slug`

<br/>
<br/>

#### 10 Categories - Filter products by category
**Description**
Now after we have categories, we need to connect a category to each existing and future product. Use the `slug` of the category for the `category` field inside a product. Later on the frontend app will show these categories as filtering option. After this is done, we can make the next step and perform a filtering on a category.

As a user I want to be able to filter and see product only assigned to a specific category. Your endpoint for getting the products `GET /products` should accept a query parameter `category`, which contains the **category's slug**. It should filter and limit the response product to only those assigned to the sent category - example `/products?category=laptop` returns only products that contain `category: laptop`. This query parameter **should** work with other query parameters provided (like sorting).

**Acceptance Criteria**
- All existing and future products should have an assigned category slug
- `GET /products` should accept and filter by a query parameter `category`
- The new query should work when used with the previously supported queries

<br/>
<br/>
<br/>
<br/>

### Tags   🔖
Another feature we want to add to our products are tags - think of them as the hashtags used in a social platform. The tags are just text-strings, that are open to the user to add and change. We don't have any requirements for them, they're just a set of words, selected and set to a product.

#### 11 Tags - Add a tag field to product
**Description**
As a user I want to see and use the tags for our products. You need to add a new field `tags`, which is an array of strings. These tags inside the array can be a single or multiple words. 

**Acceptance Criteria**
- New `tags` field added to products
    - `tags` is always returned by `GET products/`
    - `tags` can be empty and then is returned as empty array `[]`
- At least 3 products have **each** 3 tags set (hint: you can use the same tag on multiple products)

<br/>
<br/>

#### 12 Tags - Retrieving all tags
**Description**
We need to provide our Frontend application with a list of all used tags, so it can display these to the user and give him the opportunity to filter by them. We need a new endpoint `GET /tags`, which goes through all products' tags and returns all **unique** (no duplication of values) tags as an array.

**Acceptance Criteria**
- Create a new endpoint `GET /tags`
  - Return an array of tags (strings)
  - The returned values should be unique (no duplication of tags)

<br/>
<br/>

#### 11 Tags - Filtering products by tags
**Description**
After we have added tags to our products now, we want to use them and filter our list of items. Your `GET /products` should handle a new query parameter called `tags`, which query can send **multiple** values - example `/products?tags=summer,hot,sale` or `/products?tags=sale`. There are multiple ways of supporting multiple values in a query parameter ( [How to pass an array within a query string?](https://stackoverflow.com/questions/6243051/how-to-pass-an-array-within-a-query-string) ) - in our case the multiple values are separated by a comma `,`. This query parameter should work with the rest of our supported queries - `category` & `sort`

**Acceptance Criteria**
- `GET /products` should accept a new query parameter `tags`
  - has to work with a single or multiple values
  - The new query should work when used with the previously supported queries

<br/>
<br/>
<br/>
<br/>

### Search   🔖
We have currently the opportunity to narrow down our search through the products, but what if we want to search by something specific? That's why we're implementing a search functionality

#### 12 Tags - Searching
**Description**
Your `GET /products` should handle a new query parameter called `search` and will contain a text-string - you need to query the names of your products by this text-string, here [MongoDB: Query for Words](https://www.mongodb.com/docs/drivers/node/current/fundamentals/crud/read-operations/text/#query-for-words) you can find a good example of this behavior. The `search` should have a value of at least 3 characters long and it can contain a single or multiple words. This new query parameter has to work with the rest of our queries like `category`, `tag` and `sort`.

**Acceptance Criteria**
- `GET /products` should accept a new query parameter `search`
  - has to be at least 3 characters long
  - has to return all products, that have an occurrence of the search-string in their name
  - has to work with the other queries


<br/>
<br/>
<br/>
<br/>

### Pagination  🔖

#### 13 Pagination
**Description**
Often you will work with way too many items, let’s say over 1000 products - does it makes sense to send all of them as a response? Almost definitely not, that's why we should implement a pagination logic. You need to restructure your `GET /products` and return an additional object containing info about the current payload

```
page: { INTEGER } - the current page we're at
size: { INTEGER } - the size of the payload, how many items we're sending
totalPages: { INTEGER } - the total count of pages, this number depends on the selected `size`
```

`page` and `size` should come from the application as query parameters, which you need to parse in your server and send back data for them. The `size` is predefined and can be one of these values - `10`, `20`, `50`. The default value for the `size` is `10`, if none is provided as query parameter and for `page` it's `1`.

Currently our payload is a simple array of products and there's no available place to add this object, that's why we need to reconstruct the whole payload for our `GET /products` like

```
{
    data: [
        ... products
    ],
    pagination:{
        page: 1,
        size: 10,
        totalPages: 3
    }
}
```

**Acceptance Criteria**
- `GET /products` should accept a new query parameter `page` & `size`
- Rework the payload to return an object `{ data: [ ... ], pagination: { page:1, size:10, totalPages:2 } }`
- Both `page` and `size` have a default values if nothing is set as a query parameter
- The pagination works with the rest of the filtering and sorting

<br/>
<br/>
<br/>
<br/>


#### 14 Load data for your endpoints
**Description**
We want to imitate a real case scenario as much as possible, so you need to think of a way to **automate** the process of filling your database with products. You can use a library (like Faker, described in the beginning) or other existing services or APIs. 

**Acceptance Criateria**
- Fill the DB with 100 products with somewhat real information

### Edit a product view   🔖
<!-- ToDo -->

### Future and more advanced topics
- Unit testing (at least 70-80% coverage)
- Sorting by multiple fields
- Fuzzy search
- Search (fuzzy) by multiple fields - like name, category and tags


