# Basik

Basik is a small blog site that uses a github repo as the article database for it and the Markdown language for the article itself

## Instalation

`npm install`

## Configuration

In `basik.config.json`

```js
{
  "repoUrl": "github repo url",
  "repoName": "blog-articles",
  "articlesFolderName": "articles", // the folder that contains the articles in the repo
  "refreshTime": 3600000, // the refresh time is used to update the articles from time to time, does a clone or a pull of the article repo
  "dev": false // if it's true it wont clone or pull the article repo
}
```

The articles need and must have the following structure:

- Each article needs to have its own folder
- The folder name is the article title, eg. `cool-article-name`
- In the article folder its required to have an `index.md` where the article is written.
- In the article folder a `thumb.png` or `thumb.jpg` can be provided to be used as a poster image in the article header

## Start te project

`npm start`
