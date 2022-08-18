# API Excercise Project (AEP)

This is created as a project idea for you to start working on a "real" Restful API - although it's a "classical basic e-commerce" you will get your tasks structured as good as possible and in a way that they can come to you from your employer/team.

It's completely up to you what kind of language or framework to use. You will see your tasks descibed in a universal way, so that they're applicable to any setup you decide to use. 


## Workflow / Git
To keep this "real" you need to create your own repository in Github and work with the "Feature branch workflow". This step "requires" you to have a buddy or mentor to review your code - When you're ready with a task/feature/fix you can create e Pull-request/Merge-request from your feature branch and wait for review and approval for merging. More on this workflow
- [Git Feature Branch Workflow](https://www.atlassian.com/git/tutorials/comparing-workflows/feature-branch-workflow)
- [Intro to git feature branch workflow](https://www.youtube.com/watch?v=Lj_jAFwofLs)
- [git feature branch example](https://www.youtube.com/watch?v=IfD3PwpOz7U)


## Data storage
You need to save your data to a Database (DB) - working with local files or temprorary data will not work. You can select any DB service, although PostreSQL would be the optimal choice. You can even deploy your Postgres DB for FREE in Heroku [How to set up a free PostgreSQL database on Heroku](https://dev.to/prisma/how-to-setup-a-free-postgresql-database-on-heroku-1dc1) and even your whole project when it's ready.


## Data mocking / Dummy data
As you will create multiple objects and entries, probably it will be a good idea to try and make your data to look as close to a real item as possible. You can use libraries like [py Faker](https://faker.readthedocs.io/en/master/) or [Faker.js](https://fakerjs.dev/) for generating texts and values, and [unsplash](https://unsplash.com/) for images, which also have a free API you can directly call.


## Project overview
You will be creating the REST API for a e-commerce platform with any products (you can choose your topic - tech, clothes, etc. or just random products). We will be listing products, sorting them, using pagination, having details views, internal (authenticated) routes, etc. 

[Coming soon] - You will have also a premade Frontend app, that can be connected with your project and directly see your changes.


You will wiork mainly with a `Product` object with all of these potetial properties, you can think of this as a hint for the incoming tasks. Note - this is the object that our Frontend app will use, your server can have them differently called, but you need to send them as outlined. Think carefully when and what you are going to send to your frontend from your API, probably we don't need all of the data all the time.

```
id  { INTEGER }
imageURL    { STRING }
name    { STRING }
slug    { STRING }
description { STRING }
releaseDate { STRING }
price   { FLOAT }
promoPrice { FLOAT }
promoPercentage { INT }
puchases    { INTEGER }
category    { STRING }
tags    { STRING ARRAY }
```

-----------

## Tasks / Stories

### [Epic] Home page    🛍️
In this "epic" we will be working on the initial state of our catalog page - listing our products with all the basic information for our app.



#### **01 Products** - Get the initial products information
Description
As a user I want to see a basic information for our products listed on the home page. Our application awaits a `GET` response from `/products` route. We want to see multiple products with the fields for `name`, `slug`, `price` and `releaseDate`. The `releaseDate` should be formated on the server in format `DD.MM.YYYY` and returned as a string (exmp. `"24.12.2020"`).

Acceptance Criteria
- We have a dedicated `GET` endpoint for `/products`
- We receive all decribed fields
- `releaseDate` is formated as `DD.MM.YYYY`



#### **02 Product **- add image url
Description
After we have our basic product information on our page, we want to also see the product image and know what we actually are looking at. You need to provide a new field `imageURL` to the existing `GET /products` for each item you return. This field returns a **url** to an image. You should connect to Unsplash's API and fetch a image ul for each product - it can be completely random every time or a specific image.

Acceptance Criteria
- `imageURL` is accessible in the `GET /products`
- Connect successfully to unsplash API
- Receive an image url from unsplash API



#### **03 Product** - add price and promotion
Description
Often we would like to give a promotional price for a specific product, that's when we're using the `promoPrice` and `promoPercentage` fields. `promoPrice` should always be smaller than the normal `price` and you need your calculate `promoPercentage` based on the `promoPrice` vs. `price` and always return it as a Int, not a Flota - think about posibble rounding of the number.

Acceptance Criteria
- At least 3 products have a promotional price set
- `promoPrice` and `promoPercentage` are added as fields to all products for `GET /products`
- `promoPercentage` is calculated on the server and always an Integer




### [Epic] Sorting  🔽
After we have provided our products to the page, now we want to be able to work with them a little bit easier - sorting their order by their name, release, price, etc.


#### **04 Sorting** - name ASC/DESC
Description
We want to be able to receive the list of products by `GET /products` in a specific order - sorted by the `name` field either ASC or DESC. Your API endpoint will receive a [query parameter](https://rapidapi.com/blog/api-glossary/parameters/query/#:~:text=What%20are%20API%20Query%20Parameters,on%20the%20data%20being%20delivered.) called `sort`. This query parameter will be constructed like `sort=name:ASC` or `sort=name:DESC` (exmp. `GET /products?sort=name:ASC`). 

This query parameter is not required, so if it's not sent, then return the products as you did until now.

Acceptance criteria
- `GET /products` can accept a query parameter `sort`
- The endpoint can work with `sort=name:ASC` or `sort=name:DESC`
- When provided with one of the two query options, the endpoint should return the orders sorted in a specific way.



#### **05 Sorting **- name releaseDate ASC/DESC
Description
Now we want to expand the sorting experience we have and add a new sorting option `releaseDate`. This query parameter will be constructed like `sort=releaseDate:ASC` or `sort=releaseDate:DESC` (exmp. `GET /products?sort=releaseDate:ASC`).

Acceptance criteria
- The endpoint can work with `sort=releaseDate:ASC` or `sort=releaseDate:DESC`
- When provided with one of the two query options, the endpoint should return the orders sorted in a specific way.



#### **06 Sorting** - puchases ASC/DESC
Description
Now we want to expand the sorting experience we have and add a new sorting option `puchases`. This query parameter will be constructed like `sort=puchases:ASC` or `sort=puchases:DESC` (exmp. `GET /products?sort=puchases:ASC`).

This is a new field `puchases` (Integer) for our product object - it's a required to be created for every existing and future product. The default value of the field should be a `0`. You don't need to send it to the frontend app, as it's not using this value. Add a `puchases` with a value bigger than 0 for at least 3 of the existing products.

Acceptance criteria
- Add a new field `purchases` to the product object
- The endpoint can work with `sort=releaseDate:ASC` or `sort=releaseDate:DESC`
- When provided with one of the two query options, the endpoint should return the orders sorted in a specific way.



#### **07 Sorting** - price ASC/DESC
Description
Now we want to expand the sorting experience we have and add a new sorting option `price`. This query parameter will be constructed like `sort=price:ASC` or `sort=price:DESC` (exmp. `GET /products?sort=price:ASC`).

As we support 2 types of prices `price` & `promoPrice` when you're sorting, if a product has a `promoPrice` you should sort it by this field and not `price`! Having a `promoPrice`, means that the "normal" `price` is not taken into consideration and we're working always with the promotion.

Acceptance criteria
- The endpoint can work with `sort=price:ASC` or `sort=price:DESC`
- Sorts correctly products with or without a `promoPrice`
- When provided with one of the two query options, the endpoint should return the orders sorted in a specific way.


### [Epic] Categories   🏷️


### [Epic] Tags   🔖



To Do
- [] categories
- [] tags
- [] filtering - by category, create new endpoint for category (id, name, slug)
- [] filtering - by tags, fetch all uniqly passed tags, filter by them

<!-- ### Home page sorting

### Home page search
 
### Home page filter
### Category - name + slug
#### 04 - Product category
Description
Usually in shops we can gather products and this is done via a category - we want to add a new string field `category`, that will contain the category of the product. All products are equired to have a category.

Acceptance criateria

### Create a new product

### Edit a product -->
