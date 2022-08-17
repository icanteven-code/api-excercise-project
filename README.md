# API Excercise Project (AEP)

This project is created as a project idea for you to start working on a "real" Restful API. It's completely up to you what kind of language or framework to use. You will see your tasks descibed in a universal way, so that they're applicable to any setup you decide to use. 


## Workflow / Git
To keep this "real" you need to create your own repository in Github and work with the "Feature branch workflow". This step "requires" you to have a buddy or mentor to review your code - When you're ready with a task/feature/fix you can create e Pull-request/Merge-request from your feature branch and wait for review and approval for merging. More on this workflow
- [Git Feature Branch Workflow](https://www.atlassian.com/git/tutorials/comparing-workflows/feature-branch-workflow)
- [Intro to git feature branch workflow](https://www.youtube.com/watch?v=Lj_jAFwofLs)
- [git feature branch example](https://www.youtube.com/watch?v=IfD3PwpOz7U)


## Data storage
You need to save your data to a Database (DB) - working with local files or temprorary data will not work. You can select any DB service, although PostreSQL would be the optimal choice. You can even deploy your Postgres DB for FREE in Heroku [How to set up a free PostgreSQL database on Heroku](https://dev.to/prisma/how-to-setup-a-free-postgresql-database-on-heroku-1dc1) and even your whole project when it's ready.


## Project overview
You will be creating the REST API for a e-commerce platform with any products (you can choose your topic - tech, clothes, etc. or just random products). We will be listing products, sorting them, using pagination, having details views, internal (authenticated) routes, etc. 

[Coming soon] - You will have also a premade Frontend app, that can be connected with your project and directly see your changes.


You will wiork mainly with a `Product` object with all of these potetial properties. Think carefully when and what you are going to send to your frontend from your API, probably we don't need all of the data all the time.

```
id  { INTEGER }
imageURL    { STRING }
name    { STRING }
slug    { STRING }
description { STRING }
releaseDate { STRING }
price   { FLOAT }
promotion   { FLOAT }
promotionPercentage { INT }
puchases    { INTEGER }
category    { STRING }
tags    { STRING ARRAY }
```

## Tasks / Stories