# Learnify

## Running this project

Setup Postgres database

```bash
docker-compose -f docker/learnifydb.docker-compose.yml up
```

Install packages

```bash
yarn
```

Setup Environment Variables

```bash
cp sample.env .env
```

Now we can run applications

### Run Backend

```bash
npx nx serve backend
```

Access [Swagger Playground](http://localhost:3334/docs) for backend.

### Run Admin Panel

```bash
npx nx serve admin-panel
```

### Serve StoryBook Instance

```bash
npx nx storybook ui
```

### Serve Learnify Mobile Application

```bash
npx nx start app
```


### Serve Learnify Website

```bash
npx nx serve website
```

### Serve Learnify Docs

```bash
npx nx serve website
```


## Understand this workspace

Run `nx graph` to see a diagram of the dependencies of the projects.
